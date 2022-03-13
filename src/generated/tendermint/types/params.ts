/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../google/protobuf/duration";

export const protobufPackage = "tendermint.types";

/**
 * ConsensusParams contains consensus critical parameters that determine the
 * validity of blocks.
 */
export interface ConsensusParams {
  block: BlockParams | undefined;
  evidence: EvidenceParams | undefined;
  validator: ValidatorParams | undefined;
  version: VersionParams | undefined;
}

/** BlockParams contains limits on the block size. */
export interface BlockParams {
  /**
   * Max block size, in bytes.
   * Note: must be greater than 0
   */
  max_bytes: number;
  /**
   * Max gas per block.
   * Note: must be greater or equal to -1
   */
  max_gas: number;
  /**
   * Minimum time increment between consecutive blocks (in milliseconds) If the
   * block header timestamp is ahead of the system clock, decrease this value.
   *
   * Not exposed to the application.
   */
  time_iota_ms: number;
}

/** EvidenceParams determine how we handle evidence of malfeasance. */
export interface EvidenceParams {
  /**
   * Max age of evidence, in blocks.
   *
   * The basic formula for calculating this is: MaxAgeDuration / {average block
   * time}.
   */
  max_age_num_blocks: number;
  /**
   * Max age of evidence, in time.
   *
   * It should correspond with an app's "unbonding period" or other similar
   * mechanism for handling [Nothing-At-Stake
   * attacks](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed).
   */
  max_age_duration: Duration | undefined;
  /**
   * This sets the maximum size of total evidence in bytes that can be committed in a single block.
   * and should fall comfortably under the max block bytes.
   * Default is 1048576 or 1MB
   */
  max_bytes: number;
}

/**
 * ValidatorParams restrict the public key types validators can use.
 * NOTE: uses ABCI pubkey naming, not Amino names.
 */
export interface ValidatorParams {
  pub_key_types: string[];
}

/** VersionParams contains the ABCI application version. */
export interface VersionParams {
  app_version: number;
}

/**
 * HashedParams is a subset of ConsensusParams.
 *
 * It is hashed into the Header.ConsensusHash.
 */
export interface HashedParams {
  block_max_bytes: number;
  block_max_gas: number;
}

const baseConsensusParams: object = {};

