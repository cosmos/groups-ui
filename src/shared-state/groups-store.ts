import { action, makeObservable, observable, runInAction, toJS } from 'mobx'
import { GroupsService } from '../protocol/groups-service'
import { CosmosNodeService } from '../protocol/cosmos-node-service'
import { coins } from '@cosmjs/launchpad'
import { cloneDeep, isEqual } from 'lodash'
import { DeliverTxResponse } from '@cosmjs/stargate/build/stargateclient'
import {
    GroupInfo,
    GroupMember,
    GroupPolicyInfo, Member,
    PercentageDecisionPolicy,
    ThresholdDecisionPolicy
} from '../generated/cosmos/group/v1/types'
import {
    MsgCreateGroup,
    MsgCreateGroupPolicy, MsgCreateGroupWithPolicy, MsgUpdateGroupAdmin,
    MsgUpdateGroupMembers,
    MsgUpdateGroupMetadata, MsgUpdateGroupPolicyAdmin, MsgUpdateGroupPolicyDecisionPolicy,
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
    quorum: string
    createdAt?: Date
}

export interface Group {
    info: Omit<GroupInfo, 'metadata'>
    members: readonly Member[]
    // groupAccounts: GroupAccountInfo[]
    policy?: GroupPolicy
    metadata: GroupMetadata
    admin: string
    // adminIsPolicy: boolean
}

export interface GroupPolicyBalance extends Coin {
    formattedAmount: string
    price?: number
    decimals: number
}

export interface GroupPolicyBalances {
    primary?: GroupPolicyBalance
    secondariesSummary?: string
    secondaries: readonly GroupPolicyBalance[]
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
        const groupInfoItems = await GroupsService.instance.allGroupsByAdmin(key.bech32Address)

        const groups: Group[] = []

