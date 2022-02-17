/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Duration } from "../../../google/protobuf/duration";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "cosmos.group.v1beta1";

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
  /** added_at is a timestamp specifying when a member was added. */
  added_at: Date | undefined;
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

/** PercentageDecisionPolicy implements the DecisionPolicy interface */
export interface PercentageDecisionPolicy {
  /** percentage is the minimum percentage the weighted sum of yes votes must meet for a proposal to succeed. */
  percentage: string;
  /**
   * timeout is the duration from submission of a proposal to the end of voting period
   * Within these times votes and exec messages can be submitted.
   */
  timeout: Duration | undefined;
}

/** GroupInfo represents the high-level on-chain information for a group. */
export interface GroupInfo {
  /** group_id is the unique ID of the group. */
  group_id: number;
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
  total_weight: string;
  /** created_at is a timestamp specifying when a group was created. */
  created_at: Date | undefined;
}

/** GroupMember represents the relationship between a group and a member. */
export interface GroupMember {
  /** group_id is the unique ID of the group. */
  group_id: number;
  /** member is the member data. */
  member: Member | undefined;
}

/** GroupPolicyInfo represents the high-level on-chain information for a group policy. */
export interface GroupPolicyInfo {
  /** address is the account address of group policy. */
  address: string;
  /** group_id is the unique ID of the group. */
  group_id: number;
  /** admin is the account address of the group admin. */
  admin: string;
  /** metadata is any arbitrary metadata to attached to the group policy. */
  metadata: Uint8Array;
  /**
   * version is used to track changes to a group's GroupPolicyInfo structure that
   * would create a different result on a running proposal.
   */
  version: number;
  /** decision_policy specifies the group policy's decision policy. */
  decision_policy: Any | undefined;
  /** created_at is a timestamp specifying when a group policy was created. */
  created_at: Date | undefined;
}

/**
 * Proposal defines a group proposal. Any member of a group can submit a proposal
 * for a group policy to decide upon.
 * A proposal consists of a set of `sdk.Msg`s that will be executed if the proposal
 * passes as well as some optional metadata associated with the proposal.
 */
export interface Proposal {
  /** proposal_id is the unique id of the proposal. */
  proposal_id: number;
  /** address is the account address of group policy. */
  address: string;
  /** metadata is any arbitrary metadata to attached to the proposal. */
  metadata: Uint8Array;
  /** proposers are the account addresses of the proposers. */
  proposers: string[];
  /** submitted_at is a timestamp specifying when a proposal was submitted. */
  submitted_at: Date | undefined;
  /**
   * group_version tracks the version of the group that this proposal corresponds to.
   * When group membership is changed, existing proposals from previous group versions will become invalid.
   */
  group_version: number;
  /**
   * group_policy_version tracks the version of the group policy that this proposal corresponds to.
   * When a decision policy is changed, existing proposals from previous policy versions will become invalid.
   */
  group_policy_version: number;
  /** Status represents the high level position in the life cycle of the proposal. Initial value is Submitted. */
  status: Proposal_Status;
  /**
   * result is the final result based on the votes and election rule. Initial value is unfinalized.
   * The result is persisted so that clients can always rely on this state and not have to replicate the logic.
   */
  result: Proposal_Result;
  /** vote_state contains the sums of all weighted votes for this proposal. */
  vote_state: Tally | undefined;
  /**
   * timeout is the timestamp of the block where the proposal execution times out. Header times of the votes and
   * execution messages must be before this end time to be included in the election. After the timeout timestamp the
   * proposal can not be executed anymore and should be considered pending delete.
   */
  timeout: Date | undefined;
  /** executor_result is the final result based on the votes and election rule. Initial value is NotRun. */
  executor_result: Proposal_ExecutorResult;
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
  /**
   * STATUS_WITHDRAWN - A proposal can be deleted before the voting start time by the owner. When this happens the final status
   * is Withdrawn.
   */
  STATUS_WITHDRAWN = 4,
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
    case 4:
    case "STATUS_WITHDRAWN":
      return Proposal_Status.STATUS_WITHDRAWN;
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
    case Proposal_Status.STATUS_WITHDRAWN:
      return "STATUS_WITHDRAWN";
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
  yes_count: string;
  /** no_count is the weighted sum of no votes. */
  no_count: string;
  /** abstain_count is the weighted sum of abstainers */
  abstain_count: string;
  /** veto_count is the weighted sum of vetoes. */
  veto_count: string;
}

