/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Duration } from "../../../google/protobuf/duration";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "regen.group.v1alpha1";

/** Choice defines available types of choices for voting. */
export enum Choice {
  /** CHOICE_UNSPECIFIED - CHOICE_UNSPECIFIED defines a no-op voting choice. */
  CHOICE_UNSPECIFIED = 0,
  /** CHOICE_NO - CHOICE_NO defines a no voting choice. */
  CHOICE_NO = 1,
  /** CHOICE_YES - CHOICE_YES defines a yes voting choice. */
  CHOICE_YES = 2,
  /** CHOICE_ABSTAIN - CHOICE_ABSTAIN defines an abstaining voting choice. */
  CHOICE_ABSTAIN = 3,
  /** CHOICE_VETO - CHOICE_VETO defines a voting choice with veto. */
  CHOICE_VETO = 4,
  UNRECOGNIZED = -1,
}

export function choiceFromJSON(object: any): Choice {
  switch (object) {
    case 0:
    case "CHOICE_UNSPECIFIED":
      return Choice.CHOICE_UNSPECIFIED;
    case 1:
    case "CHOICE_NO":
      return Choice.CHOICE_NO;
    case 2:
    case "CHOICE_YES":
      return Choice.CHOICE_YES;
    case 3:
    case "CHOICE_ABSTAIN":
      return Choice.CHOICE_ABSTAIN;
    case 4:
    case "CHOICE_VETO":
      return Choice.CHOICE_VETO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Choice.UNRECOGNIZED;
  }
}

export function choiceToJSON(object: Choice): string {
  switch (object) {
    case Choice.CHOICE_UNSPECIFIED:
      return "CHOICE_UNSPECIFIED";
    case Choice.CHOICE_NO:
      return "CHOICE_NO";
    case Choice.CHOICE_YES:
      return "CHOICE_YES";
    case Choice.CHOICE_ABSTAIN:
      return "CHOICE_ABSTAIN";
    case Choice.CHOICE_VETO:
      return "CHOICE_VETO";
    default:
      return "UNKNOWN";
  }
}

/**
 * Member represents a group member with an account address,
 * non-zero weight and metadata.
 */
export interface Member {
  /** address is the member's account address. */
  address: string;
  /** weight is the member's voting weight that should be greater than 0. */
  weight: string;
  /** metadata is any arbitrary metadata to attached to the member. */
  metadata: Uint8Array;
}

/** Members defines a repeated slice of Member objects. */
export interface Members {
  /** members is the list of members. */
  members: Member[];
}

/** ThresholdDecisionPolicy implements the DecisionPolicy interface */
export interface ThresholdDecisionPolicy {
  /** threshold is the minimum weighted sum of yes votes that must be met or exceeded for a proposal to succeed. */
  threshold: string;
  /**
   * timeout is the duration from submission of a proposal to the end of voting period
   * Within this times votes and exec messages can be submitted.
   */
  timeout: Duration | undefined;
}

/** GroupInfo represents the high-level on-chain information for a group. */
export interface GroupInfo {
  /** group_id is the unique ID of the group. */
  groupId: number;
  /** admin is the account address of the group's admin. */
  admin: string;
  /** metadata is any arbitrary metadata to attached to the group. */
  metadata: Uint8Array;
  /**
   * version is used to track changes to a group's membership structure that
   * would break existing proposals. Whenever any members weight is changed,
   * or any member is added or removed this version is incremented and will
   * cause proposals based on older versions of this group to fail
   */
  version: number;
  /** total_weight is the sum of the group members' weights. */
  totalWeight: string;
}

/** GroupMember represents the relationship between a group and a member. */
export interface GroupMember {
  /** group_id is the unique ID of the group. */
  groupId: number;
  /** member is the member data. */
  member: Member | undefined;
}