        await Promise.all(groupInfoItems.map(g => {
            return (async () => {
                const [members, policies] = await Promise.all([
                    GroupsService.instance.allGroupMembers(g.id),
                    GroupsService.instance.groupPolicies(g.id)
                ])

                const policy = toGroupPolicy(policies);
                groups.push({
                    info: g,
                    members,
                    policy,
                    metadata: JSON.parse(atob(g.metadata as unknown as string)),
                    admin: policy && policy.admin === g.admin ? '' : g.admin,
                    // adminIsPolicy: policy && policy.admin === g.admin
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
            GroupsService.instance.allGroupMembers(groupInfo.id),
            GroupsService.instance.groupPolicies(groupInfo.id)
        ])
        const metadata = JSON.parse(atob(groupInfo.metadata as unknown as string)) // todo remove btoa

        const policy = toGroupPolicy(policies)
        return Object.freeze({
            info: groupInfo,
            members,
            policy,
            metadata, //: {...metadata, created: metadata.created * 100} // strange bug
            admin: policy && policy.address === groupInfo.admin ? '' : groupInfo.admin,
        })
    }

    /*fetchMembers = async (groupId: number): Promise<readonly GroupMember[]> => {
        return GroupsService.instance.groupMembers(groupId)
    }*/

    fetchGroupPolicyBalances = async (policyAddress: string) => {
        const chainInfor = CosmosNodeService.instance.chainInfo
        const balances = await BankService.instance.getAllBalances(policyAddress)
        const prices = await fetchCoinPrices(balances.map(b => b.denom))
        const balancesWithPrice = balances.map((coin) => {
            const decimals = 6 // fixme: where to get decimals for each coins?
            return {
                ...coin,
                formattedAmount: (Number(coin.amount) / 10 ** decimals).toString(),
                price: prices && prices[coin.denom]?.usd,
                decimals
            }
        })
        const primaryCoinDenom = chainInfor.feeCurrencies[0].coinDenom;
        const primaryBalance = balancesWithPrice.find(balance => balance.denom.toUpperCase() === primaryCoinDenom.toUpperCase())
        const secondaryBalances = balancesWithPrice.filter(balance => balance.denom.toUpperCase() !== primaryCoinDenom.toUpperCase())

        const totalPrice = secondaryBalances.reduce((sum, balance) => sum + balance.price, 0)
        const secondariesSummary = `${balances.length + 1} other tokens ($${totalPrice} USD)`

        const emptyBalance = { amount: '0', denom: primaryCoinDenom, price: 0, formattedAmount: '0', decimals: 0 };
        const groupBalances: GroupPolicyBalances = {
            primary: primaryBalance || emptyBalance,
            secondariesSummary,
            secondaries: secondaryBalances
        }
        return groupBalances;
    }

    fetchEditedGroupById = async (id: number): Promise<Group | null> => {
        const group = await this.fetchGroupById(id)

        runInAction(() => {
            this.editedGroup = group
            this.originalEditedGroup = cloneDeep(group)
        })

        return group
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
                    address: me,
                    weight: '1',
                    metadata: JSON.stringify({
                        name: 'me'
                    }),
                    added_at: new Date()
                }],
                policy: {
                    address: '',
                    admin: '',
                    timeoutInDays: 0,
                    quorum: "?",
                    threshold: 0
                },
                metadata: {
                    name: '',
                    description: '',
                    created: -1,
                    lastEdited: -1,
                    linkToForum: '',
                    other: ''
                },
                admin: ''
            }
        })
    }

    @action
    resetEditedGroup = () => {
        this.editedGroup = null
    }

    createGroup = async (): Promise<[number, DeliverTxResponse[]]> => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        const me = key.bech32Address

        /*const msg1: MsgCreateGroupPolicy = {
            admin: me,
            group_id: 1,
            metadata: btoa(JSON.stringify({
                ...this.editedGroup.metadata,
                created: Date.now(),
                lastEdited: Date.now()
            })),
            decision_policy: {
                type_url: '/cosmos.group.v1.PercentageDecisionPolicy',
                value: PercentageDecisionPolicy.encode({
                    percentage: (this.editedGroup.policy.threshold / 100).toString(),
                    windows: {
                        voting_period: {
                            seconds: this.editedGroup.policy.timeoutInDays * 24 * 360,
                            nanos: 0
                        },
                        min_execution_period: {
                            seconds: 1,
                            nanos: 0
                        }
                    }
                }).finish()
            }
        }
        const msgAny1 = {
            typeUrl: `/${protobufPackage}.MsgCreateGroupPolicy`,
            value: MsgCreateGroupPolicy.fromPartial(msg1)
        }
        const msg1: MsgCreateGroup = {
            admin: this.editedGroup.admin,
            members: this.editedGroup.members.map(m => m.member),
            metadata: btoa(JSON.stringify({
                ...this.editedGroup.metadata,
                created: Date.now(),
                lastEdited: Date.now()
            }))
        }
        const msgAny1 = {
            typeUrl: `/${protobufPackage}.MsgCreateGroup`,
            value: MsgCreateGroup.fromPartial(msg1)
        }*/

        const msg1: MsgCreateGroupWithPolicy = {
            admin: this.editedGroup.admin || me,
            members: this.editedGroup.members as Member[],
            group_metadata: btoa(JSON.stringify({ // todo remove btoa
                ...this.editedGroup.metadata,
                created: Date.now(),
                lastEdited: Date.now()
            })),
            group_policy_metadata: JSON.stringify({
                foo: 'bar'
            }),
            group_policy_as_admin: this.editedGroup.admin === '',
            decision_policy: {
                type_url: '/cosmos.group.v1.PercentageDecisionPolicy',
                value: PercentageDecisionPolicy.encode({
                    percentage: (this.editedGroup.policy.threshold / 100).toString(),
                    windows: {
                        voting_period: {
                            seconds: this.editedGroup.policy.timeoutInDays * 24 * 360,
                            nanos: 0
                        },
                        min_execution_period: {
                            seconds: 1,
                            nanos: 0
                        }
                    }
                }).finish()
            }
        }
        const msgAny1 = {
            typeUrl: `/${protobufPackage}.MsgCreateGroupWithPolicy`,
            value: MsgCreateGroupWithPolicy.fromPartial(msg1)
        }

        const fee1 = {
            amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
            gas: '2000000'
        }

        const results = []
        let createdGroupId

        try {
            const result1 = await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny1], fee1)
            results.push(result1)
            createdGroupId = Number(JSON.parse(result1.rawLog)[0].events.find(e => e.type === 'cosmos.group.v1.EventCreateGroup').attributes[0].value.replaceAll('"', ''))
        } catch (e) {
            console.warn(e)
            // fixme: How to react on errors like this?
            //  Error: Broadcasting transaction failed with code 9 (codespace: sdk). Log: fee payer address: cosmos1vekmuyzcufswtfkywkkgc9wkgypedn8wpvawn6 does not exist: unknown address
            if (e.message === 'Invalid string. Length must be a multiple of 4') {
                // fixme: with groupsByAdmin we are getting just first page of groups
                const groups = await GroupsService.instance.allGroupsByAdmin(me)
                createdGroupId = Math.max(...groups.map(g => Number(g.id)), 0)
            } else {
                // todo: show error
                throw e
            }
        }

        // const createdGroupId = 13 // TODO hardcode
        console.log('createdGroupId', createdGroupId)

        this.resetEditedGroup()

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
                })) // todo remove btoa
            }
            const msgAny = {
                typeUrl: `/${protobufPackage}.MsgUpdateGroupMetadata`,
                value: msg
            }

            const fee = {
                amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
                gas: '2000000'
            }

            try {
                results.push(await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny], fee))
            } catch (e) {
                console.warn(e)
            }
        }

        let newAdmin = this.editedGroup.admin

        if (!isEqual(newAdmin, this.originalEditedGroup.admin)) {
            // if (this.editedGroup.policy.threshold !== this.originalEditedGroup.policy.threshold)
            if (newAdmin === '') {
                // admin is policy
                newAdmin = this.originalEditedGroup.policy.address
            }
            const updateGroupAdminMsg: MsgUpdateGroupAdmin = {
                admin: this.originalEditedGroup.admin,
                new_admin: newAdmin,
                group_id: this.originalEditedGroup.info.id
            }
            const updateGroupAdminMsgWrapped = {
                typeUrl: `/${protobufPackage}.MsgUpdateGroupAdmin`,
                value: updateGroupAdminMsg
            }
            const updateGroupPolicyAdminMsg: MsgUpdateGroupPolicyAdmin = {
                admin: this.originalEditedGroup.policy.admin,
                new_admin: newAdmin,
                address: this.originalEditedGroup.policy.address
            }
            const updateGroupPolicyAdminMsgWrapped = {
                typeUrl: `/${protobufPackage}.MsgUpdateGroupPolicyAdmin`,
                value: updateGroupPolicyAdminMsg
            }

            try {
                results.push(await CosmosNodeService.instance.cosmosClient.signAndBroadcast(
                    me,
                    [updateGroupAdminMsgWrapped, updateGroupPolicyAdminMsgWrapped],
                    getFee()
                ))
            } catch (e) {
                console.warn(e)
            }
        }

        if (!isEqual(toJS(this.editedGroup.policy), this.originalEditedGroup.policy)) {
            // if (this.editedGroup.policy.threshold !== this.originalEditedGroup.policy.threshold)
            const msg: MsgUpdateGroupPolicyDecisionPolicy = {
                admin: this.editedGroup.policy.admin,
                address: this.editedGroup.policy.address,
                decision_policy: {
                    type_url: '/cosmos.group.v1.PercentageDecisionPolicy',
                    value: PercentageDecisionPolicy.encode({
                        percentage: (this.editedGroup.policy.threshold / 100).toString(),
                        windows: {
                            voting_period: {
                                seconds: this.editedGroup.policy.timeoutInDays * 24 * 360,
                                nanos: 0
                            },
                            min_execution_period: {
                                seconds: 1,
                                nanos: 0
                            }
                        }
                    }).finish()
                }
            }
            const msgAny = {
                typeUrl: `/${protobufPackage}.MsgUpdateGroupPolicyDecisionPolicy`,
                value: msg
            }

            const fee = {
                amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
                gas: '2000000'
            }

            try {
                results.push(await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny], fee))
            } catch (e) {
                console.warn(e)
            }
        }

        if (!isEqual(toJS(this.editedGroup.members), this.originalEditedGroup.members)) {
            const msg: MsgUpdateGroupMembers = {
                admin: this.editedGroup.info.admin,
                group_id: this.editedGroup.info.id,
                member_updates: this.editedGroup.members.map(m => ({ // TODO to delete member one should set its weight to 0
                    address: m.address,
                    weight: m.weight,
                    added_at: m.added_at,
                    metadata: m.metadata
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
            try {
                results.push(await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny], fee))
            } catch (e) {
                console.warn(e)
            }
        }

        console.log(results)
        return results
    }
}

