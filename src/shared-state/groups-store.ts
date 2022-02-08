import { action, makeObservable, observable, runInAction, toJS } from 'mobx'
import { GroupsService } from '../protocol/groups-service'
import { GroupAccountInfo, GroupInfo, GroupMember } from '../generated/regen/group/v1alpha1/types'
import { CosmosNodeService } from '../protocol/cosmos-node-service'
import { coins } from '@cosmjs/launchpad'
import {
    MsgCreateGroup,
    MsgUpdateGroupMembers,
    MsgUpdateGroupMetadata,
    protobufPackage
} from '../generated/regen/group/v1alpha1/tx'
import { cloneDeep, isEqual } from 'lodash'

// {"name": "bla", "description": "blabbl", "created": 1640599686655, "lastEdited": 1640599686655, "linkToForum": "", "other": "blabla"}
interface GroupMetadata {
    name: string
    description: string
    created: number
    lastEdited: number
    linkToForum: string
    other: string
}

export interface Group {
    info: Omit<GroupInfo, 'metadata'>
    members: GroupMember[]
    groupAccounts: GroupAccountInfo[]
    metadata: GroupMetadata
}

export class GroupsStore {
    @observable
    groups: Group[] = []

    originalEditedGroup: Group = null

    @observable
    editedGroup: Group = null

    constructor() {
        makeObservable(this)
    }

    fetchGroups = async (): Promise<Group[]> => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        const groupInfoItems = await GroupsService.instance.groupsByAdmin(key.bech32Address)

        const groups: Group[] = []

        for (const g of groupInfoItems) {
            const results = await Promise.all([
                GroupsService.instance.groupMembers(g.group_id),
                GroupsService.instance.groupAccounts(g.group_id)
            ])

            groups.push({
                info: g,
                members: results[0],
                groupAccounts: results[1],
                metadata: JSON.parse(atob(g.metadata as unknown as string))
            })
        }

        runInAction(() => {
            this.groups = groups
        })

        return groups
    }

    fetchEditedGroupById = async (id: number): Promise<Group | null> => {
        const groupInfo = await GroupsService.instance.groupById(id)
        if (groupInfo === null) {
            return null
        }

        const results = await Promise.all([
            GroupsService.instance.groupMembers(groupInfo.group_id),
            GroupsService.instance.groupAccounts(groupInfo.group_id)
        ])

        const editedGroup = {
            info: groupInfo,
            members: results[0],
            groupAccounts: results[1],
            metadata: JSON.parse(atob(groupInfo.metadata as unknown as string))
        }

        runInAction(() => {
            this.editedGroup = editedGroup
            this.originalEditedGroup = cloneDeep(editedGroup)
        })

        return editedGroup
    }

    @action
    updateEditedGroup = (newGroup: Group) => {
        this.editedGroup = newGroup
    }

    setDefaultNewGroup = async () => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        const me = key.bech32Address

        runInAction(() => {
            this.editedGroup = {
                info: {
                    group_id: -1,
                    admin: me,
                    version: 1,
                    total_weight: "1",
                },
                members: [{
                    group_id: -1,
                    member: {
                        address: me,
                        weight: "1",
                        metadata: toUint8Array(JSON.stringify({
                            name: "me",
                        }))
                    }
                }],
                groupAccounts: [],
                metadata: {
                    name: '',
                    description: '',
                    created: -1,
                    lastEdited: -1,
                    linkToForum: '',
                    other: ''
                }
            }
        })
    }

    @action
    resetEditedGroup = () => {
        this.editedGroup = null
    }

    createGroup = async () => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        const me = key.bech32Address

        const msg: MsgCreateGroup = {
            admin: this.editedGroup.info.admin,
            members: this.editedGroup.members.map(m => m.member),
            metadata: toUint8Array(JSON.stringify({
                ...this.editedGroup.metadata,
                created: Date.now(),
                lastEdited: Date.now(),
            }))
        }
        const msgAny = {
            typeUrl: `/${protobufPackage}.MsgCreateGroup`,
            value: msg
        }

        const fee = {
            amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
            gas: '2000000'
        }

        const broadcastRes = await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny], fee)
        console.log('broadcastRes', broadcastRes)
        return broadcastRes
    }

    saveGroup = async () => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        const me = key.bech32Address

        const results = []
        if (!isEqual(toJS(this.editedGroup.metadata), this.originalEditedGroup.metadata)) {
            const msg: MsgUpdateGroupMetadata = {
                admin: this.editedGroup.info.admin,
                group_id: this.editedGroup.info.group_id,
                metadata: toUint8Array(JSON.stringify({
                    ...this.editedGroup.metadata,
                    lastEdited: Date.now(),
                })),
            }
            const msgAny = {
                typeUrl: `/${protobufPackage}.MsgUpdateGroupMetadata`,
                value: msg
            }

            const fee = {
                amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
                gas: '2000000'
            }

            results.push(await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny], fee))
        }

        if (!isEqual(toJS(this.editedGroup.members), this.originalEditedGroup.members)) {
            const msg: MsgUpdateGroupMembers = {
                admin: this.editedGroup.info.admin,
                group_id: this.editedGroup.info.group_id,
                member_updates: this.editedGroup.members.map(m => ({
                    address: m.member.address,
                    weight: m.member.weight,
                    metadata: m.member.metadata
                })),
            }
            const msgAny = {
                typeUrl: `/${protobufPackage}.MsgUpdateGroupMembers`,
                value: msg
            }

            const fee = {
                amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
                gas: '2000000'
            }

            results.push(await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny], fee))
        }

        console.log(results)
        return results
    }
}

export function toUint8Array(str: string): Uint8Array {
    if (!('TextEncoder' in window))
        alert('Sorry, this browser does not support TextEncoder...')

    return new TextEncoder().encode(str)
}
