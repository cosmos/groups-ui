/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import { Tx } from "../../../cosmos/tx/v1beta1/tx";
import {
  TxResponse,
  GasInfo,
  Result,
} from "../../../cosmos/base/abci/v1beta1/abci";
import { BlockID } from "../../../tendermint/types/types";
import { Block } from "../../../tendermint/types/block";

export const protobufPackage = "cosmos.tx.v1beta1";

/** OrderBy defines the sorting order */
export enum OrderBy {
  /** ORDER_BY_UNSPECIFIED - ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults to ASC in this case. */
  ORDER_BY_UNSPECIFIED = 0,
  /** ORDER_BY_ASC - ORDER_BY_ASC defines ascending order */
  ORDER_BY_ASC = 1,
  /** ORDER_BY_DESC - ORDER_BY_DESC defines descending order */
  ORDER_BY_DESC = 2,
  UNRECOGNIZED = -1,
}

export function orderByFromJSON(object: any): OrderBy {
  switch (object) {
    case 0:
    case "ORDER_BY_UNSPECIFIED":
      return OrderBy.ORDER_BY_UNSPECIFIED;
    case 1:
    case "ORDER_BY_ASC":
      return OrderBy.ORDER_BY_ASC;
    case 2:
    case "ORDER_BY_DESC":
      return OrderBy.ORDER_BY_DESC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OrderBy.UNRECOGNIZED;
  }
}

export function orderByToJSON(object: OrderBy): string {
  switch (object) {
    case OrderBy.ORDER_BY_UNSPECIFIED:
      return "ORDER_BY_UNSPECIFIED";
    case OrderBy.ORDER_BY_ASC:
      return "ORDER_BY_ASC";
    case OrderBy.ORDER_BY_DESC:
      return "ORDER_BY_DESC";
    default:
      return "UNKNOWN";
  }
}

/** BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC method. */
export enum BroadcastMode {
  /** BROADCAST_MODE_UNSPECIFIED - zero-value for mode ordering */
  BROADCAST_MODE_UNSPECIFIED = 0,
  /**
   * BROADCAST_MODE_BLOCK - BROADCAST_MODE_BLOCK defines a tx broadcasting mode where the client waits for
   * the tx to be committed in a block.
   */
  BROADCAST_MODE_BLOCK = 1,
  /**
   * BROADCAST_MODE_SYNC - BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits for
   * a CheckTx execution response only.
   */
  BROADCAST_MODE_SYNC = 2,
  /**
   * BROADCAST_MODE_ASYNC - BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client returns
   * immediately.
   */
  BROADCAST_MODE_ASYNC = 3,
  UNRECOGNIZED = -1,
}

export function broadcastModeFromJSON(object: any): BroadcastMode {
  switch (object) {
    case 0:
    case "BROADCAST_MODE_UNSPECIFIED":
      return BroadcastMode.BROADCAST_MODE_UNSPECIFIED;
    case 1:
    case "BROADCAST_MODE_BLOCK":
      return BroadcastMode.BROADCAST_MODE_BLOCK;
    case 2:
    case "BROADCAST_MODE_SYNC":
      return BroadcastMode.BROADCAST_MODE_SYNC;
    case 3:
    case "BROADCAST_MODE_ASYNC":
      return BroadcastMode.BROADCAST_MODE_ASYNC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return BroadcastMode.UNRECOGNIZED;
  }
}

export function broadcastModeToJSON(object: BroadcastMode): string {
  switch (object) {
    case BroadcastMode.BROADCAST_MODE_UNSPECIFIED:
      return "BROADCAST_MODE_UNSPECIFIED";
    case BroadcastMode.BROADCAST_MODE_BLOCK:
      return "BROADCAST_MODE_BLOCK";
    case BroadcastMode.BROADCAST_MODE_SYNC:
      return "BROADCAST_MODE_SYNC";
    case BroadcastMode.BROADCAST_MODE_ASYNC:
      return "BROADCAST_MODE_ASYNC";
    default:
      return "UNKNOWN";
  }
}