/** GroupAccountInfo represents the high-level on-chain information for a group account. */
export interface GroupAccountInfo {
  /** address is the group account address. */
  address: string;
  /** group_id is the unique ID of the group. */
  groupId: number;
  /** admin is the account address of the group admin. */
  admin: string;
  /** metadata is any arbitrary metadata to attached to the group account. */
  metadata: Uint8Array;
  /**
   * version is used to track changes to a group's GroupAccountInfo structure that
   * would create a different result on a running proposal.
   */
  version: number;
  /** decision_policy specifies the group account's decision policy. */
  decisionPolicy: Any | undefined;
  /**
   * derivation_key is the "derivation" key of the group account,
   * which is needed to derive the group root module key and execute proposals.
   */
  derivationKey: Uint8Array;
}

/**
 * Proposal defines a group proposal. Any member of a group can submit a proposal
 * for a group account to decide upon.
 * A proposal consists of a set of `sdk.Msg`s that will be executed if the proposal
 * passes as well as some optional metadata associated with the proposal.
 */
export interface Proposal {
  /** proposal_id is the unique id of the proposal. */
  proposalId: number;
  /** address is the group account address. */
  address: string;
  /** metadata is any arbitrary metadata to attached to the proposal. */
  metadata: Uint8Array;
  /** proposers are the account addresses of the proposers. */
  proposers: string[];
  /** submitted_at is a timestamp specifying when a proposal was submitted. */
  submittedAt: Date | undefined;
  /**
   * group_version tracks the version of the group that this proposal corresponds to.
   * When group membership is changed, existing proposals from previous group versions will become invalid.
   */
  groupVersion: number;
  /**
   * group_account_version tracks the version of the group account that this proposal corresponds to.
   * When a decision policy is changed, existing proposals from previous policy versions will become invalid.
   */
  groupAccountVersion: number;
  /** Status represents the high level position in the life cycle of the proposal. Initial value is Submitted. */
  status: Proposal_Status;
  /**
   * result is the final result based on the votes and election rule. Initial value is unfinalized.
   * The result is persisted so that clients can always rely on this state and not have to replicate the logic.
   */
  result: Proposal_Result;
  /** vote_state contains the sums of all weighted votes for this proposal. */
  voteState: Tally | undefined;
  /**
   * timeout is the timestamp of the block where the proposal execution times out. Header times of the votes and execution messages
   * must be before this end time to be included in the election. After the timeout timestamp the proposal can not be
   * executed anymore and should be considered pending delete.
   */
  timeout: Date | undefined;
  /** executor_result is the final result based on the votes and election rule. Initial value is NotRun. */
  executorResult: Proposal_ExecutorResult;
  /** msgs is a list of Msgs that will be executed if the proposal passes. */
  msgs: Any[];
}

/** Status defines proposal statuses. */
export enum Proposal_Status {
  /** STATUS_UNSPECIFIED - An empty value is invalid and not allowed. */
  STATUS_UNSPECIFIED = 0,
  /** STATUS_SUBMITTED - Initial status of a proposal when persisted. */
  STATUS_SUBMITTED = 1,
  /** STATUS_CLOSED - Final status of a proposal when the final tally was executed. */
  STATUS_CLOSED = 2,
  /** STATUS_ABORTED - Final status of a proposal when the group was modified before the final tally. */
  STATUS_ABORTED = 3,
  UNRECOGNIZED = -1,
}

export function proposal_StatusFromJSON(object: any): Proposal_Status {
  switch (object) {
    case 0:
    case "STATUS_UNSPECIFIED":
      return Proposal_Status.STATUS_UNSPECIFIED;
    case 1:
    case "STATUS_SUBMITTED":
      return Proposal_Status.STATUS_SUBMITTED;
    case 2:
    case "STATUS_CLOSED":
      return Proposal_Status.STATUS_CLOSED;
    case 3:
    case "STATUS_ABORTED":
      return Proposal_Status.STATUS_ABORTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Proposal_Status.UNRECOGNIZED;
  }
}