/** Vote represents a vote for a proposal. */
export interface Vote {
  /** proposal is the unique ID of the proposal. */
  proposal_id: number;
  /** voter is the account address of the voter. */
  voter: string;
  /** choice is the voter's choice on the proposal. */
  choice: Choice;
  /** metadata is any arbitrary metadata to attached to the vote. */
  metadata: Uint8Array;
  /** submitted_at is the timestamp when the vote was submitted. */
  submitted_at: Date | undefined;
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
    if (message.added_at !== undefined) {
      Timestamp.encode(
        toTimestamp(message.added_at),
        writer.uint32(34).fork()
      ).ldelim();
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
        case 4:
          message.added_at = fromTimestamp(
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
    message.added_at =
      object.added_at !== undefined && object.added_at !== null
        ? fromJsonTimestamp(object.added_at)
        : undefined;
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
    message.added_at !== undefined &&
      (obj.added_at = message.added_at.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Member>, I>>(object: I): Member {
    const message = { ...baseMember } as Member;
    message.address = object.address ?? "";
    message.weight = object.weight ?? "";
    message.metadata = object.metadata ?? new Uint8Array();
    message.added_at = object.added_at ?? undefined;
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

const basePercentageDecisionPolicy: object = { percentage: "" };

export const PercentageDecisionPolicy = {
  encode(
    message: PercentageDecisionPolicy,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.percentage !== "") {
      writer.uint32(10).string(message.percentage);
    }
    if (message.timeout !== undefined) {
      Duration.encode(message.timeout, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PercentageDecisionPolicy {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...basePercentageDecisionPolicy,
    } as PercentageDecisionPolicy;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.percentage = reader.string();
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

  fromJSON(object: any): PercentageDecisionPolicy {
    const message = {
      ...basePercentageDecisionPolicy,
    } as PercentageDecisionPolicy;
    message.percentage =
      object.percentage !== undefined && object.percentage !== null
        ? String(object.percentage)
        : "";
    message.timeout =
      object.timeout !== undefined && object.timeout !== null
        ? Duration.fromJSON(object.timeout)
        : undefined;
    return message;
  },

  toJSON(message: PercentageDecisionPolicy): unknown {
    const obj: any = {};
    message.percentage !== undefined && (obj.percentage = message.percentage);
    message.timeout !== undefined &&
      (obj.timeout = message.timeout
        ? Duration.toJSON(message.timeout)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PercentageDecisionPolicy>, I>>(
    object: I
  ): PercentageDecisionPolicy {
    const message = {
      ...basePercentageDecisionPolicy,
    } as PercentageDecisionPolicy;
    message.percentage = object.percentage ?? "";
    message.timeout =
      object.timeout !== undefined && object.timeout !== null
        ? Duration.fromPartial(object.timeout)
        : undefined;
    return message;
  },
};

const baseGroupInfo: object = {
  group_id: 0,
  admin: "",
  version: 0,
  total_weight: "",
};

export const GroupInfo = {
  encode(
    message: GroupInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== 0) {
      writer.uint32(8).uint64(message.group_id);
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
    if (message.total_weight !== "") {
      writer.uint32(42).string(message.total_weight);
    }
    if (message.created_at !== undefined) {
      Timestamp.encode(
        toTimestamp(message.created_at),
        writer.uint32(50).fork()
      ).ldelim();
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
          message.group_id = longToNumber(reader.uint64() as Long);
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
          message.total_weight = reader.string();
          break;
        case 6:
          message.created_at = fromTimestamp(
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

  fromJSON(object: any): GroupInfo {
    const message = { ...baseGroupInfo } as GroupInfo;
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
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
    message.total_weight =
      object.total_weight !== undefined && object.total_weight !== null
        ? String(object.total_weight)
        : "";
    message.created_at =
      object.created_at !== undefined && object.created_at !== null
        ? fromJsonTimestamp(object.created_at)
        : undefined;
    return message;
  },

  toJSON(message: GroupInfo): unknown {
    const obj: any = {};
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    message.admin !== undefined && (obj.admin = message.admin);
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    message.version !== undefined &&
      (obj.version = Math.round(message.version));
    message.total_weight !== undefined &&
      (obj.total_weight = message.total_weight);
    message.created_at !== undefined &&
      (obj.created_at = message.created_at.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupInfo>, I>>(
    object: I
  ): GroupInfo {
    const message = { ...baseGroupInfo } as GroupInfo;
    message.group_id = object.group_id ?? 0;
    message.admin = object.admin ?? "";
    message.metadata = object.metadata ?? new Uint8Array();
    message.version = object.version ?? 0;
    message.total_weight = object.total_weight ?? "";
    message.created_at = object.created_at ?? undefined;
    return message;
  },
};

const baseGroupMember: object = { group_id: 0 };

export const GroupMember = {
  encode(
    message: GroupMember,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== 0) {
      writer.uint32(8).uint64(message.group_id);
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
          message.group_id = longToNumber(reader.uint64() as Long);
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
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    message.member =
      object.member !== undefined && object.member !== null
        ? Member.fromJSON(object.member)
        : undefined;
    return message;
  },

  toJSON(message: GroupMember): unknown {
    const obj: any = {};
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    message.member !== undefined &&
      (obj.member = message.member ? Member.toJSON(message.member) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupMember>, I>>(
    object: I
  ): GroupMember {
    const message = { ...baseGroupMember } as GroupMember;
    message.group_id = object.group_id ?? 0;
    message.member =
      object.member !== undefined && object.member !== null
        ? Member.fromPartial(object.member)
        : undefined;
    return message;
  },
};

const baseGroupPolicyInfo: object = {
  address: "",
  group_id: 0,
  admin: "",
  version: 0,
};

export const GroupPolicyInfo = {
  encode(
    message: GroupPolicyInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.group_id !== 0) {
      writer.uint32(16).uint64(message.group_id);
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
    if (message.decision_policy !== undefined) {
      Any.encode(message.decision_policy, writer.uint32(50).fork()).ldelim();
    }
    if (message.created_at !== undefined) {
      Timestamp.encode(
        toTimestamp(message.created_at),
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GroupPolicyInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGroupPolicyInfo } as GroupPolicyInfo;
    message.metadata = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.group_id = longToNumber(reader.uint64() as Long);
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
          message.decision_policy = Any.decode(reader, reader.uint32());
          break;
        case 7:
          message.created_at = fromTimestamp(
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

  fromJSON(object: any): GroupPolicyInfo {
    const message = { ...baseGroupPolicyInfo } as GroupPolicyInfo;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
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
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromJSON(object.decision_policy)
        : undefined;
    message.created_at =
      object.created_at !== undefined && object.created_at !== null
        ? fromJsonTimestamp(object.created_at)
        : undefined;
    return message;
  },

  toJSON(message: GroupPolicyInfo): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    message.admin !== undefined && (obj.admin = message.admin);
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    message.version !== undefined &&
      (obj.version = Math.round(message.version));
    message.decision_policy !== undefined &&
      (obj.decision_policy = message.decision_policy
        ? Any.toJSON(message.decision_policy)
        : undefined);
    message.created_at !== undefined &&
      (obj.created_at = message.created_at.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GroupPolicyInfo>, I>>(
    object: I
  ): GroupPolicyInfo {
    const message = { ...baseGroupPolicyInfo } as GroupPolicyInfo;
    message.address = object.address ?? "";
    message.group_id = object.group_id ?? 0;
    message.admin = object.admin ?? "";
    message.metadata = object.metadata ?? new Uint8Array();
    message.version = object.version ?? 0;
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromPartial(object.decision_policy)
        : undefined;
    message.created_at = object.created_at ?? undefined;
    return message;
  },
};

const baseProposal: object = {
  proposal_id: 0,
  address: "",
  proposers: "",
  group_version: 0,
  group_policy_version: 0,
  status: 0,
  result: 0,
  executor_result: 0,
};

export const Proposal = {
  encode(
    message: Proposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
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
    if (message.submitted_at !== undefined) {
      Timestamp.encode(
        toTimestamp(message.submitted_at),
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.group_version !== 0) {
      writer.uint32(48).uint64(message.group_version);
    }
    if (message.group_policy_version !== 0) {
      writer.uint32(56).uint64(message.group_policy_version);
    }
    if (message.status !== 0) {
      writer.uint32(64).int32(message.status);
    }
    if (message.result !== 0) {
      writer.uint32(72).int32(message.result);
    }
    if (message.vote_state !== undefined) {
      Tally.encode(message.vote_state, writer.uint32(82).fork()).ldelim();
    }
    if (message.timeout !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timeout),
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.executor_result !== 0) {
      writer.uint32(96).int32(message.executor_result);
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
          message.proposal_id = longToNumber(reader.uint64() as Long);
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
          message.submitted_at = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.group_version = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.group_policy_version = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.status = reader.int32() as any;
          break;
        case 9:
          message.result = reader.int32() as any;
          break;
        case 10:
          message.vote_state = Tally.decode(reader, reader.uint32());
          break;
        case 11:
          message.timeout = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 12:
          message.executor_result = reader.int32() as any;
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
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
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
    message.submitted_at =
      object.submitted_at !== undefined && object.submitted_at !== null
        ? fromJsonTimestamp(object.submitted_at)
        : undefined;
    message.group_version =
      object.group_version !== undefined && object.group_version !== null
        ? Number(object.group_version)
        : 0;
    message.group_policy_version =
      object.group_policy_version !== undefined &&
      object.group_policy_version !== null
        ? Number(object.group_policy_version)
        : 0;
    message.status =
      object.status !== undefined && object.status !== null
        ? proposal_StatusFromJSON(object.status)
        : 0;
    message.result =
      object.result !== undefined && object.result !== null
        ? proposal_ResultFromJSON(object.result)
        : 0;
    message.vote_state =
      object.vote_state !== undefined && object.vote_state !== null
        ? Tally.fromJSON(object.vote_state)
        : undefined;
    message.timeout =
      object.timeout !== undefined && object.timeout !== null
        ? fromJsonTimestamp(object.timeout)
        : undefined;
    message.executor_result =
      object.executor_result !== undefined && object.executor_result !== null
        ? proposal_ExecutorResultFromJSON(object.executor_result)
        : 0;
    message.msgs = (object.msgs ?? []).map((e: any) => Any.fromJSON(e));
    return message;
  },

  toJSON(message: Proposal): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
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
    message.submitted_at !== undefined &&
      (obj.submitted_at = message.submitted_at.toISOString());
    message.group_version !== undefined &&
      (obj.group_version = Math.round(message.group_version));
    message.group_policy_version !== undefined &&
      (obj.group_policy_version = Math.round(message.group_policy_version));
    message.status !== undefined &&
      (obj.status = proposal_StatusToJSON(message.status));
    message.result !== undefined &&
      (obj.result = proposal_ResultToJSON(message.result));
    message.vote_state !== undefined &&
      (obj.vote_state = message.vote_state
        ? Tally.toJSON(message.vote_state)
        : undefined);
    message.timeout !== undefined &&
      (obj.timeout = message.timeout.toISOString());
    message.executor_result !== undefined &&
      (obj.executor_result = proposal_ExecutorResultToJSON(
        message.executor_result
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
    message.proposal_id = object.proposal_id ?? 0;
    message.address = object.address ?? "";
    message.metadata = object.metadata ?? new Uint8Array();
    message.proposers = object.proposers?.map((e) => e) || [];
    message.submitted_at = object.submitted_at ?? undefined;
    message.group_version = object.group_version ?? 0;
    message.group_policy_version = object.group_policy_version ?? 0;
    message.status = object.status ?? 0;
    message.result = object.result ?? 0;
    message.vote_state =
      object.vote_state !== undefined && object.vote_state !== null
        ? Tally.fromPartial(object.vote_state)
        : undefined;
    message.timeout = object.timeout ?? undefined;
    message.executor_result = object.executor_result ?? 0;
    message.msgs = object.msgs?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

const baseTally: object = {
  yes_count: "",
  no_count: "",
  abstain_count: "",
  veto_count: "",
};

export const Tally = {
  encode(message: Tally, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.yes_count !== "") {
      writer.uint32(10).string(message.yes_count);
    }
    if (message.no_count !== "") {
      writer.uint32(18).string(message.no_count);
    }
    if (message.abstain_count !== "") {
      writer.uint32(26).string(message.abstain_count);
    }
    if (message.veto_count !== "") {
      writer.uint32(34).string(message.veto_count);
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
          message.yes_count = reader.string();
          break;
        case 2:
          message.no_count = reader.string();
          break;
        case 3:
          message.abstain_count = reader.string();
          break;
        case 4:
          message.veto_count = reader.string();
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
    message.yes_count =
      object.yes_count !== undefined && object.yes_count !== null
        ? String(object.yes_count)
        : "";
    message.no_count =
      object.no_count !== undefined && object.no_count !== null
        ? String(object.no_count)
        : "";
    message.abstain_count =
      object.abstain_count !== undefined && object.abstain_count !== null
        ? String(object.abstain_count)
        : "";
    message.veto_count =
      object.veto_count !== undefined && object.veto_count !== null
        ? String(object.veto_count)
        : "";
    return message;
  },

  toJSON(message: Tally): unknown {
    const obj: any = {};
    message.yes_count !== undefined && (obj.yes_count = message.yes_count);
    message.no_count !== undefined && (obj.no_count = message.no_count);
    message.abstain_count !== undefined &&
      (obj.abstain_count = message.abstain_count);
    message.veto_count !== undefined && (obj.veto_count = message.veto_count);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tally>, I>>(object: I): Tally {
    const message = { ...baseTally } as Tally;
    message.yes_count = object.yes_count ?? "";
    message.no_count = object.no_count ?? "";
    message.abstain_count = object.abstain_count ?? "";
    message.veto_count = object.veto_count ?? "";
    return message;
  },
};

const baseVote: object = { proposal_id: 0, voter: "", choice: 0 };

export const Vote = {
  encode(message: Vote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
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
    if (message.submitted_at !== undefined) {
      Timestamp.encode(
        toTimestamp(message.submitted_at),
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
          message.proposal_id = longToNumber(reader.uint64() as Long);
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
          message.submitted_at = fromTimestamp(
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
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
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
    message.submitted_at =
      object.submitted_at !== undefined && object.submitted_at !== null
        ? fromJsonTimestamp(object.submitted_at)
        : undefined;
    return message;
  },

  toJSON(message: Vote): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    message.voter !== undefined && (obj.voter = message.voter);
    message.choice !== undefined && (obj.choice = choiceToJSON(message.choice));
    message.metadata !== undefined &&
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    message.submitted_at !== undefined &&
      (obj.submitted_at = message.submitted_at.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Vote>, I>>(object: I): Vote {
    const message = { ...baseVote } as Vote;
    message.proposal_id = object.proposal_id ?? 0;
    message.voter = object.voter ?? "";
    message.choice = object.choice ?? 0;
    message.metadata = object.metadata ?? new Uint8Array();
    message.submitted_at = object.submitted_at ?? undefined;
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
