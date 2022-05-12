import { getKeplrFromWindow } from '@keplr-wallet/stores'
import { ChainInfo, Keplr } from '@keplr-wallet/types'
import { EncodeObject, Registry } from '@cosmjs/proto-signing'
import { defaultRegistryTypes, QueryClient, SigningStargateClient } from '@cosmjs/stargate'
import { LcdClient, setupAuthExtension, setupBankExtension } from '@cosmjs/launchpad'
import { AuthExtension } from '@cosmjs/launchpad/build/lcdapi/auth'
import { StdFee } from '@cosmjs/amino'
import { DeliverTxResponse } from '@cosmjs/stargate/build/stargateclient'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'

export class CosmosClient {
    static _instance: CosmosClient = null
    static get instance(): CosmosClient {
        if (this._instance === null) {
            this._instance = new CosmosClient()
        }
        return this._instance
    }

    registry: Registry = null
    private stargateClient: SigningStargateClient = null
    private lcdClient: LcdClient
        & AuthExtension = null
    private queryClient: QueryClient = null
    keplr: Keplr = null

    lcdClientGet = async (path: string, params?: Record<string, any>): Promise<any> => {
        try {
            return this.lcdClient.get(path, params)
        } catch (e) {
            console.error(`error when lsdClient get`, e)
        }
    }

    queryClientGet = (path: string, request: Uint8Array): Promise<Uint8Array> => {
        try {
            return this.queryClient.queryUnverified(path, request)
        } catch (e) {
            console.error(`error when queryClient get`, e)
        }
    }

    signAndBroadcast = (signerAddress: string, messages: readonly EncodeObject[], fee: StdFee, memo?: string): Promise<DeliverTxResponse> => {
        try {
            if (!this.stargateClient) {
                throw new Error('NPE!')
            }
            return this.stargateClient.signAndBroadcast(signerAddress, messages, fee, memo)
        } catch (e) {
            console.error(`error when stargateClient signAndBroadcast`, e)
        }
    }

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {
        const keplr = await getKeplrFromWindow()
        if (!keplr) {
            alert('Keplr extension not found')
            return
        }
        this.keplr = keplr

        await this.keplr.experimentalSuggestChain(chainInfo)
        await this.keplr.enable(chainInfo.chainId)

        this.registry = new Registry()

        defaultRegistryTypes.forEach((v) => {
            this.registry.register(v[0], v[1])
        })

        const offlineSigner = this.keplr.getOfflineSigner(chainInfo.chainId)
        console.log('offlineSigner', offlineSigner)
        console.log('this.registry', this.registry)

        setTimeout(async () => {
            this.stargateClient = await SigningStargateClient.connectWithSigner( // TODO it is a slow one, mb not to block rendering?
                chainInfo.rpc,
                offlineSigner,
                {
                    registry: this.registry
                }
            )
        }, 0)

        this.lcdClient = LcdClient.withExtensions(
            { apiUrl: chainInfo.rest },
            setupAuthExtension,
            setupBankExtension
            // setupDistributionExtension,
            // setupGovExtension,
            // setupMintExtension,
            // setupSlashingExtension,
            // setupStakingExtension,
            // setupSupplyExtension
        )

        const tmClient = await Tendermint34Client.connect(chainInfo.rpc)
        this.queryClient = QueryClient.withExtensions(tmClient)
    }
}