export function proposal_StatusToJSON(object: Proposal_Status): string {
  switch (object) {
    case Proposal_Status.STATUS_UNSPECIFIED:
      return "STATUS_UNSPECIFIED";
    case Proposal_Status.STATUS_SUBMITTED:
      return "STATUS_SUBMITTED";
    case Proposal_Status.STATUS_CLOSED:
      return "STATUS_CLOSED";
    case Proposal_Status.STATUS_ABORTED:
      return "STATUS_ABORTED";
    default:
      return "UNKNOWN";
  }
}

/** Result defines types of proposal results. */
export enum Proposal_Result {
  /** RESULT_UNSPECIFIED - An empty value is invalid and not allowed */
  RESULT_UNSPECIFIED = 0,
  /** RESULT_UNFINALIZED - Until a final tally has happened the status is unfinalized */
  RESULT_UNFINALIZED = 1,
  /** RESULT_ACCEPTED - Final result of the tally */
  RESULT_ACCEPTED = 2,
  /** RESULT_REJECTED - Final result of the tally */
  RESULT_REJECTED = 3,
  UNRECOGNIZED = -1,
}

export function proposal_ResultFromJSON(object: any): Proposal_Result {
  switch (object) {
    case 0:
    case "RESULT_UNSPECIFIED":
      return Proposal_Result.RESULT_UNSPECIFIED;
    case 1:
    case "RESULT_UNFINALIZED":
      return Proposal_Result.RESULT_UNFINALIZED;
    case 2:
    case "RESULT_ACCEPTED":
      return Proposal_Result.RESULT_ACCEPTED;
    case 3:
    case "RESULT_REJECTED":
      return Proposal_Result.RESULT_REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Proposal_Result.UNRECOGNIZED;
  }
}

export function proposal_ResultToJSON(object: Proposal_Result): string {
  switch (object) {
    case Proposal_Result.RESULT_UNSPECIFIED:
      return "RESULT_UNSPECIFIED";
    case Proposal_Result.RESULT_UNFINALIZED:
      return "RESULT_UNFINALIZED";
    case Proposal_Result.RESULT_ACCEPTED:
      return "RESULT_ACCEPTED";
    case Proposal_Result.RESULT_REJECTED:
      return "RESULT_REJECTED";
    default:
      return "UNKNOWN";
  }
}

/** ExecutorResult defines types of proposal executor results. */
export enum Proposal_ExecutorResult {
  /** EXECUTOR_RESULT_UNSPECIFIED - An empty value is not allowed. */
  EXECUTOR_RESULT_UNSPECIFIED = 0,
  /** EXECUTOR_RESULT_NOT_RUN - We have not yet run the executor. */
  EXECUTOR_RESULT_NOT_RUN = 1,
  /** EXECUTOR_RESULT_SUCCESS - The executor was successful and proposed action updated state. */
  EXECUTOR_RESULT_SUCCESS = 2,
  /** EXECUTOR_RESULT_FAILURE - The executor returned an error and proposed action didn't update state. */
  EXECUTOR_RESULT_FAILURE = 3,
  UNRECOGNIZED = -1,
}

export function proposal_ExecutorResultFromJSON(
  object: any
): Proposal_ExecutorResult {
  switch (object) {
    case 0:
    case "EXECUTOR_RESULT_UNSPECIFIED":
      return Proposal_ExecutorResult.EXECUTOR_RESULT_UNSPECIFIED;
    case 1:
    case "EXECUTOR_RESULT_NOT_RUN":
      return Proposal_ExecutorResult.EXECUTOR_RESULT_NOT_RUN;
    case 2:
    case "EXECUTOR_RESULT_SUCCESS":
      return Proposal_ExecutorResult.EXECUTOR_RESULT_SUCCESS;
    case 3:
    case "EXECUTOR_RESULT_FAILURE":
      return Proposal_ExecutorResult.EXECUTOR_RESULT_FAILURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Proposal_ExecutorResult.UNRECOGNIZED;
  }
}

