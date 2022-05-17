import { ProposalsService } from '../protocol/proposals-service'
import { Proposal, Vote, VoteOption } from '../generated/cosmos/group/v1/types'
import { CosmosNodeService } from '../protocol/cosmos-node-service'
import { Exec, MsgExec, MsgVote, protobufPackage } from '../generated/cosmos/group/v1/tx'
import { coins } from '@cosmjs/proto-signing'
import { makeObservable } from 'mobx'

export class ProposalsStore {
    // With constructor we have an error:
    // Uncaught Error: [MobX] No annotations were passed to makeObservable, but no decorated members have been found either
    // constructor() {
    //     makeObservable(this)
    // }

    fetchProposalById = async (id: number): Promise<Proposal> => {
        return await ProposalsService.instance.proposalById(id)
    }

    fetchProposals = async (policyAddress: string): Promise<readonly Proposal[]> => {
        const all = await ProposalsService.instance.allProposalsByGroupPolicy(policyAddress)
        return Object.freeze(all)
    }

    fetchVotes = async (proposeId: number): Promise<readonly Vote[]> => {
        const all = await ProposalsService.instance.votesByProposal(proposeId)
        return Object.freeze(all)
    }

    // Later may add choice and metadata to store, if needed for multiple components
    voteProposal = async (
        proposalId: number,
        voteOption: VoteOption,
        metadata: string
    ) => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(
            CosmosNodeService.instance.chainInfo.chainId
        )
        const me = key.bech32Address

        // TODO replace hardcode
        const exec = Exec.EXEC_TRY

        const msg: MsgVote = {
            proposal_id: proposalId,
            option: voteOption,
            voter: me,
            metadata: metadata,
            exec
        }

        const msgAny = {
            typeUrl: `/${protobufPackage}.MsgVote`,
            value: MsgVote.encode(msg).finish()
        }

        const fee = {
            amount: coins(
                0,
                CosmosNodeService.instance.chainInfo.stakeCurrency
                    .coinMinimalDenom
            ),
            gas: '2000000'
        }

        try {
            const res =
                await CosmosNodeService.instance.cosmosClient.signAndBroadcast(
                    me,
                    [msgAny],
                    fee
                )

            console.log('proposal vote', res)
            return res
        } catch (error) {
            console.log('error voting proposal', error)
        }
    }

    executeProposal = async (proposalId: number) => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(
            CosmosNodeService.instance.chainInfo.chainId
        )
        const me = key.bech32Address

        const msg: MsgExec = {
            proposal_id: proposalId,
            signer: me
        }

        const msgAny = {
            typeUrl: `/${protobufPackage}.MsgExec`,
            value: MsgExec.encode(msg).finish()
        }

        const fee = {
            amount: coins(
                0,
                CosmosNodeService.instance.chainInfo.stakeCurrency
                    .coinMinimalDenom
            ),
            gas: '2000000'
        }

        try {
            const res =
                await CosmosNodeService.instance.cosmosClient.signAndBroadcast(
                    me,
                    [msgAny],
                    fee
                )

            console.log('proposal exec', res)
            return res
        } catch (error) {
            console.log('error exec proposal', error)
        }
    }
}
