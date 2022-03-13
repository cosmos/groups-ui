/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.base.snapshots.v1beta1";

/** Snapshot contains Tendermint state sync snapshot info. */
export interface Snapshot {
  height: number;
  format: number;
  chunks: number;
  hash: Uint8Array;
  metadata: Metadata | undefined;
}

/** Metadata contains SDK-specific snapshot metadata. */
export interface Metadata {
  /** SHA-256 chunk hashes */
  chunk_hashes: Uint8Array[];
}

/** SnapshotItem is an item contained in a rootmulti.Store snapshot. */
export interface SnapshotItem {
  store: SnapshotStoreItem | undefined;
  iavl: SnapshotIAVLItem | undefined;
  extension: SnapshotExtensionMeta | undefined;
  extension_payload: SnapshotExtensionPayload | undefined;
  kv: SnapshotKVItem | undefined;
  schema: SnapshotSchema | undefined;
}

/** SnapshotStoreItem contains metadata about a snapshotted store. */
export interface SnapshotStoreItem {
  name: string;
}

/** SnapshotIAVLItem is an exported IAVL node. */
export interface SnapshotIAVLItem {
  key: Uint8Array;
  value: Uint8Array;
  /** version is block height */
  version: number;
  /** height is depth of the tree. */
  height: number;
}

/** SnapshotExtensionMeta contains metadata about an external snapshotter. */
export interface SnapshotExtensionMeta {
  name: string;
  format: number;
}

/** SnapshotExtensionPayload contains payloads of an external snapshotter. */
export interface SnapshotExtensionPayload {
  payload: Uint8Array;
}

/** SnapshotKVItem is an exported Key/Value Pair */
export interface SnapshotKVItem {
  key: Uint8Array;
  value: Uint8Array;
}

/** SnapshotSchema is an exported schema of smt store */
export interface SnapshotSchema {
  keys: Uint8Array[];
}

const baseSnapshot: object = { height: 0, format: 0, chunks: 0 };

export const Snapshot = {
  encode(
    message: Snapshot,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunks !== 0) {
      writer.uint32(24).uint32(message.chunks);
    }
    if (message.hash.length !== 0) {
      writer.uint32(34).bytes(message.hash);
    }
    if (message.metadata !== undefined) {
      Metadata.encode(message.metadata, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Snapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSnapshot } as Snapshot;
    message.hash = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.format = reader.uint32();
          break;
        case 3:
          message.chunks = reader.uint32();
          break;
        case 4:
          message.hash = reader.bytes();
          break;
        case 5:
          message.metadata = Metadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Snapshot {
    const message = { ...baseSnapshot } as Snapshot;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    message.format =
      object.format !== undefined && object.format !== null
        ? Number(object.format)
        : 0;
    message.chunks =
      object.chunks !== undefined && object.chunks !== null
        ? Number(object.chunks)
        : 0;
    message.hash =
      object.hash !== undefined && object.hash !== null
        ? bytesFromBase64(object.hash)
        : new Uint8Array();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromJSON(object.metadata)
        : undefined;
    return message;
  },

  toJSON(message: Snapshot): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.format !== undefined && (obj.format = Math.round(message.format));
    message.chunks !== undefined && (obj.chunks = Math.round(message.chunks));
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array()
      ));
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? Metadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Snapshot>, I>>(object: I): Snapshot {
    const message = { ...baseSnapshot } as Snapshot;
    message.height = object.height ?? 0;
    message.format = object.format ?? 0;
    message.chunks = object.chunks ?? 0;
    message.hash = object.hash ?? new Uint8Array();
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? Metadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

const baseMetadata: object = {};

export const Metadata = {
  encode(
    message: Metadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.chunk_hashes) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMetadata } as Metadata;
    message.chunk_hashes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chunk_hashes.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    const message = { ...baseMetadata } as Metadata;
    message.chunk_hashes = (object.chunk_hashes ?? []).map((e: any) =>
      bytesFromBase64(e)
    );
    return message;
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    if (message.chunk_hashes) {
      obj.chunk_hashes = message.chunk_hashes.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array())
      );
    } else {
      obj.chunk_hashes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = { ...baseMetadata } as Metadata;
    message.chunk_hashes = object.chunk_hashes?.map((e) => e) || [];
    return message;
  },
};

const baseSnapshotItem: object = {};