export const ConsensusParams = {
  encode(
    message: ConsensusParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.block !== undefined) {
      BlockParams.encode(message.block, writer.uint32(10).fork()).ldelim();
    }
    if (message.evidence !== undefined) {
      EvidenceParams.encode(
        message.evidence,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.validator !== undefined) {
      ValidatorParams.encode(
        message.validator,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.version !== undefined) {
      VersionParams.encode(message.version, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConsensusParams } as ConsensusParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block = BlockParams.decode(reader, reader.uint32());
          break;
        case 2:
          message.evidence = EvidenceParams.decode(reader, reader.uint32());
          break;
        case 3:
          message.validator = ValidatorParams.decode(reader, reader.uint32());
          break;
        case 4:
          message.version = VersionParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsensusParams {
    const message = { ...baseConsensusParams } as ConsensusParams;
    message.block =
      object.block !== undefined && object.block !== null
        ? BlockParams.fromJSON(object.block)
        : undefined;
    message.evidence =
      object.evidence !== undefined && object.evidence !== null
        ? EvidenceParams.fromJSON(object.evidence)
        : undefined;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? ValidatorParams.fromJSON(object.validator)
        : undefined;
    message.version =
      object.version !== undefined && object.version !== null
        ? VersionParams.fromJSON(object.version)
        : undefined;
    return message;
  },

  toJSON(message: ConsensusParams): unknown {
    const obj: any = {};
    message.block !== undefined &&
      (obj.block = message.block
        ? BlockParams.toJSON(message.block)
        : undefined);
    message.evidence !== undefined &&
      (obj.evidence = message.evidence
        ? EvidenceParams.toJSON(message.evidence)
        : undefined);
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? ValidatorParams.toJSON(message.validator)
        : undefined);
    message.version !== undefined &&
      (obj.version = message.version
        ? VersionParams.toJSON(message.version)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsensusParams>, I>>(
    object: I
  ): ConsensusParams {
    const message = { ...baseConsensusParams } as ConsensusParams;
    message.block =
      object.block !== undefined && object.block !== null
        ? BlockParams.fromPartial(object.block)
        : undefined;
    message.evidence =
      object.evidence !== undefined && object.evidence !== null
        ? EvidenceParams.fromPartial(object.evidence)
        : undefined;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? ValidatorParams.fromPartial(object.validator)
        : undefined;
    message.version =
      object.version !== undefined && object.version !== null
        ? VersionParams.fromPartial(object.version)
        : undefined;
    return message;
  },
};

const baseBlockParams: object = { max_bytes: 0, max_gas: 0, time_iota_ms: 0 };

export const BlockParams = {
  encode(
    message: BlockParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.max_bytes !== 0) {
      writer.uint32(8).int64(message.max_bytes);
    }
    if (message.max_gas !== 0) {
      writer.uint32(16).int64(message.max_gas);
    }
    if (message.time_iota_ms !== 0) {
      writer.uint32(24).int64(message.time_iota_ms);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBlockParams } as BlockParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.max_bytes = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.max_gas = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.time_iota_ms = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlockParams {
    const message = { ...baseBlockParams } as BlockParams;
    message.max_bytes =
      object.max_bytes !== undefined && object.max_bytes !== null
        ? Number(object.max_bytes)
        : 0;
    message.max_gas =
      object.max_gas !== undefined && object.max_gas !== null
        ? Number(object.max_gas)
        : 0;
    message.time_iota_ms =
      object.time_iota_ms !== undefined && object.time_iota_ms !== null
        ? Number(object.time_iota_ms)
        : 0;
    return message;
  },

  toJSON(message: BlockParams): unknown {
    const obj: any = {};
    message.max_bytes !== undefined &&
      (obj.max_bytes = Math.round(message.max_bytes));
    message.max_gas !== undefined &&
      (obj.max_gas = Math.round(message.max_gas));
    message.time_iota_ms !== undefined &&
      (obj.time_iota_ms = Math.round(message.time_iota_ms));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlockParams>, I>>(
    object: I
  ): BlockParams {
    const message = { ...baseBlockParams } as BlockParams;
    message.max_bytes = object.max_bytes ?? 0;
    message.max_gas = object.max_gas ?? 0;
    message.time_iota_ms = object.time_iota_ms ?? 0;
    return message;
  },
};

const baseEvidenceParams: object = { max_age_num_blocks: 0, max_bytes: 0 };

export const EvidenceParams = {
  encode(
    message: EvidenceParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.max_age_num_blocks !== 0) {
      writer.uint32(8).int64(message.max_age_num_blocks);
    }
    if (message.max_age_duration !== undefined) {
      Duration.encode(
        message.max_age_duration,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.max_bytes !== 0) {
      writer.uint32(24).int64(message.max_bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EvidenceParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEvidenceParams } as EvidenceParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.max_age_num_blocks = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.max_age_duration = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.max_bytes = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EvidenceParams {
    const message = { ...baseEvidenceParams } as EvidenceParams;
    message.max_age_num_blocks =
      object.max_age_num_blocks !== undefined &&
      object.max_age_num_blocks !== null
        ? Number(object.max_age_num_blocks)
        : 0;
    message.max_age_duration =
      object.max_age_duration !== undefined && object.max_age_duration !== null
        ? Duration.fromJSON(object.max_age_duration)
        : undefined;
    message.max_bytes =
      object.max_bytes !== undefined && object.max_bytes !== null
        ? Number(object.max_bytes)
        : 0;
    return message;
  },

  toJSON(message: EvidenceParams): unknown {
    const obj: any = {};
    message.max_age_num_blocks !== undefined &&
      (obj.max_age_num_blocks = Math.round(message.max_age_num_blocks));
    message.max_age_duration !== undefined &&
      (obj.max_age_duration = message.max_age_duration
        ? Duration.toJSON(message.max_age_duration)
        : undefined);
    message.max_bytes !== undefined &&
      (obj.max_bytes = Math.round(message.max_bytes));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EvidenceParams>, I>>(
    object: I
  ): EvidenceParams {
    const message = { ...baseEvidenceParams } as EvidenceParams;
    message.max_age_num_blocks = object.max_age_num_blocks ?? 0;
    message.max_age_duration =
      object.max_age_duration !== undefined && object.max_age_duration !== null
        ? Duration.fromPartial(object.max_age_duration)
        : undefined;
    message.max_bytes = object.max_bytes ?? 0;
    return message;
  },
};

const baseValidatorParams: object = { pub_key_types: "" };

export const ValidatorParams = {
  encode(
    message: ValidatorParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.pub_key_types) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValidatorParams } as ValidatorParams;
    message.pub_key_types = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pub_key_types.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorParams {
    const message = { ...baseValidatorParams } as ValidatorParams;
    message.pub_key_types = (object.pub_key_types ?? []).map((e: any) =>
      String(e)
    );
    return message;
  },

  toJSON(message: ValidatorParams): unknown {
    const obj: any = {};
    if (message.pub_key_types) {
      obj.pub_key_types = message.pub_key_types.map((e) => e);
    } else {
      obj.pub_key_types = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidatorParams>, I>>(
    object: I
  ): ValidatorParams {
    const message = { ...baseValidatorParams } as ValidatorParams;
    message.pub_key_types = object.pub_key_types?.map((e) => e) || [];
    return message;
  },
};

const baseVersionParams: object = { app_version: 0 };

export const VersionParams = {
  encode(
    message: VersionParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.app_version !== 0) {
      writer.uint32(8).uint64(message.app_version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VersionParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVersionParams } as VersionParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.app_version = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VersionParams {
    const message = { ...baseVersionParams } as VersionParams;
    message.app_version =
      object.app_version !== undefined && object.app_version !== null
        ? Number(object.app_version)
        : 0;
    return message;
  },

  toJSON(message: VersionParams): unknown {
    const obj: any = {};
    message.app_version !== undefined &&
      (obj.app_version = Math.round(message.app_version));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VersionParams>, I>>(
    object: I
  ): VersionParams {
    const message = { ...baseVersionParams } as VersionParams;
    message.app_version = object.app_version ?? 0;
    return message;
  },
};

const baseHashedParams: object = { block_max_bytes: 0, block_max_gas: 0 };

export const HashedParams = {
  encode(
    message: HashedParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.block_max_bytes !== 0) {
      writer.uint32(8).int64(message.block_max_bytes);
    }
    if (message.block_max_gas !== 0) {
      writer.uint32(16).int64(message.block_max_gas);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HashedParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHashedParams } as HashedParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_max_bytes = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.block_max_gas = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HashedParams {
    const message = { ...baseHashedParams } as HashedParams;
    message.block_max_bytes =
      object.block_max_bytes !== undefined && object.block_max_bytes !== null
        ? Number(object.block_max_bytes)
        : 0;
    message.block_max_gas =
      object.block_max_gas !== undefined && object.block_max_gas !== null
        ? Number(object.block_max_gas)
        : 0;
    return message;
  },

  toJSON(message: HashedParams): unknown {
    const obj: any = {};
    message.block_max_bytes !== undefined &&
      (obj.block_max_bytes = Math.round(message.block_max_bytes));
    message.block_max_gas !== undefined &&
      (obj.block_max_gas = Math.round(message.block_max_gas));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HashedParams>, I>>(
    object: I
  ): HashedParams {
    const message = { ...baseHashedParams } as HashedParams;
    message.block_max_bytes = object.block_max_bytes ?? 0;
    message.block_max_gas = object.block_max_gas ?? 0;
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
