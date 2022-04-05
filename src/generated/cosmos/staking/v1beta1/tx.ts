/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import {
  Description,
  CommissionRates,
} from "../../../cosmos/staking/v1beta1/staking";
import { Any } from "../../../google/protobuf/any";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "cosmos.staking.v1beta1";

/** MsgCreateValidator defines a SDK message for creating a new validator. */
export interface MsgCreateValidator {
  description: Description | undefined;
  commission: CommissionRates | undefined;
  min_self_delegation: string;
  delegator_address: string;
  validator_address: string;
  pubkey: Any | undefined;
  value: Coin | undefined;
}

/** MsgCreateValidatorResponse defines the Msg/CreateValidator response type. */
export interface MsgCreateValidatorResponse {}

/** MsgEditValidator defines a SDK message for editing an existing validator. */
export interface MsgEditValidator {
  description: Description | undefined;
  validator_address: string;
  /**
   * We pass a reference to the new commission rate and min self delegation as
   * it's not mandatory to update. If not updated, the deserialized rate will be
   * zero with no way to distinguish if an update was intended.
   * REF: #2373
   */
  commission_rate: string;
  min_self_delegation: string;
}

/** MsgEditValidatorResponse defines the Msg/EditValidator response type. */
export interface MsgEditValidatorResponse {}

/**
 * MsgDelegate defines a SDK message for performing a delegation of coins
 * from a delegator to a validator.
 */
export interface MsgDelegate {
  delegator_address: string;
  validator_address: string;
  amount: Coin | undefined;
}

/** MsgDelegateResponse defines the Msg/Delegate response type. */
export interface MsgDelegateResponse {}

/**
 * MsgBeginRedelegate defines a SDK message for performing a redelegation
 * of coins from a delegator and source validator to a destination validator.
 */
export interface MsgBeginRedelegate {
  delegator_address: string;
  validator_src_address: string;
  validator_dst_address: string;
  amount: Coin | undefined;
}

/** MsgBeginRedelegateResponse defines the Msg/BeginRedelegate response type. */
export interface MsgBeginRedelegateResponse {
  completion_time: Date | undefined;
}

/**
 * MsgUndelegate defines a SDK message for performing an undelegation from a
 * delegate and a validator.
 */
export interface MsgUndelegate {
  delegator_address: string;
  validator_address: string;
  amount: Coin | undefined;
}

/** MsgUndelegateResponse defines the Msg/Undelegate response type. */
export interface MsgUndelegateResponse {
  completion_time: Date | undefined;
}

/** MsgCancelUnbondingDelegation defines the SDK message for performing a cancel unbonding delegation for delegator */
export interface MsgCancelUnbondingDelegation {
  delegator_address: string;
  validator_address: string;
  /** amount is always less than or equal to unbonding delegation entry balance */
  amount: Coin | undefined;
  /** creation_height is the height which the unbonding took place. */
  creation_height: number;
}

/** MsgCancelUnbondingDelegationResponse */
export interface MsgCancelUnbondingDelegationResponse {}

const baseMsgCreateValidator: object = {
  min_self_delegation: "",
  delegator_address: "",
  validator_address: "",
};

