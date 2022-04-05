import { action, makeObservable, observable, runInAction, toJS } from 'mobx'
import { GroupsService } from '../protocol/groups-service'
import { CosmosNodeService } from '../protocol/cosmos-node-service'
import { coins } from '@cosmjs/launchpad'
import { cloneDeep, isEqual } from 'lodash'
import { BroadcastTxResponse } from '@cosmjs/stargate/build/stargateclient'
import {
    GroupInfo,
    GroupMember,
    GroupPolicyInfo,
    PercentageDecisionPolicy,
    ThresholdDecisionPolicy
} from '../generated/cosmos/group/v1/types'
import {
    MsgCreateGroup,
    MsgCreateGroupPolicy,
    MsgUpdateGroupMembers,
    MsgUpdateGroupMetadata,
    protobufPackage
} from '../generated/cosmos/group/v1/tx'
import {Coin} from "../generated/cosmos/base/v1beta1/coin";
import {BankService} from "../protocol/bank-service";
import {fetchCoinPrices} from "../utils";

// {"name": "bla", "description": "blabbl", "created": 1640599686655, "lastEdited": 1640599686655, "linkToForum": "", "other": "blabla"}
interface GroupMetadata {
    name: string
    description: string
    created: number
    lastEdited: number
    linkToForum: string
    other: string
}

interface GroupPolicy {
    address: string
    admin: string
    threshold: number // percentage [0..100]
    timeoutInDays: number
}

export interface Group {
    info: Omit<GroupInfo, 'metadata'>
    members: readonly GroupMember[]
    // groupAccounts: GroupAccountInfo[]
    policy?: GroupPolicy
    metadata: GroupMetadata
    balances?: GroupBalances
}

export interface GroupBalance extends Coin {
    formattedAmount: string
    price?: number
    decimals: number
}

export interface GroupBalances {
    summary: string
    balances: readonly GroupBalance[]
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

        await Promise.all(groupInfoItems.map(g => {
            return (async () => {
                const [members, policies] = await Promise.all([
                    GroupsService.instance.groupMembers(g.id),
                    GroupsService.instance.groupPolicies(g.id)
                ])

                groups.push({
                    info: g,
                    members,
                    policy: toGroupPolicy(policies),
                    metadata: JSON.parse(atob(g.metadata as unknown as string))
                })
            })()
        }))

        runInAction(() => {
            this.groups = groups
        })

