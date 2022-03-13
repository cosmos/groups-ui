/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { CapabilityOwners } from "../../../cosmos/capability/v1beta1/capability";

export const protobufPackage = "cosmos.capability.v1beta1";

/** GenesisOwners defines the capability owners with their corresponding index. */
export interface GenesisOwners {
  /** index is the index of the capability owner. */
  index: number;
  /** index_owners are the owners at the given index. */
  index_owners: CapabilityOwners | undefined;
}

/** GenesisState defines the capability module's genesis state. */
export interface GenesisState {
  /** index is the capability global index. */
  index: number;
  /**
   * owners represents a map from index to owners of the capability index
   * index key is string to allow amino marshalling.
   */
  owners: GenesisOwners[];
}

const baseGenesisOwners: object = { index: 0 };

export const GenesisOwners = {
  encode(
    message: GenesisOwners,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint64(message.index);
    }
    if (message.index_owners !== undefined) {
      CapabilityOwners.encode(
        message.index_owners,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisOwners {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisOwners } as GenesisOwners;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.index_owners = CapabilityOwners.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisOwners {
    const message = { ...baseGenesisOwners } as GenesisOwners;
    message.index =
      object.index !== undefined && object.index !== null
        ? Number(object.index)
        : 0;
    message.index_owners =
      object.index_owners !== undefined && object.index_owners !== null
        ? CapabilityOwners.fromJSON(object.index_owners)
        : undefined;
    return message;
  },

  toJSON(message: GenesisOwners): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = Math.round(message.index));
    message.index_owners !== undefined &&
      (obj.index_owners = message.index_owners
        ? CapabilityOwners.toJSON(message.index_owners)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisOwners>, I>>(
    object: I
  ): GenesisOwners {
    const message = { ...baseGenesisOwners } as GenesisOwners;
    message.index = object.index ?? 0;
    message.index_owners =
      object.index_owners !== undefined && object.index_owners !== null
        ? CapabilityOwners.fromPartial(object.index_owners)
        : undefined;
    return message;
  },
};

const baseGenesisState: object = { index: 0 };

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint64(message.index);
    }
    for (const v of message.owners) {
      GenesisOwners.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.owners = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.owners.push(GenesisOwners.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.index =
      object.index !== undefined && object.index !== null
        ? Number(object.index)
        : 0;
    message.owners = (object.owners ?? []).map((e: any) =>
      GenesisOwners.fromJSON(e)
    );
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = Math.round(message.index));
    if (message.owners) {
      obj.owners = message.owners.map((e) =>
        e ? GenesisOwners.toJSON(e) : undefined
      );
    } else {
      obj.owners = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.index = object.index ?? 0;
    message.owners =
      object.owners?.map((e) => GenesisOwners.fromPartial(e)) || [];
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
