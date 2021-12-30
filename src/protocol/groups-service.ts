import { getService, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { MsgCreateGroup, MsgUpdateGroupMetadata, protobufPackage } from '../generated/regen/group/v1alpha1/tx'
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
        this.cosmosClient.registry.register(
            `/${protobufPackage}.MsgUpdateGroupMetadata`,
            MsgUpdateGroupMetadata
        );
    }

    groupsByAdmin = async (admin: string): Promise<GroupInfo[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/regen/group/v1alpha1/groups/admins/${admin}`
        ) as QueryGroupsByAdminResponse
        return res.groups
    }

    groupById = async (groupId: number): Promise<GroupInfo> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/regen/group/v1alpha1/groups/${groupId}/info`
        ) as QueryGroupInfoResponse
        return res.info
    }

    groupAccounts = async (groupId: number): Promise<GroupAccountInfo[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/regen/group/v1alpha1/groups/${groupId}/accounts`
        ) as QueryGroupAccountsByGroupResponse
        return res.group_accounts
    }

    groupMembers = async (groupId: number): Promise<GroupMember[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/regen/group/v1alpha1/groups/${groupId}/members`
        ) as QueryGroupMembersResponse
        return res.members
    }

    groupInfoByGroupAddress = async (groupAddress: string): Promise<GroupAccountInfo> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/regen/group/v1alpha1/groups/accounts/${groupAddress}`
        ) as QueryGroupAccountInfoResponse
        return res.info
    }
}
