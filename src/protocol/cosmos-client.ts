import { getKeplrFromWindow } from '@keplr-wallet/stores'
import { ChainInfo } from '@keplr-wallet/types'
import { Registry } from '@cosmjs/proto-signing'
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

export class CosmosClient {
    static _instance: CosmosClient = null
    static get instance(): CosmosClient {
        if (this._instance === null) {
            this._instance = new CosmosClient()
        }
        return this._instance
    }

    registry: Registry = null
    stargateClient: SigningStargateClient = null
    lcdClient: LcdClient
        & AuthExtension = null

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {
        const keplr = await getKeplrFromWindow()
        if (!keplr) {
            alert("Keplr extension not found")
            return
        }

        await keplr.experimentalSuggestChain(chainInfo);
        await keplr.enable(chainInfo.chainId);

        this.registry = new Registry();

        defaultRegistryTypes.forEach((v) => {
            this.registry.register(v[0], v[1]);
        });

        const offlineSigner = keplr.getOfflineSigner(chainInfo.chainId);

        this.stargateClient = await SigningStargateClient.connectWithSigner(
            chainInfo.rpc,
            offlineSigner,
            {
                registry: this.registry
            }
        );

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
        );
    }
}
