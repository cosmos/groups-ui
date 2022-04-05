import { getService, Service, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { CosmosClient } from './cosmos-client'
import {
    MsgCreateGroup,
    MsgCreateGroupPolicy,
    MsgUpdateGroupMembers,
    MsgUpdateGroupMetadata,
    MsgUpdateGroupPolicyDecisionPolicy,
    protobufPackage
} from '../generated/cosmos/group/v1/tx'
import { GroupInfo, GroupMember, GroupPolicyInfo } from '../generated/cosmos/group/v1/types'
import {
    QueryGroupInfoResponse,
    QueryGroupMembersResponse,
    QueryGroupPoliciesByGroupResponse,
    QueryGroupsByAdminResponse
} from '../generated/cosmos/group/v1/query'

@service
export class GroupsService implements Service {
    static serviceName: string = "GroupsService"

    static get instance(): GroupsService {
        return getService<GroupsService>(GroupsService.serviceName)
    }

    cosmosClient: CosmosClient

    constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient
    }

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {
        this.cosmosClient.registry.register(
            `/${protobufPackage}.MsgCreateGroup`,
            MsgCreateGroup
        )
        this.cosmosClient.registry.register(
            `/${protobufPackage}.MsgUpdateGroupMetadata`,
            MsgUpdateGroupMetadata
        )
        this.cosmosClient.registry.register(
            `/${protobufPackage}.MsgUpdateGroupMembers`,
            MsgUpdateGroupMembers
        )
        this.cosmosClient.registry.register(
            `/${protobufPackage}.MsgCreateGroupPolicy`,
            MsgCreateGroupPolicy
        )
        this.cosmosClient.registry.register(
            `/${protobufPackage}.MsgUpdateGroupPolicyDecisionPolicy`,
            MsgUpdateGroupPolicyDecisionPolicy
        )
    }

    groupsByAdmin = async (admin: string): Promise<GroupInfo[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/group/v1/groups_by_admin/${admin}`
        ) as QueryGroupsByAdminResponse
        return res.groups.map(normalizeBackendGroup)
    }

    groupById = async (groupId: number): Promise<GroupInfo> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/group/v1/group_info/${groupId}`
        ) as QueryGroupInfoResponse

        if (!res.info) {
            return null
        }

        return normalizeBackendGroup(res.info)
    }

    groupPolicies = async (groupId: number): Promise<GroupPolicyInfo[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/group/v1/group_policies_by_group/${groupId}`
        ) as QueryGroupPoliciesByGroupResponse
        return res.group_policies
    }

    groupMembers = async (groupId: number): Promise<GroupMember[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/group/v1/group_members/${groupId}`
        ) as QueryGroupMembersResponse
        return res.members
    }
}

function normalizeBackendGroup(g: GroupInfo): GroupInfo { // it's grpc - Long numbers are strings, so we convert them here
    return {
        ...g,
        id: Number(g.id),
        version: Number(g.version)
    }
}
