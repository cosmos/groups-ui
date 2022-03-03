import { action, makeObservable, observable } from 'mobx'
import { Any } from '../generated/google/protobuf/any'
import { Exec, MsgCreateProposal, MsgExec, MsgVote } from '../generated/regen/group/v1alpha1/tx'
import { TextProposal } from '../generated/gov/gov'
import { ParameterChangeProposal } from '../generated/params/params'
import { Group, toUint8Array } from './groups-store'
import { CosmosNodeService } from '../protocol/cosmos-node-service'
import { GroupProposalsUrls } from '../protocol/proposals-service'
import { coins } from '@cosmjs/proto-signing'
import { BroadcastTxResponse } from '@cosmjs/stargate'
import { Choice } from '../generated/regen/group/v1alpha1/types'

interface NewProposal {
    // address: string
    // proposers: string[]
    metadata: any
    msgs: Any[]
    exec: Exec
}

enum ProposalTypeUrls {
    TextProposal = "/cosmos.gov.v1beta1.TextProposal",
    ParameterChangeProposal = "/cosmos.params.v1beta1.ParameterChangeProposal"
}

export class ProposalsStore {
    @observable
    newProposal: NewProposal = null

    constructor() {
        makeObservable(this)
    }

    createProposal = async (group: Group): Promise<BroadcastTxResponse| null> => {
        const mockMsgs = [this.encodeTextProposal({
            title: "Testing",
            description: "Test desc"
        })]
        const mockMetaData = "testing abc"

        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        const me = key.bech32Address

        // TODO replace hardcode
        const exec = Exec.EXEC_TRY

        const msg: MsgCreateProposal = {
            // TODO replace with fetching group policy address
            // this is group policy address hardcoded for testing
            address: "regen1m73npu5jn89syq23568a44ymrj7za9qa7mxgh0",
            proposers: group.members.map((m) => m.member.address),
            msgs: mockMsgs,
            exec,
            metadata: toUint8Array(mockMetaData)
        }

        console.log("msg", msg)

        const msgAny = {
            typeUrl: GroupProposalsUrls.MsgCreateProposal,
            value: MsgCreateProposal.encode(msg).finish()
        }

        const fee = {
            amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
            gas: '2000000'
        }

        try {
            const res = await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny], fee)

            console.log("proposal creation", res)
            return res
        } catch (error) {
            console.log("error creating proposal", error)
        }
    }

    @action
    addProposalAction = (action: Any) => {
        this.newProposal.msgs.push(action)
    }

    // Later may add choice and metadata to store, if needed for multiple components
    voteProposal = async (proposalId: number, choice: Choice, metadata: any) => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        const me = key.bech32Address

        // TODO replace hardcode
        const exec = Exec.EXEC_TRY

        const msg: MsgVote = {
            proposal_id: proposalId,
            choice,
            voter: me,
            metadata: toUint8Array(metadata),
            exec
        }

        const msgAny = {
            typeUrl: GroupProposalsUrls.MsgVote,
            value: MsgVote.encode(msg).finish()
        }

        const fee = {
            amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
            gas: '2000000'
        }

        try {
            const res = await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny], fee)

            console.log("proposal vote", res)
            return res
        } catch (error) {
            console.log("error voting proposal", error)
        }
    }

    executeProposal = async (proposalId: number) => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
        const me = key.bech32Address

        const msg: MsgExec = {
            proposal_id: proposalId,
            signer: me
        }

        const msgAny = {
            typeUrl: GroupProposalsUrls.MsgExec,
            value: MsgExec.encode(msg).finish()
        }

        const fee = {
            amount: coins(0, CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom),
            gas: '2000000'
        }

        try {
            const res = await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny], fee)

            console.log("proposal exec", res)
            return res
        } catch (error) {
            console.log("error exec proposal", error)
        }
    }

    // for usage in components, encode before adding to proposal state
    encodeTextProposal = (proposalValue: TextProposal): Any => {
        const encodedProposal = {
            type_url: ProposalTypeUrls.TextProposal,
            value: TextProposal.encode(proposalValue).finish()
        }
        return encodedProposal
    }

    encodeParameterChangeProposal = (proposalValue: ParameterChangeProposal): Any => {
        const encodedProposal = {
            type_url: ProposalTypeUrls.ParameterChangeProposal,
            value: ParameterChangeProposal.encode(proposalValue).finish()
        }
        return encodedProposal
    }
}
