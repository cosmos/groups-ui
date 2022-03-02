import { getService, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { MsgCreateProposal, MsgExec, MsgVote } from '../generated/regen/group/v1alpha1/tx'
import { CosmosClient } from './cosmos-client'
import { Proposal, Vote } from '../generated/regen/group/v1alpha1/types'
import {
    QueryProposalResponse,
    QueryProposalsByGroupAccountResponse,
    QueryVoteByProposalVoterResponse,
    QueryVotesByProposalResponse
} from '../generated/regen/group/v1alpha1/query'

export enum GroupProposalsUrls {
    MsgCreateProposal = "/regen.group.v1alpha1.MsgCreateProposal",
    MsgVote = "/regen.group.v1alpha1.MsgVote",
    MsgExec = "/regen.group.v1alpha1.MsgExec"
}

@service
export class ProposalsService {
    static serviceName: string = ProposalsService.name

    static get instance(): ProposalsService {
        return getService<ProposalsService>(ProposalsService.serviceName)
    }

    cosmosClient: CosmosClient

    constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient
    }

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {
        this.cosmosClient.registry.register(
            GroupProposalsUrls.MsgCreateProposal,
            MsgCreateProposal
        )
        this.cosmosClient.registry.register(
            GroupProposalsUrls.MsgVote,
            MsgVote
        )
        this.cosmosClient.registry.register(
            GroupProposalsUrls.MsgExec,
            MsgExec
        )
    }

    proposalById = async (proposalId: number): Promise<Proposal> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/regen/group/v1alpha1/proposals/${proposalId}`
        ) as QueryProposalResponse
        return res.proposal
    }

    proposalsByGroupAccount = async (accountAddress: string): Promise<Proposal[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/regen/group/v1alpha1/group-accounts/${accountAddress}/proposals`
        ) as QueryProposalsByGroupAccountResponse

        // TODO check pagination field later
        console.log("proposals pagination", res.pagination)

        return res.proposals
    }

    voteByProposalVoter = async (proposalId: number, voterAddress: string): Promise<Vote> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/regen/group/v1alpha1/proposals/${proposalId}/votes/${voterAddress}`
        ) as QueryVoteByProposalVoterResponse
        return res.vote
    }

    votesByProposal = async (proposalId: number): Promise<Vote[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/regen/group/v1alpha1/proposals/${proposalId}/votes`
        ) as QueryVotesByProposalResponse
        return res.votes
    }

    votesByVoter = async (voterAddress: string): Promise<Vote[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/regen/group/v1alpha1/voters/${voterAddress}`
        ) as QueryVotesByProposalResponse
        return res.votes
    }
}
