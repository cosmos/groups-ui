/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Period } from "../../../cosmos/vesting/v1beta1/vesting";

export const protobufPackage = "cosmos.vesting.v1beta1";

/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 */
export interface MsgCreateVestingAccount {
  from_address: string;
  to_address: string;
  amount: Coin[];
  end_time: number;
  delayed: boolean;
}

/** MsgCreateVestingAccountResponse defines the Msg/CreateVestingAccount response type. */
export interface MsgCreateVestingAccountResponse {}

/**
 * MsgCreatePermanentLockedAccount defines a message that enables creating a permanent
 * locked account.
 */
export interface MsgCreatePermanentLockedAccount {
  from_address: string;
  to_address: string;
  amount: Coin[];
}

/** MsgCreatePermanentLockedAccountResponse defines the Msg/CreatePermanentLockedAccount response type. */
export interface MsgCreatePermanentLockedAccountResponse {}

/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 */
export interface MsgCreatePeriodicVestingAccount {
  from_address: string;
  to_address: string;
  start_time: number;
  vesting_periods: Period[];
}

/**
 * MsgCreateVestingAccountResponse defines the Msg/CreatePeriodicVestingAccount
 * response type.
 */
export interface MsgCreatePeriodicVestingAccountResponse {}

const baseMsgCreateVestingAccount: object = {
  from_address: "",
  to_address: "",
  end_time: 0,
  delayed: false,
};

