/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Vote, LightBlock } from "../../tendermint/types/types";
import { Validator } from "../../tendermint/types/validator";

export const protobufPackage = "tendermint.types";

export interface Evidence {
  duplicate_vote_evidence: DuplicateVoteEvidence | undefined;
  light_client_attack_evidence: LightClientAttackEvidence | undefined;
}

/** DuplicateVoteEvidence contains evidence of a validator signed two conflicting votes. */
export interface DuplicateVoteEvidence {
  vote_a: Vote | undefined;
  vote_b: Vote | undefined;
  total_voting_power: number;
  validator_power: number;
  timestamp: Date | undefined;
}

/** LightClientAttackEvidence contains evidence of a set of validators attempting to mislead a light client. */
export interface LightClientAttackEvidence {
  conflicting_block: LightBlock | undefined;
  common_height: number;
  byzantine_validators: Validator[];
  total_voting_power: number;
  timestamp: Date | undefined;
}

export interface EvidenceList {
  evidence: Evidence[];
}

const baseEvidence: object = {};

export const Evidence = {
  encode(
    message: Evidence,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.duplicate_vote_evidence !== undefined) {
      DuplicateVoteEvidence.encode(
        message.duplicate_vote_evidence,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.light_client_attack_evidence !== undefined) {
      LightClientAttackEvidence.encode(
        message.light_client_attack_evidence,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Evidence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEvidence } as Evidence;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.duplicate_vote_evidence = DuplicateVoteEvidence.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.light_client_attack_evidence =
            LightClientAttackEvidence.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Evidence {
    const message = { ...baseEvidence } as Evidence;
    message.duplicate_vote_evidence =
      object.duplicate_vote_evidence !== undefined &&
      object.duplicate_vote_evidence !== null
        ? DuplicateVoteEvidence.fromJSON(object.duplicate_vote_evidence)
        : undefined;
    message.light_client_attack_evidence =
      object.light_client_attack_evidence !== undefined &&
      object.light_client_attack_evidence !== null
        ? LightClientAttackEvidence.fromJSON(
            object.light_client_attack_evidence
          )
        : undefined;
    return message;
  },

  toJSON(message: Evidence): unknown {
    const obj: any = {};
    message.duplicate_vote_evidence !== undefined &&
      (obj.duplicate_vote_evidence = message.duplicate_vote_evidence
        ? DuplicateVoteEvidence.toJSON(message.duplicate_vote_evidence)
        : undefined);
    message.light_client_attack_evidence !== undefined &&
      (obj.light_client_attack_evidence = message.light_client_attack_evidence
        ? LightClientAttackEvidence.toJSON(message.light_client_attack_evidence)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Evidence>, I>>(object: I): Evidence {
    const message = { ...baseEvidence } as Evidence;
    message.duplicate_vote_evidence =
      object.duplicate_vote_evidence !== undefined &&
      object.duplicate_vote_evidence !== null
        ? DuplicateVoteEvidence.fromPartial(object.duplicate_vote_evidence)
        : undefined;
    message.light_client_attack_evidence =
      object.light_client_attack_evidence !== undefined &&
      object.light_client_attack_evidence !== null
        ? LightClientAttackEvidence.fromPartial(
            object.light_client_attack_evidence
          )
        : undefined;
    return message;
  },
};

const baseDuplicateVoteEvidence: object = {
  total_voting_power: 0,
  validator_power: 0,
};

export const DuplicateVoteEvidence = {
  encode(
    message: DuplicateVoteEvidence,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.vote_a !== undefined) {
      Vote.encode(message.vote_a, writer.uint32(10).fork()).ldelim();
    }
    if (message.vote_b !== undefined) {
      Vote.encode(message.vote_b, writer.uint32(18).fork()).ldelim();
    }
    if (message.total_voting_power !== 0) {
      writer.uint32(24).int64(message.total_voting_power);
    }
    if (message.validator_power !== 0) {
      writer.uint32(32).int64(message.validator_power);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DuplicateVoteEvidence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDuplicateVoteEvidence } as DuplicateVoteEvidence;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vote_a = Vote.decode(reader, reader.uint32());
          break;
        case 2:
          message.vote_b = Vote.decode(reader, reader.uint32());
          break;
        case 3:
          message.total_voting_power = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.validator_power = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.timestamp = fromTimestamp(
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

  fromJSON(object: any): DuplicateVoteEvidence {
    const message = { ...baseDuplicateVoteEvidence } as DuplicateVoteEvidence;
    message.vote_a =
      object.vote_a !== undefined && object.vote_a !== null
        ? Vote.fromJSON(object.vote_a)
        : undefined;
    message.vote_b =
      object.vote_b !== undefined && object.vote_b !== null
        ? Vote.fromJSON(object.vote_b)
        : undefined;
    message.total_voting_power =
      object.total_voting_power !== undefined &&
      object.total_voting_power !== null
        ? Number(object.total_voting_power)
        : 0;
    message.validator_power =
      object.validator_power !== undefined && object.validator_power !== null
        ? Number(object.validator_power)
        : 0;
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? fromJsonTimestamp(object.timestamp)
        : undefined;
    return message;
  },

  toJSON(message: DuplicateVoteEvidence): unknown {
    const obj: any = {};
    message.vote_a !== undefined &&
      (obj.vote_a = message.vote_a ? Vote.toJSON(message.vote_a) : undefined);
    message.vote_b !== undefined &&
      (obj.vote_b = message.vote_b ? Vote.toJSON(message.vote_b) : undefined);
    message.total_voting_power !== undefined &&
      (obj.total_voting_power = Math.round(message.total_voting_power));
    message.validator_power !== undefined &&
      (obj.validator_power = Math.round(message.validator_power));
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DuplicateVoteEvidence>, I>>(
    object: I
  ): DuplicateVoteEvidence {
    const message = { ...baseDuplicateVoteEvidence } as DuplicateVoteEvidence;
    message.vote_a =
      object.vote_a !== undefined && object.vote_a !== null
        ? Vote.fromPartial(object.vote_a)
        : undefined;
    message.vote_b =
      object.vote_b !== undefined && object.vote_b !== null
        ? Vote.fromPartial(object.vote_b)
        : undefined;
    message.total_voting_power = object.total_voting_power ?? 0;
    message.validator_power = object.validator_power ?? 0;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

const baseLightClientAttackEvidence: object = {
  common_height: 0,
  total_voting_power: 0,
};

export const LightClientAttackEvidence = {
  encode(
    message: LightClientAttackEvidence,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.conflicting_block !== undefined) {
      LightBlock.encode(
        message.conflicting_block,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.common_height !== 0) {
      writer.uint32(16).int64(message.common_height);
    }
    for (const v of message.byzantine_validators) {
      Validator.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.total_voting_power !== 0) {
      writer.uint32(32).int64(message.total_voting_power);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(
        toTimestamp(message.timestamp),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): LightClientAttackEvidence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseLightClientAttackEvidence,
    } as LightClientAttackEvidence;
    message.byzantine_validators = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.conflicting_block = LightBlock.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.common_height = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.byzantine_validators.push(
            Validator.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.total_voting_power = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.timestamp = fromTimestamp(
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

  fromJSON(object: any): LightClientAttackEvidence {
    const message = {
      ...baseLightClientAttackEvidence,
    } as LightClientAttackEvidence;
    message.conflicting_block =
      object.conflicting_block !== undefined &&
      object.conflicting_block !== null
        ? LightBlock.fromJSON(object.conflicting_block)
        : undefined;
    message.common_height =
      object.common_height !== undefined && object.common_height !== null
        ? Number(object.common_height)
        : 0;
    message.byzantine_validators = (object.byzantine_validators ?? []).map(
      (e: any) => Validator.fromJSON(e)
    );
    message.total_voting_power =
      object.total_voting_power !== undefined &&
      object.total_voting_power !== null
        ? Number(object.total_voting_power)
        : 0;
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? fromJsonTimestamp(object.timestamp)
        : undefined;
    return message;
  },

  toJSON(message: LightClientAttackEvidence): unknown {
    const obj: any = {};
    message.conflicting_block !== undefined &&
      (obj.conflicting_block = message.conflicting_block
        ? LightBlock.toJSON(message.conflicting_block)
        : undefined);
    message.common_height !== undefined &&
      (obj.common_height = Math.round(message.common_height));
    if (message.byzantine_validators) {
      obj.byzantine_validators = message.byzantine_validators.map((e) =>
        e ? Validator.toJSON(e) : undefined
      );
    } else {
      obj.byzantine_validators = [];
    }
    message.total_voting_power !== undefined &&
      (obj.total_voting_power = Math.round(message.total_voting_power));
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LightClientAttackEvidence>, I>>(
    object: I
  ): LightClientAttackEvidence {
    const message = {
      ...baseLightClientAttackEvidence,
    } as LightClientAttackEvidence;
    message.conflicting_block =
      object.conflicting_block !== undefined &&
      object.conflicting_block !== null
        ? LightBlock.fromPartial(object.conflicting_block)
        : undefined;
    message.common_height = object.common_height ?? 0;
    message.byzantine_validators =
      object.byzantine_validators?.map((e) => Validator.fromPartial(e)) || [];
    message.total_voting_power = object.total_voting_power ?? 0;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

const baseEvidenceList: object = {};

export const EvidenceList = {
  encode(
    message: EvidenceList,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.evidence) {
      Evidence.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EvidenceList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEvidenceList } as EvidenceList;
    message.evidence = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.evidence.push(Evidence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EvidenceList {
    const message = { ...baseEvidenceList } as EvidenceList;
    message.evidence = (object.evidence ?? []).map((e: any) =>
      Evidence.fromJSON(e)
    );
    return message;
  },

  toJSON(message: EvidenceList): unknown {
    const obj: any = {};
    if (message.evidence) {
      obj.evidence = message.evidence.map((e) =>
        e ? Evidence.toJSON(e) : undefined
      );
    } else {
      obj.evidence = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EvidenceList>, I>>(
    object: I
  ): EvidenceList {
    const message = { ...baseEvidenceList } as EvidenceList;
    message.evidence =
      object.evidence?.map((e) => Evidence.fromPartial(e)) || [];
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
