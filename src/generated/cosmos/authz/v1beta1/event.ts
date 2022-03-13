/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.authz.v1beta1";

/** Since: cosmos-sdk 0.43 */

/** EventGrant is emitted on Msg/Grant */
export interface EventGrant {
  /** Msg type URL for which an autorization is granted */
  msg_type_url: string;
  /** Granter account address */
  granter: string;
  /** Grantee account address */
  grantee: string;
}

/** EventRevoke is emitted on Msg/Revoke */
export interface EventRevoke {
  /** Msg type URL for which an autorization is revoked */
  msg_type_url: string;
  /** Granter account address */
  granter: string;
  /** Grantee account address */
  grantee: string;
}

const baseEventGrant: object = { msg_type_url: "", granter: "", grantee: "" };

export const EventGrant = {
  encode(
    message: EventGrant,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.msg_type_url !== "") {
      writer.uint32(18).string(message.msg_type_url);
    }
    if (message.granter !== "") {
      writer.uint32(26).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(34).string(message.grantee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventGrant {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventGrant } as EventGrant;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.msg_type_url = reader.string();
          break;
        case 3:
          message.granter = reader.string();
          break;
        case 4:
          message.grantee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventGrant {
    const message = { ...baseEventGrant } as EventGrant;
    message.msg_type_url =
      object.msg_type_url !== undefined && object.msg_type_url !== null
        ? String(object.msg_type_url)
        : "";
    message.granter =
      object.granter !== undefined && object.granter !== null
        ? String(object.granter)
        : "";
    message.grantee =
      object.grantee !== undefined && object.grantee !== null
        ? String(object.grantee)
        : "";
    return message;
  },

  toJSON(message: EventGrant): unknown {
    const obj: any = {};
    message.msg_type_url !== undefined &&
      (obj.msg_type_url = message.msg_type_url);
    message.granter !== undefined && (obj.granter = message.granter);
    message.grantee !== undefined && (obj.grantee = message.grantee);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventGrant>, I>>(
    object: I
  ): EventGrant {
    const message = { ...baseEventGrant } as EventGrant;
    message.msg_type_url = object.msg_type_url ?? "";
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    return message;
  },
};

const baseEventRevoke: object = { msg_type_url: "", granter: "", grantee: "" };

export const EventRevoke = {
  encode(
    message: EventRevoke,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.msg_type_url !== "") {
      writer.uint32(18).string(message.msg_type_url);
    }
    if (message.granter !== "") {
      writer.uint32(26).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(34).string(message.grantee);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventRevoke {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventRevoke } as EventRevoke;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.msg_type_url = reader.string();
          break;
        case 3:
          message.granter = reader.string();
          break;
        case 4:
          message.grantee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventRevoke {
    const message = { ...baseEventRevoke } as EventRevoke;
    message.msg_type_url =
      object.msg_type_url !== undefined && object.msg_type_url !== null
        ? String(object.msg_type_url)
        : "";
    message.granter =
      object.granter !== undefined && object.granter !== null
        ? String(object.granter)
        : "";
    message.grantee =
      object.grantee !== undefined && object.grantee !== null
        ? String(object.grantee)
        : "";
    return message;
  },

  toJSON(message: EventRevoke): unknown {
    const obj: any = {};
    message.msg_type_url !== undefined &&
      (obj.msg_type_url = message.msg_type_url);
    message.granter !== undefined && (obj.granter = message.granter);
    message.grantee !== undefined && (obj.grantee = message.grantee);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventRevoke>, I>>(
    object: I
  ): EventRevoke {
    const message = { ...baseEventRevoke } as EventRevoke;
    message.msg_type_url = object.msg_type_url ?? "";
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    return message;
  },
};

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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
