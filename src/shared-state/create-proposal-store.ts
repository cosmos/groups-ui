import { makeObservable, observable } from 'mobx';
import { Any } from '../generated/google/protobuf/any';
import {
    Exec,
    MsgExec,
    MsgVote,
    protobufPackage,
    MsgSubmitProposal as MsgCreateProposal
} from '../generated/cosmos/group/v1/tx';
import { TextProposal } from '../generated/gov/gov';
import { ParameterChangeProposal } from '../generated/params/params';
import { Group, toUint8Array } from './groups-store';
import { CosmosNodeService } from '../protocol/cosmos-node-service';
import { VoteOption } from '../generated/cosmos/group/v1/types';
import { Coin, coins } from '@cosmjs/proto-signing';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { MsgSubmitProposal } from '../generated/gov/tx';
import {GroupsService} from "../protocol/groups-service";

interface NewProposal {
    actions: Action[]
    name: string
    description: string
    // address: string
    // proposers: string[]
    // metadata: any;
    // msgs: Any[];
    // exec: Exec;
}

export enum ActionStateType {
    DELEGATE = 'DELEGATE',
    REDELEGATE = 'REDELEGATE',
    UNDELEGATE = 'UNDELEGATE',
    CLAIM_REWARD = 'CLAIM_REWARD',
}

export enum ActionType {
    STAKE = 'STAKE',
    TEXT = 'TEXT',
    SPEND = 'SPEND',
    PARAMETER_CHANGE = 'PARAMETER_CHANGE',
    CREATE_ACCOUNT = 'CREATE_ACCOUNT',
}

// export type StakeProposalType = ProposalType.STAKE_DELEGATE|ProposalType.STAKE_REDELEGATE|ProposalType.STAKE_UNDELEGATE|ProposalType.STAKE_CLAIM_REWARD

export type ActionData = StakeActionData | SpendActionData | TextActionData | ParameterChangeActionData

export interface StakeActionData {
    type: ActionStateType
    fromValidatorAddress: string
    toValidatorAddress: string
    validatorAddress: string
    coinDenom: string
    amount: number
}

export interface ParameterChangeActionData {
    module: string
    parameter: string
    value: string
}

export interface SpendActionData {
    fromValidatorAddress: string
    toValidatorAddress: string
    coinDenom: string
    amount: number
}

export interface TextActionData {
    text: string
}

interface Action {
    id: symbol
    data: Partial<ActionData>
}

enum ProposalTypeUrls {
    TextProposal = '/cosmos.gov.v1.TextProposal',
    ParameterChangeProposal = '/cosmos.params.v1.ParameterChangeProposal',
}

export class CreateProposalStore {
    @observable
    newProposal: NewProposal = {
        actions: [],
        name: '',
        description: ''
    }

    constructor() {
        makeObservable(this);
    }

    addAction = (type: ActionType) => {
        this.updateAction(Symbol(type), {})
    }

    // @action
    updateAction = (id: symbol, data: Partial<ActionData>) => {
        const action = this.newProposal.actions.find( action => action.id === id)

        if (action) {
            action.data = {...action.data, ...data}
        } else {
            this.newProposal.actions.push({
                id,
                data
            })
        }
    }

    createProposal = async (
        group: Group
    ): Promise<DeliverTxResponse | null> => {
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

        // TODO replace hardcode
        const exec = Exec.EXEC_TRY;

        //const allMembers = await GroupsService.instance.allGroupMembers(group.info.id)

        const msg: MsgCreateProposal = MsgCreateProposal.fromPartial({
            // TODO replace with fetching group policy address
            // this is group policy address hardcoded for testing
            address: 'regen1m73npu5jn89syq23568a44ymrj7za9qa7mxgh0',
            proposers: group.members.map((m) => m.address),
            messages: [mockMsgSubmitProposal],
            exec,
            metadata: toUint8Array(mockMetaData).toString(),
        });

        console.log('msg', msg);

        const msgAny = {
            typeUrl: `/${protobufPackage}.MsgCreateProposal`,
            value: msg,
        };

        const fee = {
            amount: coins(
                0,
                CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom
            ),
            gas: '2000000',
        };

        try {
            CosmosNodeService.instance.cosmosClient.registry.register(
                `/${protobufPackage}.MsgCreateProposal`,
                MsgCreateProposal
            )
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
            type_url: '/cosmos.gov.v1.MsgSubmitProposal',
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

    // copied from https://github.com/cosmos/composer/blob/475a98e03f3111aff03903f7d29e102c76875491/react/src/components/AdminModule/SubmitProposal/ParameterChangeProposal/ParamChange/ChangeForm.tsx
    parameters = {
        auth: [
            "MaxMemoCharacters",
            "TxSigLimit",
            "TxSizeCostPerByte",
            "SigVerifyCostED25519",
            "SigVerifyCostSecp256k1"
        ],
        bank: ["sendenabled"],
        gov: ["depositparams", "votingparams", "tallyparams"],
        staking: ["UnbondingTime", "MaxValidators", "KeyMaxEntries", "HistoricalEntries", "BondDenom"],
        slashing: [
            "SignedBlocksWindow",
            "MinSignedPerWindow",
            "DowntimeJailDuration",
            "SlashFractionDoubleSign",
            "SlashFractionDowntime"
        ],
        distribution: [
            "communitytax",
            "secretfoundationtax",
            "secretfoundationaddress",
            "baseproposerreward",
            "bonusproposerreward",
            "withdrawaddrenabled"
        ],
        crisis: ["ConstantFee"],
        mint: [
            "MintDenom",
            "InflationRateChange",
            "InflationMax",
            "InflationMin",
            "GoalBonded",
            "BlocksPerYear"
        ],
        evidence: ["MaxEvidenceAge"]
    }
}