export const MsgCreateValidator = {
  encode(
    message: MsgCreateValidator,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.description !== undefined) {
      Description.encode(
        message.description,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.commission !== undefined) {
      CommissionRates.encode(
        message.commission,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.min_self_delegation !== "") {
      writer.uint32(26).string(message.min_self_delegation);
    }
    if (message.delegator_address !== "") {
      writer.uint32(34).string(message.delegator_address);
    }
    if (message.validator_address !== "") {
      writer.uint32(42).string(message.validator_address);
    }
    if (message.pubkey !== undefined) {
      Any.encode(message.pubkey, writer.uint32(50).fork()).ldelim();
    }
    if (message.value !== undefined) {
      Coin.encode(message.value, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateValidator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateValidator } as MsgCreateValidator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.description = Description.decode(reader, reader.uint32());
          break;
        case 2:
          message.commission = CommissionRates.decode(reader, reader.uint32());
          break;
        case 3:
          message.min_self_delegation = reader.string();
          break;
        case 4:
          message.delegator_address = reader.string();
          break;
        case 5:
          message.validator_address = reader.string();
          break;
        case 6:
          message.pubkey = Any.decode(reader, reader.uint32());
          break;
        case 7:
          message.value = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateValidator {
    const message = { ...baseMsgCreateValidator } as MsgCreateValidator;
    message.description =
      object.description !== undefined && object.description !== null
        ? Description.fromJSON(object.description)
        : undefined;
    message.commission =
      object.commission !== undefined && object.commission !== null
        ? CommissionRates.fromJSON(object.commission)
        : undefined;
    message.min_self_delegation =
      object.min_self_delegation !== undefined &&
      object.min_self_delegation !== null
        ? String(object.min_self_delegation)
        : "";
    message.delegator_address =
      object.delegator_address !== undefined &&
      object.delegator_address !== null
        ? String(object.delegator_address)
        : "";
    message.validator_address =
      object.validator_address !== undefined &&
      object.validator_address !== null
        ? String(object.validator_address)
        : "";
    message.pubkey =
      object.pubkey !== undefined && object.pubkey !== null
        ? Any.fromJSON(object.pubkey)
        : undefined;
    message.value =
      object.value !== undefined && object.value !== null
        ? Coin.fromJSON(object.value)
        : undefined;
    return message;
  },

  toJSON(message: MsgCreateValidator): unknown {
    const obj: any = {};
    message.description !== undefined &&
      (obj.description = message.description
        ? Description.toJSON(message.description)
        : undefined);
    message.commission !== undefined &&
      (obj.commission = message.commission
        ? CommissionRates.toJSON(message.commission)
        : undefined);
    message.min_self_delegation !== undefined &&
      (obj.min_self_delegation = message.min_self_delegation);
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    message.pubkey !== undefined &&
      (obj.pubkey = message.pubkey ? Any.toJSON(message.pubkey) : undefined);
    message.value !== undefined &&
      (obj.value = message.value ? Coin.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateValidator>, I>>(
    object: I
  ): MsgCreateValidator {
    const message = { ...baseMsgCreateValidator } as MsgCreateValidator;
    message.description =
      object.description !== undefined && object.description !== null
        ? Description.fromPartial(object.description)
        : undefined;
    message.commission =
      object.commission !== undefined && object.commission !== null
        ? CommissionRates.fromPartial(object.commission)
        : undefined;
    message.min_self_delegation = object.min_self_delegation ?? "";
    message.delegator_address = object.delegator_address ?? "";
    message.validator_address = object.validator_address ?? "";
    message.pubkey =
      object.pubkey !== undefined && object.pubkey !== null
        ? Any.fromPartial(object.pubkey)
        : undefined;
    message.value =
      object.value !== undefined && object.value !== null
        ? Coin.fromPartial(object.value)
        : undefined;
    return message;
  },
};

const baseMsgCreateValidatorResponse: object = {};

export const MsgCreateValidatorResponse = {
  encode(
    _: MsgCreateValidatorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateValidatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateValidatorResponse,
    } as MsgCreateValidatorResponse;
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

  fromJSON(_: any): MsgCreateValidatorResponse {
    const message = {
      ...baseMsgCreateValidatorResponse,
    } as MsgCreateValidatorResponse;
    return message;
  },

  toJSON(_: MsgCreateValidatorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateValidatorResponse>, I>>(
    _: I
  ): MsgCreateValidatorResponse {
    const message = {
      ...baseMsgCreateValidatorResponse,
    } as MsgCreateValidatorResponse;
    return message;
  },
};

const baseMsgEditValidator: object = {
  validator_address: "",
  commission_rate: "",
  min_self_delegation: "",
};

export const MsgEditValidator = {
  encode(
    message: MsgEditValidator,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.description !== undefined) {
      Description.encode(
        message.description,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.validator_address !== "") {
      writer.uint32(18).string(message.validator_address);
    }
    if (message.commission_rate !== "") {
      writer.uint32(26).string(message.commission_rate);
    }
    if (message.min_self_delegation !== "") {
      writer.uint32(34).string(message.min_self_delegation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgEditValidator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgEditValidator } as MsgEditValidator;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.description = Description.decode(reader, reader.uint32());
          break;
        case 2:
          message.validator_address = reader.string();
          break;
        case 3:
          message.commission_rate = reader.string();
          break;
        case 4:
          message.min_self_delegation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgEditValidator {
    const message = { ...baseMsgEditValidator } as MsgEditValidator;
    message.description =
      object.description !== undefined && object.description !== null
        ? Description.fromJSON(object.description)
        : undefined;
    message.validator_address =
      object.validator_address !== undefined &&
      object.validator_address !== null
        ? String(object.validator_address)
        : "";
    message.commission_rate =
      object.commission_rate !== undefined && object.commission_rate !== null
        ? String(object.commission_rate)
        : "";
    message.min_self_delegation =
      object.min_self_delegation !== undefined &&
      object.min_self_delegation !== null
        ? String(object.min_self_delegation)
        : "";
    return message;
  },

  toJSON(message: MsgEditValidator): unknown {
    const obj: any = {};
    message.description !== undefined &&
      (obj.description = message.description
        ? Description.toJSON(message.description)
        : undefined);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    message.commission_rate !== undefined &&
      (obj.commission_rate = message.commission_rate);
    message.min_self_delegation !== undefined &&
      (obj.min_self_delegation = message.min_self_delegation);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEditValidator>, I>>(
    object: I
  ): MsgEditValidator {
    const message = { ...baseMsgEditValidator } as MsgEditValidator;
    message.description =
      object.description !== undefined && object.description !== null
        ? Description.fromPartial(object.description)
        : undefined;
    message.validator_address = object.validator_address ?? "";
    message.commission_rate = object.commission_rate ?? "";
    message.min_self_delegation = object.min_self_delegation ?? "";
    return message;
  },
};

const baseMsgEditValidatorResponse: object = {};

export const MsgEditValidatorResponse = {
  encode(
    _: MsgEditValidatorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgEditValidatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgEditValidatorResponse,
    } as MsgEditValidatorResponse;
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

  fromJSON(_: any): MsgEditValidatorResponse {
    const message = {
      ...baseMsgEditValidatorResponse,
    } as MsgEditValidatorResponse;
    return message;
  },

  toJSON(_: MsgEditValidatorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgEditValidatorResponse>, I>>(
    _: I
  ): MsgEditValidatorResponse {
    const message = {
      ...baseMsgEditValidatorResponse,
    } as MsgEditValidatorResponse;
    return message;
  },
};

const baseMsgDelegate: object = {
  delegator_address: "",
  validator_address: "",
};

export const MsgDelegate = {
  encode(
    message: MsgDelegate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_address !== "") {
      writer.uint32(18).string(message.validator_address);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDelegate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDelegate } as MsgDelegate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_address = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDelegate {
    const message = { ...baseMsgDelegate } as MsgDelegate;
    message.delegator_address =
      object.delegator_address !== undefined &&
      object.delegator_address !== null
        ? String(object.delegator_address)
        : "";
    message.validator_address =
      object.validator_address !== undefined &&
      object.validator_address !== null
        ? String(object.validator_address)
        : "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromJSON(object.amount)
        : undefined;
    return message;
  },

  toJSON(message: MsgDelegate): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDelegate>, I>>(
    object: I
  ): MsgDelegate {
    const message = { ...baseMsgDelegate } as MsgDelegate;
    message.delegator_address = object.delegator_address ?? "";
    message.validator_address = object.validator_address ?? "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromPartial(object.amount)
        : undefined;
    return message;
  },
};

const baseMsgDelegateResponse: object = {};

export const MsgDelegateResponse = {
  encode(
    _: MsgDelegateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDelegateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDelegateResponse } as MsgDelegateResponse;
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

  fromJSON(_: any): MsgDelegateResponse {
    const message = { ...baseMsgDelegateResponse } as MsgDelegateResponse;
    return message;
  },

  toJSON(_: MsgDelegateResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDelegateResponse>, I>>(
    _: I
  ): MsgDelegateResponse {
    const message = { ...baseMsgDelegateResponse } as MsgDelegateResponse;
    return message;
  },
};

const baseMsgBeginRedelegate: object = {
  delegator_address: "",
  validator_src_address: "",
  validator_dst_address: "",
};

export const MsgBeginRedelegate = {
  encode(
    message: MsgBeginRedelegate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_src_address !== "") {
      writer.uint32(18).string(message.validator_src_address);
    }
    if (message.validator_dst_address !== "") {
      writer.uint32(26).string(message.validator_dst_address);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBeginRedelegate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgBeginRedelegate } as MsgBeginRedelegate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_src_address = reader.string();
          break;
        case 3:
          message.validator_dst_address = reader.string();
          break;
        case 4:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBeginRedelegate {
    const message = { ...baseMsgBeginRedelegate } as MsgBeginRedelegate;
    message.delegator_address =
      object.delegator_address !== undefined &&
      object.delegator_address !== null
        ? String(object.delegator_address)
        : "";
    message.validator_src_address =
      object.validator_src_address !== undefined &&
      object.validator_src_address !== null
        ? String(object.validator_src_address)
        : "";
    message.validator_dst_address =
      object.validator_dst_address !== undefined &&
      object.validator_dst_address !== null
        ? String(object.validator_dst_address)
        : "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromJSON(object.amount)
        : undefined;
    return message;
  },

  toJSON(message: MsgBeginRedelegate): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_src_address !== undefined &&
      (obj.validator_src_address = message.validator_src_address);
    message.validator_dst_address !== undefined &&
      (obj.validator_dst_address = message.validator_dst_address);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBeginRedelegate>, I>>(
    object: I
  ): MsgBeginRedelegate {
    const message = { ...baseMsgBeginRedelegate } as MsgBeginRedelegate;
    message.delegator_address = object.delegator_address ?? "";
    message.validator_src_address = object.validator_src_address ?? "";
    message.validator_dst_address = object.validator_dst_address ?? "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromPartial(object.amount)
        : undefined;
    return message;
  },
};

const baseMsgBeginRedelegateResponse: object = {};

export const MsgBeginRedelegateResponse = {
  encode(
    message: MsgBeginRedelegateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.completion_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.completion_time),
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgBeginRedelegateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgBeginRedelegateResponse,
    } as MsgBeginRedelegateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.completion_time = fromTimestamp(
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

  fromJSON(object: any): MsgBeginRedelegateResponse {
    const message = {
      ...baseMsgBeginRedelegateResponse,
    } as MsgBeginRedelegateResponse;
    message.completion_time =
      object.completion_time !== undefined && object.completion_time !== null
        ? fromJsonTimestamp(object.completion_time)
        : undefined;
    return message;
  },

  toJSON(message: MsgBeginRedelegateResponse): unknown {
    const obj: any = {};
    message.completion_time !== undefined &&
      (obj.completion_time = message.completion_time.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBeginRedelegateResponse>, I>>(
    object: I
  ): MsgBeginRedelegateResponse {
    const message = {
      ...baseMsgBeginRedelegateResponse,
    } as MsgBeginRedelegateResponse;
    message.completion_time = object.completion_time ?? undefined;
    return message;
  },
};

const baseMsgUndelegate: object = {
  delegator_address: "",
  validator_address: "",
};

export const MsgUndelegate = {
  encode(
    message: MsgUndelegate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_address !== "") {
      writer.uint32(18).string(message.validator_address);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUndelegate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUndelegate } as MsgUndelegate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_address = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUndelegate {
    const message = { ...baseMsgUndelegate } as MsgUndelegate;
    message.delegator_address =
      object.delegator_address !== undefined &&
      object.delegator_address !== null
        ? String(object.delegator_address)
        : "";
    message.validator_address =
      object.validator_address !== undefined &&
      object.validator_address !== null
        ? String(object.validator_address)
        : "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromJSON(object.amount)
        : undefined;
    return message;
  },

  toJSON(message: MsgUndelegate): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUndelegate>, I>>(
    object: I
  ): MsgUndelegate {
    const message = { ...baseMsgUndelegate } as MsgUndelegate;
    message.delegator_address = object.delegator_address ?? "";
    message.validator_address = object.validator_address ?? "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromPartial(object.amount)
        : undefined;
    return message;
  },
};

const baseMsgUndelegateResponse: object = {};

export const MsgUndelegateResponse = {
  encode(
    message: MsgUndelegateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.completion_time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.completion_time),
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUndelegateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUndelegateResponse } as MsgUndelegateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.completion_time = fromTimestamp(
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

  fromJSON(object: any): MsgUndelegateResponse {
    const message = { ...baseMsgUndelegateResponse } as MsgUndelegateResponse;
    message.completion_time =
      object.completion_time !== undefined && object.completion_time !== null
        ? fromJsonTimestamp(object.completion_time)
        : undefined;
    return message;
  },

  toJSON(message: MsgUndelegateResponse): unknown {
    const obj: any = {};
    message.completion_time !== undefined &&
      (obj.completion_time = message.completion_time.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUndelegateResponse>, I>>(
    object: I
  ): MsgUndelegateResponse {
    const message = { ...baseMsgUndelegateResponse } as MsgUndelegateResponse;
    message.completion_time = object.completion_time ?? undefined;
    return message;
  },
};

const baseMsgCancelUnbondingDelegation: object = {
  delegator_address: "",
  validator_address: "",
  creation_height: 0,
};

export const MsgCancelUnbondingDelegation = {
  encode(
    message: MsgCancelUnbondingDelegation,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_address !== "") {
      writer.uint32(10).string(message.delegator_address);
    }
    if (message.validator_address !== "") {
      writer.uint32(18).string(message.validator_address);
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
    }
    if (message.creation_height !== 0) {
      writer.uint32(32).int64(message.creation_height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCancelUnbondingDelegation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCancelUnbondingDelegation,
    } as MsgCancelUnbondingDelegation;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;
        case 2:
          message.validator_address = reader.string();
          break;
        case 3:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.creation_height = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelUnbondingDelegation {
    const message = {
      ...baseMsgCancelUnbondingDelegation,
    } as MsgCancelUnbondingDelegation;
    message.delegator_address =
      object.delegator_address !== undefined &&
      object.delegator_address !== null
        ? String(object.delegator_address)
        : "";
    message.validator_address =
      object.validator_address !== undefined &&
      object.validator_address !== null
        ? String(object.validator_address)
        : "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromJSON(object.amount)
        : undefined;
    message.creation_height =
      object.creation_height !== undefined && object.creation_height !== null
        ? Number(object.creation_height)
        : 0;
    return message;
  },

  toJSON(message: MsgCancelUnbondingDelegation): unknown {
    const obj: any = {};
    message.delegator_address !== undefined &&
      (obj.delegator_address = message.delegator_address);
    message.validator_address !== undefined &&
      (obj.validator_address = message.validator_address);
    message.amount !== undefined &&
      (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
    message.creation_height !== undefined &&
      (obj.creation_height = Math.round(message.creation_height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelUnbondingDelegation>, I>>(
    object: I
  ): MsgCancelUnbondingDelegation {
    const message = {
      ...baseMsgCancelUnbondingDelegation,
    } as MsgCancelUnbondingDelegation;
    message.delegator_address = object.delegator_address ?? "";
    message.validator_address = object.validator_address ?? "";
    message.amount =
      object.amount !== undefined && object.amount !== null
        ? Coin.fromPartial(object.amount)
        : undefined;
    message.creation_height = object.creation_height ?? 0;
    return message;
  },
};

const baseMsgCancelUnbondingDelegationResponse: object = {};

export const MsgCancelUnbondingDelegationResponse = {
  encode(
    _: MsgCancelUnbondingDelegationResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCancelUnbondingDelegationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCancelUnbondingDelegationResponse,
    } as MsgCancelUnbondingDelegationResponse;
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

  fromJSON(_: any): MsgCancelUnbondingDelegationResponse {
    const message = {
      ...baseMsgCancelUnbondingDelegationResponse,
    } as MsgCancelUnbondingDelegationResponse;
    return message;
  },

  toJSON(_: MsgCancelUnbondingDelegationResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgCancelUnbondingDelegationResponse>, I>
  >(_: I): MsgCancelUnbondingDelegationResponse {
    const message = {
      ...baseMsgCancelUnbondingDelegationResponse,
    } as MsgCancelUnbondingDelegationResponse;
    return message;
  },
};

/** Msg defines the staking Msg service. */
export interface Msg {
  /** CreateValidator defines a method for creating a new validator. */
  CreateValidator(
    request: MsgCreateValidator
  ): Promise<MsgCreateValidatorResponse>;
  /** EditValidator defines a method for editing an existing validator. */
  EditValidator(request: MsgEditValidator): Promise<MsgEditValidatorResponse>;
  /**
   * Delegate defines a method for performing a delegation of coins
   * from a delegator to a validator.
   */
  Delegate(request: MsgDelegate): Promise<MsgDelegateResponse>;
  /**
   * BeginRedelegate defines a method for performing a redelegation
   * of coins from a delegator and source validator to a destination validator.
   */
  BeginRedelegate(
    request: MsgBeginRedelegate
  ): Promise<MsgBeginRedelegateResponse>;
  /**
   * Undelegate defines a method for performing an undelegation from a
   * delegate and a validator.
   */
  Undelegate(request: MsgUndelegate): Promise<MsgUndelegateResponse>;
  /**
   * CancelUnbondingDelegation defines a method for performing canceling the unbonding delegation
   * and delegate back to previous validator.
   */
  CancelUnbondingDelegation(
    request: MsgCancelUnbondingDelegation
  ): Promise<MsgCancelUnbondingDelegationResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateValidator = this.CreateValidator.bind(this);
    this.EditValidator = this.EditValidator.bind(this);
    this.Delegate = this.Delegate.bind(this);
    this.BeginRedelegate = this.BeginRedelegate.bind(this);
    this.Undelegate = this.Undelegate.bind(this);
    this.CancelUnbondingDelegation = this.CancelUnbondingDelegation.bind(this);
  }
  CreateValidator(
    request: MsgCreateValidator
  ): Promise<MsgCreateValidatorResponse> {
    const data = MsgCreateValidator.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Msg",
      "CreateValidator",
      data
    );
    return promise.then((data) =>
      MsgCreateValidatorResponse.decode(new _m0.Reader(data))
    );
  }

  EditValidator(request: MsgEditValidator): Promise<MsgEditValidatorResponse> {
    const data = MsgEditValidator.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Msg",
      "EditValidator",
      data
    );
    return promise.then((data) =>
      MsgEditValidatorResponse.decode(new _m0.Reader(data))
    );
  }

  Delegate(request: MsgDelegate): Promise<MsgDelegateResponse> {
    const data = MsgDelegate.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Msg",
      "Delegate",
      data
    );
    return promise.then((data) =>
      MsgDelegateResponse.decode(new _m0.Reader(data))
    );
  }

  BeginRedelegate(
    request: MsgBeginRedelegate
  ): Promise<MsgBeginRedelegateResponse> {
    const data = MsgBeginRedelegate.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Msg",
      "BeginRedelegate",
      data
    );
    return promise.then((data) =>
      MsgBeginRedelegateResponse.decode(new _m0.Reader(data))
    );
  }

  Undelegate(request: MsgUndelegate): Promise<MsgUndelegateResponse> {
    const data = MsgUndelegate.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Msg",
      "Undelegate",
      data
    );
    return promise.then((data) =>
      MsgUndelegateResponse.decode(new _m0.Reader(data))
    );
  }

  CancelUnbondingDelegation(
    request: MsgCancelUnbondingDelegation
  ): Promise<MsgCancelUnbondingDelegationResponse> {
    const data = MsgCancelUnbondingDelegation.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Msg",
      "CancelUnbondingDelegation",
      data
    );
    return promise.then((data) =>
      MsgCancelUnbondingDelegationResponse.decode(new _m0.Reader(data))
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
