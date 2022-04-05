import { getService, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { CosmosClient } from './cosmos-client'
import { CosmosNodeService } from './cosmos-node-service'
import { Coin } from '@cosmjs/amino'
import { QueryAllBalancesResponse } from '../generated/cosmos/bank/v1beta1/query'

@service
export class BankService {
    static serviceName = BankService.name

    static get instance(): BankService {
        return getService<BankService>(BankService.serviceName)
    }

    cosmosClient: CosmosClient

    constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient
    }

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {}

    getAllBalances = async (): Promise<readonly Coin[]> => {
        const {bech32Address} = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)

        // fixme: load all pages
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/bank/v1beta1/balances/${bech32Address}`
        ) as QueryAllBalancesResponse

        return Object.freeze(res.balances)
    }
}
