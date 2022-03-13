import { getService, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { CosmosClient } from './cosmos-client'

@service
export class CosmosNodeService {
    static serviceName: string = 'CosmosNodeService'

    static get instance(): CosmosNodeService {
        return getService<CosmosNodeService>(CosmosNodeService.serviceName)
    }

    cosmosClient: CosmosClient
    chainInfo: ChainInfo

    constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient
    }

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {
        this.chainInfo = chainInfo
    }
}