/**
 * GetTxsEventRequest is the request type for the Service.TxsByEvents
 * RPC method.
 */
export interface GetTxsEventRequest {
  /** events is the list of transaction event type. */
  events: string[];
  /** pagination defines a pagination for the request. */
  pagination: PageRequest | undefined;
  order_by: OrderBy;
}

/**
 * GetTxsEventResponse is the response type for the Service.TxsByEvents
 * RPC method.
 */
export interface GetTxsEventResponse {
  /** txs is the list of queried transactions. */
  txs: Tx[];
  /** tx_responses is the list of queried TxResponses. */
  tx_responses: TxResponse[];
  /** pagination defines a pagination for the response. */
  pagination: PageResponse | undefined;
}

/**
 * BroadcastTxRequest is the request type for the Service.BroadcastTxRequest
 * RPC method.
 */
export interface BroadcastTxRequest {
  /** tx_bytes is the raw transaction. */
  tx_bytes: Uint8Array;
  mode: BroadcastMode;
}

/**
 * BroadcastTxResponse is the response type for the
 * Service.BroadcastTx method.
 */
export interface BroadcastTxResponse {
  /** tx_response is the queried TxResponses. */
  tx_response: TxResponse | undefined;
}

/**
 * SimulateRequest is the request type for the Service.Simulate
 * RPC method.
 */
export interface SimulateRequest {
  /**
   * tx is the transaction to simulate.
   * Deprecated. Send raw tx bytes instead.
   *
   * @deprecated
   */
  tx: Tx | undefined;
  /**
   * tx_bytes is the raw transaction.
   *
   * Since: cosmos-sdk 0.43
   */
  tx_bytes: Uint8Array;
}

/**
 * SimulateResponse is the response type for the
 * Service.SimulateRPC method.
 */
export interface SimulateResponse {
  /** gas_info is the information about gas used in the simulation. */
  gas_info: GasInfo | undefined;
  /** result is the result of the simulation. */
  result: Result | undefined;
}

/**
 * GetTxRequest is the request type for the Service.GetTx
 * RPC method.
 */
export interface GetTxRequest {
  /** hash is the tx hash to query, encoded as a hex string. */
  hash: string;
}

/** GetTxResponse is the response type for the Service.GetTx method. */
export interface GetTxResponse {
  /** tx is the queried transaction. */
  tx: Tx | undefined;
  /** tx_response is the queried TxResponses. */
  tx_response: TxResponse | undefined;
}

/**
 * GetBlockWithTxsRequest is the request type for the Service.GetBlockWithTxs
 * RPC method.
 *
 * Since: cosmos-sdk 0.45.2
 */