export const MsgCreateVestingAccount = {
  encode(
    message: MsgCreateVestingAccount,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from_address !== "") {
      writer.uint32(10).string(message.from_address);
    }
    if (message.to_address !== "") {
      writer.uint32(18).string(message.to_address);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.end_time !== 0) {
      writer.uint32(32).int64(message.end_time);
    }
    if (message.delayed === true) {
      writer.uint32(40).bool(message.delayed);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateVestingAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateVestingAccount,
    } as MsgCreateVestingAccount;
    message.amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from_address = reader.string();
          break;
        case 2:
          message.to_address = reader.string();
          break;
        case 3:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 4:
          message.end_time = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.delayed = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateVestingAccount {
    const message = {
      ...baseMsgCreateVestingAccount,
    } as MsgCreateVestingAccount;
    message.from_address =
      object.from_address !== undefined && object.from_address !== null
        ? String(object.from_address)
        : "";
    message.to_address =
      object.to_address !== undefined && object.to_address !== null
        ? String(object.to_address)
        : "";
    message.amount = (object.amount ?? []).map((e: any) => Coin.fromJSON(e));
    message.end_time =
      object.end_time !== undefined && object.end_time !== null
        ? Number(object.end_time)
        : 0;
    message.delayed =
      object.delayed !== undefined && object.delayed !== null
        ? Boolean(object.delayed)
        : false;
    return message;
  },

  toJSON(message: MsgCreateVestingAccount): unknown {
    const obj: any = {};
    message.from_address !== undefined &&
      (obj.from_address = message.from_address);
    message.to_address !== undefined && (obj.to_address = message.to_address);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    message.end_time !== undefined &&
      (obj.end_time = Math.round(message.end_time));
    message.delayed !== undefined && (obj.delayed = message.delayed);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateVestingAccount>, I>>(
    object: I
  ): MsgCreateVestingAccount {
    const message = {
      ...baseMsgCreateVestingAccount,
    } as MsgCreateVestingAccount;
    message.from_address = object.from_address ?? "";
    message.to_address = object.to_address ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.end_time = object.end_time ?? 0;
    message.delayed = object.delayed ?? false;
    return message;
  },
};

const baseMsgCreateVestingAccountResponse: object = {};

export const MsgCreateVestingAccountResponse = {
  encode(
    _: MsgCreateVestingAccountResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateVestingAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateVestingAccountResponse,
    } as MsgCreateVestingAccountResponse;
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

  fromJSON(_: any): MsgCreateVestingAccountResponse {
    const message = {
      ...baseMsgCreateVestingAccountResponse,
    } as MsgCreateVestingAccountResponse;
    return message;
  },

  toJSON(_: MsgCreateVestingAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateVestingAccountResponse>, I>>(
    _: I
  ): MsgCreateVestingAccountResponse {
    const message = {
      ...baseMsgCreateVestingAccountResponse,
    } as MsgCreateVestingAccountResponse;
    return message;
  },
};

const baseMsgCreatePermanentLockedAccount: object = {
  from_address: "",
  to_address: "",
};

export const MsgCreatePermanentLockedAccount = {
  encode(
    message: MsgCreatePermanentLockedAccount,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from_address !== "") {
      writer.uint32(10).string(message.from_address);
    }
    if (message.to_address !== "") {
      writer.uint32(18).string(message.to_address);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreatePermanentLockedAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreatePermanentLockedAccount,
    } as MsgCreatePermanentLockedAccount;
    message.amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from_address = reader.string();
          break;
        case 2:
          message.to_address = reader.string();
          break;
        case 3:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePermanentLockedAccount {
    const message = {
      ...baseMsgCreatePermanentLockedAccount,
    } as MsgCreatePermanentLockedAccount;
    message.from_address =
      object.from_address !== undefined && object.from_address !== null
        ? String(object.from_address)
        : "";
    message.to_address =
      object.to_address !== undefined && object.to_address !== null
        ? String(object.to_address)
        : "";
    message.amount = (object.amount ?? []).map((e: any) => Coin.fromJSON(e));
    return message;
  },

  toJSON(message: MsgCreatePermanentLockedAccount): unknown {
    const obj: any = {};
    message.from_address !== undefined &&
      (obj.from_address = message.from_address);
    message.to_address !== undefined && (obj.to_address = message.to_address);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePermanentLockedAccount>, I>>(
    object: I
  ): MsgCreatePermanentLockedAccount {
    const message = {
      ...baseMsgCreatePermanentLockedAccount,
    } as MsgCreatePermanentLockedAccount;
    message.from_address = object.from_address ?? "";
    message.to_address = object.to_address ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

const baseMsgCreatePermanentLockedAccountResponse: object = {};

export const MsgCreatePermanentLockedAccountResponse = {
  encode(
    _: MsgCreatePermanentLockedAccountResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreatePermanentLockedAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreatePermanentLockedAccountResponse,
    } as MsgCreatePermanentLockedAccountResponse;
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

  fromJSON(_: any): MsgCreatePermanentLockedAccountResponse {
    const message = {
      ...baseMsgCreatePermanentLockedAccountResponse,
    } as MsgCreatePermanentLockedAccountResponse;
    return message;
  },

  toJSON(_: MsgCreatePermanentLockedAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgCreatePermanentLockedAccountResponse>, I>
  >(_: I): MsgCreatePermanentLockedAccountResponse {
    const message = {
      ...baseMsgCreatePermanentLockedAccountResponse,
    } as MsgCreatePermanentLockedAccountResponse;
    return message;
  },
};

const baseMsgCreatePeriodicVestingAccount: object = {
  from_address: "",
  to_address: "",
  start_time: 0,
};

export const MsgCreatePeriodicVestingAccount = {
  encode(
    message: MsgCreatePeriodicVestingAccount,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from_address !== "") {
      writer.uint32(10).string(message.from_address);
    }
    if (message.to_address !== "") {
      writer.uint32(18).string(message.to_address);
    }
    if (message.start_time !== 0) {
      writer.uint32(24).int64(message.start_time);
    }
    for (const v of message.vesting_periods) {
      Period.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreatePeriodicVestingAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreatePeriodicVestingAccount,
    } as MsgCreatePeriodicVestingAccount;
    message.vesting_periods = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from_address = reader.string();
          break;
        case 2:
          message.to_address = reader.string();
          break;
        case 3:
          message.start_time = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.vesting_periods.push(Period.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreatePeriodicVestingAccount {
    const message = {
      ...baseMsgCreatePeriodicVestingAccount,
    } as MsgCreatePeriodicVestingAccount;
    message.from_address =
      object.from_address !== undefined && object.from_address !== null
        ? String(object.from_address)
        : "";
    message.to_address =
      object.to_address !== undefined && object.to_address !== null
        ? String(object.to_address)
        : "";
    message.start_time =
      object.start_time !== undefined && object.start_time !== null
        ? Number(object.start_time)
        : 0;
    message.vesting_periods = (object.vesting_periods ?? []).map((e: any) =>
      Period.fromJSON(e)
    );
    return message;
  },

  toJSON(message: MsgCreatePeriodicVestingAccount): unknown {
    const obj: any = {};
    message.from_address !== undefined &&
      (obj.from_address = message.from_address);
    message.to_address !== undefined && (obj.to_address = message.to_address);
    message.start_time !== undefined &&
      (obj.start_time = Math.round(message.start_time));
    if (message.vesting_periods) {
      obj.vesting_periods = message.vesting_periods.map((e) =>
        e ? Period.toJSON(e) : undefined
      );
    } else {
      obj.vesting_periods = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreatePeriodicVestingAccount>, I>>(
    object: I
  ): MsgCreatePeriodicVestingAccount {
    const message = {
      ...baseMsgCreatePeriodicVestingAccount,
    } as MsgCreatePeriodicVestingAccount;
    message.from_address = object.from_address ?? "";
    message.to_address = object.to_address ?? "";
    message.start_time = object.start_time ?? 0;
    message.vesting_periods =
      object.vesting_periods?.map((e) => Period.fromPartial(e)) || [];
    return message;
  },
};

const baseMsgCreatePeriodicVestingAccountResponse: object = {};

export const MsgCreatePeriodicVestingAccountResponse = {
  encode(
    _: MsgCreatePeriodicVestingAccountResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreatePeriodicVestingAccountResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreatePeriodicVestingAccountResponse,
    } as MsgCreatePeriodicVestingAccountResponse;
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

  fromJSON(_: any): MsgCreatePeriodicVestingAccountResponse {
    const message = {
      ...baseMsgCreatePeriodicVestingAccountResponse,
    } as MsgCreatePeriodicVestingAccountResponse;
    return message;
  },

  toJSON(_: MsgCreatePeriodicVestingAccountResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgCreatePeriodicVestingAccountResponse>, I>
  >(_: I): MsgCreatePeriodicVestingAccountResponse {
    const message = {
      ...baseMsgCreatePeriodicVestingAccountResponse,
    } as MsgCreatePeriodicVestingAccountResponse;
    return message;
  },
};

/** Msg defines the bank Msg service. */
export interface Msg {
  /**
   * CreateVestingAccount defines a method that enables creating a vesting
   * account.
   */
  CreateVestingAccount(
    request: MsgCreateVestingAccount
  ): Promise<MsgCreateVestingAccountResponse>;
  /**
   * CreatePermanentLockedAccount defines a method that enables creating a permanent
   * locked account.
   */
  CreatePermanentLockedAccount(
    request: MsgCreatePermanentLockedAccount
  ): Promise<MsgCreatePermanentLockedAccountResponse>;
  /**
   * CreatePeriodicVestingAccount defines a method that enables creating a
   * periodic vesting account.
   */
  CreatePeriodicVestingAccount(
    request: MsgCreatePeriodicVestingAccount
  ): Promise<MsgCreatePeriodicVestingAccountResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateVestingAccount = this.CreateVestingAccount.bind(this);
    this.CreatePermanentLockedAccount =
      this.CreatePermanentLockedAccount.bind(this);
    this.CreatePeriodicVestingAccount =
      this.CreatePeriodicVestingAccount.bind(this);
  }
  CreateVestingAccount(
    request: MsgCreateVestingAccount
  ): Promise<MsgCreateVestingAccountResponse> {
    const data = MsgCreateVestingAccount.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.vesting.v1beta1.Msg",
      "CreateVestingAccount",
      data
    );
    return promise.then((data) =>
      MsgCreateVestingAccountResponse.decode(new _m0.Reader(data))
    );
  }

  CreatePermanentLockedAccount(
    request: MsgCreatePermanentLockedAccount
  ): Promise<MsgCreatePermanentLockedAccountResponse> {
    const data = MsgCreatePermanentLockedAccount.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.vesting.v1beta1.Msg",
      "CreatePermanentLockedAccount",
      data
    );
    return promise.then((data) =>
      MsgCreatePermanentLockedAccountResponse.decode(new _m0.Reader(data))
    );
  }

  CreatePeriodicVestingAccount(
    request: MsgCreatePeriodicVestingAccount
  ): Promise<MsgCreatePeriodicVestingAccountResponse> {
    const data = MsgCreatePeriodicVestingAccount.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.vesting.v1beta1.Msg",
      "CreatePeriodicVestingAccount",
      data
    );
    return promise.then((data) =>
      MsgCreatePeriodicVestingAccountResponse.decode(new _m0.Reader(data))
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