export function proposal_ExecutorResultToJSON(
  object: Proposal_ExecutorResult
): string {
  switch (object) {
    case Proposal_ExecutorResult.EXECUTOR_RESULT_UNSPECIFIED:
      return "EXECUTOR_RESULT_UNSPECIFIED";
    case Proposal_ExecutorResult.EXECUTOR_RESULT_NOT_RUN:
      return "EXECUTOR_RESULT_NOT_RUN";
    case Proposal_ExecutorResult.EXECUTOR_RESULT_SUCCESS:
      return "EXECUTOR_RESULT_SUCCESS";
    case Proposal_ExecutorResult.EXECUTOR_RESULT_FAILURE:
      return "EXECUTOR_RESULT_FAILURE";
    default:
      return "UNKNOWN";
  }
}

/** Tally represents the sum of weighted votes. */
export interface Tally {
  /** yes_count is the weighted sum of yes votes. */
  yesCount: string;
  /** no_count is the weighted sum of no votes. */
  noCount: string;
  /** abstain_count is the weighted sum of abstainers */
  abstainCount: string;
  /** veto_count is the weighted sum of vetoes. */
  vetoCount: string;
}

/** Vote represents a vote for a proposal. */
export interface Vote {
  /** proposal is the unique ID of the proposal. */
  proposalId: number;
  /** voter is the account address of the voter. */
  voter: string;
  /** choice is the voter's choice on the proposal. */
  choice: Choice;
  /** metadata is any arbitrary metadata to attached to the vote. */
  metadata: Uint8Array;
  /** submitted_at is the timestamp when the vote was submitted. */
  submittedAt: Date | undefined;
}

const baseMember: object = { address: "", weight: "" };

