import { makeObservable, observable, runInAction } from 'mobx'
import { GroupsService } from '../protocol/groups-service'
import { GroupAccountInfo, GroupInfo, GroupMember } from '../generated/regen/group/v1alpha1/types'
import { CosmosNodeService } from '../protocol/cosmos-node-service'
import { coins } from '@cosmjs/launchpad'
import { MsgUpdateGroupMetadata, protobufPackage } from '../generated/regen/group/v1alpha1/tx'

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
    info: GroupInfo
    members: GroupMember[]
    groupAccounts: GroupAccountInfo[]
    metadata: GroupMetadata
}

export class GroupsStore {
    @observable
    groups: Group[] = []

    constructor() {
        makeObservable(this)
    }

    fetchGroups = async () => {
        const groupInfoItems = await GroupsService.instance.groupsByAdmin('regen1c4tmw7cknjkppazxc4d36ueww56t6vvgg69pk8')

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
    }

    updateGroup = async () => {
        console.log('chaininfo', CosmosNodeService.instance.chainInfo)
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        console.log('key', key)

        const sender = key.bech32Address

        const msgDeleteAdminRequest: MsgUpdateGroupMetadata = {
            admin: 'regen1c4tmw7cknjkppazxc4d36ueww56t6vvgg69pk8',
            group_id: 1,
            metadata: toUint8Array(JSON.stringify({
                name: 'bla',
                description: 'blabbl',
                created: 1640599686655,
                lastEdited: Date.now(),
                linkToForum: '',
                other: 'blabla'
            }))
        }
        const msgAny = {
            typeUrl: `/${protobufPackage}.MsgUpdateGroupMetadata`,
            value: msgDeleteAdminRequest
        }

        const fee = {
            amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
            gas: '2000000'
        }

        const broadcastRes = await CosmosNodeService.instance.cosmosClient.signAndBroadcast(sender, [msgAny], fee)
    }
}

function toUint8Array(str: string): Uint8Array {
    if (!('TextEncoder' in window))
        alert('Sorry, this browser does not support TextEncoder...')

    return new TextEncoder().encode(str)
}
