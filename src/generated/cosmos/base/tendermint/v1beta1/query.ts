/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  PageRequest,
  PageResponse,
} from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { BlockID } from "../../../../tendermint/types/types";
import { Block } from "../../../../tendermint/types/block";
import { NodeInfo } from "../../../../tendermint/p2p/types";

export const protobufPackage = "cosmos.base.tendermint.v1beta1";

/** GetValidatorSetByHeightRequest is the request type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetValidatorSetByHeightRequest {
  height: number;
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

/** GetValidatorSetByHeightResponse is the response type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetValidatorSetByHeightResponse {
  block_height: number;
  validators: Validator[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

/** GetLatestValidatorSetRequest is the request type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetLatestValidatorSetRequest {
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

/** GetLatestValidatorSetResponse is the response type for the Query/GetValidatorSetByHeight RPC method. */
export interface GetLatestValidatorSetResponse {
  block_height: number;
  validators: Validator[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

/** Validator is the type for the validator-set. */
export interface Validator {
  address: string;
  pub_key: Any | undefined;
  voting_power: number;
  proposer_priority: number;
}

/** GetBlockByHeightRequest is the request type for the Query/GetBlockByHeight RPC method. */
export interface GetBlockByHeightRequest {
  height: number;
}

/** GetBlockByHeightResponse is the response type for the Query/GetBlockByHeight RPC method. */
export interface GetBlockByHeightResponse {
  block_id: BlockID | undefined;
  block: Block | undefined;
}

/** GetLatestBlockRequest is the request type for the Query/GetLatestBlock RPC method. */
export interface GetLatestBlockRequest {}

/** GetLatestBlockResponse is the response type for the Query/GetLatestBlock RPC method. */
export interface GetLatestBlockResponse {
  block_id: BlockID | undefined;
  block: Block | undefined;
}

/** GetSyncingRequest is the request type for the Query/GetSyncing RPC method. */
export interface GetSyncingRequest {}

/** GetSyncingResponse is the response type for the Query/GetSyncing RPC method. */
export interface GetSyncingResponse {
  syncing: boolean;
}

/** GetNodeInfoRequest is the request type for the Query/GetNodeInfo RPC method. */
export interface GetNodeInfoRequest {}

/** GetNodeInfoResponse is the response type for the Query/GetNodeInfo RPC method. */
export interface GetNodeInfoResponse {
  node_info: NodeInfo | undefined;
  application_version: VersionInfo | undefined;
}

/** VersionInfo is the type for the GetNodeInfoResponse message. */
export interface VersionInfo {
  name: string;
  app_name: string;
  version: string;
  git_commit: string;
  build_tags: string;
  go_version: string;
  build_deps: Module[];
  /** Since: cosmos-sdk 0.43 */
  cosmos_sdk_version: string;
}

/** Module is the type for VersionInfo */
export interface Module {
  /** module path */
  path: string;
  /** module version */
  version: string;
  /** checksum */
  sum: string;
}

const baseGetValidatorSetByHeightRequest: object = { height: 0 };

export const GetValidatorSetByHeightRequest = {
  encode(
    message: GetValidatorSetByHeightRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetValidatorSetByHeightRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetValidatorSetByHeightRequest,
    } as GetValidatorSetByHeightRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetValidatorSetByHeightRequest {
    const message = {
      ...baseGetValidatorSetByHeightRequest,
    } as GetValidatorSetByHeightRequest;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: GetValidatorSetByHeightRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetValidatorSetByHeightRequest>, I>>(
    object: I
  ): GetValidatorSetByHeightRequest {
    const message = {
      ...baseGetValidatorSetByHeightRequest,
    } as GetValidatorSetByHeightRequest;
    message.height = object.height ?? 0;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseGetValidatorSetByHeightResponse: object = { block_height: 0 };

export const GetValidatorSetByHeightResponse = {
  encode(
    message: GetValidatorSetByHeightResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.block_height !== 0) {
      writer.uint32(8).int64(message.block_height);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetValidatorSetByHeightResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetValidatorSetByHeightResponse,
    } as GetValidatorSetByHeightResponse;
    message.validators = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_height = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.validators.push(Validator.decode(reader, reader.uint32()));
          break;
        case 3:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetValidatorSetByHeightResponse {
    const message = {
      ...baseGetValidatorSetByHeightResponse,
    } as GetValidatorSetByHeightResponse;
    message.block_height =
      object.block_height !== undefined && object.block_height !== null
        ? Number(object.block_height)
        : 0;
    message.validators = (object.validators ?? []).map((e: any) =>
      Validator.fromJSON(e)
    );
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: GetValidatorSetByHeightResponse): unknown {
    const obj: any = {};
    message.block_height !== undefined &&
      (obj.block_height = Math.round(message.block_height));
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? Validator.toJSON(e) : undefined
      );
    } else {
      obj.validators = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetValidatorSetByHeightResponse>, I>>(
    object: I
  ): GetValidatorSetByHeightResponse {
    const message = {
      ...baseGetValidatorSetByHeightResponse,
    } as GetValidatorSetByHeightResponse;
    message.block_height = object.block_height ?? 0;
    message.validators =
      object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseGetLatestValidatorSetRequest: object = {};

export const GetLatestValidatorSetRequest = {
  encode(
    message: GetLatestValidatorSetRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLatestValidatorSetRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetLatestValidatorSetRequest,
    } as GetLatestValidatorSetRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLatestValidatorSetRequest {
    const message = {
      ...baseGetLatestValidatorSetRequest,
    } as GetLatestValidatorSetRequest;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: GetLatestValidatorSetRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLatestValidatorSetRequest>, I>>(
    object: I
  ): GetLatestValidatorSetRequest {
    const message = {
      ...baseGetLatestValidatorSetRequest,
    } as GetLatestValidatorSetRequest;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseGetLatestValidatorSetResponse: object = { block_height: 0 };

export const GetLatestValidatorSetResponse = {
  encode(
    message: GetLatestValidatorSetResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.block_height !== 0) {
      writer.uint32(8).int64(message.block_height);
    }
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLatestValidatorSetResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetLatestValidatorSetResponse,
    } as GetLatestValidatorSetResponse;
    message.validators = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_height = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.validators.push(Validator.decode(reader, reader.uint32()));
          break;
        case 3:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLatestValidatorSetResponse {
    const message = {
      ...baseGetLatestValidatorSetResponse,
    } as GetLatestValidatorSetResponse;
    message.block_height =
      object.block_height !== undefined && object.block_height !== null
        ? Number(object.block_height)
        : 0;
    message.validators = (object.validators ?? []).map((e: any) =>
      Validator.fromJSON(e)
    );
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: GetLatestValidatorSetResponse): unknown {
    const obj: any = {};
    message.block_height !== undefined &&
      (obj.block_height = Math.round(message.block_height));
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? Validator.toJSON(e) : undefined
      );
    } else {
      obj.validators = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLatestValidatorSetResponse>, I>>(
    object: I
  ): GetLatestValidatorSetResponse {
    const message = {
      ...baseGetLatestValidatorSetResponse,
    } as GetLatestValidatorSetResponse;
    message.block_height = object.block_height ?? 0;
    message.validators =
      object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseValidator: object = {
  address: "",
  voting_power: 0,
  proposer_priority: 0,
};

export const Validator = {
  encode(
    message: Validator,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pub_key !== undefined) {
      Any.encode(message.pub_key, writer.uint32(18).fork()).ldelim();
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
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pub_key = Any.decode(reader, reader.uint32());
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
        ? String(object.address)
        : "";
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? Any.fromJSON(object.pub_key)
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
    message.address !== undefined && (obj.address = message.address);
    message.pub_key !== undefined &&
      (obj.pub_key = message.pub_key ? Any.toJSON(message.pub_key) : undefined);
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
    message.address = object.address ?? "";
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? Any.fromPartial(object.pub_key)
        : undefined;
    message.voting_power = object.voting_power ?? 0;
    message.proposer_priority = object.proposer_priority ?? 0;
    return message;
  },
};

const baseGetBlockByHeightRequest: object = { height: 0 };

export const GetBlockByHeightRequest = {
  encode(
    message: GetBlockByHeightRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetBlockByHeightRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetBlockByHeightRequest,
    } as GetBlockByHeightRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBlockByHeightRequest {
    const message = {
      ...baseGetBlockByHeightRequest,
    } as GetBlockByHeightRequest;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    return message;
  },

  toJSON(message: GetBlockByHeightRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBlockByHeightRequest>, I>>(
    object: I
  ): GetBlockByHeightRequest {
    const message = {
      ...baseGetBlockByHeightRequest,
    } as GetBlockByHeightRequest;
    message.height = object.height ?? 0;
    return message;
  },
};

const baseGetBlockByHeightResponse: object = {};

export const GetBlockByHeightResponse = {
  encode(
    message: GetBlockByHeightResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(10).fork()).ldelim();
    }
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetBlockByHeightResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetBlockByHeightResponse,
    } as GetBlockByHeightResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 2:
          message.block = Block.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBlockByHeightResponse {
    const message = {
      ...baseGetBlockByHeightResponse,
    } as GetBlockByHeightResponse;
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromJSON(object.block_id)
        : undefined;
    message.block =
      object.block !== undefined && object.block !== null
        ? Block.fromJSON(object.block)
        : undefined;
    return message;
  },

  toJSON(message: GetBlockByHeightResponse): unknown {
    const obj: any = {};
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
        : undefined);
    message.block !== undefined &&
      (obj.block = message.block ? Block.toJSON(message.block) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBlockByHeightResponse>, I>>(
    object: I
  ): GetBlockByHeightResponse {
    const message = {
      ...baseGetBlockByHeightResponse,
    } as GetBlockByHeightResponse;
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
        : undefined;
    message.block =
      object.block !== undefined && object.block !== null
        ? Block.fromPartial(object.block)
        : undefined;
    return message;
  },
};

const baseGetLatestBlockRequest: object = {};

export const GetLatestBlockRequest = {
  encode(
    _: GetLatestBlockRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLatestBlockRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetLatestBlockRequest } as GetLatestBlockRequest;
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

  fromJSON(_: any): GetLatestBlockRequest {
    const message = { ...baseGetLatestBlockRequest } as GetLatestBlockRequest;
    return message;
  },

  toJSON(_: GetLatestBlockRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLatestBlockRequest>, I>>(
    _: I
  ): GetLatestBlockRequest {
    const message = { ...baseGetLatestBlockRequest } as GetLatestBlockRequest;
    return message;
  },
};

const baseGetLatestBlockResponse: object = {};

export const GetLatestBlockResponse = {
  encode(
    message: GetLatestBlockResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(10).fork()).ldelim();
    }
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLatestBlockResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetLatestBlockResponse } as GetLatestBlockResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 2:
          message.block = Block.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLatestBlockResponse {
    const message = { ...baseGetLatestBlockResponse } as GetLatestBlockResponse;
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromJSON(object.block_id)
        : undefined;
    message.block =
      object.block !== undefined && object.block !== null
        ? Block.fromJSON(object.block)
        : undefined;
    return message;
  },

  toJSON(message: GetLatestBlockResponse): unknown {
    const obj: any = {};
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
        : undefined);
    message.block !== undefined &&
      (obj.block = message.block ? Block.toJSON(message.block) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLatestBlockResponse>, I>>(
    object: I
  ): GetLatestBlockResponse {
    const message = { ...baseGetLatestBlockResponse } as GetLatestBlockResponse;
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
        : undefined;
    message.block =
      object.block !== undefined && object.block !== null
        ? Block.fromPartial(object.block)
        : undefined;
    return message;
  },
};

const baseGetSyncingRequest: object = {};

export const GetSyncingRequest = {
  encode(
    _: GetSyncingRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSyncingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetSyncingRequest } as GetSyncingRequest;
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

  fromJSON(_: any): GetSyncingRequest {
    const message = { ...baseGetSyncingRequest } as GetSyncingRequest;
    return message;
  },

  toJSON(_: GetSyncingRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSyncingRequest>, I>>(
    _: I
  ): GetSyncingRequest {
    const message = { ...baseGetSyncingRequest } as GetSyncingRequest;
    return message;
  },
};

const baseGetSyncingResponse: object = { syncing: false };

export const GetSyncingResponse = {
  encode(
    message: GetSyncingResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.syncing === true) {
      writer.uint32(8).bool(message.syncing);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSyncingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetSyncingResponse } as GetSyncingResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.syncing = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSyncingResponse {
    const message = { ...baseGetSyncingResponse } as GetSyncingResponse;
    message.syncing =
      object.syncing !== undefined && object.syncing !== null
        ? Boolean(object.syncing)
        : false;
    return message;
  },

  toJSON(message: GetSyncingResponse): unknown {
    const obj: any = {};
    message.syncing !== undefined && (obj.syncing = message.syncing);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSyncingResponse>, I>>(
    object: I
  ): GetSyncingResponse {
    const message = { ...baseGetSyncingResponse } as GetSyncingResponse;
    message.syncing = object.syncing ?? false;
    return message;
  },
};

const baseGetNodeInfoRequest: object = {};

export const GetNodeInfoRequest = {
  encode(
    _: GetNodeInfoRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNodeInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetNodeInfoRequest } as GetNodeInfoRequest;
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

  fromJSON(_: any): GetNodeInfoRequest {
    const message = { ...baseGetNodeInfoRequest } as GetNodeInfoRequest;
    return message;
  },

  toJSON(_: GetNodeInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetNodeInfoRequest>, I>>(
    _: I
  ): GetNodeInfoRequest {
    const message = { ...baseGetNodeInfoRequest } as GetNodeInfoRequest;
    return message;
  },
};

const baseGetNodeInfoResponse: object = {};

export const GetNodeInfoResponse = {
  encode(
    message: GetNodeInfoResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.node_info !== undefined) {
      NodeInfo.encode(message.node_info, writer.uint32(10).fork()).ldelim();
    }
    if (message.application_version !== undefined) {
      VersionInfo.encode(
        message.application_version,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNodeInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetNodeInfoResponse } as GetNodeInfoResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.node_info = NodeInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.application_version = VersionInfo.decode(
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

  fromJSON(object: any): GetNodeInfoResponse {
    const message = { ...baseGetNodeInfoResponse } as GetNodeInfoResponse;
    message.node_info =
      object.node_info !== undefined && object.node_info !== null
        ? NodeInfo.fromJSON(object.node_info)
        : undefined;
    message.application_version =
      object.application_version !== undefined &&
      object.application_version !== null
        ? VersionInfo.fromJSON(object.application_version)
        : undefined;
    return message;
  },

  toJSON(message: GetNodeInfoResponse): unknown {
    const obj: any = {};
    message.node_info !== undefined &&
      (obj.node_info = message.node_info
        ? NodeInfo.toJSON(message.node_info)
        : undefined);
    message.application_version !== undefined &&
      (obj.application_version = message.application_version
        ? VersionInfo.toJSON(message.application_version)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetNodeInfoResponse>, I>>(
    object: I
  ): GetNodeInfoResponse {
    const message = { ...baseGetNodeInfoResponse } as GetNodeInfoResponse;
    message.node_info =
      object.node_info !== undefined && object.node_info !== null
        ? NodeInfo.fromPartial(object.node_info)
        : undefined;
    message.application_version =
      object.application_version !== undefined &&
      object.application_version !== null
        ? VersionInfo.fromPartial(object.application_version)
        : undefined;
    return message;
  },
};

const baseVersionInfo: object = {
  name: "",
  app_name: "",
  version: "",
  git_commit: "",
  build_tags: "",
  go_version: "",
  cosmos_sdk_version: "",
};

export const VersionInfo = {
  encode(
    message: VersionInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.app_name !== "") {
      writer.uint32(18).string(message.app_name);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.git_commit !== "") {
      writer.uint32(34).string(message.git_commit);
    }
    if (message.build_tags !== "") {
      writer.uint32(42).string(message.build_tags);
    }
    if (message.go_version !== "") {
      writer.uint32(50).string(message.go_version);
    }
    for (const v of message.build_deps) {
      Module.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.cosmos_sdk_version !== "") {
      writer.uint32(66).string(message.cosmos_sdk_version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VersionInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVersionInfo } as VersionInfo;
    message.build_deps = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.app_name = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        case 4:
          message.git_commit = reader.string();
          break;
        case 5:
          message.build_tags = reader.string();
          break;
        case 6:
          message.go_version = reader.string();
          break;
        case 7:
          message.build_deps.push(Module.decode(reader, reader.uint32()));
          break;
        case 8:
          message.cosmos_sdk_version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VersionInfo {
    const message = { ...baseVersionInfo } as VersionInfo;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.app_name =
      object.app_name !== undefined && object.app_name !== null
        ? String(object.app_name)
        : "";
    message.version =
      object.version !== undefined && object.version !== null
        ? String(object.version)
        : "";
    message.git_commit =
      object.git_commit !== undefined && object.git_commit !== null
        ? String(object.git_commit)
        : "";
    message.build_tags =
      object.build_tags !== undefined && object.build_tags !== null
        ? String(object.build_tags)
        : "";
    message.go_version =
      object.go_version !== undefined && object.go_version !== null
        ? String(object.go_version)
        : "";
    message.build_deps = (object.build_deps ?? []).map((e: any) =>
      Module.fromJSON(e)
    );
    message.cosmos_sdk_version =
      object.cosmos_sdk_version !== undefined &&
      object.cosmos_sdk_version !== null
        ? String(object.cosmos_sdk_version)
        : "";
    return message;
  },

  toJSON(message: VersionInfo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.app_name !== undefined && (obj.app_name = message.app_name);
    message.version !== undefined && (obj.version = message.version);
    message.git_commit !== undefined && (obj.git_commit = message.git_commit);
    message.build_tags !== undefined && (obj.build_tags = message.build_tags);
    message.go_version !== undefined && (obj.go_version = message.go_version);
    if (message.build_deps) {
      obj.build_deps = message.build_deps.map((e) =>
        e ? Module.toJSON(e) : undefined
      );
    } else {
      obj.build_deps = [];
    }
    message.cosmos_sdk_version !== undefined &&
      (obj.cosmos_sdk_version = message.cosmos_sdk_version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VersionInfo>, I>>(
    object: I
  ): VersionInfo {
    const message = { ...baseVersionInfo } as VersionInfo;
    message.name = object.name ?? "";
    message.app_name = object.app_name ?? "";
    message.version = object.version ?? "";
    message.git_commit = object.git_commit ?? "";
    message.build_tags = object.build_tags ?? "";
    message.go_version = object.go_version ?? "";
    message.build_deps =
      object.build_deps?.map((e) => Module.fromPartial(e)) || [];
    message.cosmos_sdk_version = object.cosmos_sdk_version ?? "";
    return message;
  },
};

const baseModule: object = { path: "", version: "", sum: "" };

export const Module = {
  encode(
    message: Module,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.sum !== "") {
      writer.uint32(26).string(message.sum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Module {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseModule } as Module;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.path = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        case 3:
          message.sum = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Module {
    const message = { ...baseModule } as Module;
    message.path =
      object.path !== undefined && object.path !== null
        ? String(object.path)
        : "";
    message.version =
      object.version !== undefined && object.version !== null
        ? String(object.version)
        : "";
    message.sum =
      object.sum !== undefined && object.sum !== null ? String(object.sum) : "";
    return message;
  },

  toJSON(message: Module): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    message.version !== undefined && (obj.version = message.version);
    message.sum !== undefined && (obj.sum = message.sum);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Module>, I>>(object: I): Module {
    const message = { ...baseModule } as Module;
    message.path = object.path ?? "";
    message.version = object.version ?? "";
    message.sum = object.sum ?? "";
    return message;
  },
};

/** Service defines the gRPC querier service for tendermint queries. */
export interface Service {
  /** GetNodeInfo queries the current node info. */
  GetNodeInfo(request: GetNodeInfoRequest): Promise<GetNodeInfoResponse>;
  /** GetSyncing queries node syncing. */
  GetSyncing(request: GetSyncingRequest): Promise<GetSyncingResponse>;
  /** GetLatestBlock returns the latest block. */
  GetLatestBlock(
    request: GetLatestBlockRequest
  ): Promise<GetLatestBlockResponse>;
  /** GetBlockByHeight queries block for given height. */
  GetBlockByHeight(
    request: GetBlockByHeightRequest
  ): Promise<GetBlockByHeightResponse>;
  /** GetLatestValidatorSet queries latest validator-set. */
  GetLatestValidatorSet(
    request: GetLatestValidatorSetRequest
  ): Promise<GetLatestValidatorSetResponse>;
  /** GetValidatorSetByHeight queries validator-set at a given height. */
  GetValidatorSetByHeight(
    request: GetValidatorSetByHeightRequest
  ): Promise<GetValidatorSetByHeightResponse>;
}

export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetNodeInfo = this.GetNodeInfo.bind(this);
    this.GetSyncing = this.GetSyncing.bind(this);
    this.GetLatestBlock = this.GetLatestBlock.bind(this);
    this.GetBlockByHeight = this.GetBlockByHeight.bind(this);
    this.GetLatestValidatorSet = this.GetLatestValidatorSet.bind(this);
    this.GetValidatorSetByHeight = this.GetValidatorSetByHeight.bind(this);
  }
  GetNodeInfo(request: GetNodeInfoRequest): Promise<GetNodeInfoResponse> {
    const data = GetNodeInfoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetNodeInfo",
      data
    );
    return promise.then((data) =>
      GetNodeInfoResponse.decode(new _m0.Reader(data))
    );
  }

  GetSyncing(request: GetSyncingRequest): Promise<GetSyncingResponse> {
    const data = GetSyncingRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetSyncing",
      data
    );
    return promise.then((data) =>
      GetSyncingResponse.decode(new _m0.Reader(data))
    );
  }

  GetLatestBlock(
    request: GetLatestBlockRequest
  ): Promise<GetLatestBlockResponse> {
    const data = GetLatestBlockRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetLatestBlock",
      data
    );
    return promise.then((data) =>
      GetLatestBlockResponse.decode(new _m0.Reader(data))
    );
  }

  GetBlockByHeight(
    request: GetBlockByHeightRequest
  ): Promise<GetBlockByHeightResponse> {
    const data = GetBlockByHeightRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetBlockByHeight",
      data
    );
    return promise.then((data) =>
      GetBlockByHeightResponse.decode(new _m0.Reader(data))
    );
  }

  GetLatestValidatorSet(
    request: GetLatestValidatorSetRequest
  ): Promise<GetLatestValidatorSetResponse> {
    const data = GetLatestValidatorSetRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetLatestValidatorSet",
      data
    );
    return promise.then((data) =>
      GetLatestValidatorSetResponse.decode(new _m0.Reader(data))
    );
  }

  GetValidatorSetByHeight(
    request: GetValidatorSetByHeightRequest
  ): Promise<GetValidatorSetByHeightResponse> {
    const data = GetValidatorSetByHeightRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.tendermint.v1beta1.Service",
      "GetValidatorSetByHeight",
      data
    );
    return promise.then((data) =>
      GetValidatorSetByHeightResponse.decode(new _m0.Reader(data))
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