export interface GetBlockWithTxsRequest {
  /** height is the height of the block to query. */
  height: number;
  /** pagination defines a pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * GetBlockWithTxsResponse is the response type for the Service.GetBlockWithTxs method.
 *
 * Since: cosmos-sdk 0.45.2
 */
export interface GetBlockWithTxsResponse {
  /** txs are the transactions in the block. */
  txs: Tx[];
  block_id: BlockID | undefined;
  block: Block | undefined;
  /** pagination defines a pagination for the response. */
  pagination: PageResponse | undefined;
}

const baseGetTxsEventRequest: object = { events: "", order_by: 0 };

export const GetTxsEventRequest = {
  encode(
    message: GetTxsEventRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.events) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    if (message.order_by !== 0) {
      writer.uint32(24).int32(message.order_by);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTxsEventRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetTxsEventRequest } as GetTxsEventRequest;
    message.events = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(reader.string());
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 3:
          message.order_by = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTxsEventRequest {
    const message = { ...baseGetTxsEventRequest } as GetTxsEventRequest;
    message.events = (object.events ?? []).map((e: any) => String(e));
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    message.order_by =
      object.order_by !== undefined && object.order_by !== null
        ? orderByFromJSON(object.order_by)
        : 0;
    return message;
  },

  toJSON(message: GetTxsEventRequest): unknown {
    const obj: any = {};
    if (message.events) {
      obj.events = message.events.map((e) => e);
    } else {
      obj.events = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.order_by !== undefined &&
      (obj.order_by = orderByToJSON(message.order_by));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTxsEventRequest>, I>>(
    object: I
  ): GetTxsEventRequest {
    const message = { ...baseGetTxsEventRequest } as GetTxsEventRequest;
    message.events = object.events?.map((e) => e) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.order_by = object.order_by ?? 0;
    return message;
  },
};

const baseGetTxsEventResponse: object = {};

export const GetTxsEventResponse = {
  encode(
    message: GetTxsEventResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.txs) {
      Tx.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tx_responses) {
      TxResponse.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTxsEventResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetTxsEventResponse } as GetTxsEventResponse;
    message.txs = [];
    message.tx_responses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(Tx.decode(reader, reader.uint32()));
          break;
        case 2:
          message.tx_responses.push(TxResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): GetTxsEventResponse {
    const message = { ...baseGetTxsEventResponse } as GetTxsEventResponse;
    message.txs = (object.txs ?? []).map((e: any) => Tx.fromJSON(e));
    message.tx_responses = (object.tx_responses ?? []).map((e: any) =>
      TxResponse.fromJSON(e)
    );
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: GetTxsEventResponse): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map((e) => (e ? Tx.toJSON(e) : undefined));
    } else {
      obj.txs = [];
    }
    if (message.tx_responses) {
      obj.tx_responses = message.tx_responses.map((e) =>
        e ? TxResponse.toJSON(e) : undefined
      );
    } else {
      obj.tx_responses = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTxsEventResponse>, I>>(
    object: I
  ): GetTxsEventResponse {
    const message = { ...baseGetTxsEventResponse } as GetTxsEventResponse;
    message.txs = object.txs?.map((e) => Tx.fromPartial(e)) || [];
    message.tx_responses =
      object.tx_responses?.map((e) => TxResponse.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseBroadcastTxRequest: object = { mode: 0 };

export const BroadcastTxRequest = {
  encode(
    message: BroadcastTxRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tx_bytes.length !== 0) {
      writer.uint32(10).bytes(message.tx_bytes);
    }
    if (message.mode !== 0) {
      writer.uint32(16).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BroadcastTxRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBroadcastTxRequest } as BroadcastTxRequest;
    message.tx_bytes = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx_bytes = reader.bytes();
          break;
        case 2:
          message.mode = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BroadcastTxRequest {
    const message = { ...baseBroadcastTxRequest } as BroadcastTxRequest;
    message.tx_bytes =
      object.tx_bytes !== undefined && object.tx_bytes !== null
        ? bytesFromBase64(object.tx_bytes)
        : new Uint8Array();
    message.mode =
      object.mode !== undefined && object.mode !== null
        ? broadcastModeFromJSON(object.mode)
        : 0;
    return message;
  },

  toJSON(message: BroadcastTxRequest): unknown {
    const obj: any = {};
    message.tx_bytes !== undefined &&
      (obj.tx_bytes = base64FromBytes(
        message.tx_bytes !== undefined ? message.tx_bytes : new Uint8Array()
      ));
    message.mode !== undefined &&
      (obj.mode = broadcastModeToJSON(message.mode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BroadcastTxRequest>, I>>(
    object: I
  ): BroadcastTxRequest {
    const message = { ...baseBroadcastTxRequest } as BroadcastTxRequest;
    message.tx_bytes = object.tx_bytes ?? new Uint8Array();
    message.mode = object.mode ?? 0;
    return message;
  },
};

const baseBroadcastTxResponse: object = {};

export const BroadcastTxResponse = {
  encode(
    message: BroadcastTxResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tx_response !== undefined) {
      TxResponse.encode(message.tx_response, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BroadcastTxResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBroadcastTxResponse } as BroadcastTxResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx_response = TxResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BroadcastTxResponse {
    const message = { ...baseBroadcastTxResponse } as BroadcastTxResponse;
    message.tx_response =
      object.tx_response !== undefined && object.tx_response !== null
        ? TxResponse.fromJSON(object.tx_response)
        : undefined;
    return message;
  },

  toJSON(message: BroadcastTxResponse): unknown {
    const obj: any = {};
    message.tx_response !== undefined &&
      (obj.tx_response = message.tx_response
        ? TxResponse.toJSON(message.tx_response)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BroadcastTxResponse>, I>>(
    object: I
  ): BroadcastTxResponse {
    const message = { ...baseBroadcastTxResponse } as BroadcastTxResponse;
    message.tx_response =
      object.tx_response !== undefined && object.tx_response !== null
        ? TxResponse.fromPartial(object.tx_response)
        : undefined;
    return message;
  },
};

const baseSimulateRequest: object = {};

export const SimulateRequest = {
  encode(
    message: SimulateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    if (message.tx_bytes.length !== 0) {
      writer.uint32(18).bytes(message.tx_bytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimulateRequest } as SimulateRequest;
    message.tx_bytes = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = Tx.decode(reader, reader.uint32());
          break;
        case 2:
          message.tx_bytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimulateRequest {
    const message = { ...baseSimulateRequest } as SimulateRequest;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Tx.fromJSON(object.tx)
        : undefined;
    message.tx_bytes =
      object.tx_bytes !== undefined && object.tx_bytes !== null
        ? bytesFromBase64(object.tx_bytes)
        : new Uint8Array();
    return message;
  },

  toJSON(message: SimulateRequest): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = message.tx ? Tx.toJSON(message.tx) : undefined);
    message.tx_bytes !== undefined &&
      (obj.tx_bytes = base64FromBytes(
        message.tx_bytes !== undefined ? message.tx_bytes : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimulateRequest>, I>>(
    object: I
  ): SimulateRequest {
    const message = { ...baseSimulateRequest } as SimulateRequest;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Tx.fromPartial(object.tx)
        : undefined;
    message.tx_bytes = object.tx_bytes ?? new Uint8Array();
    return message;
  },
};

const baseSimulateResponse: object = {};

export const SimulateResponse = {
  encode(
    message: SimulateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.gas_info !== undefined) {
      GasInfo.encode(message.gas_info, writer.uint32(10).fork()).ldelim();
    }
    if (message.result !== undefined) {
      Result.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimulateResponse } as SimulateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gas_info = GasInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.result = Result.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimulateResponse {
    const message = { ...baseSimulateResponse } as SimulateResponse;
    message.gas_info =
      object.gas_info !== undefined && object.gas_info !== null
        ? GasInfo.fromJSON(object.gas_info)
        : undefined;
    message.result =
      object.result !== undefined && object.result !== null
        ? Result.fromJSON(object.result)
        : undefined;
    return message;
  },

  toJSON(message: SimulateResponse): unknown {
    const obj: any = {};
    message.gas_info !== undefined &&
      (obj.gas_info = message.gas_info
        ? GasInfo.toJSON(message.gas_info)
        : undefined);
    message.result !== undefined &&
      (obj.result = message.result ? Result.toJSON(message.result) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimulateResponse>, I>>(
    object: I
  ): SimulateResponse {
    const message = { ...baseSimulateResponse } as SimulateResponse;
    message.gas_info =
      object.gas_info !== undefined && object.gas_info !== null
        ? GasInfo.fromPartial(object.gas_info)
        : undefined;
    message.result =
      object.result !== undefined && object.result !== null
        ? Result.fromPartial(object.result)
        : undefined;
    return message;
  },
};

const baseGetTxRequest: object = { hash: "" };

export const GetTxRequest = {
  encode(
    message: GetTxRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hash !== "") {
      writer.uint32(10).string(message.hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTxRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetTxRequest } as GetTxRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTxRequest {
    const message = { ...baseGetTxRequest } as GetTxRequest;
    message.hash =
      object.hash !== undefined && object.hash !== null
        ? String(object.hash)
        : "";
    return message;
  },

  toJSON(message: GetTxRequest): unknown {
    const obj: any = {};
    message.hash !== undefined && (obj.hash = message.hash);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTxRequest>, I>>(
    object: I
  ): GetTxRequest {
    const message = { ...baseGetTxRequest } as GetTxRequest;
    message.hash = object.hash ?? "";
    return message;
  },
};

const baseGetTxResponse: object = {};

export const GetTxResponse = {
  encode(
    message: GetTxResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tx !== undefined) {
      Tx.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    if (message.tx_response !== undefined) {
      TxResponse.encode(message.tx_response, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTxResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetTxResponse } as GetTxResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = Tx.decode(reader, reader.uint32());
          break;
        case 2:
          message.tx_response = TxResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTxResponse {
    const message = { ...baseGetTxResponse } as GetTxResponse;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Tx.fromJSON(object.tx)
        : undefined;
    message.tx_response =
      object.tx_response !== undefined && object.tx_response !== null
        ? TxResponse.fromJSON(object.tx_response)
        : undefined;
    return message;
  },

  toJSON(message: GetTxResponse): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = message.tx ? Tx.toJSON(message.tx) : undefined);
    message.tx_response !== undefined &&
      (obj.tx_response = message.tx_response
        ? TxResponse.toJSON(message.tx_response)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTxResponse>, I>>(
    object: I
  ): GetTxResponse {
    const message = { ...baseGetTxResponse } as GetTxResponse;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Tx.fromPartial(object.tx)
        : undefined;
    message.tx_response =
      object.tx_response !== undefined && object.tx_response !== null
        ? TxResponse.fromPartial(object.tx_response)
        : undefined;
    return message;
  },
};

const baseGetBlockWithTxsRequest: object = { height: 0 };

export const GetBlockWithTxsRequest = {
  encode(
    message: GetBlockWithTxsRequest,
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
  ): GetBlockWithTxsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetBlockWithTxsRequest } as GetBlockWithTxsRequest;
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

  fromJSON(object: any): GetBlockWithTxsRequest {
    const message = { ...baseGetBlockWithTxsRequest } as GetBlockWithTxsRequest;
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

  toJSON(message: GetBlockWithTxsRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBlockWithTxsRequest>, I>>(
    object: I
  ): GetBlockWithTxsRequest {
    const message = { ...baseGetBlockWithTxsRequest } as GetBlockWithTxsRequest;
    message.height = object.height ?? 0;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseGetBlockWithTxsResponse: object = {};

export const GetBlockWithTxsResponse = {
  encode(
    message: GetBlockWithTxsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.txs) {
      Tx.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.block_id !== undefined) {
      BlockID.encode(message.block_id, writer.uint32(18).fork()).ldelim();
    }
    if (message.block !== undefined) {
      Block.encode(message.block, writer.uint32(26).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetBlockWithTxsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetBlockWithTxsResponse,
    } as GetBlockWithTxsResponse;
    message.txs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txs.push(Tx.decode(reader, reader.uint32()));
          break;
        case 2:
          message.block_id = BlockID.decode(reader, reader.uint32());
          break;
        case 3:
          message.block = Block.decode(reader, reader.uint32());
          break;
        case 4:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetBlockWithTxsResponse {
    const message = {
      ...baseGetBlockWithTxsResponse,
    } as GetBlockWithTxsResponse;
    message.txs = (object.txs ?? []).map((e: any) => Tx.fromJSON(e));
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromJSON(object.block_id)
        : undefined;
    message.block =
      object.block !== undefined && object.block !== null
        ? Block.fromJSON(object.block)
        : undefined;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: GetBlockWithTxsResponse): unknown {
    const obj: any = {};
    if (message.txs) {
      obj.txs = message.txs.map((e) => (e ? Tx.toJSON(e) : undefined));
    } else {
      obj.txs = [];
    }
    message.block_id !== undefined &&
      (obj.block_id = message.block_id
        ? BlockID.toJSON(message.block_id)
        : undefined);
    message.block !== undefined &&
      (obj.block = message.block ? Block.toJSON(message.block) : undefined);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetBlockWithTxsResponse>, I>>(
    object: I
  ): GetBlockWithTxsResponse {
    const message = {
      ...baseGetBlockWithTxsResponse,
    } as GetBlockWithTxsResponse;
    message.txs = object.txs?.map((e) => Tx.fromPartial(e)) || [];
    message.block_id =
      object.block_id !== undefined && object.block_id !== null
        ? BlockID.fromPartial(object.block_id)
        : undefined;
    message.block =
      object.block !== undefined && object.block !== null
        ? Block.fromPartial(object.block)
        : undefined;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

/** Service defines a gRPC service for interacting with transactions. */
export interface Service {
  /** Simulate simulates executing a transaction for estimating gas usage. */
  Simulate(request: SimulateRequest): Promise<SimulateResponse>;
  /** GetTx fetches a tx by hash. */
  GetTx(request: GetTxRequest): Promise<GetTxResponse>;
  /** BroadcastTx broadcast transaction. */
  BroadcastTx(request: BroadcastTxRequest): Promise<BroadcastTxResponse>;
  /** GetTxsEvent fetches txs by event. */
  GetTxsEvent(request: GetTxsEventRequest): Promise<GetTxsEventResponse>;
  /**
   * GetBlockWithTxs fetches a block with decoded txs.
   *
   * Since: cosmos-sdk 0.45.2
   */
  GetBlockWithTxs(
    request: GetBlockWithTxsRequest
  ): Promise<GetBlockWithTxsResponse>;
}

export class ServiceClientImpl implements Service {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Simulate = this.Simulate.bind(this);
    this.GetTx = this.GetTx.bind(this);
    this.BroadcastTx = this.BroadcastTx.bind(this);
    this.GetTxsEvent = this.GetTxsEvent.bind(this);
    this.GetBlockWithTxs = this.GetBlockWithTxs.bind(this);
  }
  Simulate(request: SimulateRequest): Promise<SimulateResponse> {
    const data = SimulateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.tx.v1beta1.Service",
      "Simulate",
      data
    );
    return promise.then((data) =>
      SimulateResponse.decode(new _m0.Reader(data))
    );
  }

  GetTx(request: GetTxRequest): Promise<GetTxResponse> {
    const data = GetTxRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.tx.v1beta1.Service",
      "GetTx",
      data
    );
    return promise.then((data) => GetTxResponse.decode(new _m0.Reader(data)));
  }

  BroadcastTx(request: BroadcastTxRequest): Promise<BroadcastTxResponse> {
    const data = BroadcastTxRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.tx.v1beta1.Service",
      "BroadcastTx",
      data
    );
    return promise.then((data) =>
      BroadcastTxResponse.decode(new _m0.Reader(data))
    );
  }

  GetTxsEvent(request: GetTxsEventRequest): Promise<GetTxsEventResponse> {
    const data = GetTxsEventRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.tx.v1beta1.Service",
      "GetTxsEvent",
      data
    );
    return promise.then((data) =>
      GetTxsEventResponse.decode(new _m0.Reader(data))
    );
  }

  GetBlockWithTxs(
    request: GetBlockWithTxsRequest
  ): Promise<GetBlockWithTxsResponse> {
    const data = GetBlockWithTxsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.tx.v1beta1.Service",
      "GetBlockWithTxs",
      data
    );
    return promise.then((data) =>
      GetBlockWithTxsResponse.decode(new _m0.Reader(data))
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
