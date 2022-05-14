import { makeObservable, observable } from 'mobx';
import { Any } from '../generated/google/protobuf/any';
import {
    Exec,
    MsgExec,
    MsgVote,
    protobufPackage as groupProtobufPackage,
    MsgSubmitProposal
} from '../generated/cosmos/group/v1/tx';
import {
    MsgBeginRedelegate,
    MsgDelegate, MsgUndelegate,
    protobufPackage as stakingProtobufPackage
} from '../generated/cosmos/staking/v1beta1/tx';
import {protobufPackage as distributionProtobufPackage} from '../generated/cosmos/distribution/v1beta1/tx';
import {protobufPackage as bankProtobufPackage} from '../generated/cosmos/bank/v1beta1/tx';
import { ParameterChangeProposal } from '../generated/params/params';
import { Group, toUint8Array } from './groups-store';
import { CosmosNodeService } from '../protocol/cosmos-node-service';
import { VoteOption } from '../generated/cosmos/group/v1/types';
import { Coin, coins } from '@cosmjs/proto-signing';
import {ProposalsService} from "../protocol/proposals-service";
import {MsgWithdrawDelegatorReward} from "../generated/cosmos/distribution/v1beta1/tx";
import {MsgSend} from "../generated/cosmos/bank/v1beta1/tx";
import {ValidatorsService} from "../protocol/validators-service";

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

export type ActionData = RedelegateActionData | DelegateActionData | SpendActionData | TextActionData | ParameterChangeActionData

export interface UndelegateActionData {
    type: ActionStateType
    validatorAddress: string
    coinDenom: string
    amount: number
}

export interface DelegateActionData {
    type: ActionStateType
    validatorAddress: string
    coinDenom: string
    amount: number
}

export interface RedelegateActionData {
    type: ActionStateType
    fromValidatorAddress: string
    toValidatorAddress: string
    coinDenom: string
    amount: number
}

export interface ClaimRewardActionData {
    type: ActionStateType
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
    TextProposal = '/cosmos.gov.v1beta1.TextProposal',
    ParameterChangeProposal = '/cosmos.params.v1.ParameterChangeProposal',
}

async function createClaimRewardProposalMsgs(groupPolicyAddress) {
    const allValidators = await ValidatorsService.instance.allValidators()

    return allValidators.map( validator => {
        let message: MsgWithdrawDelegatorReward = {
            validator_address: validator.operator_address,
            delegator_address: groupPolicyAddress
        }
        return {
            type_url: `/${distributionProtobufPackage}.MsgWithdrawDelegatorReward`,
            value: MsgWithdrawDelegatorReward.encode(message).finish()
        }
    })
}

function createSpendProposalMsg(data: SpendActionData, groupPolicyAddress) {
    let message: MsgSend = {
        from_address: groupPolicyAddress,
        to_address: data.toValidatorAddress,
        amount: [{
            amount: data.amount.toString(),
            denom: CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom
        }]
    }
    // console.log(message)
    return {
        type_url: `/${bankProtobufPackage}.MsgSend`,
        value: MsgSend.encode(message).finish()
    }
}

function createDelegateProposalMsg(data: DelegateActionData, groupPolicyAddress) {
    console.assert(data.type === ActionStateType.DELEGATE)

    let message: MsgDelegate = {
        validator_address: data.validatorAddress,
        delegator_address: groupPolicyAddress,
        amount: {
            amount: data.amount.toString(),
            denom: CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom
        }
    }
    // console.log(message)
    return {
        type_url: `/${stakingProtobufPackage}.MsgDelegate`,
        value: MsgDelegate.encode(message).finish()
    }
}

function createUndelegateProposalMsg(data: UndelegateActionData, groupPolicyAddress) {
    console.assert(data.type === ActionStateType.UNDELEGATE)

    let message: MsgUndelegate = {
        validator_address: data.validatorAddress,
        delegator_address: groupPolicyAddress,
        amount: {
            amount: data.amount.toString(),
            denom: CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom
        }
    }
    // console.log(message)
    return {
        type_url: `/${stakingProtobufPackage}.MsgUndelegate`,
        value: MsgUndelegate.encode(message).finish()
    }
}

