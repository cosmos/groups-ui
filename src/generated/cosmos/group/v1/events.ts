/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  ProposalExecutorResult,
  proposalExecutorResultFromJSON,
  proposalExecutorResultToJSON,
} from "../../../cosmos/group/v1/types";

export const protobufPackage = "cosmos.group.v1";

/** EventCreateGroup is an event emitted when a group is created. */
export interface EventCreateGroup {
  /** group_id is the unique ID of the group. */
  group_id: number;
}

/** EventUpdateGroup is an event emitted when a group is updated. */
export interface EventUpdateGroup {
  /** group_id is the unique ID of the group. */
  group_id: number;
}

/** EventCreateGroupPolicy is an event emitted when a group policy is created. */
export interface EventCreateGroupPolicy {
  /** address is the account address of the group policy. */
  address: string;
}

/** EventUpdateGroupPolicy is an event emitted when a group policy is updated. */
export interface EventUpdateGroupPolicy {
  /** address is the account address of the group policy. */
  address: string;
}

/** EventSubmitProposal is an event emitted when a proposal is created. */
export interface EventSubmitProposal {
  /** proposal_id is the unique ID of the proposal. */
  proposal_id: number;
}

/** EventWithdrawProposal is an event emitted when a proposal is withdrawn. */
export interface EventWithdrawProposal {
  /** proposal_id is the unique ID of the proposal. */
  proposal_id: number;
}

/** EventVote is an event emitted when a voter votes on a proposal. */
export interface EventVote {
  /** proposal_id is the unique ID of the proposal. */
  proposal_id: number;
}

/** EventExec is an event emitted when a proposal is executed. */
export interface EventExec {
  /** proposal_id is the unique ID of the proposal. */
  proposal_id: number;
  /** result is the proposal execution result. */
  result: ProposalExecutorResult;
}

/** EventLeaveGroup is an event emitted when group member leaves the group. */
export interface EventLeaveGroup {
  /** group_id is the unique ID of the group. */
  group_id: number;
  /** address is the account address of the group member. */
  address: string;
}

const baseEventCreateGroup: object = { group_id: 0 };

