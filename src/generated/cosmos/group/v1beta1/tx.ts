/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  VoteOption,
  Member,
  voteOptionFromJSON,
  voteOptionToJSON,
} from "../../../cosmos/group/v1beta1/types";
import { Any } from "../../../google/protobuf/any";

export const protobufPackage = "cosmos.group.v1beta1";

/** Exec defines modes of execution of a proposal on creation or on new vote. */
export enum Exec {
  /**
   * EXEC_UNSPECIFIED - An empty value means that there should be a separate
   * MsgExec request for the proposal to execute.
   */
  EXEC_UNSPECIFIED = 0,
  /**
   * EXEC_TRY - Try to execute the proposal immediately.
   * If the proposal is not allowed per the DecisionPolicy,
   * the proposal will still be open and could
   * be executed at a later point.
   */
  EXEC_TRY = 1,
  UNRECOGNIZED = -1,
}

export function execFromJSON(object: any): Exec {
  switch (object) {
    case 0:
    case "EXEC_UNSPECIFIED":
      return Exec.EXEC_UNSPECIFIED;
    case 1:
    case "EXEC_TRY":
      return Exec.EXEC_TRY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Exec.UNRECOGNIZED;
  }
}

export function execToJSON(object: Exec): string {
  switch (object) {
    case Exec.EXEC_UNSPECIFIED:
      return "EXEC_UNSPECIFIED";
    case Exec.EXEC_TRY:
      return "EXEC_TRY";
    default:
      return "UNKNOWN";
  }
}

/** MsgCreateGroup is the Msg/CreateGroup request type. */
export interface MsgCreateGroup {
  /** admin is the account address of the group admin. */
  admin: string;
  /** members defines the group members. */
  members: Member[];
  /** metadata is any arbitrary metadata to attached to the group. */
  metadata: string;
}

/** MsgCreateGroupResponse is the Msg/CreateGroup response type. */
export interface MsgCreateGroupResponse {
  /** group_id is the unique ID of the newly created group. */
  group_id: number;
}

/** MsgUpdateGroupMembers is the Msg/UpdateGroupMembers request type. */
export interface MsgUpdateGroupMembers {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: number;
  /**
   * member_updates is the list of members to update,
   * set weight to 0 to remove a member.
   */
  member_updates: Member[];
}

/** MsgUpdateGroupMembersResponse is the Msg/UpdateGroupMembers response type. */
export interface MsgUpdateGroupMembersResponse {}

/** MsgUpdateGroupAdmin is the Msg/UpdateGroupAdmin request type. */
export interface MsgUpdateGroupAdmin {
  /** admin is the current account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: number;
  /** new_admin is the group new admin account address. */
  new_admin: string;
}

/** MsgUpdateGroupAdminResponse is the Msg/UpdateGroupAdmin response type. */
export interface MsgUpdateGroupAdminResponse {}

/** MsgUpdateGroupMetadata is the Msg/UpdateGroupMetadata request type. */
export interface MsgUpdateGroupMetadata {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: number;
  /** metadata is the updated group's metadata. */
  metadata: string;
}

/** MsgUpdateGroupMetadataResponse is the Msg/UpdateGroupMetadata response type. */
export interface MsgUpdateGroupMetadataResponse {}

/** MsgCreateGroupPolicy is the Msg/CreateGroupPolicy request type. */
export interface MsgCreateGroupPolicy {
  /** admin is the account address of the group admin. */
  admin: string;
  /** group_id is the unique ID of the group. */
  group_id: number;
  /** metadata is any arbitrary metadata attached to the group policy. */
  metadata: string;
  /** decision_policy specifies the group policy's decision policy. */
  decision_policy: Any | undefined;
}

/** MsgCreateGroupPolicyResponse is the Msg/CreateGroupPolicy response type. */
export interface MsgCreateGroupPolicyResponse {
  /** address is the account address of the newly created group policy. */
  address: string;
}

/** MsgUpdateGroupPolicyAdmin is the Msg/UpdateGroupPolicyAdmin request type. */
export interface MsgUpdateGroupPolicyAdmin {
  /** admin is the account address of the group admin. */
  admin: string;
  /** address is the account address of the group policy. */
  address: string;
  /** new_admin is the new group policy admin. */
  new_admin: string;
}

/** MsgCreateGroupWithPolicy is the Msg/CreateGroupWithPolicy request type. */
export interface MsgCreateGroupWithPolicy {
  /** admin is the account address of the group and group policy admin. */
  admin: string;
  /** members defines the group members. */
  members: Member[];
  /** group_metadata is any arbitrary metadata attached to the group. */
  group_metadata: string;
  /** group_policy_metadata is any arbitrary metadata attached to the group policy. */
  group_policy_metadata: string;
  /** group_policy_as_admin is a boolean field, if set to true, the group policy account address will be used as group and group policy admin. */
  group_policy_as_admin: boolean;
  /** decision_policy specifies the group policy's decision policy. */
  decision_policy: Any | undefined;
}

/** MsgCreateGroupWithPolicyResponse is the Msg/CreateGroupWithPolicy response type. */
export interface MsgCreateGroupWithPolicyResponse {
  /** group_id is the unique ID of the newly created group with policy. */
  group_id: number;
  /** group_policy_address is the account address of the newly created group policy. */
  group_policy_address: string;
}

/** MsgUpdateGroupPolicyAdminResponse is the Msg/UpdateGroupPolicyAdmin response type. */
export interface MsgUpdateGroupPolicyAdminResponse {}

/** MsgUpdateGroupPolicyDecisionPolicy is the Msg/UpdateGroupPolicyDecisionPolicy request type. */
export interface MsgUpdateGroupPolicyDecisionPolicy {
  /** admin is the account address of the group admin. */
  admin: string;
  /** address is the account address of group policy. */
  address: string;
  /** decision_policy is the updated group policy's decision policy. */
  decision_policy: Any | undefined;
}

/** MsgUpdateGroupPolicyDecisionPolicyResponse is the Msg/UpdateGroupPolicyDecisionPolicy response type. */
export interface MsgUpdateGroupPolicyDecisionPolicyResponse {}

