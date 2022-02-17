/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { FileDescriptorSet } from "../../../google/protobuf/descriptor";

export const protobufPackage = "cosmos.orm.v1alpha1";

/**
 * SchemaDescriptor describes an ORM schema that contains all the information
 * needed for a dynamic client to decode the stored data.
 */
export interface SchemaDescriptor {
  /**
   * files is the set of all FileDescriptorProto's needed to decode the stored data.
   * A schema imposes the constraint that every file and every table within that
   * schema have at most one instance in the store.
   */
  files: FileDescriptorSet | undefined;
  /** modules is the set of modules in the schema. */
  modules: SchemaDescriptor_ModuleEntry[];
}

/** ModuleEntry describes a single module's schema. */
export interface SchemaDescriptor_ModuleEntry {
  /**
   * name is the name of the module. In the multi-store model this name is
   * used to locate the module's store.
   */
  name: string;
  /**
   * prefix is an optional prefix that precedes all keys in this module's
   * store.
   */
  prefix: Uint8Array;
  /** files describes the schema files used in this module. */
  files: SchemaDescriptor_FileEntry[];
}

/** FileEntry describes an ORM file used in a module. */
export interface SchemaDescriptor_FileEntry {
  /**
   * id is a prefix that will be varint encoded and prepended to all the
   * table keys specified in the file's tables.
   */
  id: number;
  /**
   * file_name is the name of a file in the FileDescriptor set that contains
   * table definitions.
   */
  file_name: string;
}

const baseSchemaDescriptor: object = {};

export const SchemaDescriptor = {
  encode(
    message: SchemaDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.files !== undefined) {
      FileDescriptorSet.encode(
        message.files,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.modules) {
      SchemaDescriptor_ModuleEntry.encode(
        v!,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SchemaDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSchemaDescriptor } as SchemaDescriptor;
    message.modules = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.files = FileDescriptorSet.decode(reader, reader.uint32());
          break;
        case 2:
          message.modules.push(
            SchemaDescriptor_ModuleEntry.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SchemaDescriptor {
    const message = { ...baseSchemaDescriptor } as SchemaDescriptor;
    message.files =
      object.files !== undefined && object.files !== null
        ? FileDescriptorSet.fromJSON(object.files)
        : undefined;
    message.modules = (object.modules ?? []).map((e: any) =>
      SchemaDescriptor_ModuleEntry.fromJSON(e)
    );
    return message;
  },

  toJSON(message: SchemaDescriptor): unknown {
    const obj: any = {};
    message.files !== undefined &&
      (obj.files = message.files
        ? FileDescriptorSet.toJSON(message.files)
        : undefined);
    if (message.modules) {
      obj.modules = message.modules.map((e) =>
        e ? SchemaDescriptor_ModuleEntry.toJSON(e) : undefined
      );
    } else {
      obj.modules = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SchemaDescriptor>, I>>(
    object: I
  ): SchemaDescriptor {
    const message = { ...baseSchemaDescriptor } as SchemaDescriptor;
    message.files =
      object.files !== undefined && object.files !== null
        ? FileDescriptorSet.fromPartial(object.files)
        : undefined;
    message.modules =
      object.modules?.map((e) => SchemaDescriptor_ModuleEntry.fromPartial(e)) ||
      [];
    return message;
  },
};

const baseSchemaDescriptor_ModuleEntry: object = { name: "" };

export const SchemaDescriptor_ModuleEntry = {
  encode(
    message: SchemaDescriptor_ModuleEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.prefix.length !== 0) {
      writer.uint32(18).bytes(message.prefix);
    }
    for (const v of message.files) {
      SchemaDescriptor_FileEntry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SchemaDescriptor_ModuleEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSchemaDescriptor_ModuleEntry,
    } as SchemaDescriptor_ModuleEntry;
    message.files = [];
    message.prefix = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.prefix = reader.bytes();
          break;
        case 3:
          message.files.push(
            SchemaDescriptor_FileEntry.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SchemaDescriptor_ModuleEntry {
    const message = {
      ...baseSchemaDescriptor_ModuleEntry,
    } as SchemaDescriptor_ModuleEntry;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.prefix =
      object.prefix !== undefined && object.prefix !== null
        ? bytesFromBase64(object.prefix)
        : new Uint8Array();
    message.files = (object.files ?? []).map((e: any) =>
      SchemaDescriptor_FileEntry.fromJSON(e)
    );
    return message;
  },

  toJSON(message: SchemaDescriptor_ModuleEntry): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.prefix !== undefined &&
      (obj.prefix = base64FromBytes(
        message.prefix !== undefined ? message.prefix : new Uint8Array()
      ));
    if (message.files) {
      obj.files = message.files.map((e) =>
        e ? SchemaDescriptor_FileEntry.toJSON(e) : undefined
      );
    } else {
      obj.files = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SchemaDescriptor_ModuleEntry>, I>>(
    object: I
  ): SchemaDescriptor_ModuleEntry {
    const message = {
      ...baseSchemaDescriptor_ModuleEntry,
    } as SchemaDescriptor_ModuleEntry;
    message.name = object.name ?? "";
    message.prefix = object.prefix ?? new Uint8Array();
    message.files =
      object.files?.map((e) => SchemaDescriptor_FileEntry.fromPartial(e)) || [];
    return message;
  },
};

const baseSchemaDescriptor_FileEntry: object = { id: 0, file_name: "" };

export const SchemaDescriptor_FileEntry = {
  encode(
    message: SchemaDescriptor_FileEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint32(message.id);
    }
    if (message.file_name !== "") {
      writer.uint32(18).string(message.file_name);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SchemaDescriptor_FileEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSchemaDescriptor_FileEntry,
    } as SchemaDescriptor_FileEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.file_name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SchemaDescriptor_FileEntry {
    const message = {
      ...baseSchemaDescriptor_FileEntry,
    } as SchemaDescriptor_FileEntry;
    message.id =
      object.id !== undefined && object.id !== null ? Number(object.id) : 0;
    message.file_name =
      object.file_name !== undefined && object.file_name !== null
        ? String(object.file_name)
        : "";
    return message;
  },

  toJSON(message: SchemaDescriptor_FileEntry): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.file_name !== undefined && (obj.file_name = message.file_name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SchemaDescriptor_FileEntry>, I>>(
    object: I
  ): SchemaDescriptor_FileEntry {
    const message = {
      ...baseSchemaDescriptor_FileEntry,
    } as SchemaDescriptor_FileEntry;
    message.id = object.id ?? 0;
    message.file_name = object.file_name ?? "";
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