export const EventCreateGroup = {
  encode(
    message: EventCreateGroup,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== 0) {
      writer.uint32(8).uint64(message.group_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventCreateGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventCreateGroup } as EventCreateGroup;
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

  fromJSON(object: any): EventCreateGroup {
    const message = { ...baseEventCreateGroup } as EventCreateGroup;
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    return message;
  },

  toJSON(message: EventCreateGroup): unknown {
    const obj: any = {};
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventCreateGroup>, I>>(
    object: I
  ): EventCreateGroup {
    const message = { ...baseEventCreateGroup } as EventCreateGroup;
    message.group_id = object.group_id ?? 0;
    return message;
  },
};

const baseEventUpdateGroup: object = { group_id: 0 };

export const EventUpdateGroup = {
  encode(
    message: EventUpdateGroup,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== 0) {
      writer.uint32(8).uint64(message.group_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUpdateGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventUpdateGroup } as EventUpdateGroup;
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

  fromJSON(object: any): EventUpdateGroup {
    const message = { ...baseEventUpdateGroup } as EventUpdateGroup;
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    return message;
  },

  toJSON(message: EventUpdateGroup): unknown {
    const obj: any = {};
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUpdateGroup>, I>>(
    object: I
  ): EventUpdateGroup {
    const message = { ...baseEventUpdateGroup } as EventUpdateGroup;
    message.group_id = object.group_id ?? 0;
    return message;
  },
};

const baseEventCreateGroupPolicy: object = { address: "" };

export const EventCreateGroupPolicy = {
  encode(
    message: EventCreateGroupPolicy,
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
  ): EventCreateGroupPolicy {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventCreateGroupPolicy } as EventCreateGroupPolicy;
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

  fromJSON(object: any): EventCreateGroupPolicy {
    const message = { ...baseEventCreateGroupPolicy } as EventCreateGroupPolicy;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    return message;
  },

  toJSON(message: EventCreateGroupPolicy): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventCreateGroupPolicy>, I>>(
    object: I
  ): EventCreateGroupPolicy {
    const message = { ...baseEventCreateGroupPolicy } as EventCreateGroupPolicy;
    message.address = object.address ?? "";
    return message;
  },
};

const baseEventUpdateGroupPolicy: object = { address: "" };

export const EventUpdateGroupPolicy = {
  encode(
    message: EventUpdateGroupPolicy,
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
  ): EventUpdateGroupPolicy {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventUpdateGroupPolicy } as EventUpdateGroupPolicy;
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

  fromJSON(object: any): EventUpdateGroupPolicy {
    const message = { ...baseEventUpdateGroupPolicy } as EventUpdateGroupPolicy;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    return message;
  },

  toJSON(message: EventUpdateGroupPolicy): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUpdateGroupPolicy>, I>>(
    object: I
  ): EventUpdateGroupPolicy {
    const message = { ...baseEventUpdateGroupPolicy } as EventUpdateGroupPolicy;
    message.address = object.address ?? "";
    return message;
  },
};

const baseEventSubmitProposal: object = { proposal_id: 0 };

export const EventSubmitProposal = {
  encode(
    message: EventSubmitProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSubmitProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventSubmitProposal } as EventSubmitProposal;
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

  fromJSON(object: any): EventSubmitProposal {
    const message = { ...baseEventSubmitProposal } as EventSubmitProposal;
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
        : 0;
    return message;
  },

  toJSON(message: EventSubmitProposal): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSubmitProposal>, I>>(
    object: I
  ): EventSubmitProposal {
    const message = { ...baseEventSubmitProposal } as EventSubmitProposal;
    message.proposal_id = object.proposal_id ?? 0;
    return message;
  },
};

const baseEventWithdrawProposal: object = { proposal_id: 0 };

export const EventWithdrawProposal = {
  encode(
    message: EventWithdrawProposal,
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
  ): EventWithdrawProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventWithdrawProposal } as EventWithdrawProposal;
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

  fromJSON(object: any): EventWithdrawProposal {
    const message = { ...baseEventWithdrawProposal } as EventWithdrawProposal;
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
        : 0;
    return message;
  },

  toJSON(message: EventWithdrawProposal): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventWithdrawProposal>, I>>(
    object: I
  ): EventWithdrawProposal {
    const message = { ...baseEventWithdrawProposal } as EventWithdrawProposal;
    message.proposal_id = object.proposal_id ?? 0;
    return message;
  },
};

const baseEventVote: object = { proposal_id: 0 };

export const EventVote = {
  encode(
    message: EventVote,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventVote } as EventVote;
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

  fromJSON(object: any): EventVote {
    const message = { ...baseEventVote } as EventVote;
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
        : 0;
    return message;
  },

  toJSON(message: EventVote): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventVote>, I>>(
    object: I
  ): EventVote {
    const message = { ...baseEventVote } as EventVote;
    message.proposal_id = object.proposal_id ?? 0;
    return message;
  },
};

const baseEventExec: object = { proposal_id: 0, result: 0 };

export const EventExec = {
  encode(
    message: EventExec,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
    }
    if (message.result !== 0) {
      writer.uint32(16).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventExec {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventExec } as EventExec;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal_id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.result = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventExec {
    const message = { ...baseEventExec } as EventExec;
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
        : 0;
    message.result =
      object.result !== undefined && object.result !== null
        ? proposalExecutorResultFromJSON(object.result)
        : 0;
    return message;
  },

  toJSON(message: EventExec): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    message.result !== undefined &&
      (obj.result = proposalExecutorResultToJSON(message.result));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventExec>, I>>(
    object: I
  ): EventExec {
    const message = { ...baseEventExec } as EventExec;
    message.proposal_id = object.proposal_id ?? 0;
    message.result = object.result ?? 0;
    return message;
  },
};

const baseEventLeaveGroup: object = { group_id: 0, address: "" };

export const EventLeaveGroup = {
  encode(
    message: EventLeaveGroup,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.group_id !== 0) {
      writer.uint32(8).uint64(message.group_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventLeaveGroup {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventLeaveGroup } as EventLeaveGroup;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.group_id = longToNumber(reader.uint64() as Long);
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

  fromJSON(object: any): EventLeaveGroup {
    const message = { ...baseEventLeaveGroup } as EventLeaveGroup;
    message.group_id =
      object.group_id !== undefined && object.group_id !== null
        ? Number(object.group_id)
        : 0;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    return message;
  },

  toJSON(message: EventLeaveGroup): unknown {
    const obj: any = {};
    message.group_id !== undefined &&
      (obj.group_id = Math.round(message.group_id));
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventLeaveGroup>, I>>(
    object: I
  ): EventLeaveGroup {
    const message = { ...baseEventLeaveGroup } as EventLeaveGroup;
    message.group_id = object.group_id ?? 0;
    message.address = object.address ?? "";
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