export const SnapshotItem = {
  encode(
    message: SnapshotItem,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.store !== undefined) {
      SnapshotStoreItem.encode(
        message.store,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.iavl !== undefined) {
      SnapshotIAVLItem.encode(message.iavl, writer.uint32(18).fork()).ldelim();
    }
    if (message.extension !== undefined) {
      SnapshotExtensionMeta.encode(
        message.extension,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.extension_payload !== undefined) {
      SnapshotExtensionPayload.encode(
        message.extension_payload,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.kv !== undefined) {
      SnapshotKVItem.encode(message.kv, writer.uint32(42).fork()).ldelim();
    }
    if (message.schema !== undefined) {
      SnapshotSchema.encode(message.schema, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSnapshotItem } as SnapshotItem;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.store = SnapshotStoreItem.decode(reader, reader.uint32());
          break;
        case 2:
          message.iavl = SnapshotIAVLItem.decode(reader, reader.uint32());
          break;
        case 3:
          message.extension = SnapshotExtensionMeta.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.extension_payload = SnapshotExtensionPayload.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.kv = SnapshotKVItem.decode(reader, reader.uint32());
          break;
        case 6:
          message.schema = SnapshotSchema.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SnapshotItem {
    const message = { ...baseSnapshotItem } as SnapshotItem;
    message.store =
      object.store !== undefined && object.store !== null
        ? SnapshotStoreItem.fromJSON(object.store)
        : undefined;
    message.iavl =
      object.iavl !== undefined && object.iavl !== null
        ? SnapshotIAVLItem.fromJSON(object.iavl)
        : undefined;
    message.extension =
      object.extension !== undefined && object.extension !== null
        ? SnapshotExtensionMeta.fromJSON(object.extension)
        : undefined;
    message.extension_payload =
      object.extension_payload !== undefined &&
      object.extension_payload !== null
        ? SnapshotExtensionPayload.fromJSON(object.extension_payload)
        : undefined;
    message.kv =
      object.kv !== undefined && object.kv !== null
        ? SnapshotKVItem.fromJSON(object.kv)
        : undefined;
    message.schema =
      object.schema !== undefined && object.schema !== null
        ? SnapshotSchema.fromJSON(object.schema)
        : undefined;
    return message;
  },

  toJSON(message: SnapshotItem): unknown {
    const obj: any = {};
    message.store !== undefined &&
      (obj.store = message.store
        ? SnapshotStoreItem.toJSON(message.store)
        : undefined);
    message.iavl !== undefined &&
      (obj.iavl = message.iavl
        ? SnapshotIAVLItem.toJSON(message.iavl)
        : undefined);
    message.extension !== undefined &&
      (obj.extension = message.extension
        ? SnapshotExtensionMeta.toJSON(message.extension)
        : undefined);
    message.extension_payload !== undefined &&
      (obj.extension_payload = message.extension_payload
        ? SnapshotExtensionPayload.toJSON(message.extension_payload)
        : undefined);
    message.kv !== undefined &&
      (obj.kv = message.kv ? SnapshotKVItem.toJSON(message.kv) : undefined);
    message.schema !== undefined &&
      (obj.schema = message.schema
        ? SnapshotSchema.toJSON(message.schema)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SnapshotItem>, I>>(
    object: I
  ): SnapshotItem {
    const message = { ...baseSnapshotItem } as SnapshotItem;
    message.store =
      object.store !== undefined && object.store !== null
        ? SnapshotStoreItem.fromPartial(object.store)
        : undefined;
    message.iavl =
      object.iavl !== undefined && object.iavl !== null
        ? SnapshotIAVLItem.fromPartial(object.iavl)
        : undefined;
    message.extension =
      object.extension !== undefined && object.extension !== null
        ? SnapshotExtensionMeta.fromPartial(object.extension)
        : undefined;
    message.extension_payload =
      object.extension_payload !== undefined &&
      object.extension_payload !== null
        ? SnapshotExtensionPayload.fromPartial(object.extension_payload)
        : undefined;
    message.kv =
      object.kv !== undefined && object.kv !== null
        ? SnapshotKVItem.fromPartial(object.kv)
        : undefined;
    message.schema =
      object.schema !== undefined && object.schema !== null
        ? SnapshotSchema.fromPartial(object.schema)
        : undefined;
    return message;
  },
};

const baseSnapshotStoreItem: object = { name: "" };

export const SnapshotStoreItem = {
  encode(
    message: SnapshotStoreItem,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotStoreItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSnapshotStoreItem } as SnapshotStoreItem;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SnapshotStoreItem {
    const message = { ...baseSnapshotStoreItem } as SnapshotStoreItem;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    return message;
  },

  toJSON(message: SnapshotStoreItem): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SnapshotStoreItem>, I>>(
    object: I
  ): SnapshotStoreItem {
    const message = { ...baseSnapshotStoreItem } as SnapshotStoreItem;
    message.name = object.name ?? "";
    return message;
  },
};

const baseSnapshotIAVLItem: object = { version: 0, height: 0 };

export const SnapshotIAVLItem = {
  encode(
    message: SnapshotIAVLItem,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    if (message.version !== 0) {
      writer.uint32(24).int64(message.version);
    }
    if (message.height !== 0) {
      writer.uint32(32).int32(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotIAVLItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSnapshotIAVLItem } as SnapshotIAVLItem;
    message.key = new Uint8Array();
    message.value = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        case 3:
          message.version = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.height = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SnapshotIAVLItem {
    const message = { ...baseSnapshotIAVLItem } as SnapshotIAVLItem;
    message.key =
      object.key !== undefined && object.key !== null
        ? bytesFromBase64(object.key)
        : new Uint8Array();
    message.value =
      object.value !== undefined && object.value !== null
        ? bytesFromBase64(object.value)
        : new Uint8Array();
    message.version =
      object.version !== undefined && object.version !== null
        ? Number(object.version)
        : 0;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    return message;
  },

  toJSON(message: SnapshotIAVLItem): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array()
      ));
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    message.version !== undefined &&
      (obj.version = Math.round(message.version));
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SnapshotIAVLItem>, I>>(
    object: I
  ): SnapshotIAVLItem {
    const message = { ...baseSnapshotIAVLItem } as SnapshotIAVLItem;
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    message.version = object.version ?? 0;
    message.height = object.height ?? 0;
    return message;
  },
};

const baseSnapshotExtensionMeta: object = { name: "", format: 0 };

export const SnapshotExtensionMeta = {
  encode(
    message: SnapshotExtensionMeta,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SnapshotExtensionMeta {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSnapshotExtensionMeta } as SnapshotExtensionMeta;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.format = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SnapshotExtensionMeta {
    const message = { ...baseSnapshotExtensionMeta } as SnapshotExtensionMeta;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.format =
      object.format !== undefined && object.format !== null
        ? Number(object.format)
        : 0;
    return message;
  },

  toJSON(message: SnapshotExtensionMeta): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.format !== undefined && (obj.format = Math.round(message.format));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SnapshotExtensionMeta>, I>>(
    object: I
  ): SnapshotExtensionMeta {
    const message = { ...baseSnapshotExtensionMeta } as SnapshotExtensionMeta;
    message.name = object.name ?? "";
    message.format = object.format ?? 0;
    return message;
  },
};

const baseSnapshotExtensionPayload: object = {};

export const SnapshotExtensionPayload = {
  encode(
    message: SnapshotExtensionPayload,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.payload.length !== 0) {
      writer.uint32(10).bytes(message.payload);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SnapshotExtensionPayload {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSnapshotExtensionPayload,
    } as SnapshotExtensionPayload;
    message.payload = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SnapshotExtensionPayload {
    const message = {
      ...baseSnapshotExtensionPayload,
    } as SnapshotExtensionPayload;
    message.payload =
      object.payload !== undefined && object.payload !== null
        ? bytesFromBase64(object.payload)
        : new Uint8Array();
    return message;
  },

  toJSON(message: SnapshotExtensionPayload): unknown {
    const obj: any = {};
    message.payload !== undefined &&
      (obj.payload = base64FromBytes(
        message.payload !== undefined ? message.payload : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SnapshotExtensionPayload>, I>>(
    object: I
  ): SnapshotExtensionPayload {
    const message = {
      ...baseSnapshotExtensionPayload,
    } as SnapshotExtensionPayload;
    message.payload = object.payload ?? new Uint8Array();
    return message;
  },
};

const baseSnapshotKVItem: object = {};

export const SnapshotKVItem = {
  encode(
    message: SnapshotKVItem,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotKVItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSnapshotKVItem } as SnapshotKVItem;
    message.key = new Uint8Array();
    message.value = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SnapshotKVItem {
    const message = { ...baseSnapshotKVItem } as SnapshotKVItem;
    message.key =
      object.key !== undefined && object.key !== null
        ? bytesFromBase64(object.key)
        : new Uint8Array();
    message.value =
      object.value !== undefined && object.value !== null
        ? bytesFromBase64(object.value)
        : new Uint8Array();
    return message;
  },

  toJSON(message: SnapshotKVItem): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array()
      ));
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SnapshotKVItem>, I>>(
    object: I
  ): SnapshotKVItem {
    const message = { ...baseSnapshotKVItem } as SnapshotKVItem;
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};

const baseSnapshotSchema: object = {};

export const SnapshotSchema = {
  encode(
    message: SnapshotSchema,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.keys) {
      writer.uint32(10).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SnapshotSchema {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSnapshotSchema } as SnapshotSchema;
    message.keys = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.keys.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SnapshotSchema {
    const message = { ...baseSnapshotSchema } as SnapshotSchema;
    message.keys = (object.keys ?? []).map((e: any) => bytesFromBase64(e));
    return message;
  },

  toJSON(message: SnapshotSchema): unknown {
    const obj: any = {};
    if (message.keys) {
      obj.keys = message.keys.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array())
      );
    } else {
      obj.keys = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SnapshotSchema>, I>>(
    object: I
  ): SnapshotSchema {
    const message = { ...baseSnapshotSchema } as SnapshotSchema;
    message.keys = object.keys?.map((e) => e) || [];
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
