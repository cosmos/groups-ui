import { getService, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { MsgCreateGroup } from '../generated/regen/group/v1alpha1/tx'
import { CosmosClient } from './cosmos-client'
import { GroupAccountInfo, GroupInfo, GroupMember } from '../generated/regen/group/v1alpha1/types'
import {
    QueryGroupAccountInfoResponse,
    QueryGroupAccountsByGroupResponse,
    QueryGroupInfoResponse,
    QueryGroupMembersResponse,
    QueryGroupsByAdminResponse
} from '../generated/regen/group/v1alpha1/query'

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
