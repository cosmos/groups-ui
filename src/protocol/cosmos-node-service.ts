import { getService, Service, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { CosmosClient } from './cosmos-client'
import {Vote} from "../generated/cosmos/group/v1beta1/types";
import {QueryVotesByProposalResponse} from "../generated/cosmos/group/v1beta1/query";

@service
export class CosmosNodeService implements Service {
    static serviceName: string = "CosmosNodeService"

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
