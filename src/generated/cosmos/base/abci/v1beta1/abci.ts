/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { Event } from "../../../../tendermint/abci/types";

export const protobufPackage = "cosmos.base.abci.v1beta1";

/**
 * TxResponse defines a structure containing relevant tx data and metadata. The
 * tags are stringified and the log is JSON decoded.
 */
export interface TxResponse {
  /** The block height */
  height: number;
  /** The transaction hash. */
  txhash: string;
  /** Namespace for the Code */
  codespace: string;
  /** Response code. */
  code: number;
  /** Result bytes, if any. */
  data: string;
  /**
   * The output of the application's logger (raw string). May be
   * non-deterministic.
   */
  raw_log: string;
  /** The output of the application's logger (typed). May be non-deterministic. */
  logs: ABCIMessageLog[];
  /** Additional information. May be non-deterministic. */
  info: string;
  /** Amount of gas requested for transaction. */
  gas_wanted: number;
  /** Amount of gas consumed by transaction. */
  gas_used: number;
  /** The request transaction bytes. */
  tx: Any | undefined;
  /**
   * Time of the previous block. For heights > 1, it's the weighted median of
   * the timestamps of the valid votes in the block.LastCommit. For height == 1,
   * it's genesis time.
   */
  timestamp: string;
  /**
   * Events defines all the events emitted by processing a transaction. Note,
   * these events include those emitted by processing all the messages and those
   * emitted from the ante handler. Whereas Logs contains the events, with
   * additional metadata, emitted only by processing the messages.
   *
   * Since: cosmos-sdk 0.42.11, 0.44.5, 0.45
   */
  events: Event[];
}

/** ABCIMessageLog defines a structure containing an indexed tx ABCI message log. */
export interface ABCIMessageLog {
  msg_index: number;
  log: string;
  /**
   * Events contains a slice of Event objects that were emitted during some
   * execution.
   */
  events: StringEvent[];
}

/**
 * StringEvent defines en Event object wrapper where all the attributes
 * contain key/value pairs that are strings instead of raw bytes.
 */
export interface StringEvent {
  type: string;
  attributes: Attribute[];
}

/**
 * Attribute defines an attribute wrapper where the key and value are
 * strings instead of raw bytes.
 */
export interface Attribute {
  key: string;
  value: string;
}

/** GasInfo defines tx execution gas context. */
export interface GasInfo {
  /** GasWanted is the maximum units of work we allow this tx to perform. */
  gas_wanted: number;
  /** GasUsed is the amount of gas actually consumed. */
  gas_used: number;
}

/** Result is the union of ResponseFormat and ResponseCheckTx. */
export interface Result {
  /**
   * Data is any data returned from message or handler execution. It MUST be
   * length prefixed in order to separate data from multiple message executions.
   * Deprecated. This field is still populated, but prefer msg_response instead
   * because it also contains the Msg response typeURL.
   *
   * @deprecated
   */
  data: Uint8Array;
  /** Log contains the log information from message or handler execution. */
  log: string;
  /**
   * Events contains a slice of Event objects that were emitted during message
   * or handler execution.
   */
  events: Event[];
  /**
   * msg_responses contains the Msg handler responses type packed in Anys.
   *
   * Since: cosmos-sdk 0.46
   */
  msg_responses: Any[];
}

/**
 * SimulationResponse defines the response generated when a transaction is
 * successfully simulated.
 */
export interface SimulationResponse {
  gas_info: GasInfo | undefined;
  result: Result | undefined;
}

/**
 * MsgData defines the data returned in a Result object during message
 * execution.
 *
 * @deprecated
 */
export interface MsgData {
  msg_type: string;
  data: Uint8Array;
}

/**
 * TxMsgData defines a list of MsgData. A transaction will have a MsgData object
 * for each message.
 */
export interface TxMsgData {
  /**
   * data field is deprecated and not populated.
   *
   * @deprecated
   */
  data: MsgData[];
  /**
   * msg_responses contains the Msg handler responses packed into Anys.
   *
   * Since: cosmos-sdk 0.46
   */
  msg_responses: Any[];
}