export const Member = {
  encode(
    message: Member,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(26).bytes(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Member {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMember } as Member;
    message.metadata = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.weight = reader.string();
          break;
        case 3:
          message.metadata = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Member {
    const message = { ...baseMember } as Member;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    message.weight =
      object.weight !== undefined && object.weight !== null
        ? String(object.weight)
        : "";
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? bytesFromBase64(object.metadata)
        : new Uint8Array();
    return message;
  },

  toJSON(message: Member): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.weight !== undefined && (obj.weight = message.weight);
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Member>, I>>(object: I): Member {
    const message = { ...baseMember } as Member;
    message.address = object.address ?? "";
    message.weight = object.weight ?? "";
    message.metadata = object.metadata ?? new Uint8Array();
    return message;
  },
};

const baseMembers: object = {};

export const Members = {
  encode(
    message: Members,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.members) {
      Member.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Members {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMembers } as Members;
    message.members = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.members.push(Member.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Members {
    const message = { ...baseMembers } as Members;
    message.members = (object.members ?? []).map((e: any) =>
      Member.fromJSON(e)
    );
    return message;
  },

  toJSON(message: Members): unknown {
    const obj: any = {};
    if (message.members) {
      obj.members = message.members.map((e) =>
        e ? Member.toJSON(e) : undefined
      );
    } else {
      obj.members = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Members>, I>>(object: I): Members {
    const message = { ...baseMembers } as Members;
    message.members = object.members?.map((e) => Member.fromPartial(e)) || [];
    return message;
  },
};

const baseThresholdDecisionPolicy: object = { threshold: "" };

export const ThresholdDecisionPolicy = {
  encode(
    message: ThresholdDecisionPolicy,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.threshold !== "") {
      writer.uint32(10).string(message.threshold);
    }
    if (message.timeout !== undefined) {
      Duration.encode(message.timeout, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ThresholdDecisionPolicy {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseThresholdDecisionPolicy,
    } as ThresholdDecisionPolicy;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.threshold = reader.string();
          break;
        case 2:
          message.timeout = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ThresholdDecisionPolicy {
    const message = {
      ...baseThresholdDecisionPolicy,
    } as ThresholdDecisionPolicy;
    message.threshold =
      object.threshold !== undefined && object.threshold !== null
        ? String(object.threshold)
        : "";
    message.timeout =
      object.timeout !== undefined && object.timeout !== null
        ? Duration.fromJSON(object.timeout)
        : undefined;
    return message;
  },

  toJSON(message: ThresholdDecisionPolicy): unknown {
    const obj: any = {};
    message.threshold !== undefined && (obj.threshold = message.threshold);
    message.timeout !== undefined &&
      (obj.timeout = message.timeout
        ? Duration.toJSON(message.timeout)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ThresholdDecisionPolicy>, I>>(
    object: I
  ): ThresholdDecisionPolicy {
    const message = {
      ...baseThresholdDecisionPolicy,
    } as ThresholdDecisionPolicy;
    message.threshold = object.threshold ?? "";
    message.timeout =
      object.timeout !== undefined && object.timeout !== null
        ? Duration.fromPartial(object.timeout)
        : undefined;
    return message;
  },
};

const baseGroupInfo: object = {
  groupId: 0,
  admin: "",
  version: 0,
  totalWeight: "",
};

export const GroupInfo = {
  encode(
    message: GroupInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint64(message.groupId);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(26).bytes(message.metadata);
    }
    if (message.version !== 0) {
      writer.uint32(32).uint64(message.version);
    }
    if (message.totalWeight !== "") {
      writer.uint32(42).string(message.totalWeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupInfo } as GroupInfo;
    message.metadata = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.admin = reader.string();
          break;
        case 3:
          message.metadata = reader.bytes();
          break;
        case 4:
          message.version = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.totalWeight = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupInfo {
    const message = { ...baseGroupInfo } as GroupInfo;
    message.groupId =
      object.groupId !== undefined && object.groupId !== null
        ? Number(object.groupId)
        : 0;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? bytesFromBase64(object.metadata)
        : new Uint8Array();
    message.version =
      object.version !== undefined && object.version !== null
        ? Number(object.version)
        : 0;
    message.totalWeight =
      object.totalWeight !== undefined && object.totalWeight !== null
        ? String(object.totalWeight)
        : "";
    return message;
  },

  toJSON(message: GroupInfo): unknown {
    const obj: any = {};
    message.groupId !== undefined &&
      (obj.groupId = Math.round(message.groupId));
    message.admin !== undefined && (obj.admin = message.admin);
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    message.version !== undefined &&
      (obj.version = Math.round(message.version));
    message.totalWeight !== undefined &&
      (obj.totalWeight = message.totalWeight);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupInfo>, I>>(
    object: I
  ): GroupInfo {
    const message = { ...baseGroupInfo } as GroupInfo;
    message.groupId = object.groupId ?? 0;
    message.admin = object.admin ?? "";
    message.metadata = object.metadata ?? new Uint8Array();
    message.version = object.version ?? 0;
    message.totalWeight = object.totalWeight ?? "";
    return message;
  },
};

const baseGroupMember: object = { groupId: 0 };

export const GroupMember = {
  encode(
    message: GroupMember,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint64(message.groupId);
    }
    if (message.member !== undefined) {
      Member.encode(message.member, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupMember {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupMember } as GroupMember;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.member = Member.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupMember {
    const message = { ...baseGroupMember } as GroupMember;
    message.groupId =
      object.groupId !== undefined && object.groupId !== null
        ? Number(object.groupId)
        : 0;
    message.member =
      object.member !== undefined && object.member !== null
        ? Member.fromJSON(object.member)
        : undefined;
    return message;
  },

  toJSON(message: GroupMember): unknown {
    const obj: any = {};
    message.groupId !== undefined &&
      (obj.groupId = Math.round(message.groupId));
    message.member !== undefined &&
      (obj.member = message.member ? Member.toJSON(message.member) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupMember>, I>>(
    object: I
  ): GroupMember {
    const message = { ...baseGroupMember } as GroupMember;
    message.groupId = object.groupId ?? 0;
    message.member =
      object.member !== undefined && object.member !== null
        ? Member.fromPartial(object.member)
        : undefined;
    return message;
  },
};

const baseGroupAccountInfo: object = {
  address: "",
  groupId: 0,
  admin: "",
  version: 0,
};

export const GroupAccountInfo = {
  encode(
    message: GroupAccountInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.groupId !== 0) {
      writer.uint32(16).uint64(message.groupId);
    }
    if (message.admin !== "") {
      writer.uint32(26).string(message.admin);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(34).bytes(message.metadata);
    }
    if (message.version !== 0) {
      writer.uint32(40).uint64(message.version);
    }
    if (message.decisionPolicy !== undefined) {
      Any.encode(message.decisionPolicy, writer.uint32(50).fork()).ldelim();
    }
    if (message.derivationKey.length !== 0) {
      writer.uint32(58).bytes(message.derivationKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupAccountInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupAccountInfo } as GroupAccountInfo;
    message.metadata = new Uint8Array();
    message.derivationKey = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.groupId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.admin = reader.string();
          break;
        case 4:
          message.metadata = reader.bytes();
          break;
        case 5:
          message.version = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.decisionPolicy = Any.decode(reader, reader.uint32());
          break;
        case 7:
          message.derivationKey = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GroupAccountInfo {
    const message = { ...baseGroupAccountInfo } as GroupAccountInfo;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    message.groupId =
      object.groupId !== undefined && object.groupId !== null
        ? Number(object.groupId)
        : 0;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? bytesFromBase64(object.metadata)
        : new Uint8Array();
    message.version =
      object.version !== undefined && object.version !== null
        ? Number(object.version)
        : 0;
    message.decisionPolicy =
      object.decisionPolicy !== undefined && object.decisionPolicy !== null
        ? Any.fromJSON(object.decisionPolicy)
        : undefined;
    message.derivationKey =
      object.derivationKey !== undefined && object.derivationKey !== null
        ? bytesFromBase64(object.derivationKey)
        : new Uint8Array();
    return message;
  },

  toJSON(message: GroupAccountInfo): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.groupId !== undefined &&
      (obj.groupId = Math.round(message.groupId));
    message.admin !== undefined && (obj.admin = message.admin);
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    message.version !== undefined &&
      (obj.version = Math.round(message.version));
    message.decisionPolicy !== undefined &&
      (obj.decisionPolicy = message.decisionPolicy
        ? Any.toJSON(message.decisionPolicy)
        : undefined);
    message.derivationKey !== undefined &&
      (obj.derivationKey = base64FromBytes(
        message.derivationKey !== undefined
          ? message.derivationKey
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupAccountInfo>, I>>(
    object: I
  ): GroupAccountInfo {
    const message = { ...baseGroupAccountInfo } as GroupAccountInfo;
    message.address = object.address ?? "";
    message.groupId = object.groupId ?? 0;
    message.admin = object.admin ?? "";
    message.metadata = object.metadata ?? new Uint8Array();
    message.version = object.version ?? 0;
    message.decisionPolicy =
      object.decisionPolicy !== undefined && object.decisionPolicy !== null
        ? Any.fromPartial(object.decisionPolicy)
        : undefined;
    message.derivationKey = object.derivationKey ?? new Uint8Array();
    return message;
  },
};

const baseProposal: object = {
  proposalId: 0,
  address: "",
  proposers: "",
  groupVersion: 0,
  groupAccountVersion: 0,
  status: 0,
  result: 0,
  executorResult: 0,
};

export const Proposal = {
  encode(
    message: Proposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(26).bytes(message.metadata);
    }
    for (const v of message.proposers) {
      writer.uint32(34).string(v!);
    }
    if (message.submittedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.submittedAt),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.groupVersion !== 0) {
      writer.uint32(48).uint64(message.groupVersion);
    }
    if (message.groupAccountVersion !== 0) {
      writer.uint32(56).uint64(message.groupAccountVersion);
    }
    if (message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    if (message.result !== 0) {
      writer.uint32(72).int32(message.result);
    }
    if (message.voteState !== undefined) {
      Tally.encode(message.voteState, writer.uint32(82).fork()).ldelim();
    }
    if (message.timeout !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timeout),
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.executorResult !== 0) {
      writer.uint32(96).int32(message.executorResult);
    }
    for (const v of message.msgs) {
      Any.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Proposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseProposal } as Proposal;
    message.proposers = [];
    message.msgs = [];
    message.metadata = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.metadata = reader.bytes();
          break;
        case 4:
          message.proposers.push(reader.string());
          break;
        case 5:
          message.submittedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.groupVersion = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.groupAccountVersion = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.status = reader.int32() as any;
          break;
        case 9:
          message.result = reader.int32() as any;
          break;
        case 10:
          message.voteState = Tally.decode(reader, reader.uint32());
          break;
        case 11:
          message.timeout = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 12:
          message.executorResult = reader.int32() as any;
          break;
        case 13:
          message.msgs.push(Any.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Proposal {
    const message = { ...baseProposal } as Proposal;
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Number(object.proposalId)
        : 0;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? bytesFromBase64(object.metadata)
        : new Uint8Array();
    message.proposers = (object.proposers ?? []).map((e: any) => String(e));
    message.submittedAt =
      object.submittedAt !== undefined && object.submittedAt !== null
        ? fromJsonTimestamp(object.submittedAt)
        : undefined;
    message.groupVersion =
      object.groupVersion !== undefined && object.groupVersion !== null
        ? Number(object.groupVersion)
        : 0;
    message.groupAccountVersion =
      object.groupAccountVersion !== undefined &&
      object.groupAccountVersion !== null
        ? Number(object.groupAccountVersion)
        : 0;
    message.status =
      object.status !== undefined && object.status !== null
        ? proposal_StatusFromJSON(object.status)
        : 0;
    message.result =
      object.result !== undefined && object.result !== null
        ? proposal_ResultFromJSON(object.result)
        : 0;
    message.voteState =
      object.voteState !== undefined && object.voteState !== null
        ? Tally.fromJSON(object.voteState)
        : undefined;
    message.timeout =
      object.timeout !== undefined && object.timeout !== null
        ? fromJsonTimestamp(object.timeout)
        : undefined;
    message.executorResult =
      object.executorResult !== undefined && object.executorResult !== null
        ? proposal_ExecutorResultFromJSON(object.executorResult)
        : 0;
    message.msgs = (object.msgs ?? []).map((e: any) => Any.fromJSON(e));
    return message;
  },

  toJSON(message: Proposal): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = Math.round(message.proposalId));
    message.address !== undefined && (obj.address = message.address);
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    if (message.proposers) {
      obj.proposers = message.proposers.map((e) => e);
    } else {
      obj.proposers = [];
    }
    message.submittedAt !== undefined &&
      (obj.submittedAt = message.submittedAt.toISOString());
    message.groupVersion !== undefined &&
      (obj.groupVersion = Math.round(message.groupVersion));
    message.groupAccountVersion !== undefined &&
      (obj.groupAccountVersion = Math.round(message.groupAccountVersion));
    message.status !== undefined &&
      (obj.status = proposal_StatusToJSON(message.status));
    message.result !== undefined &&
      (obj.result = proposal_ResultToJSON(message.result));
    message.voteState !== undefined &&
      (obj.voteState = message.voteState
        ? Tally.toJSON(message.voteState)
        : undefined);
    message.timeout !== undefined &&
      (obj.timeout = message.timeout.toISOString());
    message.executorResult !== undefined &&
      (obj.executorResult = proposal_ExecutorResultToJSON(
        message.executorResult
      ));
    if (message.msgs) {
      obj.msgs = message.msgs.map((e) => (e ? Any.toJSON(e) : undefined));
    } else {
      obj.msgs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Proposal>, I>>(object: I): Proposal {
    const message = { ...baseProposal } as Proposal;
    message.proposalId = object.proposalId ?? 0;
    message.address = object.address ?? "";
    message.metadata = object.metadata ?? new Uint8Array();
    message.proposers = object.proposers?.map((e) => e) || [];
    message.submittedAt = object.submittedAt ?? undefined;
    message.groupVersion = object.groupVersion ?? 0;
    message.groupAccountVersion = object.groupAccountVersion ?? 0;
    message.status = object.status ?? 0;
    message.result = object.result ?? 0;
    message.voteState =
      object.voteState !== undefined && object.voteState !== null
        ? Tally.fromPartial(object.voteState)
        : undefined;
    message.timeout = object.timeout ?? undefined;
    message.executorResult = object.executorResult ?? 0;
    message.msgs = object.msgs?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

const baseTally: object = {
  yesCount: "",
  noCount: "",
  abstainCount: "",
  vetoCount: "",
};

export const Tally = {
  encode(message: Tally, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.yesCount !== "") {
      writer.uint32(10).string(message.yesCount);
    }
    if (message.noCount !== "") {
      writer.uint32(18).string(message.noCount);
    }
    if (message.abstainCount !== "") {
      writer.uint32(26).string(message.abstainCount);
    }
    if (message.vetoCount !== "") {
      writer.uint32(34).string(message.vetoCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tally {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTally } as Tally;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.yesCount = reader.string();
          break;
        case 2:
          message.noCount = reader.string();
          break;
        case 3:
          message.abstainCount = reader.string();
          break;
        case 4:
          message.vetoCount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tally {
    const message = { ...baseTally } as Tally;
    message.yesCount =
      object.yesCount !== undefined && object.yesCount !== null
        ? String(object.yesCount)
        : "";
    message.noCount =
      object.noCount !== undefined && object.noCount !== null
        ? String(object.noCount)
        : "";
    message.abstainCount =
      object.abstainCount !== undefined && object.abstainCount !== null
        ? String(object.abstainCount)
        : "";
    message.vetoCount =
      object.vetoCount !== undefined && object.vetoCount !== null
        ? String(object.vetoCount)
        : "";
    return message;
  },

  toJSON(message: Tally): unknown {
    const obj: any = {};
    message.yesCount !== undefined && (obj.yesCount = message.yesCount);
    message.noCount !== undefined && (obj.noCount = message.noCount);
    message.abstainCount !== undefined &&
      (obj.abstainCount = message.abstainCount);
    message.vetoCount !== undefined && (obj.vetoCount = message.vetoCount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tally>, I>>(object: I): Tally {
    const message = { ...baseTally } as Tally;
    message.yesCount = object.yesCount ?? "";
    message.noCount = object.noCount ?? "";
    message.abstainCount = object.abstainCount ?? "";
    message.vetoCount = object.vetoCount ?? "";
    return message;
  },
};

const baseVote: object = { proposalId: 0, voter: "", choice: 0 };

export const Vote = {
  encode(message: Vote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    if (message.choice !== 0) {
      writer.uint32(24).int32(message.choice);
    }
    if (message.metadata.length !== 0) {
      writer.uint32(34).bytes(message.metadata);
    }
    if (message.submittedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.submittedAt),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVote } as Vote;
    message.metadata = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.voter = reader.string();
          break;
        case 3:
          message.choice = reader.int32() as any;
          break;
        case 4:
          message.metadata = reader.bytes();
          break;
        case 5:
          message.submittedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Vote {
    const message = { ...baseVote } as Vote;
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Number(object.proposalId)
        : 0;
    message.voter =
      object.voter !== undefined && object.voter !== null
        ? String(object.voter)
        : "";
    message.choice =
      object.choice !== undefined && object.choice !== null
        ? choiceFromJSON(object.choice)
        : 0;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? bytesFromBase64(object.metadata)
        : new Uint8Array();
    message.submittedAt =
      object.submittedAt !== undefined && object.submittedAt !== null
        ? fromJsonTimestamp(object.submittedAt)
        : undefined;
    return message;
  },

  toJSON(message: Vote): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = Math.round(message.proposalId));
    message.voter !== undefined && (obj.voter = message.voter);
    message.choice !== undefined && (obj.choice = choiceToJSON(message.choice));
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    message.submittedAt !== undefined &&
      (obj.submittedAt = message.submittedAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vote>, I>>(object: I): Vote {
    const message = { ...baseVote } as Vote;
    message.proposalId = object.proposalId ?? 0;
    message.voter = object.voter ?? "";
    message.choice = object.choice ?? 0;
    message.metadata = object.metadata ?? new Uint8Array();
    message.submittedAt = object.submittedAt ?? undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