function createRedelegateProposalMsg(data: RedelegateActionData, groupPolicyAddress) {
    console.assert(data.type === ActionStateType.REDELEGATE)

    let message: MsgBeginRedelegate = {
        delegator_address: groupPolicyAddress,
        validator_src_address: data.fromValidatorAddress,
        validator_dst_address: data.toValidatorAddress,
        amount: {
            amount: data.amount.toString(),
            denom: CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom
        }
    }
    // console.log(message)
    return {
        type_url: `/${stakingProtobufPackage}.MsgBeginRedelegate`,
        value: MsgBeginRedelegate.encode(message).finish()
    }
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
    ): Promise<number> => {

        const groupPolicyAddress = group.policy.address;
        const proposals = (await Promise.all(this.newProposal.actions.map( async (action) => {
            switch (action.id.description) {
                case ActionType.STAKE:
                    // const data = action.data as StakeActionData;
                    switch (action.data['type']) {
                        case ActionStateType.DELEGATE:
                            return createDelegateProposalMsg(action.data as DelegateActionData, groupPolicyAddress)
                        case ActionStateType.REDELEGATE:
                            return createRedelegateProposalMsg(action.data as RedelegateActionData, groupPolicyAddress)
                        case ActionStateType.UNDELEGATE:
                            return createUndelegateProposalMsg(action.data as UndelegateActionData, groupPolicyAddress)
                        case ActionStateType.CLAIM_REWARD:
                            return await createClaimRewardProposalMsgs(groupPolicyAddress)
                    }
                    break
                case ActionType.TEXT:
                    return undefined
                case ActionType.SPEND:
                    return createSpendProposalMsg(action.data as SpendActionData, groupPolicyAddress)
                case ActionType.PARAMETER_CHANGE:
                    return undefined
            }
            return undefined
        }))).flat().filter( m => !!m)


        // const mockMetaData = 'testing abc';
        /*const mockCoins: Coin[] = coins(
            5,
            CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom
        );
        const mockTextProposal = {
            type_url: ProposalTypeUrls.TextProposal,
            value: TextProposal.encode({
                title: 'Testing',
                description: 'Test desc',
            }).finish(),
        }*/

        const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(
            CosmosNodeService.instance.chainInfo.chainId
        );
        const me = key.bech32Address;

        // TODO replace hardcode
        // const exec = Exec.EXEC_TRY;

        const msg: MsgSubmitProposal = MsgSubmitProposal.fromPartial({
            address: groupPolicyAddress,
            proposers: group.members.map( m => m.member.address ),
            messages: proposals,
            // exec,
            // metadata: toUint8Array(mockMetaData).toString(),
            metadata: this.newProposal.name
        });

        console.log('msg', msg);

        const msgAny = {
            typeUrl: `/${groupProtobufPackage}.MsgSubmitProposal`,
            value: msg,
        };

        const fee = {
            amount: coins(
                0,
                CosmosNodeService.instance.chainInfo.stakeCurrency.coinMinimalDenom
            ),
            gas: '2000000',
        }

        let createdProposalId

        try {
            const res = await CosmosNodeService.instance.cosmosClient.signAndBroadcast(me, [msgAny], fee)
            console.log('proposal creation', res)
            createdProposalId = Number(JSON.parse(res.rawLog)[0].events.find(e => e.type === 'cosmos.group.v1.EventCreateProposal').attributes[0].value.replaceAll('"', ''))
        } catch (e) {
            console.warn(e)
            if (e.message === 'Invalid string. Length must be a multiple of 4') {
                const proposals = await ProposalsService.instance.allProposalsByGroupPolicy(groupPolicyAddress)
                createdProposalId = Math.max(...proposals.map( p => Number(p.id)), 0)
            } else {
                // todo: show error
                throw e
            }
        }
        console.log(`Created Proposal Id: ${createdProposalId}`)
        this.newProposal = {
            actions: [],
            name: '',
            description: ''
        }
        return createdProposalId
    }

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