function getFee() {
    return {
        amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
        gas: '2000000'
    };
}

export function

toUint8Array(str: string): Uint8Array {
    if (!('TextEncoder' in window))
        alert('Sorry, this browser does not support TextEncoder...')

    return new TextEncoder().encode(str)
}

function parsePeriod(period: string) {
    if (period.endsWith("s")) {
        return Number(period.replace("s", ""))
    } else if (period.endsWith("h")) {
        return Number(period.replace("h", "")) * 60 * 60
    } else if (period.endsWith("d")) {
        return Number(period.replace("d", "")) * 24 * 60 * 60
    }
    return 0
}

function toGroupPolicy(policyInfos: GroupPolicyInfo[]): GroupPolicy | undefined {
    if (policyInfos && policyInfos.length > 0) {
        const info = policyInfos[0]
        // fixme: remove as unknown as
        const decisionPolicy = info.decision_policy as unknown as {
            percentage: number
            windows: {
                voting_period: string,
                min_execution_period: string
            }
        }
        return {
            address: info.address,
            admin: info.admin,
            createdAt: info.created_at && new Date(info.created_at),
            threshold: Number(decisionPolicy.percentage) * 100,
            quorum: "?", // fixme
            timeoutInDays: parsePeriod(decisionPolicy.windows.voting_period) / (24 * 360)
        }
    }
}
