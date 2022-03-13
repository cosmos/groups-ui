/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PublicKey } from "../../tendermint/crypto/keys";

export const protobufPackage = "tendermint.types";

export interface ValidatorSet {
  validators: Validator[];
  proposer: Validator | undefined;
  total_voting_power: number;
}

export interface Validator {
  address: Uint8Array;
  pub_key: PublicKey | undefined;
  voting_power: number;
  proposer_priority: number;
}

export interface SimpleValidator {
  pub_key: PublicKey | undefined;
  voting_power: number;
}

const baseValidatorSet: object = { total_voting_power: 0 };

export const ValidatorSet = {
  encode(
    message: ValidatorSet,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.proposer !== undefined) {
      Validator.encode(message.proposer, writer.uint32(18).fork()).ldelim();
    }
    if (message.total_voting_power !== 0) {
      writer.uint32(24).int64(message.total_voting_power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSet {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValidatorSet } as ValidatorSet;
    message.validators = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validators.push(Validator.decode(reader, reader.uint32()));
          break;
        case 2:
          message.proposer = Validator.decode(reader, reader.uint32());
          break;
        case 3:
          message.total_voting_power = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorSet {
    const message = { ...baseValidatorSet } as ValidatorSet;
    message.validators = (object.validators ?? []).map((e: any) =>
      Validator.fromJSON(e)
    );
    message.proposer =
      object.proposer !== undefined && object.proposer !== null
        ? Validator.fromJSON(object.proposer)
        : undefined;
    message.total_voting_power =
      object.total_voting_power !== undefined &&
      object.total_voting_power !== null
        ? Number(object.total_voting_power)
        : 0;
    return message;
  },

  toJSON(message: ValidatorSet): unknown {
    const obj: any = {};
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? Validator.toJSON(e) : undefined
      );
    } else {
      obj.validators = [];
    }
    message.proposer !== undefined &&
      (obj.proposer = message.proposer
        ? Validator.toJSON(message.proposer)
        : undefined);
    message.total_voting_power !== undefined &&
      (obj.total_voting_power = Math.round(message.total_voting_power));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidatorSet>, I>>(
    object: I
  ): ValidatorSet {
    const message = { ...baseValidatorSet } as ValidatorSet;
    message.validators =
      object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.proposer =
      object.proposer !== undefined && object.proposer !== null
        ? Validator.fromPartial(object.proposer)
        : undefined;
    message.total_voting_power = object.total_voting_power ?? 0;
    return message;
  },
};

const baseValidator: object = { voting_power: 0, proposer_priority: 0 };

export const Validator = {
  encode(
    message: Validator,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    if (message.pub_key !== undefined) {
      PublicKey.encode(message.pub_key, writer.uint32(18).fork()).ldelim();
    }
    if (message.voting_power !== 0) {
      writer.uint32(24).int64(message.voting_power);
    }
    if (message.proposer_priority !== 0) {
      writer.uint32(32).int64(message.proposer_priority);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValidator } as Validator;
    message.address = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        case 2:
          message.pub_key = PublicKey.decode(reader, reader.uint32());
          break;
        case 3:
          message.voting_power = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.proposer_priority = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Validator {
    const message = { ...baseValidator } as Validator;
    message.address =
      object.address !== undefined && object.address !== null
        ? bytesFromBase64(object.address)
        : new Uint8Array();
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? PublicKey.fromJSON(object.pub_key)
        : undefined;
    message.voting_power =
      object.voting_power !== undefined && object.voting_power !== null
        ? Number(object.voting_power)
        : 0;
    message.proposer_priority =
      object.proposer_priority !== undefined &&
      object.proposer_priority !== null
        ? Number(object.proposer_priority)
        : 0;
    return message;
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    message.address !== undefined &&
      (obj.address = base64FromBytes(
        message.address !== undefined ? message.address : new Uint8Array()
      ));
    message.pub_key !== undefined &&
      (obj.pub_key = message.pub_key
        ? PublicKey.toJSON(message.pub_key)
        : undefined);
    message.voting_power !== undefined &&
      (obj.voting_power = Math.round(message.voting_power));
    message.proposer_priority !== undefined &&
      (obj.proposer_priority = Math.round(message.proposer_priority));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Validator>, I>>(
    object: I
  ): Validator {
    const message = { ...baseValidator } as Validator;
    message.address = object.address ?? new Uint8Array();
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? PublicKey.fromPartial(object.pub_key)
        : undefined;
    message.voting_power = object.voting_power ?? 0;
    message.proposer_priority = object.proposer_priority ?? 0;
    return message;
  },
};

const baseSimpleValidator: object = { voting_power: 0 };

export const SimpleValidator = {
  encode(
    message: SimpleValidator,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pub_key !== undefined) {
      PublicKey.encode(message.pub_key, writer.uint32(10).fork()).ldelim();
    }
    if (message.voting_power !== 0) {
      writer.uint32(16).int64(message.voting_power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleValidator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleValidator } as SimpleValidator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pub_key = PublicKey.decode(reader, reader.uint32());
          break;
        case 2:
          message.voting_power = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleValidator {
    const message = { ...baseSimpleValidator } as SimpleValidator;
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? PublicKey.fromJSON(object.pub_key)
        : undefined;
    message.voting_power =
      object.voting_power !== undefined && object.voting_power !== null
        ? Number(object.voting_power)
        : 0;
    return message;
  },

  toJSON(message: SimpleValidator): unknown {
    const obj: any = {};
    message.pub_key !== undefined &&
      (obj.pub_key = message.pub_key
        ? PublicKey.toJSON(message.pub_key)
        : undefined);
    message.voting_power !== undefined &&
      (obj.voting_power = Math.round(message.voting_power));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleValidator>, I>>(
    object: I
  ): SimpleValidator {
    const message = { ...baseSimpleValidator } as SimpleValidator;
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? PublicKey.fromPartial(object.pub_key)
        : undefined;
    message.voting_power = object.voting_power ?? 0;
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
