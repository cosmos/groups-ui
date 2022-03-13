import { getKeplrFromWindow } from '@keplr-wallet/stores'
import { ChainInfo, Keplr } from '@keplr-wallet/types'
import { EncodeObject, Registry } from '@cosmjs/proto-signing'
import { defaultRegistryTypes, SigningStargateClient } from '@cosmjs/stargate'
import {
    LcdClient,
    setupAuthExtension,
    // setupBankExtension,
    // setupDistributionExtension,
    // setupGovExtension,
    // setupMintExtension,
    // setupSlashingExtension,
    // setupStakingExtension,
    // setupSupplyExtension
} from "@cosmjs/launchpad"
import { AuthExtension } from '@cosmjs/launchpad/build/lcdapi/auth'
import { StdFee } from '@cosmjs/amino'
import { BroadcastTxResponse } from '@cosmjs/stargate/build/stargateclient'

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
    keplr: Keplr = null

    lcdClientGet = async (path: string, params?: Record<string, any>): Promise<any> => {
        try {
            return this.lcdClient.get(path, params)
        } catch (e) {
            console.error(`error when lsdClient get`, e)
        }
    }

    signAndBroadcast = (signerAddress: string, messages: readonly EncodeObject[], fee: StdFee, memo?: string): Promise<BroadcastTxResponse> => {
        try {
            if (!this.stargateClient) {
                throw new Error("NPE!")
            }
            return this.stargateClient.signAndBroadcast(signerAddress, messages, fee, memo)
        } catch (e) {
            console.error(`error when stargateClient signAndBroadcast`, e)
        }
    }

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {
        const keplr = await getKeplrFromWindow()
        if (!keplr) {
            alert("Keplr extension not found")
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

            // console.log('this.stargateClient.getChainId()', await this.stargateClient.getChainId())
        }, 0)

        this.lcdClient = LcdClient.withExtensions(
            { apiUrl: chainInfo.rest },
            setupAuthExtension,
            // setupBankExtension,
            // setupDistributionExtension,
            // setupGovExtension,
            // setupMintExtension,
            // setupSlashingExtension,
            // setupStakingExtension,
            // setupSupplyExtension
        )
    }
}
