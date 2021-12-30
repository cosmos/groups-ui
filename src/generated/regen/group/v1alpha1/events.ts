/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "regen.group.v1alpha1";

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

/** EventCreateGroupAccount is an event emitted when a group account is created. */
export interface EventCreateGroupAccount {
  /** address is the address of the group account. */
  address: string;
}

/** EventUpdateGroupAccount is an event emitted when a group account is updated. */
export interface EventUpdateGroupAccount {
  /** address is the address of the group account. */
  address: string;
}

/** EventCreateProposal is an event emitted when a proposal is created. */
export interface EventCreateProposal {
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

const baseEventCreateGroupAccount: object = { address: "" };

export const EventCreateGroupAccount = {
  encode(
    message: EventCreateGroupAccount,
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
  ): EventCreateGroupAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseEventCreateGroupAccount,
    } as EventCreateGroupAccount;
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

  fromJSON(object: any): EventCreateGroupAccount {
    const message = {
      ...baseEventCreateGroupAccount,
    } as EventCreateGroupAccount;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    return message;
  },

  toJSON(message: EventCreateGroupAccount): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventCreateGroupAccount>, I>>(
    object: I
  ): EventCreateGroupAccount {
    const message = {
      ...baseEventCreateGroupAccount,
    } as EventCreateGroupAccount;
    message.address = object.address ?? "";
    return message;
  },
};

const baseEventUpdateGroupAccount: object = { address: "" };

export const EventUpdateGroupAccount = {
  encode(
    message: EventUpdateGroupAccount,
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
  ): EventUpdateGroupAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseEventUpdateGroupAccount,
    } as EventUpdateGroupAccount;
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

  fromJSON(object: any): EventUpdateGroupAccount {
    const message = {
      ...baseEventUpdateGroupAccount,
    } as EventUpdateGroupAccount;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    return message;
  },

  toJSON(message: EventUpdateGroupAccount): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUpdateGroupAccount>, I>>(
    object: I
  ): EventUpdateGroupAccount {
    const message = {
      ...baseEventUpdateGroupAccount,
    } as EventUpdateGroupAccount;
    message.address = object.address ?? "";
    return message;
  },
};

const baseEventCreateProposal: object = { proposal_id: 0 };

export const EventCreateProposal = {
  encode(
    message: EventCreateProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventCreateProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventCreateProposal } as EventCreateProposal;
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

  fromJSON(object: any): EventCreateProposal {
    const message = { ...baseEventCreateProposal } as EventCreateProposal;
    message.proposal_id =
      object.proposal_id !== undefined && object.proposal_id !== null
        ? Number(object.proposal_id)
        : 0;
    return message;
  },

  toJSON(message: EventCreateProposal): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventCreateProposal>, I>>(
    object: I
  ): EventCreateProposal {
    const message = { ...baseEventCreateProposal } as EventCreateProposal;
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

const baseEventExec: object = { proposal_id: 0 };

export const EventExec = {
  encode(
    message: EventExec,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal_id !== 0) {
      writer.uint32(8).uint64(message.proposal_id);
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
    return message;
  },

  toJSON(message: EventExec): unknown {
    const obj: any = {};
    message.proposal_id !== undefined &&
      (obj.proposal_id = Math.round(message.proposal_id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventExec>, I>>(
    object: I
  ): EventExec {
    const message = { ...baseEventExec } as EventExec;
    message.proposal_id = object.proposal_id ?? 0;
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