        return groups
    }

    fetchGroupById = async (id: number): Promise<Group | null> => {
        const groupInfo = await GroupsService.instance.groupById(id)
        if (groupInfo === null) {
            return null
        }

        const [members, policies] = await Promise.all([
            GroupsService.instance.groupMembers(groupInfo.id),
            GroupsService.instance.groupPolicies(groupInfo.id)
        ])
        const policy = toGroupPolicy(policies)
        const balances = await BankService.instance.getAllBalances(policy.address)
        const prices = await fetchCoinPrices(balances.map(b => b.denom))
        const balancesWithPrice = balances.map((coin) => {
            const decimals = 6 // fixme: where to get decimals for each coins?
            return {
                ...coin,
                formattedAmount: (Number(coin.amount) / 10**decimals).toString(),
                price: prices[coin.denom]?.usd,
                decimals
            }
        })

        const totalPrice = balancesWithPrice.reduce((sum, balance) => sum + balance.price, 0)
        const summary = `${balances.length + 1} other tokens ($${totalPrice} USD)`

        return Object.freeze({
            info: groupInfo,
            members,
            policy,
            balances: {
                summary,
                balances: balancesWithPrice
            },
            metadata: JSON.parse(atob(groupInfo.metadata as unknown as string))
        })
    }

    fetchEditedGroupById = async (id: number): Promise<Group | null> => {
        const groupInfo = await GroupsService.instance.groupById(id)
        if (groupInfo === null) {
            return null
        }

        const [members, policies] = await Promise.all([
            GroupsService.instance.groupMembers(groupInfo.id),
            GroupsService.instance.groupPolicies(groupInfo.id)
        ])

        const editedGroup = {
            info: groupInfo,
            members: members,
            policy: toGroupPolicy(policies),
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
                    id: -1,
                    admin: me,
                    version: 1,
                    total_weight: '1',
                    created_at: new Date()
                },
                members: [{
                    group_id: -1,
                    member: {
                        address: me,
                        weight: '1',
                        metadata: JSON.stringify({
                            name: 'me'
                        }),
                        added_at: new Date()
                    }
                }],
                policy: {
                    address: '',
                    admin: '',
                    timeoutInDays: 0,
                    threshold: 0
                },
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

    createGroup = async (): Promise<[number, BroadcastTxResponse[]]> => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        const me = key.bech32Address

        const msg1: MsgCreateGroup = {
            admin: this.editedGroup.info.admin,
            members: this.editedGroup.members.map(m => m.member),
            metadata: btoa(JSON.stringify({
                ...this.editedGroup.metadata,
                created: Date.now(),
                lastEdited: Date.now()
            }))
        }
        const msgAny1 = {
            typeUrl: `/${protobufPackage}.MsgCreateGroup`,
            value: msg1
        }

        const fee1 = {
            amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
            gas: '2000000'
        }

        const results = []

        const result1 = await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny1], fee1)
        results.push(result1)

        const createdGroupId = Number(JSON.parse(result1.rawLog)[0].events.find(e => e.type === 'cosmos.group.v1.EventCreateGroup').attributes[0].value.replaceAll('"', ''))

        // const createdGroupId = 13 // TODO hardcode
        console.log('createdGroupId', createdGroupId)

        const msg2: MsgCreateGroupPolicy = {
            admin: this.editedGroup.info.admin,
            group_id: createdGroupId,
            // metadata: toUint8Array(JSON.stringify({
            //     foo: 'bar'
            // })),
            metadata: JSON.stringify({
                foo: 'bar'
            }),
            decision_policy: {
                type_url: '/cosmos.group.v1.ThresholdDecisionPolicy',
                value: toUint8Array(
                    JSON.stringify({
                        // "@type": "/regen.group.v1alpha1.ThresholdDecisionPolicy",
                        'threshold': '1',
                        'timeout': '1s'
                    })
                )
            }
        }

        const msgAny2 = {
            typeUrl: `/${protobufPackage}.MsgCreateGroupPolicy`,
            value: MsgCreateGroupPolicy.encode({
                admin: this.editedGroup.info.admin,
                group_id: createdGroupId,
                // metadata: toUint8Array(JSON.stringify({
                //     foo: 'bar'
                // })),
                metadata: JSON.stringify({
                    foo: 'bar'
                }),
                decision_policy: {
                    type_url: '/cosmos.group.v1.ThresholdDecisionPolicy',
                    value: PercentageDecisionPolicy.encode(
                        {
                            percentage: '51',
                            windows: {
                                voting_period: {
                                    seconds: 1,
                                    nanos: 0
                                },
                                min_execution_period: {
                                    seconds: 1,
                                    nanos: 0
                                }
                            }
                        }
                    ).finish()
                }
            }).finish()
        }

        console.log('msgAny2', msgAny2)

        const fee2 = {
            amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
            gas: '2000000'
        }

        results.push(await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny2], fee2))

        console.log('results', results)
        return [createdGroupId, results]
    }

    saveGroup = async () => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        const me = key.bech32Address

        const results = []
        if (!isEqual(toJS(this.editedGroup.metadata), this.originalEditedGroup.metadata)) {
            const msg: MsgUpdateGroupMetadata = {
                admin: this.editedGroup.info.admin,
                group_id: this.editedGroup.info.id,
                metadata: btoa(JSON.stringify({
                    ...this.editedGroup.metadata,
                    lastEdited: Date.now()
                }))
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
                group_id: this.editedGroup.info.id,
                member_updates: this.editedGroup.members.map(m => ({ // TODO to delete member one should set its weight to 0
                    address: m.member.address,
                    weight: m.member.weight,
                    added_at: m.member.added_at,
                    metadata: m.member.metadata
                }))
            }
            const msgAny = {
                typeUrl: `/${protobufPackage}.MsgUpdateGroupMembers`,
                value: msg
            }

            console.log('msgAny', msgAny)

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

export function

toUint8Array(str: string): Uint8Array {
    if (!('TextEncoder' in window))
        alert('Sorry, this browser does not support TextEncoder...')

    return new TextEncoder().encode(str)
}

function toGroupPolicy(policyInfos: GroupPolicyInfo[]): GroupPolicy | undefined {
    if (policyInfos && policyInfos.length > 0) {
        const info = policyInfos[0]
        // fixme: remove as unknown as
        const decisionPolicy = info.decision_policy as unknown as {
            percentage: string
            windows: {
                voting_period: string,
                min_execution_period: string
            }
        }
        return {
            address: info.address,
            admin: info.admin,
            threshold: Number(decisionPolicy.percentage) * 100,
            timeoutInDays: 1 // todo
        }
    }
}
