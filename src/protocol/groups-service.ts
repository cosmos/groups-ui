import { getService, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { MsgCreateGroup } from '../generated/regen/group/v1alpha1/tx'
import { CosmosClient } from './cosmos-client'
import { GroupInfo } from '../generated/regen/group/v1alpha1/types'
import { QueryGroupsByAdminResponse } from '../generated/regen/group/v1alpha1/query'

@service
export class GroupsService {
    static serviceName: string = 'GroupsService'

    static get instance(): GroupsService {
        return getService<GroupsService>(GroupsService.serviceName)
    }

    cosmosClient: CosmosClient

    constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient
    }

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {
        this.cosmosClient.registry.register(
            "/regen.group.v1alpha1.MsgCreateGroup",
            MsgCreateGroup
        );
    }

    groupsByAdmin = async (admin: string): Promise<GroupInfo[]> => {
        const res = await this.cosmosClient.lcdClient.get(
            `/regen/group/v1alpha1/groups/admins/${admin}`
        ) as QueryGroupsByAdminResponse
        return res.groups
    }
}