/** MsgUpdateGroupPolicyMetadata is the Msg/UpdateGroupPolicyMetadata request type. */
export interface MsgUpdateGroupPolicyMetadata {
  /** admin is the account address of the group admin. */
  admin: string;
  /** address is the account address of group policy. */
  address: string;
  /** metadata is the updated group policy metadata. */
  metadata: string;
}

/** MsgUpdateGroupPolicyMetadataResponse is the Msg/UpdateGroupPolicyMetadata response type. */
export interface MsgUpdateGroupPolicyMetadataResponse {}

/** MsgSubmitProposal is the Msg/SubmitProposal request type. */
export interface MsgSubmitProposal {
  /** address is the account address of group policy. */
  address: string;
  /**
   * proposers are the account addresses of the proposers.
   * Proposers signatures will be counted as yes votes.
   */
  proposers: string[];
  /** metadata is any arbitrary metadata to attached to the proposal. */
  metadata: string;
  /** messages is a list of `sdk.Msg`s that will be executed if the proposal passes. */
  messages: Any[];
  /**
   * exec defines the mode of execution of the proposal,
   * whether it should be executed immediately on creation or not.
   * If so, proposers signatures are considered as Yes votes.
   */
  exec: Exec;
}

/** MsgSubmitProposalResponse is the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponse {
  /** proposal is the unique ID of the proposal. */
  proposal_id: number;
}

/** MsgWithdrawProposal is the Msg/WithdrawProposal request type. */
export interface MsgWithdrawProposal {
  /** proposal is the unique ID of the proposal. */
  proposal_id: number;
  /** address is the admin of the group policy or one of the proposer of the proposal. */
  address: string;
}

/** MsgWithdrawProposalResponse is the Msg/WithdrawProposal response type. */
export interface MsgWithdrawProposalResponse {}

/** MsgVote is the Msg/Vote request type. */
export interface MsgVote {
  /** proposal is the unique ID of the proposal. */
  proposal_id: number;
  /** voter is the voter account address. */
  voter: string;
  /** option is the voter's choice on the proposal. */
  option: VoteOption;
  /** metadata is any arbitrary metadata to attached to the vote. */
  metadata: string;
  /**
   * exec defines whether the proposal should be executed
   * immediately after voting or not.
   */
  exec: Exec;
}

/** MsgVoteResponse is the Msg/Vote response type. */
export interface MsgVoteResponse {}

/** MsgExec is the Msg/Exec request type. */
export interface MsgExec {
  /** proposal is the unique ID of the proposal. */
  proposal_id: number;
  /** signer is the account address used to execute the proposal. */
  signer: string;
}

/** MsgExecResponse is the Msg/Exec request type. */
export interface MsgExecResponse {}

/** MsgLeaveGroup is the Msg/LeaveGroup request type. */
export interface MsgLeaveGroup {
  /** address is the account address of the group member. */
  address: string;
  /** group_id is the unique ID of the group. */
  group_id: number;
}

/** MsgLeaveGroupResponse is the Msg/LeaveGroup response type. */
export interface MsgLeaveGroupResponse {}

const baseMsgCreateGroup: object = { admin: "", metadata: "" };

