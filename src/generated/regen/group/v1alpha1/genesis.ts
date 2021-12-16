/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  GroupInfo,
  GroupMember,
  GroupAccountInfo,
  Proposal,
  Vote,
} from "../../../regen/group/v1alpha1/types";

export const protobufPackage = "regen.group.v1alpha1";

/** GenesisState defines the group module's genesis state. */
export interface GenesisState {
  /**
   * group_seq is the group table orm.Sequence,
   * it is used to get the next group ID.
   */
  groupSeq: number;
  /** groups is the list of groups info. */
  groups: GroupInfo[];
  /** group_members is the list of groups members. */
  groupMembers: GroupMember[];
  /**
   * group_account_seq is the group account table orm.Sequence,
   * it is used to generate the next group account address.
   */
  groupAccountSeq: number;
  /** group_accounts is the list of group accounts info. */
  groupAccounts: GroupAccountInfo[];
  /**
   * proposal_seq is the proposal table orm.Sequence,
   * it is used to get the next proposal ID.
   */
  proposalSeq: number;
  /** proposals is the list of proposals. */
  proposals: Proposal[];
  /** votes is the list of votes. */
  votes: Vote[];
}

const baseGenesisState: object = {
  groupSeq: 0,
  groupAccountSeq: 0,
  proposalSeq: 0,
};

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.groupSeq !== 0) {
      writer.uint32(8).uint64(message.groupSeq);
    }
    for (const v of message.groups) {
      GroupInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.groupMembers) {
      GroupMember.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.groupAccountSeq !== 0) {
      writer.uint32(32).uint64(message.groupAccountSeq);
    }
    for (const v of message.groupAccounts) {
      GroupAccountInfo.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.proposalSeq !== 0) {
      writer.uint32(48).uint64(message.proposalSeq);
    }
    for (const v of message.proposals) {
      Proposal.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.votes) {
      Vote.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.groups = [];
    message.groupMembers = [];
    message.groupAccounts = [];
    message.proposals = [];
    message.votes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupSeq = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.groups.push(GroupInfo.decode(reader, reader.uint32()));
          break;
        case 3:
          message.groupMembers.push(
            GroupMember.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.groupAccountSeq = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.groupAccounts.push(
            GroupAccountInfo.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.proposalSeq = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.proposals.push(Proposal.decode(reader, reader.uint32()));
          break;
        case 8:
          message.votes.push(Vote.decode(reader, reader.uint32()));
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
    message.groupSeq =
      object.groupSeq !== undefined && object.groupSeq !== null
        ? Number(object.groupSeq)
        : 0;
    message.groups = (object.groups ?? []).map((e: any) =>
      GroupInfo.fromJSON(e)
    );
    message.groupMembers = (object.groupMembers ?? []).map((e: any) =>
      GroupMember.fromJSON(e)
    );
    message.groupAccountSeq =
      object.groupAccountSeq !== undefined && object.groupAccountSeq !== null
        ? Number(object.groupAccountSeq)
        : 0;
    message.groupAccounts = (object.groupAccounts ?? []).map((e: any) =>
      GroupAccountInfo.fromJSON(e)
    );
    message.proposalSeq =
      object.proposalSeq !== undefined && object.proposalSeq !== null
        ? Number(object.proposalSeq)
        : 0;
    message.proposals = (object.proposals ?? []).map((e: any) =>
      Proposal.fromJSON(e)
    );
    message.votes = (object.votes ?? []).map((e: any) => Vote.fromJSON(e));
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.groupSeq !== undefined &&
      (obj.groupSeq = Math.round(message.groupSeq));
    if (message.groups) {
      obj.groups = message.groups.map((e) =>
        e ? GroupInfo.toJSON(e) : undefined
      );
    } else {
      obj.groups = [];
    }
    if (message.groupMembers) {
      obj.groupMembers = message.groupMembers.map((e) =>
        e ? GroupMember.toJSON(e) : undefined
      );
    } else {
      obj.groupMembers = [];
    }
    message.groupAccountSeq !== undefined &&
      (obj.groupAccountSeq = Math.round(message.groupAccountSeq));
    if (message.groupAccounts) {
      obj.groupAccounts = message.groupAccounts.map((e) =>
        e ? GroupAccountInfo.toJSON(e) : undefined
      );
    } else {
      obj.groupAccounts = [];
    }
    message.proposalSeq !== undefined &&
      (obj.proposalSeq = Math.round(message.proposalSeq));
    if (message.proposals) {
      obj.proposals = message.proposals.map((e) =>
        e ? Proposal.toJSON(e) : undefined
      );
    } else {
      obj.proposals = [];
    }
    if (message.votes) {
      obj.votes = message.votes.map((e) => (e ? Vote.toJSON(e) : undefined));
    } else {
      obj.votes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I
  ): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.groupSeq = object.groupSeq ?? 0;
    message.groups = object.groups?.map((e) => GroupInfo.fromPartial(e)) || [];
    message.groupMembers =
      object.groupMembers?.map((e) => GroupMember.fromPartial(e)) || [];
    message.groupAccountSeq = object.groupAccountSeq ?? 0;
    message.groupAccounts =
      object.groupAccounts?.map((e) => GroupAccountInfo.fromPartial(e)) || [];
    message.proposalSeq = object.proposalSeq ?? 0;
    message.proposals =
      object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
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