/** SearchTxsResult defines a structure for querying txs pageable */
export interface SearchTxsResult {
  /** Count of all txs */
  total_count: number;
  /** Count of txs in current page */
  count: number;
  /** Index of current page, start from 1 */
  page_number: number;
  /** Count of total pages */
  page_total: number;
  /** Max count txs per page */
  limit: number;
  /** List of txs in current page */
  txs: TxResponse[];
}

const baseTxResponse: object = {
  height: 0,
  txhash: "",
  codespace: "",
  code: 0,
  data: "",
  raw_log: "",
  info: "",
  gas_wanted: 0,
  gas_used: 0,
  timestamp: "",
};

export const TxResponse = {
  encode(
    message: TxResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    if (message.txhash !== "") {
      writer.uint32(18).string(message.txhash);
    }
    if (message.codespace !== "") {
      writer.uint32(26).string(message.codespace);
    }
    if (message.code !== 0) {
      writer.uint32(32).uint32(message.code);
    }
    if (message.data !== "") {
      writer.uint32(42).string(message.data);
    }
    if (message.raw_log !== "") {
      writer.uint32(50).string(message.raw_log);
    }
    for (const v of message.logs) {
      ABCIMessageLog.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.info !== "") {
      writer.uint32(66).string(message.info);
    }
    if (message.gas_wanted !== 0) {
      writer.uint32(72).int64(message.gas_wanted);
    }
    if (message.gas_used !== 0) {
      writer.uint32(80).int64(message.gas_used);
    }
    if (message.tx !== undefined) {
      Any.encode(message.tx, writer.uint32(90).fork()).ldelim();
    }
    if (message.timestamp !== "") {
      writer.uint32(98).string(message.timestamp);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTxResponse } as TxResponse;
    message.logs = [];
    message.events = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.txhash = reader.string();
          break;
        case 3:
          message.codespace = reader.string();
          break;
        case 4:
          message.code = reader.uint32();
          break;
        case 5:
          message.data = reader.string();
          break;
        case 6:
          message.raw_log = reader.string();
          break;
        case 7:
          message.logs.push(ABCIMessageLog.decode(reader, reader.uint32()));
          break;
        case 8:
          message.info = reader.string();
          break;
        case 9:
          message.gas_wanted = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.gas_used = longToNumber(reader.int64() as Long);
          break;
        case 11:
          message.tx = Any.decode(reader, reader.uint32());
          break;
        case 12:
          message.timestamp = reader.string();
          break;
        case 13:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxResponse {
    const message = { ...baseTxResponse } as TxResponse;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    message.txhash =
      object.txhash !== undefined && object.txhash !== null
        ? String(object.txhash)
        : "";
    message.codespace =
      object.codespace !== undefined && object.codespace !== null
        ? String(object.codespace)
        : "";
    message.code =
      object.code !== undefined && object.code !== null
        ? Number(object.code)
        : 0;
    message.data =
      object.data !== undefined && object.data !== null
        ? String(object.data)
        : "";
    message.raw_log =
      object.raw_log !== undefined && object.raw_log !== null
        ? String(object.raw_log)
        : "";
    message.logs = (object.logs ?? []).map((e: any) =>
      ABCIMessageLog.fromJSON(e)
    );
    message.info =
      object.info !== undefined && object.info !== null
        ? String(object.info)
        : "";
    message.gas_wanted =
      object.gas_wanted !== undefined && object.gas_wanted !== null
        ? Number(object.gas_wanted)
        : 0;
    message.gas_used =
      object.gas_used !== undefined && object.gas_used !== null
        ? Number(object.gas_used)
        : 0;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Any.fromJSON(object.tx)
        : undefined;
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? String(object.timestamp)
        : "";
    message.events = (object.events ?? []).map((e: any) => Event.fromJSON(e));
    return message;
  },

  toJSON(message: TxResponse): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.txhash !== undefined && (obj.txhash = message.txhash);
    message.codespace !== undefined && (obj.codespace = message.codespace);
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.data !== undefined && (obj.data = message.data);
    message.raw_log !== undefined && (obj.raw_log = message.raw_log);
    if (message.logs) {
      obj.logs = message.logs.map((e) =>
        e ? ABCIMessageLog.toJSON(e) : undefined
      );
    } else {
      obj.logs = [];
    }
    message.info !== undefined && (obj.info = message.info);
    message.gas_wanted !== undefined &&
      (obj.gas_wanted = Math.round(message.gas_wanted));
    message.gas_used !== undefined &&
      (obj.gas_used = Math.round(message.gas_used));
    message.tx !== undefined &&
      (obj.tx = message.tx ? Any.toJSON(message.tx) : undefined);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp);
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TxResponse>, I>>(
    object: I
  ): TxResponse {
    const message = { ...baseTxResponse } as TxResponse;
    message.height = object.height ?? 0;
    message.txhash = object.txhash ?? "";
    message.codespace = object.codespace ?? "";
    message.code = object.code ?? 0;
    message.data = object.data ?? "";
    message.raw_log = object.raw_log ?? "";
    message.logs = object.logs?.map((e) => ABCIMessageLog.fromPartial(e)) || [];
    message.info = object.info ?? "";
    message.gas_wanted = object.gas_wanted ?? 0;
    message.gas_used = object.gas_used ?? 0;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? Any.fromPartial(object.tx)
        : undefined;
    message.timestamp = object.timestamp ?? "";
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
};

const baseABCIMessageLog: object = { msg_index: 0, log: "" };

export const ABCIMessageLog = {
  encode(
    message: ABCIMessageLog,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.msg_index !== 0) {
      writer.uint32(8).uint32(message.msg_index);
    }
    if (message.log !== "") {
      writer.uint32(18).string(message.log);
    }
    for (const v of message.events) {
      StringEvent.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ABCIMessageLog {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseABCIMessageLog } as ABCIMessageLog;
    message.events = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msg_index = reader.uint32();
          break;
        case 2:
          message.log = reader.string();
          break;
        case 3:
          message.events.push(StringEvent.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ABCIMessageLog {
    const message = { ...baseABCIMessageLog } as ABCIMessageLog;
    message.msg_index =
      object.msg_index !== undefined && object.msg_index !== null
        ? Number(object.msg_index)
        : 0;
    message.log =
      object.log !== undefined && object.log !== null ? String(object.log) : "";
    message.events = (object.events ?? []).map((e: any) =>
      StringEvent.fromJSON(e)
    );
    return message;
  },

  toJSON(message: ABCIMessageLog): unknown {
    const obj: any = {};
    message.msg_index !== undefined &&
      (obj.msg_index = Math.round(message.msg_index));
    message.log !== undefined && (obj.log = message.log);
    if (message.events) {
      obj.events = message.events.map((e) =>
        e ? StringEvent.toJSON(e) : undefined
      );
    } else {
      obj.events = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ABCIMessageLog>, I>>(
    object: I
  ): ABCIMessageLog {
    const message = { ...baseABCIMessageLog } as ABCIMessageLog;
    message.msg_index = object.msg_index ?? 0;
    message.log = object.log ?? "";
    message.events =
      object.events?.map((e) => StringEvent.fromPartial(e)) || [];
    return message;
  },
};

const baseStringEvent: object = { type: "" };

export const StringEvent = {
  encode(
    message: StringEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    for (const v of message.attributes) {
      Attribute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StringEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStringEvent } as StringEvent;
    message.attributes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.attributes.push(Attribute.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StringEvent {
    const message = { ...baseStringEvent } as StringEvent;
    message.type =
      object.type !== undefined && object.type !== null
        ? String(object.type)
        : "";
    message.attributes = (object.attributes ?? []).map((e: any) =>
      Attribute.fromJSON(e)
    );
    return message;
  },

  toJSON(message: StringEvent): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    if (message.attributes) {
      obj.attributes = message.attributes.map((e) =>
        e ? Attribute.toJSON(e) : undefined
      );
    } else {
      obj.attributes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StringEvent>, I>>(
    object: I
  ): StringEvent {
    const message = { ...baseStringEvent } as StringEvent;
    message.type = object.type ?? "";
    message.attributes =
      object.attributes?.map((e) => Attribute.fromPartial(e)) || [];
    return message;
  },
};

const baseAttribute: object = { key: "", value: "" };

export const Attribute = {
  encode(
    message: Attribute,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Attribute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAttribute } as Attribute;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Attribute {
    const message = { ...baseAttribute } as Attribute;
    message.key =
      object.key !== undefined && object.key !== null ? String(object.key) : "";
    message.value =
      object.value !== undefined && object.value !== null
        ? String(object.value)
        : "";
    return message;
  },

  toJSON(message: Attribute): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Attribute>, I>>(
    object: I
  ): Attribute {
    const message = { ...baseAttribute } as Attribute;
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

const baseGasInfo: object = { gas_wanted: 0, gas_used: 0 };

export const GasInfo = {
  encode(
    message: GasInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.gas_wanted !== 0) {
      writer.uint32(8).uint64(message.gas_wanted);
    }
    if (message.gas_used !== 0) {
      writer.uint32(16).uint64(message.gas_used);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GasInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGasInfo } as GasInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gas_wanted = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.gas_used = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GasInfo {
    const message = { ...baseGasInfo } as GasInfo;
    message.gas_wanted =
      object.gas_wanted !== undefined && object.gas_wanted !== null
        ? Number(object.gas_wanted)
        : 0;
    message.gas_used =
      object.gas_used !== undefined && object.gas_used !== null
        ? Number(object.gas_used)
        : 0;
    return message;
  },

  toJSON(message: GasInfo): unknown {
    const obj: any = {};
    message.gas_wanted !== undefined &&
      (obj.gas_wanted = Math.round(message.gas_wanted));
    message.gas_used !== undefined &&
      (obj.gas_used = Math.round(message.gas_used));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GasInfo>, I>>(object: I): GasInfo {
    const message = { ...baseGasInfo } as GasInfo;
    message.gas_wanted = object.gas_wanted ?? 0;
    message.gas_used = object.gas_used ?? 0;
    return message;
  },
};

const baseResult: object = { log: "" };

export const Result = {
  encode(
    message: Result,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.log !== "") {
      writer.uint32(18).string(message.log);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.msg_responses) {
      Any.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Result {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResult } as Result;
    message.events = [];
    message.msg_responses = [];
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        case 2:
          message.log = reader.string();
          break;
        case 3:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        case 4:
          message.msg_responses.push(Any.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Result {
    const message = { ...baseResult } as Result;
    message.data =
      object.data !== undefined && object.data !== null
        ? bytesFromBase64(object.data)
        : new Uint8Array();
    message.log =
      object.log !== undefined && object.log !== null ? String(object.log) : "";
    message.events = (object.events ?? []).map((e: any) => Event.fromJSON(e));
    message.msg_responses = (object.msg_responses ?? []).map((e: any) =>
      Any.fromJSON(e)
    );
    return message;
  },

  toJSON(message: Result): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.log !== undefined && (obj.log = message.log);
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    if (message.msg_responses) {
      obj.msg_responses = message.msg_responses.map((e) =>
        e ? Any.toJSON(e) : undefined
      );
    } else {
      obj.msg_responses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Result>, I>>(object: I): Result {
    const message = { ...baseResult } as Result;
    message.data = object.data ?? new Uint8Array();
    message.log = object.log ?? "";
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.msg_responses =
      object.msg_responses?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

const baseSimulationResponse: object = {};

export const SimulationResponse = {
  encode(
    message: SimulationResponse,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SimulationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimulationResponse } as SimulationResponse;
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

  fromJSON(object: any): SimulationResponse {
    const message = { ...baseSimulationResponse } as SimulationResponse;
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

  toJSON(message: SimulationResponse): unknown {
    const obj: any = {};
    message.gas_info !== undefined &&
      (obj.gas_info = message.gas_info
        ? GasInfo.toJSON(message.gas_info)
        : undefined);
    message.result !== undefined &&
      (obj.result = message.result ? Result.toJSON(message.result) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimulationResponse>, I>>(
    object: I
  ): SimulationResponse {
    const message = { ...baseSimulationResponse } as SimulationResponse;
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

const baseMsgData: object = { msg_type: "" };

export const MsgData = {
  encode(
    message: MsgData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.msg_type !== "") {
      writer.uint32(10).string(message.msg_type);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgData } as MsgData;
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msg_type = reader.string();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgData {
    const message = { ...baseMsgData } as MsgData;
    message.msg_type =
      object.msg_type !== undefined && object.msg_type !== null
        ? String(object.msg_type)
        : "";
    message.data =
      object.data !== undefined && object.data !== null
        ? bytesFromBase64(object.data)
        : new Uint8Array();
    return message;
  },

  toJSON(message: MsgData): unknown {
    const obj: any = {};
    message.msg_type !== undefined && (obj.msg_type = message.msg_type);
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgData>, I>>(object: I): MsgData {
    const message = { ...baseMsgData } as MsgData;
    message.msg_type = object.msg_type ?? "";
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

const baseTxMsgData: object = {};

export const TxMsgData = {
  encode(
    message: TxMsgData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.data) {
      MsgData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.msg_responses) {
      Any.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxMsgData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTxMsgData } as TxMsgData;
    message.data = [];
    message.msg_responses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(MsgData.decode(reader, reader.uint32()));
          break;
        case 2:
          message.msg_responses.push(Any.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxMsgData {
    const message = { ...baseTxMsgData } as TxMsgData;
    message.data = (object.data ?? []).map((e: any) => MsgData.fromJSON(e));
    message.msg_responses = (object.msg_responses ?? []).map((e: any) =>
      Any.fromJSON(e)
    );
    return message;
  },

  toJSON(message: TxMsgData): unknown {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map((e) => (e ? MsgData.toJSON(e) : undefined));
    } else {
      obj.data = [];
    }
    if (message.msg_responses) {
      obj.msg_responses = message.msg_responses.map((e) =>
        e ? Any.toJSON(e) : undefined
      );
    } else {
      obj.msg_responses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TxMsgData>, I>>(
    object: I
  ): TxMsgData {
    const message = { ...baseTxMsgData } as TxMsgData;
    message.data = object.data?.map((e) => MsgData.fromPartial(e)) || [];
    message.msg_responses =
      object.msg_responses?.map((e) => Any.fromPartial(e)) || [];
    return message;
  },
};

const baseSearchTxsResult: object = {
  total_count: 0,
  count: 0,
  page_number: 0,
  page_total: 0,
  limit: 0,
};

export const SearchTxsResult = {
  encode(
    message: SearchTxsResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.total_count !== 0) {
      writer.uint32(8).uint64(message.total_count);
    }
    if (message.count !== 0) {
      writer.uint32(16).uint64(message.count);
    }
    if (message.page_number !== 0) {
      writer.uint32(24).uint64(message.page_number);
    }
    if (message.page_total !== 0) {
      writer.uint32(32).uint64(message.page_total);
    }
    if (message.limit !== 0) {
      writer.uint32(40).uint64(message.limit);
    }
    for (const v of message.txs) {
      TxResponse.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchTxsResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSearchTxsResult } as SearchTxsResult;
    message.txs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total_count = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.count = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.page_number = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.page_total = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.limit = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.txs.push(TxResponse.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SearchTxsResult {
    const message = { ...baseSearchTxsResult } as SearchTxsResult;
    message.total_count =
      object.total_count !== undefined && object.total_count !== null
        ? Number(object.total_count)
        : 0;
    message.count =
      object.count !== undefined && object.count !== null
        ? Number(object.count)
        : 0;
    message.page_number =
      object.page_number !== undefined && object.page_number !== null
        ? Number(object.page_number)
        : 0;
    message.page_total =
      object.page_total !== undefined && object.page_total !== null
        ? Number(object.page_total)
        : 0;
    message.limit =
      object.limit !== undefined && object.limit !== null
        ? Number(object.limit)
        : 0;
    message.txs = (object.txs ?? []).map((e: any) => TxResponse.fromJSON(e));
    return message;
  },

  toJSON(message: SearchTxsResult): unknown {
    const obj: any = {};
    message.total_count !== undefined &&
      (obj.total_count = Math.round(message.total_count));
    message.count !== undefined && (obj.count = Math.round(message.count));
    message.page_number !== undefined &&
      (obj.page_number = Math.round(message.page_number));
    message.page_total !== undefined &&
      (obj.page_total = Math.round(message.page_total));
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    if (message.txs) {
      obj.txs = message.txs.map((e) => (e ? TxResponse.toJSON(e) : undefined));
    } else {
      obj.txs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SearchTxsResult>, I>>(
    object: I
  ): SearchTxsResult {
    const message = { ...baseSearchTxsResult } as SearchTxsResult;
    message.total_count = object.total_count ?? 0;
    message.count = object.count ?? 0;
    message.page_number = object.page_number ?? 0;
    message.page_total = object.page_total ?? 0;
    message.limit = object.limit ?? 0;
    message.txs = object.txs?.map((e) => TxResponse.fromPartial(e)) || [];
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