export const MsgCreateGroup = {
  encode(
    message: MsgCreateGroup,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    for (const v of message.members) {
      Member.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateGroup } as MsgCreateGroup;
    message.members = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.members.push(Member.decode(reader, reader.uint32()));
          break;
        case 3:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroup {
    const message = { ...baseMsgCreateGroup } as MsgCreateGroup;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.members = (object.members ?? []).map((e: any) =>
      Member.fromJSON(e)
    );
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? String(object.metadata)
        : "";
    return message;
  },

  toJSON(message: MsgCreateGroup): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    if (message.members) {
      obj.members = message.members.map((e) =>
        e ? Member.toJSON(e) : undefined
      );
    } else {
      obj.members = [];
    }
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateGroup>, I>>(
    object: I
  ): MsgCreateGroup {
    const message = { ...baseMsgCreateGroup } as MsgCreateGroup;
    message.admin = object.admin ?? "";
    message.members = object.members?.map((e) => Member.fromPartial(e)) || [];
    message.metadata = object.metadata ?? "";
    return message;
  },
};

const baseMsgCreateGroupResponse: object = { group_id: 0 };

export const MsgCreateGroupResponse = {
  encode(
    message: MsgCreateGroupResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== 0) {
      writer.uint32(8).uint64(message.group_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateGroupResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateGroupResponse } as MsgCreateGroupResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupResponse {
    const message = { ...baseMsgCreateGroupResponse } as MsgCreateGroupResponse;
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    return message;
  },

  toJSON(message: MsgCreateGroupResponse): unknown {
    const obj: any = {};
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateGroupResponse>, I>>(
    object: I
  ): MsgCreateGroupResponse {
    const message = { ...baseMsgCreateGroupResponse } as MsgCreateGroupResponse;
    message.group_id = object.group_id ?? 0;
    return message;
  },
};

const baseMsgUpdateGroupMembers: object = { admin: "", group_id: 0 };

export const MsgUpdateGroupMembers = {
  encode(
    message: MsgUpdateGroupMembers,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_id !== 0) {
      writer.uint32(16).uint64(message.group_id);
    }
    for (const v of message.member_updates) {
      Member.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupMembers {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateGroupMembers } as MsgUpdateGroupMembers;
    message.member_updates = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.member_updates.push(Member.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupMembers {
    const message = { ...baseMsgUpdateGroupMembers } as MsgUpdateGroupMembers;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    message.member_updates = (object.member_updates ?? []).map((e: any) =>
      Member.fromJSON(e)
    );
    return message;
  },

  toJSON(message: MsgUpdateGroupMembers): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    if (message.member_updates) {
      obj.member_updates = message.member_updates.map((e) =>
        e ? Member.toJSON(e) : undefined
      );
    } else {
      obj.member_updates = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupMembers>, I>>(
    object: I
  ): MsgUpdateGroupMembers {
    const message = { ...baseMsgUpdateGroupMembers } as MsgUpdateGroupMembers;
    message.admin = object.admin ?? "";
    message.group_id = object.group_id ?? 0;
    message.member_updates =
      object.member_updates?.map((e) => Member.fromPartial(e)) || [];
    return message;
  },
};

const baseMsgUpdateGroupMembersResponse: object = {};

export const MsgUpdateGroupMembersResponse = {
  encode(
    _: MsgUpdateGroupMembersResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupMembersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateGroupMembersResponse,
    } as MsgUpdateGroupMembersResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupMembersResponse {
    const message = {
      ...baseMsgUpdateGroupMembersResponse,
    } as MsgUpdateGroupMembersResponse;
    return message;
  },

  toJSON(_: MsgUpdateGroupMembersResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupMembersResponse>, I>>(
    _: I
  ): MsgUpdateGroupMembersResponse {
    const message = {
      ...baseMsgUpdateGroupMembersResponse,
    } as MsgUpdateGroupMembersResponse;
    return message;
  },
};

const baseMsgUpdateGroupAdmin: object = {
  admin: "",
  group_id: 0,
  new_admin: "",
};

export const MsgUpdateGroupAdmin = {
  encode(
    message: MsgUpdateGroupAdmin,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_id !== 0) {
      writer.uint32(16).uint64(message.group_id);
    }
    if (message.new_admin !== "") {
      writer.uint32(26).string(message.new_admin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupAdmin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateGroupAdmin } as MsgUpdateGroupAdmin;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.new_admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupAdmin {
    const message = { ...baseMsgUpdateGroupAdmin } as MsgUpdateGroupAdmin;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    message.new_admin =
      object.new_admin !== undefined && object.new_admin !== null
        ? String(object.new_admin)
        : "";
    return message;
  },

  toJSON(message: MsgUpdateGroupAdmin): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    message.new_admin !== undefined && (obj.new_admin = message.new_admin);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupAdmin>, I>>(
    object: I
  ): MsgUpdateGroupAdmin {
    const message = { ...baseMsgUpdateGroupAdmin } as MsgUpdateGroupAdmin;
    message.admin = object.admin ?? "";
    message.group_id = object.group_id ?? 0;
    message.new_admin = object.new_admin ?? "";
    return message;
  },
};

const baseMsgUpdateGroupAdminResponse: object = {};

export const MsgUpdateGroupAdminResponse = {
  encode(
    _: MsgUpdateGroupAdminResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateGroupAdminResponse,
    } as MsgUpdateGroupAdminResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupAdminResponse {
    const message = {
      ...baseMsgUpdateGroupAdminResponse,
    } as MsgUpdateGroupAdminResponse;
    return message;
  },

  toJSON(_: MsgUpdateGroupAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupAdminResponse>, I>>(
    _: I
  ): MsgUpdateGroupAdminResponse {
    const message = {
      ...baseMsgUpdateGroupAdminResponse,
    } as MsgUpdateGroupAdminResponse;
    return message;
  },
};

const baseMsgUpdateGroupMetadata: object = {
  admin: "",
  group_id: 0,
  metadata: "",
};

export const MsgUpdateGroupMetadata = {
  encode(
    message: MsgUpdateGroupMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_id !== 0) {
      writer.uint32(16).uint64(message.group_id);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateGroupMetadata } as MsgUpdateGroupMetadata;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupMetadata {
    const message = { ...baseMsgUpdateGroupMetadata } as MsgUpdateGroupMetadata;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? String(object.metadata)
        : "";
    return message;
  },

  toJSON(message: MsgUpdateGroupMetadata): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupMetadata>, I>>(
    object: I
  ): MsgUpdateGroupMetadata {
    const message = { ...baseMsgUpdateGroupMetadata } as MsgUpdateGroupMetadata;
    message.admin = object.admin ?? "";
    message.group_id = object.group_id ?? 0;
    message.metadata = object.metadata ?? "";
    return message;
  },
};

const baseMsgUpdateGroupMetadataResponse: object = {};

export const MsgUpdateGroupMetadataResponse = {
  encode(
    _: MsgUpdateGroupMetadataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateGroupMetadataResponse,
    } as MsgUpdateGroupMetadataResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupMetadataResponse {
    const message = {
      ...baseMsgUpdateGroupMetadataResponse,
    } as MsgUpdateGroupMetadataResponse;
    return message;
  },

  toJSON(_: MsgUpdateGroupMetadataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupMetadataResponse>, I>>(
    _: I
  ): MsgUpdateGroupMetadataResponse {
    const message = {
      ...baseMsgUpdateGroupMetadataResponse,
    } as MsgUpdateGroupMetadataResponse;
    return message;
  },
};

const baseMsgCreateGroupPolicy: object = {
  admin: "",
  group_id: 0,
  metadata: "",
};

export const MsgCreateGroupPolicy = {
  encode(
    message: MsgCreateGroupPolicy,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.group_id !== 0) {
      writer.uint32(16).uint64(message.group_id);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.decision_policy !== undefined) {
      Any.encode(message.decision_policy, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateGroupPolicy {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateGroupPolicy } as MsgCreateGroupPolicy;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.group_id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.decision_policy = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupPolicy {
    const message = { ...baseMsgCreateGroupPolicy } as MsgCreateGroupPolicy;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? String(object.metadata)
        : "";
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromJSON(object.decision_policy)
        : undefined;
    return message;
  },

  toJSON(message: MsgCreateGroupPolicy): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.decision_policy !== undefined &&
      (obj.decision_policy = message.decision_policy
        ? Any.toJSON(message.decision_policy)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateGroupPolicy>, I>>(
    object: I
  ): MsgCreateGroupPolicy {
    const message = { ...baseMsgCreateGroupPolicy } as MsgCreateGroupPolicy;
    message.admin = object.admin ?? "";
    message.group_id = object.group_id ?? 0;
    message.metadata = object.metadata ?? "";
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromPartial(object.decision_policy)
        : undefined;
    return message;
  },
};

const baseMsgCreateGroupPolicyResponse: object = { address: "" };

export const MsgCreateGroupPolicyResponse = {
  encode(
    message: MsgCreateGroupPolicyResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateGroupPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateGroupPolicyResponse,
    } as MsgCreateGroupPolicyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupPolicyResponse {
    const message = {
      ...baseMsgCreateGroupPolicyResponse,
    } as MsgCreateGroupPolicyResponse;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    return message;
  },

  toJSON(message: MsgCreateGroupPolicyResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateGroupPolicyResponse>, I>>(
    object: I
  ): MsgCreateGroupPolicyResponse {
    const message = {
      ...baseMsgCreateGroupPolicyResponse,
    } as MsgCreateGroupPolicyResponse;
    message.address = object.address ?? "";
    return message;
  },
};

const baseMsgUpdateGroupPolicyAdmin: object = {
  admin: "",
  address: "",
  new_admin: "",
};

export const MsgUpdateGroupPolicyAdmin = {
  encode(
    message: MsgUpdateGroupPolicyAdmin,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.new_admin !== "") {
      writer.uint32(26).string(message.new_admin);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupPolicyAdmin {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateGroupPolicyAdmin,
    } as MsgUpdateGroupPolicyAdmin;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.new_admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupPolicyAdmin {
    const message = {
      ...baseMsgUpdateGroupPolicyAdmin,
    } as MsgUpdateGroupPolicyAdmin;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    message.new_admin =
      object.new_admin !== undefined && object.new_admin !== null
        ? String(object.new_admin)
        : "";
    return message;
  },

  toJSON(message: MsgUpdateGroupPolicyAdmin): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.address !== undefined && (obj.address = message.address);
    message.new_admin !== undefined && (obj.new_admin = message.new_admin);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupPolicyAdmin>, I>>(
    object: I
  ): MsgUpdateGroupPolicyAdmin {
    const message = {
      ...baseMsgUpdateGroupPolicyAdmin,
    } as MsgUpdateGroupPolicyAdmin;
    message.admin = object.admin ?? "";
    message.address = object.address ?? "";
    message.new_admin = object.new_admin ?? "";
    return message;
  },
};

const baseMsgCreateGroupWithPolicy: object = {
  admin: "",
  group_metadata: "",
  group_policy_metadata: "",
  group_policy_as_admin: false,
};

export const MsgCreateGroupWithPolicy = {
  encode(
    message: MsgCreateGroupWithPolicy,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    for (const v of message.members) {
      Member.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.group_metadata !== "") {
      writer.uint32(26).string(message.group_metadata);
    }
    if (message.group_policy_metadata !== "") {
      writer.uint32(34).string(message.group_policy_metadata);
    }
    if (message.group_policy_as_admin === true) {
      writer.uint32(40).bool(message.group_policy_as_admin);
    }
    if (message.decision_policy !== undefined) {
      Any.encode(message.decision_policy, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateGroupWithPolicy {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateGroupWithPolicy,
    } as MsgCreateGroupWithPolicy;
    message.members = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.members.push(Member.decode(reader, reader.uint32()));
          break;
        case 3:
          message.group_metadata = reader.string();
          break;
        case 4:
          message.group_policy_metadata = reader.string();
          break;
        case 5:
          message.group_policy_as_admin = reader.bool();
          break;
        case 6:
          message.decision_policy = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupWithPolicy {
    const message = {
      ...baseMsgCreateGroupWithPolicy,
    } as MsgCreateGroupWithPolicy;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.members = (object.members ?? []).map((e: any) =>
      Member.fromJSON(e)
    );
    message.group_metadata =
      object.group_metadata !== undefined && object.group_metadata !== null
        ? String(object.group_metadata)
        : "";
    message.group_policy_metadata =
      object.group_policy_metadata !== undefined &&
      object.group_policy_metadata !== null
        ? String(object.group_policy_metadata)
        : "";
    message.group_policy_as_admin =
      object.group_policy_as_admin !== undefined &&
      object.group_policy_as_admin !== null
        ? Boolean(object.group_policy_as_admin)
        : false;
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromJSON(object.decision_policy)
        : undefined;
    return message;
  },

  toJSON(message: MsgCreateGroupWithPolicy): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    if (message.members) {
      obj.members = message.members.map((e) =>
        e ? Member.toJSON(e) : undefined
      );
    } else {
      obj.members = [];
    }
    message.group_metadata !== undefined &&
      (obj.group_metadata = message.group_metadata);
    message.group_policy_metadata !== undefined &&
      (obj.group_policy_metadata = message.group_policy_metadata);
    message.group_policy_as_admin !== undefined &&
      (obj.group_policy_as_admin = message.group_policy_as_admin);
    message.decision_policy !== undefined &&
      (obj.decision_policy = message.decision_policy
        ? Any.toJSON(message.decision_policy)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateGroupWithPolicy>, I>>(
    object: I
  ): MsgCreateGroupWithPolicy {
    const message = {
      ...baseMsgCreateGroupWithPolicy,
    } as MsgCreateGroupWithPolicy;
    message.admin = object.admin ?? "";
    message.members = object.members?.map((e) => Member.fromPartial(e)) || [];
    message.group_metadata = object.group_metadata ?? "";
    message.group_policy_metadata = object.group_policy_metadata ?? "";
    message.group_policy_as_admin = object.group_policy_as_admin ?? false;
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromPartial(object.decision_policy)
        : undefined;
    return message;
  },
};

const baseMsgCreateGroupWithPolicyResponse: object = {
  group_id: 0,
  group_policy_address: "",
};

export const MsgCreateGroupWithPolicyResponse = {
  encode(
    message: MsgCreateGroupWithPolicyResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== 0) {
      writer.uint32(8).uint64(message.group_id);
    }
    if (message.group_policy_address !== "") {
      writer.uint32(18).string(message.group_policy_address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateGroupWithPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateGroupWithPolicyResponse,
    } as MsgCreateGroupWithPolicyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.group_policy_address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupWithPolicyResponse {
    const message = {
      ...baseMsgCreateGroupWithPolicyResponse,
    } as MsgCreateGroupWithPolicyResponse;
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    message.group_policy_address =
      object.group_policy_address !== undefined &&
      object.group_policy_address !== null
        ? String(object.group_policy_address)
        : "";
    return message;
  },

  toJSON(message: MsgCreateGroupWithPolicyResponse): unknown {
    const obj: any = {};
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    message.group_policy_address !== undefined &&
      (obj.group_policy_address = message.group_policy_address);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgCreateGroupWithPolicyResponse>, I>
  >(object: I): MsgCreateGroupWithPolicyResponse {
    const message = {
      ...baseMsgCreateGroupWithPolicyResponse,
    } as MsgCreateGroupWithPolicyResponse;
    message.group_id = object.group_id ?? 0;
    message.group_policy_address = object.group_policy_address ?? "";
    return message;
  },
};

const baseMsgUpdateGroupPolicyAdminResponse: object = {};

export const MsgUpdateGroupPolicyAdminResponse = {
  encode(
    _: MsgUpdateGroupPolicyAdminResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupPolicyAdminResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateGroupPolicyAdminResponse,
    } as MsgUpdateGroupPolicyAdminResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupPolicyAdminResponse {
    const message = {
      ...baseMsgUpdateGroupPolicyAdminResponse,
    } as MsgUpdateGroupPolicyAdminResponse;
    return message;
  },

  toJSON(_: MsgUpdateGroupPolicyAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgUpdateGroupPolicyAdminResponse>, I>
  >(_: I): MsgUpdateGroupPolicyAdminResponse {
    const message = {
      ...baseMsgUpdateGroupPolicyAdminResponse,
    } as MsgUpdateGroupPolicyAdminResponse;
    return message;
  },
};

const baseMsgUpdateGroupPolicyDecisionPolicy: object = {
  admin: "",
  address: "",
};

export const MsgUpdateGroupPolicyDecisionPolicy = {
  encode(
    message: MsgUpdateGroupPolicyDecisionPolicy,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.decision_policy !== undefined) {
      Any.encode(message.decision_policy, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupPolicyDecisionPolicy {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateGroupPolicyDecisionPolicy,
    } as MsgUpdateGroupPolicyDecisionPolicy;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.decision_policy = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupPolicyDecisionPolicy {
    const message = {
      ...baseMsgUpdateGroupPolicyDecisionPolicy,
    } as MsgUpdateGroupPolicyDecisionPolicy;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromJSON(object.decision_policy)
        : undefined;
    return message;
  },

  toJSON(message: MsgUpdateGroupPolicyDecisionPolicy): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.address !== undefined && (obj.address = message.address);
    message.decision_policy !== undefined &&
      (obj.decision_policy = message.decision_policy
        ? Any.toJSON(message.decision_policy)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgUpdateGroupPolicyDecisionPolicy>, I>
  >(object: I): MsgUpdateGroupPolicyDecisionPolicy {
    const message = {
      ...baseMsgUpdateGroupPolicyDecisionPolicy,
    } as MsgUpdateGroupPolicyDecisionPolicy;
    message.admin = object.admin ?? "";
    message.address = object.address ?? "";
    message.decision_policy =
      object.decision_policy !== undefined && object.decision_policy !== null
        ? Any.fromPartial(object.decision_policy)
        : undefined;
    return message;
  },
};

const baseMsgUpdateGroupPolicyDecisionPolicyResponse: object = {};

export const MsgUpdateGroupPolicyDecisionPolicyResponse = {
  encode(
    _: MsgUpdateGroupPolicyDecisionPolicyResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupPolicyDecisionPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateGroupPolicyDecisionPolicyResponse,
    } as MsgUpdateGroupPolicyDecisionPolicyResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupPolicyDecisionPolicyResponse {
    const message = {
      ...baseMsgUpdateGroupPolicyDecisionPolicyResponse,
    } as MsgUpdateGroupPolicyDecisionPolicyResponse;
    return message;
  },

  toJSON(_: MsgUpdateGroupPolicyDecisionPolicyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgUpdateGroupPolicyDecisionPolicyResponse>, I>
  >(_: I): MsgUpdateGroupPolicyDecisionPolicyResponse {
    const message = {
      ...baseMsgUpdateGroupPolicyDecisionPolicyResponse,
    } as MsgUpdateGroupPolicyDecisionPolicyResponse;
    return message;
  },
};

const baseMsgUpdateGroupPolicyMetadata: object = {
  admin: "",
  address: "",
  metadata: "",
};

export const MsgUpdateGroupPolicyMetadata = {
  encode(
    message: MsgUpdateGroupPolicyMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupPolicyMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateGroupPolicyMetadata,
    } as MsgUpdateGroupPolicyMetadata;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupPolicyMetadata {
    const message = {
      ...baseMsgUpdateGroupPolicyMetadata,
    } as MsgUpdateGroupPolicyMetadata;
    message.admin =
      object.admin !== undefined && object.admin !== null
        ? String(object.admin)
        : "";
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? String(object.metadata)
        : "";
    return message;
  },

  toJSON(message: MsgUpdateGroupPolicyMetadata): unknown {
    const obj: any = {};
    message.admin !== undefined && (obj.admin = message.admin);
    message.address !== undefined && (obj.address = message.address);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupPolicyMetadata>, I>>(
    object: I
  ): MsgUpdateGroupPolicyMetadata {
    const message = {
      ...baseMsgUpdateGroupPolicyMetadata,
    } as MsgUpdateGroupPolicyMetadata;
    message.admin = object.admin ?? "";
    message.address = object.address ?? "";
    message.metadata = object.metadata ?? "";
    return message;
  },
};

const baseMsgUpdateGroupPolicyMetadataResponse: object = {};

export const MsgUpdateGroupPolicyMetadataResponse = {
  encode(
    _: MsgUpdateGroupPolicyMetadataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateGroupPolicyMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgUpdateGroupPolicyMetadataResponse,
    } as MsgUpdateGroupPolicyMetadataResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupPolicyMetadataResponse {
    const message = {
      ...baseMsgUpdateGroupPolicyMetadataResponse,
    } as MsgUpdateGroupPolicyMetadataResponse;
    return message;
  },

  toJSON(_: MsgUpdateGroupPolicyMetadataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgUpdateGroupPolicyMetadataResponse>, I>
  >(_: I): MsgUpdateGroupPolicyMetadataResponse {
    const message = {
      ...baseMsgUpdateGroupPolicyMetadataResponse,
    } as MsgUpdateGroupPolicyMetadataResponse;
    return message;
  },
};

const baseMsgSubmitProposal: object = {
  address: "",
  proposers: "",
  metadata: "",
  exec: 0,
};

export const MsgSubmitProposal = {
  encode(
    message: MsgSubmitProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.proposers) {
      writer.uint32(18).string(v!);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.exec !== 0) {
      writer.uint32(40).int32(message.exec);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSubmitProposal } as MsgSubmitProposal;
    message.proposers = [];
    message.messages = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.proposers.push(reader.string());
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.messages.push(Any.decode(reader, reader.uint32()));
          break;
        case 5:
          message.exec = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitProposal {
    const message = { ...baseMsgSubmitProposal } as MsgSubmitProposal;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    message.proposers = (object.proposers ?? []).map((e: any) => String(e));
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? String(object.metadata)
        : "";
    message.messages = (object.messages ?? []).map((e: any) => Any.fromJSON(e));
    message.exec =
      object.exec !== undefined && object.exec !== null
        ? execFromJSON(object.exec)
        : 0;
    return message;
  },

  toJSON(message: MsgSubmitProposal): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.proposers) {
      obj.proposers = message.proposers.map((e) => e);
    } else {
      obj.proposers = [];
    }
    message.metadata !== undefined && (obj.metadata = message.metadata);
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Any.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    message.exec !== undefined && (obj.exec = execToJSON(message.exec));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitProposal>, I>>(
    object: I
  ): MsgSubmitProposal {
    const message = { ...baseMsgSubmitProposal } as MsgSubmitProposal;
    message.address = object.address ?? "";
    message.proposers = object.proposers?.map((e) => e) || [];
    message.metadata = object.metadata ?? "";
    message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
    message.exec = object.exec ?? 0;
    return message;
  },
};

const baseMsgSubmitProposalResponse: object = { proposal_id: 0 };

export const MsgSubmitProposalResponse = {
  encode(
    message: MsgSubmitProposalResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSubmitProposalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSubmitProposalResponse,
    } as MsgSubmitProposalResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitProposalResponse {
    const message = {
      ...baseMsgSubmitProposalResponse,
    } as MsgSubmitProposalResponse;
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
        : 0;
    return message;
  },

  toJSON(message: MsgSubmitProposalResponse): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitProposalResponse>, I>>(
    object: I
  ): MsgSubmitProposalResponse {
    const message = {
      ...baseMsgSubmitProposalResponse,
    } as MsgSubmitProposalResponse;
    message.proposal_id = object.proposal_id ?? 0;
    return message;
  },
};

const baseMsgWithdrawProposal: object = { proposal_id: 0, address: "" };

export const MsgWithdrawProposal = {
  encode(
    message: MsgWithdrawProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgWithdrawProposal } as MsgWithdrawProposal;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawProposal {
    const message = { ...baseMsgWithdrawProposal } as MsgWithdrawProposal;
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
        : 0;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    return message;
  },

  toJSON(message: MsgWithdrawProposal): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdrawProposal>, I>>(
    object: I
  ): MsgWithdrawProposal {
    const message = { ...baseMsgWithdrawProposal } as MsgWithdrawProposal;
    message.proposal_id = object.proposal_id ?? 0;
    message.address = object.address ?? "";
    return message;
  },
};

const baseMsgWithdrawProposalResponse: object = {};

export const MsgWithdrawProposalResponse = {
  encode(
    _: MsgWithdrawProposalResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgWithdrawProposalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgWithdrawProposalResponse,
    } as MsgWithdrawProposalResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgWithdrawProposalResponse {
    const message = {
      ...baseMsgWithdrawProposalResponse,
    } as MsgWithdrawProposalResponse;
    return message;
  },

  toJSON(_: MsgWithdrawProposalResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgWithdrawProposalResponse>, I>>(
    _: I
  ): MsgWithdrawProposalResponse {
    const message = {
      ...baseMsgWithdrawProposalResponse,
    } as MsgWithdrawProposalResponse;
    return message;
  },
};

const baseMsgVote: object = {
  proposal_id: 0,
  voter: "",
  option: 0,
  metadata: "",
  exec: 0,
};

export const MsgVote = {
  encode(
    message: MsgVote,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    if (message.option !== 0) {
      writer.uint32(24).int32(message.option);
    }
    if (message.metadata !== "") {
      writer.uint32(34).string(message.metadata);
    }
    if (message.exec !== 0) {
      writer.uint32(40).int32(message.exec);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgVote } as MsgVote;
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
          message.option = reader.int32() as any;
          break;
        case 4:
          message.metadata = reader.string();
          break;
        case 5:
          message.exec = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgVote {
    const message = { ...baseMsgVote } as MsgVote;
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
        : 0;
    message.voter =
      object.voter !== undefined && object.voter !== null
        ? String(object.voter)
        : "";
    message.option =
      object.option !== undefined && object.option !== null
        ? voteOptionFromJSON(object.option)
        : 0;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? String(object.metadata)
        : "";
    message.exec =
      object.exec !== undefined && object.exec !== null
        ? execFromJSON(object.exec)
        : 0;
    return message;
  },

  toJSON(message: MsgVote): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    message.voter !== undefined && (obj.voter = message.voter);
    message.option !== undefined &&
      (obj.option = voteOptionToJSON(message.option));
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.exec !== undefined && (obj.exec = execToJSON(message.exec));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVote>, I>>(object: I): MsgVote {
    const message = { ...baseMsgVote } as MsgVote;
    message.proposal_id = object.proposal_id ?? 0;
    message.voter = object.voter ?? "";
    message.option = object.option ?? 0;
    message.metadata = object.metadata ?? "";
    message.exec = object.exec ?? 0;
    return message;
  },
};

const baseMsgVoteResponse: object = {};

export const MsgVoteResponse = {
  encode(
    _: MsgVoteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVoteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgVoteResponse } as MsgVoteResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgVoteResponse {
    const message = { ...baseMsgVoteResponse } as MsgVoteResponse;
    return message;
  },

  toJSON(_: MsgVoteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVoteResponse>, I>>(
    _: I
  ): MsgVoteResponse {
    const message = { ...baseMsgVoteResponse } as MsgVoteResponse;
    return message;
  },
};

const baseMsgExec: object = { proposal_id: 0, signer: "" };

export const MsgExec = {
  encode(
    message: MsgExec,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.signer !== "") {
      writer.uint32(18).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExec {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgExec } as MsgExec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.signer = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgExec {
    const message = { ...baseMsgExec } as MsgExec;
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
        : 0;
    message.signer =
      object.signer !== undefined && object.signer !== null
        ? String(object.signer)
        : "";
    return message;
  },

  toJSON(message: MsgExec): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    message.signer !== undefined && (obj.signer = message.signer);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgExec>, I>>(object: I): MsgExec {
    const message = { ...baseMsgExec } as MsgExec;
    message.proposal_id = object.proposal_id ?? 0;
    message.signer = object.signer ?? "";
    return message;
  },
};

const baseMsgExecResponse: object = {};

export const MsgExecResponse = {
  encode(
    _: MsgExecResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgExecResponse } as MsgExecResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgExecResponse {
    const message = { ...baseMsgExecResponse } as MsgExecResponse;
    return message;
  },

  toJSON(_: MsgExecResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgExecResponse>, I>>(
    _: I
  ): MsgExecResponse {
    const message = { ...baseMsgExecResponse } as MsgExecResponse;
    return message;
  },
};

const baseMsgLeaveGroup: object = { address: "", group_id: 0 };

export const MsgLeaveGroup = {
  encode(
    message: MsgLeaveGroup,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.group_id !== 0) {
      writer.uint32(16).uint64(message.group_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLeaveGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgLeaveGroup } as MsgLeaveGroup;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.group_id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgLeaveGroup {
    const message = { ...baseMsgLeaveGroup } as MsgLeaveGroup;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    return message;
  },

  toJSON(message: MsgLeaveGroup): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLeaveGroup>, I>>(
    object: I
  ): MsgLeaveGroup {
    const message = { ...baseMsgLeaveGroup } as MsgLeaveGroup;
    message.address = object.address ?? "";
    message.group_id = object.group_id ?? 0;
    return message;
  },
};

const baseMsgLeaveGroupResponse: object = {};

export const MsgLeaveGroupResponse = {
  encode(
    _: MsgLeaveGroupResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgLeaveGroupResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgLeaveGroupResponse } as MsgLeaveGroupResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgLeaveGroupResponse {
    const message = { ...baseMsgLeaveGroupResponse } as MsgLeaveGroupResponse;
    return message;
  },

  toJSON(_: MsgLeaveGroupResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLeaveGroupResponse>, I>>(
    _: I
  ): MsgLeaveGroupResponse {
    const message = { ...baseMsgLeaveGroupResponse } as MsgLeaveGroupResponse;
    return message;
  },
};

/** Msg is the cosmos.group.v1beta1 Msg service. */
export interface Msg {
  /** CreateGroup creates a new group with an admin account address, a list of members and some optional metadata. */
  CreateGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse>;
  /** UpdateGroupMembers updates the group members with given group id and admin address. */
  UpdateGroupMembers(
    request: MsgUpdateGroupMembers
  ): Promise<MsgUpdateGroupMembersResponse>;
  /** UpdateGroupAdmin updates the group admin with given group id and previous admin address. */
  UpdateGroupAdmin(
    request: MsgUpdateGroupAdmin
  ): Promise<MsgUpdateGroupAdminResponse>;
  /** UpdateGroupMetadata updates the group metadata with given group id and admin address. */
  UpdateGroupMetadata(
    request: MsgUpdateGroupMetadata
  ): Promise<MsgUpdateGroupMetadataResponse>;
  /** CreateGroupPolicy creates a new group policy using given DecisionPolicy. */
  CreateGroupPolicy(
    request: MsgCreateGroupPolicy
  ): Promise<MsgCreateGroupPolicyResponse>;
  /** CreateGroupWithPolicy creates a new group with policy. */
  CreateGroupWithPolicy(
    request: MsgCreateGroupWithPolicy
  ): Promise<MsgCreateGroupWithPolicyResponse>;
  /** UpdateGroupPolicyAdmin updates a group policy admin. */
  UpdateGroupPolicyAdmin(
    request: MsgUpdateGroupPolicyAdmin
  ): Promise<MsgUpdateGroupPolicyAdminResponse>;
  /** UpdateGroupPolicyDecisionPolicy allows a group policy's decision policy to be updated. */
  UpdateGroupPolicyDecisionPolicy(
    request: MsgUpdateGroupPolicyDecisionPolicy
  ): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse>;
  /** UpdateGroupPolicyMetadata updates a group policy metadata. */
  UpdateGroupPolicyMetadata(
    request: MsgUpdateGroupPolicyMetadata
  ): Promise<MsgUpdateGroupPolicyMetadataResponse>;
  /** SubmitProposal submits a new proposal. */
  SubmitProposal(
    request: MsgSubmitProposal
  ): Promise<MsgSubmitProposalResponse>;
  /** WithdrawProposal aborts a proposal. */
  WithdrawProposal(
    request: MsgWithdrawProposal
  ): Promise<MsgWithdrawProposalResponse>;
  /** Vote allows a voter to vote on a proposal. */
  Vote(request: MsgVote): Promise<MsgVoteResponse>;
  /** Exec executes a proposal. */
  Exec(request: MsgExec): Promise<MsgExecResponse>;
  /** LeaveGroup allows a group member to leave the group. */
  LeaveGroup(request: MsgLeaveGroup): Promise<MsgLeaveGroupResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateGroup = this.CreateGroup.bind(this);
    this.UpdateGroupMembers = this.UpdateGroupMembers.bind(this);
    this.UpdateGroupAdmin = this.UpdateGroupAdmin.bind(this);
    this.UpdateGroupMetadata = this.UpdateGroupMetadata.bind(this);
    this.CreateGroupPolicy = this.CreateGroupPolicy.bind(this);
    this.CreateGroupWithPolicy = this.CreateGroupWithPolicy.bind(this);
    this.UpdateGroupPolicyAdmin = this.UpdateGroupPolicyAdmin.bind(this);
    this.UpdateGroupPolicyDecisionPolicy =
      this.UpdateGroupPolicyDecisionPolicy.bind(this);
    this.UpdateGroupPolicyMetadata = this.UpdateGroupPolicyMetadata.bind(this);
    this.SubmitProposal = this.SubmitProposal.bind(this);
    this.WithdrawProposal = this.WithdrawProposal.bind(this);
    this.Vote = this.Vote.bind(this);
    this.Exec = this.Exec.bind(this);
    this.LeaveGroup = this.LeaveGroup.bind(this);
  }
  CreateGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse> {
    const data = MsgCreateGroup.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "CreateGroup",
      data
    );
    return promise.then((data) =>
      MsgCreateGroupResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateGroupMembers(
    request: MsgUpdateGroupMembers
  ): Promise<MsgUpdateGroupMembersResponse> {
    const data = MsgUpdateGroupMembers.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "UpdateGroupMembers",
      data
    );
    return promise.then((data) =>
      MsgUpdateGroupMembersResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateGroupAdmin(
    request: MsgUpdateGroupAdmin
  ): Promise<MsgUpdateGroupAdminResponse> {
    const data = MsgUpdateGroupAdmin.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "UpdateGroupAdmin",
      data
    );
    return promise.then((data) =>
      MsgUpdateGroupAdminResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateGroupMetadata(
    request: MsgUpdateGroupMetadata
  ): Promise<MsgUpdateGroupMetadataResponse> {
    const data = MsgUpdateGroupMetadata.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "UpdateGroupMetadata",
      data
    );
    return promise.then((data) =>
      MsgUpdateGroupMetadataResponse.decode(new _m0.Reader(data))
    );
  }

  CreateGroupPolicy(
    request: MsgCreateGroupPolicy
  ): Promise<MsgCreateGroupPolicyResponse> {
    const data = MsgCreateGroupPolicy.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "CreateGroupPolicy",
      data
    );
    return promise.then((data) =>
      MsgCreateGroupPolicyResponse.decode(new _m0.Reader(data))
    );
  }

  CreateGroupWithPolicy(
    request: MsgCreateGroupWithPolicy
  ): Promise<MsgCreateGroupWithPolicyResponse> {
    const data = MsgCreateGroupWithPolicy.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "CreateGroupWithPolicy",
      data
    );
    return promise.then((data) =>
      MsgCreateGroupWithPolicyResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateGroupPolicyAdmin(
    request: MsgUpdateGroupPolicyAdmin
  ): Promise<MsgUpdateGroupPolicyAdminResponse> {
    const data = MsgUpdateGroupPolicyAdmin.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "UpdateGroupPolicyAdmin",
      data
    );
    return promise.then((data) =>
      MsgUpdateGroupPolicyAdminResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateGroupPolicyDecisionPolicy(
    request: MsgUpdateGroupPolicyDecisionPolicy
  ): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse> {
    const data = MsgUpdateGroupPolicyDecisionPolicy.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "UpdateGroupPolicyDecisionPolicy",
      data
    );
    return promise.then((data) =>
      MsgUpdateGroupPolicyDecisionPolicyResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateGroupPolicyMetadata(
    request: MsgUpdateGroupPolicyMetadata
  ): Promise<MsgUpdateGroupPolicyMetadataResponse> {
    const data = MsgUpdateGroupPolicyMetadata.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "UpdateGroupPolicyMetadata",
      data
    );
    return promise.then((data) =>
      MsgUpdateGroupPolicyMetadataResponse.decode(new _m0.Reader(data))
    );
  }

  SubmitProposal(
    request: MsgSubmitProposal
  ): Promise<MsgSubmitProposalResponse> {
    const data = MsgSubmitProposal.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "SubmitProposal",
      data
    );
    return promise.then((data) =>
      MsgSubmitProposalResponse.decode(new _m0.Reader(data))
    );
  }

  WithdrawProposal(
    request: MsgWithdrawProposal
  ): Promise<MsgWithdrawProposalResponse> {
    const data = MsgWithdrawProposal.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "WithdrawProposal",
      data
    );
    return promise.then((data) =>
      MsgWithdrawProposalResponse.decode(new _m0.Reader(data))
    );
  }

  Vote(request: MsgVote): Promise<MsgVoteResponse> {
    const data = MsgVote.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1beta1.Msg", "Vote", data);
    return promise.then((data) => MsgVoteResponse.decode(new _m0.Reader(data)));
  }

  Exec(request: MsgExec): Promise<MsgExecResponse> {
    const data = MsgExec.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1beta1.Msg", "Exec", data);
    return promise.then((data) => MsgExecResponse.decode(new _m0.Reader(data)));
  }

  LeaveGroup(request: MsgLeaveGroup): Promise<MsgLeaveGroupResponse> {
    const data = MsgLeaveGroup.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.group.v1beta1.Msg",
      "LeaveGroup",
      data
    );
    return promise.then((data) =>
      MsgLeaveGroupResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
