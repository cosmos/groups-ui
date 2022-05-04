import { getService, Service, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { CosmosClient } from './cosmos-client'
import {
    MsgCreateGroup,
    MsgCreateGroupPolicy,
    MsgCreateGroupWithPolicy,
    MsgUpdateGroupAdmin,
    MsgUpdateGroupMembers,
    MsgUpdateGroupMetadata,
    MsgUpdateGroupPolicyAdmin,
    MsgUpdateGroupPolicyDecisionPolicy,
    protobufPackage
} from '../generated/cosmos/group/v1/tx'
import {GroupInfo, GroupPolicyInfo, Member} from '../generated/cosmos/group/v1/types'
import {
    QueryGroupInfoResponse,
    QueryGroupMembersRequest,
    QueryGroupMembersResponse,
    QueryGroupPoliciesByGroupResponse,
    QueryGroupsByAdminRequest,
    QueryGroupsByAdminResponse
} from '../generated/cosmos/group/v1/query'
import { PageRequest } from '../generated/cosmos/base/query/v1beta1/pagination'

export const DEFAULT_MEMBERS_PAGE_SIZE = 50

@service
export class GroupsService implements Service {
    static serviceName: string = 'GroupsService'

    static get instance(): GroupsService {
        return getService<GroupsService>(GroupsService.serviceName)
    }

    cosmosClient: CosmosClient

    constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient
    }

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgCreateGroup`, MsgCreateGroup)
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgCreateGroupWithPolicy`, MsgCreateGroupWithPolicy)
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgUpdateGroupMetadata`, MsgUpdateGroupMetadata)
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgUpdateGroupMembers`, MsgUpdateGroupMembers)
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgUpdateGroupAdmin`, MsgUpdateGroupAdmin)
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgUpdateGroupPolicyAdmin`, MsgUpdateGroupPolicyAdmin)
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgCreateGroupPolicy`, MsgCreateGroupPolicy)
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgUpdateGroupPolicyDecisionPolicy`, MsgUpdateGroupPolicyDecisionPolicy)
    }

    // groupsByAdmin = async (admin: string): Promise<GroupInfo[]> => {
    //     const res = await this.cosmosClient.lcdClientGet(
    //         `/cosmos/group/v1/groups_by_admin/${admin}`
    //     ) as QueryGroupsByAdminResponse
    //     return res.groups.map(normalizeBackendGroup)
    // }

    // get all groups page by page
    allGroupsByAdmin = async (admin: string): Promise<GroupInfo[]> => {
        let all: GroupInfo[] = []
        let res: QueryGroupsByAdminResponse
        let nextKey: Uint8Array

        do {
            res = await this.groupsByAdmin(admin, 1000, nextKey)
            all.push(...res.groups)
            nextKey = res.pagination.next_key
        } while (nextKey.toString())

        return all
    }

    groupsByAdmin = async (admin: string,
                           pageSize: number = DEFAULT_MEMBERS_PAGE_SIZE,
                           nextPageKey: Uint8Array | undefined = undefined): Promise<QueryGroupsByAdminResponse> => {
        const requestData = Uint8Array.from(
            QueryGroupsByAdminRequest.encode({
                admin,
                pagination: PageRequest.fromPartial({
                    key: nextPageKey,
                    limit: pageSize,
                    count_total: !nextPageKey,
                    reverse: false
                })
            }).finish()
        )
        const data = await this.cosmosClient.queryClientGet(`/${protobufPackage}.Query/GroupsByAdmin`, requestData)
        const response = QueryGroupsByAdminResponse.decode(data)

        return {
            ...response,
            groups: response.groups.map(normalizeBackendGroup)
        }
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

    allGroupMembers = async (groupId: number): Promise<Member[]> => {
        const all: Member[] = []
        let res: QueryGroupMembersResponse
        let nextKey: Uint8Array

        do {
            res = await this.groupMembers(groupId, 10000, nextKey)
            all.push(...res.members.map( m => m.member ))
            nextKey = res.pagination.next_key
        } while (nextKey.toString())

        return all
    }

    groupMembers = async (groupId: number,
                          pageSize: number = DEFAULT_MEMBERS_PAGE_SIZE,
                          nextPageKey: Uint8Array | undefined = undefined): Promise<QueryGroupMembersResponse> => {
        // const res = await this.cosmosClient.lcdClientGet(
        //     `/cosmos/group/v1/group_members/${groupId}`
        // ) as QueryGroupMembersResponse

        const requestData = Uint8Array.from(
            QueryGroupMembersRequest.encode({
                group_id: groupId,
                pagination: PageRequest.fromPartial({
                    key: nextPageKey,
                    // offset: 0,
                    limit: pageSize,
                    count_total: !nextPageKey,
                    reverse: false
                })
            }).finish()
        )
        const data = await this.cosmosClient.queryClientGet(`/${protobufPackage}.Query/GroupMembers`, requestData)
        const res = QueryGroupMembersResponse.decode(data)

        return {...res,
            members: [...res.members.map( groupMember => {
                return {
                    ...groupMember,
                    member: {
                        ...groupMember.member,
                        added_at: new Date(groupMember.member.added_at)
                    }
                }})
            ]
        }
    }
}

function normalizeBackendGroup(g: GroupInfo): GroupInfo { // it's grpc - Long numbers are strings, so we convert them here
    return {
        ...g,
        id: Number(g.id),
        version: Number(g.version)
    }
}
