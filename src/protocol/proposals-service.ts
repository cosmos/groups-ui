import { getService, Service, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { CosmosClient } from './cosmos-client'
import { Proposal, Vote } from '../generated/cosmos/group/v1/types'
import {
    QueryGroupsByAdminRequest, QueryGroupsByAdminResponse,
    QueryProposalResponse, QueryProposalsByGroupPolicyRequest,
    QueryProposalsByGroupPolicyResponse,
    QueryVoteByProposalVoterResponse,
    QueryVotesByProposalResponse
} from '../generated/cosmos/group/v1/query'
import {
    MsgExec,
    MsgSubmitProposal,
    MsgVote,
    protobufPackage
} from '../generated/cosmos/group/v1/tx'
import {PageRequest} from "../generated/cosmos/base/query/v1beta1/pagination";

@service
export class ProposalsService implements Service {
    static serviceName: string = "ProposalsService"

    static get instance(): ProposalsService {
        return getService<ProposalsService>(ProposalsService.serviceName)
    }

    cosmosClient: CosmosClient

    constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient
    }

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgSubmitProposal`, MsgSubmitProposal)
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgVote`, MsgVote)
        this.cosmosClient.registry.register(`/${protobufPackage}.MsgExec`, MsgExec)
    }

    proposalById = async (proposalId: number): Promise<Proposal> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/group/v1/proposal/${proposalId}`
        ) as QueryProposalResponse
        return res.proposal
    }

    // fixme: implement paging
    allProposalsByGroupPolicy = async (policyAddress: string): Promise<Proposal[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/group/v1/proposals_by_group_policy/${policyAddress}`
        ) as QueryProposalsByGroupPolicyResponse

        // TODO check pagination field later
        console.log("proposals pagination", res.pagination)

        return res.proposals

        /*const requestData = Uint8Array.from(
            QueryProposalsByGroupPolicyRequest.encode({
                address: policyAddress,
                pagination: PageRequest.fromPartial({
                    offset: 0,
                    limit: 50,  // TODO hardcoded pagination
                    count_total: false,
                    reverse: false
                })
            }).finish()
        )
        const data = await this.cosmosClient.queryClientGet(`/${protobufPackage}.Query/ProposalsByGroupPolicy`, requestData)
        const response = QueryProposalsByGroupPolicyResponse.decode(data)

        return response.proposals*/
    }

    voteByProposalVoter = async (proposalId: number, voterAddress: string): Promise<Vote> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/group/v1/vote_by_proposal_voter/${proposalId}/${voterAddress}`
        ) as QueryVoteByProposalVoterResponse
        return res.vote
    }

    votesByProposal = async (proposalId: number): Promise<Vote[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/group/v1/votes_by_proposal/${proposalId}`
        ) as QueryVotesByProposalResponse
        return res.votes
    }

    votesByVoter = async (voterAddress: string): Promise<Vote[]> => {
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/group/v1/votes_by_voter/${voterAddress}`
        ) as QueryVotesByProposalResponse
        return res.votes
    }
}
