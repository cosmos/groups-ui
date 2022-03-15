import { action, makeObservable, observable } from 'mobx';
import { Any } from '../generated/google/protobuf/any';
import {
    Exec,
    MsgExec,
    MsgVote,
    protobufPackage,
    MsgSubmitProposal as MsgCreateProposal,
} from '../generated/cosmos/group/v1beta1/tx';
import { TextProposal } from '../generated/gov/gov';
import { ParameterChangeProposal } from '../generated/params/params';
import { Group, toUint8Array } from './groups-store';
import { CosmosNodeService } from '../protocol/cosmos-node-service';
import { VoteOption } from '../generated/cosmos/group/v1beta1/types';
import { GroupProposalsUrls } from '../protocol/proposals-service';
import { Coin, coins } from '@cosmjs/proto-signing';
import { BroadcastTxResponse } from '@cosmjs/stargate';
import { MsgSubmitProposal } from '../generated/gov/tx';

interface NewProposal {
    // address: string
    // proposers: string[]
    metadata: any;
    msgs: Any[];
    exec: Exec;
}

enum ProposalTypeUrls {
    TextProposal = '/cosmos.gov.v1beta1.TextProposal',
    ParameterChangeProposal = '/cosmos.params.v1beta1.ParameterChangeProposal',
}

export class ProposalsStore {
    @observable
    newProposal: NewProposal = null;

    constructor() {
        makeObservable(this);
    }

    createProposal = async (
        group: Group
    ): Promise<BroadcastTxResponse | null> => {
        // TODO remove mocks
        const mockMetaData = 'testing abc';
        const mockCoins: Coin[] = coins(
            5,
            CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom
        );
        const mockTextProposal = this.encodeTextProposal({
            title: 'Testing',
            description: 'Test desc',
        });

        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(
            CosmosNodeService.instance.chainInfo.chainId
        );
        const me = key.bech32Address;

        // TODO remove these mocks too
        const mockMsgSubmitProposal = this.createMsgSubmitProposal(
            mockTextProposal,
            me,
            mockCoins
        );
        const mockMsgs = [mockMsgSubmitProposal];

        // TODO replace hardcode
        const exec = Exec.EXEC_TRY;

        const msg: MsgCreateProposal = MsgCreateProposal.fromPartial({
            // TODO replace with fetching group policy address
            // this is group policy address hardcoded for testing
            address: 'regen1m73npu5jn89syq23568a44ymrj7za9qa7mxgh0',
            proposers: group.members.map((m) => m.member.address),
            messages: mockMsgs,
            exec,
            metadata: toUint8Array(mockMetaData).toString(),
        });

        console.log('msg', msg);

        const msgAny = {
            typeUrl: GroupProposalsUrls.MsgCreateProposal,
            value: msg,
        };

        const fee = {
            amount: coins(
                0,
                CosmosNodeService.instance.chainInfo.stakeCurrency
                    .coinMinimalDenom
            ),
            gas: '2000000',
        };

        try {
            const res =
                await CosmosNodeService.instance.cosmosClient.signAndBroadcast(
                    me,
                    [msgAny],
                    fee
                );

            console.log('proposal creation', res);
            return res;
        } catch (error) {
            console.log('error creating proposal', error);
        }
    };

    @action
    addProposalAction = (action: Any) => {
        this.newProposal.msgs.push(action);
    };

    // Later may add choice and metadata to store, if needed for multiple components
    voteProposal = async (
        proposalId: number,
        voteOption: VoteOption,
        metadata: string
    ) => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(
            CosmosNodeService.instance.chainInfo.chainId
        );
        const me = key.bech32Address;

        // TODO replace hardcode
        const exec = Exec.EXEC_TRY;

        const msg: MsgVote = {
            proposal_id: proposalId,
            option: voteOption,
            voter: me,
            metadata: metadata,
            exec,
        };

        const msgAny = {
            typeUrl: `/${protobufPackage}.MsgVote`,
            value: MsgVote.encode(msg).finish(),
        };

        const fee = {
            amount: coins(
                0,
                CosmosNodeService.instance.chainInfo.stakeCurrency
                    .coinMinimalDenom
            ),
            gas: '2000000',
        };

        try {
            const res =
                await CosmosNodeService.instance.cosmosClient.signAndBroadcast(
                    me,
                    [msgAny],
                    fee
                );

            console.log('proposal vote', res);
            return res;
        } catch (error) {
            console.log('error voting proposal', error);
        }
    };

    executeProposal = async (proposalId: number) => {
        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(
            CosmosNodeService.instance.chainInfo.chainId
        );
        const me = key.bech32Address;

        const msg: MsgExec = {
            proposal_id: proposalId,
            signer: me,
        };

        const msgAny = {
            typeUrl: `/${protobufPackage}.MsgExec`,
            value: MsgExec.encode(msg).finish(),
        };

        const fee = {
            amount: coins(
                0,
                CosmosNodeService.instance.chainInfo.stakeCurrency
                    .coinMinimalDenom
            ),
            gas: '2000000',
        };

        try {
            const res =
                await CosmosNodeService.instance.cosmosClient.signAndBroadcast(
                    me,
                    [msgAny],
                    fee
                );

            console.log('proposal exec', res);
            return res;
        } catch (error) {
            console.log('error exec proposal', error);
        }
    };

    createMsgSubmitProposal = (
        anyProposal: Any,
        proposer: string,
        deposit: Coin[]
    ): Any => {
        const msg = {
            type_url: '/cosmos.gov.v1beta1.MsgSubmitProposal',
            value: MsgSubmitProposal.encode({
                content: anyProposal,
                proposer,
                initialDeposit: deposit,
            }).finish(),
        };
        return msg;
    };

    // for usage in components, encode before adding to proposal state
    encodeTextProposal = (proposalValue: TextProposal): Any => {
        const encodedProposal = {
            type_url: ProposalTypeUrls.TextProposal,
            value: TextProposal.encode(proposalValue).finish(),
        };
        return encodedProposal;
    };

    encodeParameterChangeProposal = (
        proposalValue: ParameterChangeProposal
    ): Any => {
        const encodedProposal = {
            type_url: ProposalTypeUrls.ParameterChangeProposal,
            value: ParameterChangeProposal.encode(proposalValue).finish(),
        };
        return encodedProposal;
    };
}
