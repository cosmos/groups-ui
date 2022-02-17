/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Header } from "../../tendermint/types/types";
import { ProofOps } from "../../tendermint/crypto/proof";
import {
  EvidenceParams,
  ValidatorParams,
  VersionParams,
} from "../../tendermint/types/params";
import { PublicKey } from "../../tendermint/crypto/keys";

export const protobufPackage = "tendermint.abci";

export enum CheckTxType {
  NEW = 0,
  RECHECK = 1,
  UNRECOGNIZED = -1,
}

export function checkTxTypeFromJSON(object: any): CheckTxType {
  switch (object) {
    case 0:
    case "NEW":
      return CheckTxType.NEW;
    case 1:
    case "RECHECK":
      return CheckTxType.RECHECK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CheckTxType.UNRECOGNIZED;
  }
}

export function checkTxTypeToJSON(object: CheckTxType): string {
  switch (object) {
    case CheckTxType.NEW:
      return "NEW";
    case CheckTxType.RECHECK:
      return "RECHECK";
    default:
      return "UNKNOWN";
  }
}

export enum EvidenceType {
  UNKNOWN = 0,
  DUPLICATE_VOTE = 1,
  LIGHT_CLIENT_ATTACK = 2,
  UNRECOGNIZED = -1,
}

export function evidenceTypeFromJSON(object: any): EvidenceType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return EvidenceType.UNKNOWN;
    case 1:
    case "DUPLICATE_VOTE":
      return EvidenceType.DUPLICATE_VOTE;
    case 2:
    case "LIGHT_CLIENT_ATTACK":
      return EvidenceType.LIGHT_CLIENT_ATTACK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EvidenceType.UNRECOGNIZED;
  }
}

export function evidenceTypeToJSON(object: EvidenceType): string {
  switch (object) {
    case EvidenceType.UNKNOWN:
      return "UNKNOWN";
    case EvidenceType.DUPLICATE_VOTE:
      return "DUPLICATE_VOTE";
    case EvidenceType.LIGHT_CLIENT_ATTACK:
      return "LIGHT_CLIENT_ATTACK";
    default:
      return "UNKNOWN";
  }
}

export interface Request {
  echo: RequestEcho | undefined;
  flush: RequestFlush | undefined;
  info: RequestInfo | undefined;
  set_option: RequestSetOption | undefined;
  init_chain: RequestInitChain | undefined;
  query: RequestQuery | undefined;
  begin_block: RequestBeginBlock | undefined;
  check_tx: RequestCheckTx | undefined;
  deliver_tx: RequestDeliverTx | undefined;
  end_block: RequestEndBlock | undefined;
  commit: RequestCommit | undefined;
  list_snapshots: RequestListSnapshots | undefined;
  offer_snapshot: RequestOfferSnapshot | undefined;
  load_snapshot_chunk: RequestLoadSnapshotChunk | undefined;
  apply_snapshot_chunk: RequestApplySnapshotChunk | undefined;
}

export interface RequestEcho {
  message: string;
}

export interface RequestFlush {}

export interface RequestInfo {
  version: string;
  block_version: number;
  p2p_version: number;
}

/** nondeterministic */
export interface RequestSetOption {
  key: string;
  value: string;
}

export interface RequestInitChain {
  time: Date | undefined;
  chain_id: string;
  consensus_params: ConsensusParams | undefined;
  validators: ValidatorUpdate[];
  app_state_bytes: Uint8Array;
  initial_height: number;
}

export interface RequestQuery {
  data: Uint8Array;
  path: string;
  height: number;
  prove: boolean;
}

export interface RequestBeginBlock {
  hash: Uint8Array;
  header: Header | undefined;
  last_commit_info: LastCommitInfo | undefined;
  byzantine_validators: Evidence[];
}

export interface RequestCheckTx {
  tx: Uint8Array;
  type: CheckTxType;
}

export interface RequestDeliverTx {
  tx: Uint8Array;
}

export interface RequestEndBlock {
  height: number;
}

export interface RequestCommit {}

/** lists available snapshots */
export interface RequestListSnapshots {}

/** offers a snapshot to the application */
export interface RequestOfferSnapshot {
  /** snapshot offered by peers */
  snapshot: Snapshot | undefined;
  /** light client-verified app hash for snapshot height */
  app_hash: Uint8Array;
}

/** loads a snapshot chunk */
export interface RequestLoadSnapshotChunk {
  height: number;
  format: number;
  chunk: number;
}

/** Applies a snapshot chunk */
export interface RequestApplySnapshotChunk {
  index: number;
  chunk: Uint8Array;
  sender: string;
}

export interface Response {
  exception: ResponseException | undefined;
  echo: ResponseEcho | undefined;
  flush: ResponseFlush | undefined;
  info: ResponseInfo | undefined;
  set_option: ResponseSetOption | undefined;
  init_chain: ResponseInitChain | undefined;
  query: ResponseQuery | undefined;
  begin_block: ResponseBeginBlock | undefined;
  check_tx: ResponseCheckTx | undefined;
  deliver_tx: ResponseDeliverTx | undefined;
  end_block: ResponseEndBlock | undefined;
  commit: ResponseCommit | undefined;
  list_snapshots: ResponseListSnapshots | undefined;
  offer_snapshot: ResponseOfferSnapshot | undefined;
  load_snapshot_chunk: ResponseLoadSnapshotChunk | undefined;
  apply_snapshot_chunk: ResponseApplySnapshotChunk | undefined;
}

/** nondeterministic */
export interface ResponseException {
  error: string;
}

export interface ResponseEcho {
  message: string;
}

export interface ResponseFlush {}

export interface ResponseInfo {
  data: string;
  version: string;
  app_version: number;
  last_block_height: number;
  last_block_app_hash: Uint8Array;
}

/** nondeterministic */
export interface ResponseSetOption {
  code: number;
  /** bytes data = 2; */
  log: string;
  info: string;
}

export interface ResponseInitChain {
  consensus_params: ConsensusParams | undefined;
  validators: ValidatorUpdate[];
  app_hash: Uint8Array;
}

export interface ResponseQuery {
  code: number;
  /** bytes data = 2; // use "value" instead. */
  log: string;
  /** nondeterministic */
  info: string;
  index: number;
  key: Uint8Array;
  value: Uint8Array;
  proof_ops: ProofOps | undefined;
  height: number;
  codespace: string;
}

export interface ResponseBeginBlock {
  events: Event[];
}

export interface ResponseCheckTx {
  code: number;
  data: Uint8Array;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  gas_wanted: number;
  gas_used: number;
  events: Event[];
  codespace: string;
}

export interface ResponseDeliverTx {
  code: number;
  data: Uint8Array;
  /** nondeterministic */
  log: string;
  /** nondeterministic */
  info: string;
  gas_wanted: number;
  gas_used: number;
  events: Event[];
  codespace: string;
}

export interface ResponseEndBlock {
  validator_updates: ValidatorUpdate[];
  consensus_param_updates: ConsensusParams | undefined;
  events: Event[];
}

export interface ResponseCommit {
  /** reserve 1 */
  data: Uint8Array;
  retain_height: number;
}

export interface ResponseListSnapshots {
  snapshots: Snapshot[];
}

export interface ResponseOfferSnapshot {
  result: ResponseOfferSnapshot_Result;
}

export enum ResponseOfferSnapshot_Result {
  /** UNKNOWN - Unknown result, abort all snapshot restoration */
  UNKNOWN = 0,
  /** ACCEPT - Snapshot accepted, apply chunks */
  ACCEPT = 1,
  /** ABORT - Abort all snapshot restoration */
  ABORT = 2,
  /** REJECT - Reject this specific snapshot, try others */
  REJECT = 3,
  /** REJECT_FORMAT - Reject all snapshots of this format, try others */
  REJECT_FORMAT = 4,
  /** REJECT_SENDER - Reject all snapshots from the sender(s), try others */
  REJECT_SENDER = 5,
  UNRECOGNIZED = -1,
}

export function responseOfferSnapshot_ResultFromJSON(
  object: any
): ResponseOfferSnapshot_Result {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseOfferSnapshot_Result.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseOfferSnapshot_Result.ACCEPT;
    case 2:
    case "ABORT":
      return ResponseOfferSnapshot_Result.ABORT;
    case 3:
    case "REJECT":
      return ResponseOfferSnapshot_Result.REJECT;
    case 4:
    case "REJECT_FORMAT":
      return ResponseOfferSnapshot_Result.REJECT_FORMAT;
    case 5:
    case "REJECT_SENDER":
      return ResponseOfferSnapshot_Result.REJECT_SENDER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseOfferSnapshot_Result.UNRECOGNIZED;
  }
}

export function responseOfferSnapshot_ResultToJSON(
  object: ResponseOfferSnapshot_Result
): string {
  switch (object) {
    case ResponseOfferSnapshot_Result.UNKNOWN:
      return "UNKNOWN";
    case ResponseOfferSnapshot_Result.ACCEPT:
      return "ACCEPT";
    case ResponseOfferSnapshot_Result.ABORT:
      return "ABORT";
    case ResponseOfferSnapshot_Result.REJECT:
      return "REJECT";
    case ResponseOfferSnapshot_Result.REJECT_FORMAT:
      return "REJECT_FORMAT";
    case ResponseOfferSnapshot_Result.REJECT_SENDER:
      return "REJECT_SENDER";
    default:
      return "UNKNOWN";
  }
}

export interface ResponseLoadSnapshotChunk {
  chunk: Uint8Array;
}

export interface ResponseApplySnapshotChunk {
  result: ResponseApplySnapshotChunk_Result;
  /** Chunks to refetch and reapply */
  refetch_chunks: number[];
  /** Chunk senders to reject and ban */
  reject_senders: string[];
}

export enum ResponseApplySnapshotChunk_Result {
  /** UNKNOWN - Unknown result, abort all snapshot restoration */
  UNKNOWN = 0,
  /** ACCEPT - Chunk successfully accepted */
  ACCEPT = 1,
  /** ABORT - Abort all snapshot restoration */
  ABORT = 2,
  /** RETRY - Retry chunk (combine with refetch and reject) */
  RETRY = 3,
  /** RETRY_SNAPSHOT - Retry snapshot (combine with refetch and reject) */
  RETRY_SNAPSHOT = 4,
  /** REJECT_SNAPSHOT - Reject this snapshot, try others */
  REJECT_SNAPSHOT = 5,
  UNRECOGNIZED = -1,
}

export function responseApplySnapshotChunk_ResultFromJSON(
  object: any
): ResponseApplySnapshotChunk_Result {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ResponseApplySnapshotChunk_Result.UNKNOWN;
    case 1:
    case "ACCEPT":
      return ResponseApplySnapshotChunk_Result.ACCEPT;
    case 2:
    case "ABORT":
      return ResponseApplySnapshotChunk_Result.ABORT;
    case 3:
    case "RETRY":
      return ResponseApplySnapshotChunk_Result.RETRY;
    case 4:
    case "RETRY_SNAPSHOT":
      return ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT;
    case 5:
    case "REJECT_SNAPSHOT":
      return ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseApplySnapshotChunk_Result.UNRECOGNIZED;
  }
}

export function responseApplySnapshotChunk_ResultToJSON(
  object: ResponseApplySnapshotChunk_Result
): string {
  switch (object) {
    case ResponseApplySnapshotChunk_Result.UNKNOWN:
      return "UNKNOWN";
    case ResponseApplySnapshotChunk_Result.ACCEPT:
      return "ACCEPT";
    case ResponseApplySnapshotChunk_Result.ABORT:
      return "ABORT";
    case ResponseApplySnapshotChunk_Result.RETRY:
      return "RETRY";
    case ResponseApplySnapshotChunk_Result.RETRY_SNAPSHOT:
      return "RETRY_SNAPSHOT";
    case ResponseApplySnapshotChunk_Result.REJECT_SNAPSHOT:
      return "REJECT_SNAPSHOT";
    default:
      return "UNKNOWN";
  }
}

/**
 * ConsensusParams contains all consensus-relevant parameters
 * that can be adjusted by the abci app
 */
export interface ConsensusParams {
  block: BlockParams | undefined;
  evidence: EvidenceParams | undefined;
  validator: ValidatorParams | undefined;
  version: VersionParams | undefined;
}

/** BlockParams contains limits on the block size. */
export interface BlockParams {
  /** Note: must be greater than 0 */
  max_bytes: number;
  /** Note: must be greater or equal to -1 */
  max_gas: number;
}

export interface LastCommitInfo {
  round: number;
  votes: VoteInfo[];
}

/**
 * Event allows application developers to attach additional information to
 * ResponseBeginBlock, ResponseEndBlock, ResponseCheckTx and ResponseDeliverTx.
 * Later, transactions may be queried using these events.
 */
export interface Event {
  type: string;
  attributes: EventAttribute[];
}

/** EventAttribute is a single key-value pair, associated with an event. */
export interface EventAttribute {
  key: Uint8Array;
  value: Uint8Array;
  /** nondeterministic */
  index: boolean;
}

/**
 * TxResult contains results of executing the transaction.
 *
 * One usage is indexing transaction results.
 */
export interface TxResult {
  height: number;
  index: number;
  tx: Uint8Array;
  result: ResponseDeliverTx | undefined;
}

/** Validator */
export interface Validator {
  /** The first 20 bytes of SHA256(public key) */
  address: Uint8Array;
  /** PubKey pub_key = 2 [(gogoproto.nullable)=false]; */
  power: number;
}

/** ValidatorUpdate */
export interface ValidatorUpdate {
  pub_key: PublicKey | undefined;
  power: number;
}

/** VoteInfo */
export interface VoteInfo {
  validator: Validator | undefined;
  signed_last_block: boolean;
}

export interface Evidence {
  type: EvidenceType;
  /** The offending validator */
  validator: Validator | undefined;
  /** The height when the offense occurred */
  height: number;
  /** The corresponding time where the offense occurred */
  time: Date | undefined;
  /**
   * Total voting power of the validator set in case the ABCI application does
   * not store historical validators.
   * https://github.com/tendermint/tendermint/issues/4581
   */
  total_voting_power: number;
}

export interface Snapshot {
  /** The height at which the snapshot was taken */
  height: number;
  /** The application-specific snapshot format */
  format: number;
  /** Number of chunks in the snapshot */
  chunks: number;
  /** Arbitrary snapshot hash, equal only if identical */
  hash: Uint8Array;
  /** Arbitrary application metadata */
  metadata: Uint8Array;
}

const baseRequest: object = {};

export const Request = {
  encode(
    message: Request,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.echo !== undefined) {
      RequestEcho.encode(message.echo, writer.uint32(10).fork()).ldelim();
    }
    if (message.flush !== undefined) {
      RequestFlush.encode(message.flush, writer.uint32(18).fork()).ldelim();
    }
    if (message.info !== undefined) {
      RequestInfo.encode(message.info, writer.uint32(26).fork()).ldelim();
    }
    if (message.set_option !== undefined) {
      RequestSetOption.encode(
        message.set_option,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.init_chain !== undefined) {
      RequestInitChain.encode(
        message.init_chain,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.query !== undefined) {
      RequestQuery.encode(message.query, writer.uint32(50).fork()).ldelim();
    }
    if (message.begin_block !== undefined) {
      RequestBeginBlock.encode(
        message.begin_block,
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.check_tx !== undefined) {
      RequestCheckTx.encode(
        message.check_tx,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.deliver_tx !== undefined) {
      RequestDeliverTx.encode(
        message.deliver_tx,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.end_block !== undefined) {
      RequestEndBlock.encode(
        message.end_block,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.commit !== undefined) {
      RequestCommit.encode(message.commit, writer.uint32(90).fork()).ldelim();
    }
    if (message.list_snapshots !== undefined) {
      RequestListSnapshots.encode(
        message.list_snapshots,
        writer.uint32(98).fork()
      ).ldelim();
    }
    if (message.offer_snapshot !== undefined) {
      RequestOfferSnapshot.encode(
        message.offer_snapshot,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.load_snapshot_chunk !== undefined) {
      RequestLoadSnapshotChunk.encode(
        message.load_snapshot_chunk,
        writer.uint32(114).fork()
      ).ldelim();
    }
    if (message.apply_snapshot_chunk !== undefined) {
      RequestApplySnapshotChunk.encode(
        message.apply_snapshot_chunk,
        writer.uint32(122).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Request {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequest } as Request;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.echo = RequestEcho.decode(reader, reader.uint32());
          break;
        case 2:
          message.flush = RequestFlush.decode(reader, reader.uint32());
          break;
        case 3:
          message.info = RequestInfo.decode(reader, reader.uint32());
          break;
        case 4:
          message.set_option = RequestSetOption.decode(reader, reader.uint32());
          break;
        case 5:
          message.init_chain = RequestInitChain.decode(reader, reader.uint32());
          break;
        case 6:
          message.query = RequestQuery.decode(reader, reader.uint32());
          break;
        case 7:
          message.begin_block = RequestBeginBlock.decode(
            reader,
            reader.uint32()
          );
          break;
        case 8:
          message.check_tx = RequestCheckTx.decode(reader, reader.uint32());
          break;
        case 9:
          message.deliver_tx = RequestDeliverTx.decode(reader, reader.uint32());
          break;
        case 10:
          message.end_block = RequestEndBlock.decode(reader, reader.uint32());
          break;
        case 11:
          message.commit = RequestCommit.decode(reader, reader.uint32());
          break;
        case 12:
          message.list_snapshots = RequestListSnapshots.decode(
            reader,
            reader.uint32()
          );
          break;
        case 13:
          message.offer_snapshot = RequestOfferSnapshot.decode(
            reader,
            reader.uint32()
          );
          break;
        case 14:
          message.load_snapshot_chunk = RequestLoadSnapshotChunk.decode(
            reader,
            reader.uint32()
          );
          break;
        case 15:
          message.apply_snapshot_chunk = RequestApplySnapshotChunk.decode(
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

  fromJSON(object: any): Request {
    const message = { ...baseRequest } as Request;
    message.echo =
      object.echo !== undefined && object.echo !== null
        ? RequestEcho.fromJSON(object.echo)
        : undefined;
    message.flush =
      object.flush !== undefined && object.flush !== null
        ? RequestFlush.fromJSON(object.flush)
        : undefined;
    message.info =
      object.info !== undefined && object.info !== null
        ? RequestInfo.fromJSON(object.info)
        : undefined;
    message.set_option =
      object.set_option !== undefined && object.set_option !== null
        ? RequestSetOption.fromJSON(object.set_option)
        : undefined;
    message.init_chain =
      object.init_chain !== undefined && object.init_chain !== null
        ? RequestInitChain.fromJSON(object.init_chain)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? RequestQuery.fromJSON(object.query)
        : undefined;
    message.begin_block =
      object.begin_block !== undefined && object.begin_block !== null
        ? RequestBeginBlock.fromJSON(object.begin_block)
        : undefined;
    message.check_tx =
      object.check_tx !== undefined && object.check_tx !== null
        ? RequestCheckTx.fromJSON(object.check_tx)
        : undefined;
    message.deliver_tx =
      object.deliver_tx !== undefined && object.deliver_tx !== null
        ? RequestDeliverTx.fromJSON(object.deliver_tx)
        : undefined;
    message.end_block =
      object.end_block !== undefined && object.end_block !== null
        ? RequestEndBlock.fromJSON(object.end_block)
        : undefined;
    message.commit =
      object.commit !== undefined && object.commit !== null
        ? RequestCommit.fromJSON(object.commit)
        : undefined;
    message.list_snapshots =
      object.list_snapshots !== undefined && object.list_snapshots !== null
        ? RequestListSnapshots.fromJSON(object.list_snapshots)
        : undefined;
    message.offer_snapshot =
      object.offer_snapshot !== undefined && object.offer_snapshot !== null
        ? RequestOfferSnapshot.fromJSON(object.offer_snapshot)
        : undefined;
    message.load_snapshot_chunk =
      object.load_snapshot_chunk !== undefined &&
      object.load_snapshot_chunk !== null
        ? RequestLoadSnapshotChunk.fromJSON(object.load_snapshot_chunk)
        : undefined;
    message.apply_snapshot_chunk =
      object.apply_snapshot_chunk !== undefined &&
      object.apply_snapshot_chunk !== null
        ? RequestApplySnapshotChunk.fromJSON(object.apply_snapshot_chunk)
        : undefined;
    return message;
  },

  toJSON(message: Request): unknown {
    const obj: any = {};
    message.echo !== undefined &&
      (obj.echo = message.echo ? RequestEcho.toJSON(message.echo) : undefined);
    message.flush !== undefined &&
      (obj.flush = message.flush
        ? RequestFlush.toJSON(message.flush)
        : undefined);
    message.info !== undefined &&
      (obj.info = message.info ? RequestInfo.toJSON(message.info) : undefined);
    message.set_option !== undefined &&
      (obj.set_option = message.set_option
        ? RequestSetOption.toJSON(message.set_option)
        : undefined);
    message.init_chain !== undefined &&
      (obj.init_chain = message.init_chain
        ? RequestInitChain.toJSON(message.init_chain)
        : undefined);
    message.query !== undefined &&
      (obj.query = message.query
        ? RequestQuery.toJSON(message.query)
        : undefined);
    message.begin_block !== undefined &&
      (obj.begin_block = message.begin_block
        ? RequestBeginBlock.toJSON(message.begin_block)
        : undefined);
    message.check_tx !== undefined &&
      (obj.check_tx = message.check_tx
        ? RequestCheckTx.toJSON(message.check_tx)
        : undefined);
    message.deliver_tx !== undefined &&
      (obj.deliver_tx = message.deliver_tx
        ? RequestDeliverTx.toJSON(message.deliver_tx)
        : undefined);
    message.end_block !== undefined &&
      (obj.end_block = message.end_block
        ? RequestEndBlock.toJSON(message.end_block)
        : undefined);
    message.commit !== undefined &&
      (obj.commit = message.commit
        ? RequestCommit.toJSON(message.commit)
        : undefined);
    message.list_snapshots !== undefined &&
      (obj.list_snapshots = message.list_snapshots
        ? RequestListSnapshots.toJSON(message.list_snapshots)
        : undefined);
    message.offer_snapshot !== undefined &&
      (obj.offer_snapshot = message.offer_snapshot
        ? RequestOfferSnapshot.toJSON(message.offer_snapshot)
        : undefined);
    message.load_snapshot_chunk !== undefined &&
      (obj.load_snapshot_chunk = message.load_snapshot_chunk
        ? RequestLoadSnapshotChunk.toJSON(message.load_snapshot_chunk)
        : undefined);
    message.apply_snapshot_chunk !== undefined &&
      (obj.apply_snapshot_chunk = message.apply_snapshot_chunk
        ? RequestApplySnapshotChunk.toJSON(message.apply_snapshot_chunk)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Request>, I>>(object: I): Request {
    const message = { ...baseRequest } as Request;
    message.echo =
      object.echo !== undefined && object.echo !== null
        ? RequestEcho.fromPartial(object.echo)
        : undefined;
    message.flush =
      object.flush !== undefined && object.flush !== null
        ? RequestFlush.fromPartial(object.flush)
        : undefined;
    message.info =
      object.info !== undefined && object.info !== null
        ? RequestInfo.fromPartial(object.info)
        : undefined;
    message.set_option =
      object.set_option !== undefined && object.set_option !== null
        ? RequestSetOption.fromPartial(object.set_option)
        : undefined;
    message.init_chain =
      object.init_chain !== undefined && object.init_chain !== null
        ? RequestInitChain.fromPartial(object.init_chain)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? RequestQuery.fromPartial(object.query)
        : undefined;
    message.begin_block =
      object.begin_block !== undefined && object.begin_block !== null
        ? RequestBeginBlock.fromPartial(object.begin_block)
        : undefined;
    message.check_tx =
      object.check_tx !== undefined && object.check_tx !== null
        ? RequestCheckTx.fromPartial(object.check_tx)
        : undefined;
    message.deliver_tx =
      object.deliver_tx !== undefined && object.deliver_tx !== null
        ? RequestDeliverTx.fromPartial(object.deliver_tx)
        : undefined;
    message.end_block =
      object.end_block !== undefined && object.end_block !== null
        ? RequestEndBlock.fromPartial(object.end_block)
        : undefined;
    message.commit =
      object.commit !== undefined && object.commit !== null
        ? RequestCommit.fromPartial(object.commit)
        : undefined;
    message.list_snapshots =
      object.list_snapshots !== undefined && object.list_snapshots !== null
        ? RequestListSnapshots.fromPartial(object.list_snapshots)
        : undefined;
    message.offer_snapshot =
      object.offer_snapshot !== undefined && object.offer_snapshot !== null
        ? RequestOfferSnapshot.fromPartial(object.offer_snapshot)
        : undefined;
    message.load_snapshot_chunk =
      object.load_snapshot_chunk !== undefined &&
      object.load_snapshot_chunk !== null
        ? RequestLoadSnapshotChunk.fromPartial(object.load_snapshot_chunk)
        : undefined;
    message.apply_snapshot_chunk =
      object.apply_snapshot_chunk !== undefined &&
      object.apply_snapshot_chunk !== null
        ? RequestApplySnapshotChunk.fromPartial(object.apply_snapshot_chunk)
        : undefined;
    return message;
  },
};

const baseRequestEcho: object = { message: "" };

export const RequestEcho = {
  encode(
    message: RequestEcho,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestEcho {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestEcho } as RequestEcho;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestEcho {
    const message = { ...baseRequestEcho } as RequestEcho;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : "";
    return message;
  },

  toJSON(message: RequestEcho): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestEcho>, I>>(
    object: I
  ): RequestEcho {
    const message = { ...baseRequestEcho } as RequestEcho;
    message.message = object.message ?? "";
    return message;
  },
};

const baseRequestFlush: object = {};

export const RequestFlush = {
  encode(
    _: RequestFlush,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestFlush {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestFlush } as RequestFlush;
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

  fromJSON(_: any): RequestFlush {
    const message = { ...baseRequestFlush } as RequestFlush;
    return message;
  },

  toJSON(_: RequestFlush): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestFlush>, I>>(
    _: I
  ): RequestFlush {
    const message = { ...baseRequestFlush } as RequestFlush;
    return message;
  },
};

const baseRequestInfo: object = {
  version: "",
  block_version: 0,
  p2p_version: 0,
};

export const RequestInfo = {
  encode(
    message: RequestInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.block_version !== 0) {
      writer.uint32(16).uint64(message.block_version);
    }
    if (message.p2p_version !== 0) {
      writer.uint32(24).uint64(message.p2p_version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestInfo } as RequestInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        case 2:
          message.block_version = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.p2p_version = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestInfo {
    const message = { ...baseRequestInfo } as RequestInfo;
    message.version =
      object.version !== undefined && object.version !== null
        ? String(object.version)
        : "";
    message.block_version =
      object.block_version !== undefined && object.block_version !== null
        ? Number(object.block_version)
        : 0;
    message.p2p_version =
      object.p2p_version !== undefined && object.p2p_version !== null
        ? Number(object.p2p_version)
        : 0;
    return message;
  },

  toJSON(message: RequestInfo): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.block_version !== undefined &&
      (obj.block_version = Math.round(message.block_version));
    message.p2p_version !== undefined &&
      (obj.p2p_version = Math.round(message.p2p_version));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestInfo>, I>>(
    object: I
  ): RequestInfo {
    const message = { ...baseRequestInfo } as RequestInfo;
    message.version = object.version ?? "";
    message.block_version = object.block_version ?? 0;
    message.p2p_version = object.p2p_version ?? 0;
    return message;
  },
};

const baseRequestSetOption: object = { key: "", value: "" };

export const RequestSetOption = {
  encode(
    message: RequestSetOption,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestSetOption {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestSetOption } as RequestSetOption;
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

  fromJSON(object: any): RequestSetOption {
    const message = { ...baseRequestSetOption } as RequestSetOption;
    message.key =
      object.key !== undefined && object.key !== null ? String(object.key) : "";
    message.value =
      object.value !== undefined && object.value !== null
        ? String(object.value)
        : "";
    return message;
  },

  toJSON(message: RequestSetOption): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestSetOption>, I>>(
    object: I
  ): RequestSetOption {
    const message = { ...baseRequestSetOption } as RequestSetOption;
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

const baseRequestInitChain: object = { chain_id: "", initial_height: 0 };

export const RequestInitChain = {
  encode(
    message: RequestInitChain,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.time),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.chain_id !== "") {
      writer.uint32(18).string(message.chain_id);
    }
    if (message.consensus_params !== undefined) {
      ConsensusParams.encode(
        message.consensus_params,
        writer.uint32(26).fork()
      ).ldelim();
    }
    for (const v of message.validators) {
      ValidatorUpdate.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.app_state_bytes.length !== 0) {
      writer.uint32(42).bytes(message.app_state_bytes);
    }
    if (message.initial_height !== 0) {
      writer.uint32(48).int64(message.initial_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestInitChain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestInitChain } as RequestInitChain;
    message.validators = [];
    message.app_state_bytes = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.chain_id = reader.string();
          break;
        case 3:
          message.consensus_params = ConsensusParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.validators.push(
            ValidatorUpdate.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.app_state_bytes = reader.bytes();
          break;
        case 6:
          message.initial_height = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestInitChain {
    const message = { ...baseRequestInitChain } as RequestInitChain;
    message.time =
      object.time !== undefined && object.time !== null
        ? fromJsonTimestamp(object.time)
        : undefined;
    message.chain_id =
      object.chain_id !== undefined && object.chain_id !== null
        ? String(object.chain_id)
        : "";
    message.consensus_params =
      object.consensus_params !== undefined && object.consensus_params !== null
        ? ConsensusParams.fromJSON(object.consensus_params)
        : undefined;
    message.validators = (object.validators ?? []).map((e: any) =>
      ValidatorUpdate.fromJSON(e)
    );
    message.app_state_bytes =
      object.app_state_bytes !== undefined && object.app_state_bytes !== null
        ? bytesFromBase64(object.app_state_bytes)
        : new Uint8Array();
    message.initial_height =
      object.initial_height !== undefined && object.initial_height !== null
        ? Number(object.initial_height)
        : 0;
    return message;
  },

  toJSON(message: RequestInitChain): unknown {
    const obj: any = {};
    message.time !== undefined && (obj.time = message.time.toISOString());
    message.chain_id !== undefined && (obj.chain_id = message.chain_id);
    message.consensus_params !== undefined &&
      (obj.consensus_params = message.consensus_params
        ? ConsensusParams.toJSON(message.consensus_params)
        : undefined);
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? ValidatorUpdate.toJSON(e) : undefined
      );
    } else {
      obj.validators = [];
    }
    message.app_state_bytes !== undefined &&
      (obj.app_state_bytes = base64FromBytes(
        message.app_state_bytes !== undefined
          ? message.app_state_bytes
          : new Uint8Array()
      ));
    message.initial_height !== undefined &&
      (obj.initial_height = Math.round(message.initial_height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestInitChain>, I>>(
    object: I
  ): RequestInitChain {
    const message = { ...baseRequestInitChain } as RequestInitChain;
    message.time = object.time ?? undefined;
    message.chain_id = object.chain_id ?? "";
    message.consensus_params =
      object.consensus_params !== undefined && object.consensus_params !== null
        ? ConsensusParams.fromPartial(object.consensus_params)
        : undefined;
    message.validators =
      object.validators?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.app_state_bytes = object.app_state_bytes ?? new Uint8Array();
    message.initial_height = object.initial_height ?? 0;
    return message;
  },
};

const baseRequestQuery: object = { path: "", height: 0, prove: false };

export const RequestQuery = {
  encode(
    message: RequestQuery,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.path !== "") {
      writer.uint32(18).string(message.path);
    }
    if (message.height !== 0) {
      writer.uint32(24).int64(message.height);
    }
    if (message.prove === true) {
      writer.uint32(32).bool(message.prove);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestQuery } as RequestQuery;
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        case 2:
          message.path = reader.string();
          break;
        case 3:
          message.height = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.prove = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestQuery {
    const message = { ...baseRequestQuery } as RequestQuery;
    message.data =
      object.data !== undefined && object.data !== null
        ? bytesFromBase64(object.data)
        : new Uint8Array();
    message.path =
      object.path !== undefined && object.path !== null
        ? String(object.path)
        : "";
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    message.prove =
      object.prove !== undefined && object.prove !== null
        ? Boolean(object.prove)
        : false;
    return message;
  },

  toJSON(message: RequestQuery): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.path !== undefined && (obj.path = message.path);
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.prove !== undefined && (obj.prove = message.prove);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestQuery>, I>>(
    object: I
  ): RequestQuery {
    const message = { ...baseRequestQuery } as RequestQuery;
    message.data = object.data ?? new Uint8Array();
    message.path = object.path ?? "";
    message.height = object.height ?? 0;
    message.prove = object.prove ?? false;
    return message;
  },
};

const baseRequestBeginBlock: object = {};

export const RequestBeginBlock = {
  encode(
    message: RequestBeginBlock,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(18).fork()).ldelim();
    }
    if (message.last_commit_info !== undefined) {
      LastCommitInfo.encode(
        message.last_commit_info,
        writer.uint32(26).fork()
      ).ldelim();
    }
    for (const v of message.byzantine_validators) {
      Evidence.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestBeginBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestBeginBlock } as RequestBeginBlock;
    message.byzantine_validators = [];
    message.hash = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        case 2:
          message.header = Header.decode(reader, reader.uint32());
          break;
        case 3:
          message.last_commit_info = LastCommitInfo.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.byzantine_validators.push(
            Evidence.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestBeginBlock {
    const message = { ...baseRequestBeginBlock } as RequestBeginBlock;
    message.hash =
      object.hash !== undefined && object.hash !== null
        ? bytesFromBase64(object.hash)
        : new Uint8Array();
    message.header =
      object.header !== undefined && object.header !== null
        ? Header.fromJSON(object.header)
        : undefined;
    message.last_commit_info =
      object.last_commit_info !== undefined && object.last_commit_info !== null
        ? LastCommitInfo.fromJSON(object.last_commit_info)
        : undefined;
    message.byzantine_validators = (object.byzantine_validators ?? []).map(
      (e: any) => Evidence.fromJSON(e)
    );
    return message;
  },

  toJSON(message: RequestBeginBlock): unknown {
    const obj: any = {};
    message.hash !== undefined &&
      (obj.hash = base64FromBytes(
        message.hash !== undefined ? message.hash : new Uint8Array()
      ));
    message.header !== undefined &&
      (obj.header = message.header ? Header.toJSON(message.header) : undefined);
    message.last_commit_info !== undefined &&
      (obj.last_commit_info = message.last_commit_info
        ? LastCommitInfo.toJSON(message.last_commit_info)
        : undefined);
    if (message.byzantine_validators) {
      obj.byzantine_validators = message.byzantine_validators.map((e) =>
        e ? Evidence.toJSON(e) : undefined
      );
    } else {
      obj.byzantine_validators = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestBeginBlock>, I>>(
    object: I
  ): RequestBeginBlock {
    const message = { ...baseRequestBeginBlock } as RequestBeginBlock;
    message.hash = object.hash ?? new Uint8Array();
    message.header =
      object.header !== undefined && object.header !== null
        ? Header.fromPartial(object.header)
        : undefined;
    message.last_commit_info =
      object.last_commit_info !== undefined && object.last_commit_info !== null
        ? LastCommitInfo.fromPartial(object.last_commit_info)
        : undefined;
    message.byzantine_validators =
      object.byzantine_validators?.map((e) => Evidence.fromPartial(e)) || [];
    return message;
  },
};

const baseRequestCheckTx: object = { type: 0 };

export const RequestCheckTx = {
  encode(
    message: RequestCheckTx,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tx.length !== 0) {
      writer.uint32(10).bytes(message.tx);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestCheckTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestCheckTx } as RequestCheckTx;
    message.tx = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = reader.bytes();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestCheckTx {
    const message = { ...baseRequestCheckTx } as RequestCheckTx;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? bytesFromBase64(object.tx)
        : new Uint8Array();
    message.type =
      object.type !== undefined && object.type !== null
        ? checkTxTypeFromJSON(object.type)
        : 0;
    return message;
  },

  toJSON(message: RequestCheckTx): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = base64FromBytes(
        message.tx !== undefined ? message.tx : new Uint8Array()
      ));
    message.type !== undefined && (obj.type = checkTxTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestCheckTx>, I>>(
    object: I
  ): RequestCheckTx {
    const message = { ...baseRequestCheckTx } as RequestCheckTx;
    message.tx = object.tx ?? new Uint8Array();
    message.type = object.type ?? 0;
    return message;
  },
};

const baseRequestDeliverTx: object = {};

export const RequestDeliverTx = {
  encode(
    message: RequestDeliverTx,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tx.length !== 0) {
      writer.uint32(10).bytes(message.tx);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestDeliverTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestDeliverTx } as RequestDeliverTx;
    message.tx = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestDeliverTx {
    const message = { ...baseRequestDeliverTx } as RequestDeliverTx;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? bytesFromBase64(object.tx)
        : new Uint8Array();
    return message;
  },

  toJSON(message: RequestDeliverTx): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = base64FromBytes(
        message.tx !== undefined ? message.tx : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestDeliverTx>, I>>(
    object: I
  ): RequestDeliverTx {
    const message = { ...baseRequestDeliverTx } as RequestDeliverTx;
    message.tx = object.tx ?? new Uint8Array();
    return message;
  },
};

const baseRequestEndBlock: object = { height: 0 };

export const RequestEndBlock = {
  encode(
    message: RequestEndBlock,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestEndBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestEndBlock } as RequestEndBlock;
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

  fromJSON(object: any): RequestEndBlock {
    const message = { ...baseRequestEndBlock } as RequestEndBlock;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    return message;
  },

  toJSON(message: RequestEndBlock): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestEndBlock>, I>>(
    object: I
  ): RequestEndBlock {
    const message = { ...baseRequestEndBlock } as RequestEndBlock;
    message.height = object.height ?? 0;
    return message;
  },
};

const baseRequestCommit: object = {};

export const RequestCommit = {
  encode(
    _: RequestCommit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestCommit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestCommit } as RequestCommit;
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

  fromJSON(_: any): RequestCommit {
    const message = { ...baseRequestCommit } as RequestCommit;
    return message;
  },

  toJSON(_: RequestCommit): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestCommit>, I>>(
    _: I
  ): RequestCommit {
    const message = { ...baseRequestCommit } as RequestCommit;
    return message;
  },
};

const baseRequestListSnapshots: object = {};

export const RequestListSnapshots = {
  encode(
    _: RequestListSnapshots,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RequestListSnapshots {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestListSnapshots } as RequestListSnapshots;
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

  fromJSON(_: any): RequestListSnapshots {
    const message = { ...baseRequestListSnapshots } as RequestListSnapshots;
    return message;
  },

  toJSON(_: RequestListSnapshots): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestListSnapshots>, I>>(
    _: I
  ): RequestListSnapshots {
    const message = { ...baseRequestListSnapshots } as RequestListSnapshots;
    return message;
  },
};

const baseRequestOfferSnapshot: object = {};

export const RequestOfferSnapshot = {
  encode(
    message: RequestOfferSnapshot,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.snapshot !== undefined) {
      Snapshot.encode(message.snapshot, writer.uint32(10).fork()).ldelim();
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(18).bytes(message.app_hash);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RequestOfferSnapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestOfferSnapshot } as RequestOfferSnapshot;
    message.app_hash = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.snapshot = Snapshot.decode(reader, reader.uint32());
          break;
        case 2:
          message.app_hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestOfferSnapshot {
    const message = { ...baseRequestOfferSnapshot } as RequestOfferSnapshot;
    message.snapshot =
      object.snapshot !== undefined && object.snapshot !== null
        ? Snapshot.fromJSON(object.snapshot)
        : undefined;
    message.app_hash =
      object.app_hash !== undefined && object.app_hash !== null
        ? bytesFromBase64(object.app_hash)
        : new Uint8Array();
    return message;
  },

  toJSON(message: RequestOfferSnapshot): unknown {
    const obj: any = {};
    message.snapshot !== undefined &&
      (obj.snapshot = message.snapshot
        ? Snapshot.toJSON(message.snapshot)
        : undefined);
    message.app_hash !== undefined &&
      (obj.app_hash = base64FromBytes(
        message.app_hash !== undefined ? message.app_hash : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestOfferSnapshot>, I>>(
    object: I
  ): RequestOfferSnapshot {
    const message = { ...baseRequestOfferSnapshot } as RequestOfferSnapshot;
    message.snapshot =
      object.snapshot !== undefined && object.snapshot !== null
        ? Snapshot.fromPartial(object.snapshot)
        : undefined;
    message.app_hash = object.app_hash ?? new Uint8Array();
    return message;
  },
};

const baseRequestLoadSnapshotChunk: object = { height: 0, format: 0, chunk: 0 };

export const RequestLoadSnapshotChunk = {
  encode(
    message: RequestLoadSnapshotChunk,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.format !== 0) {
      writer.uint32(16).uint32(message.format);
    }
    if (message.chunk !== 0) {
      writer.uint32(24).uint32(message.chunk);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RequestLoadSnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRequestLoadSnapshotChunk,
    } as RequestLoadSnapshotChunk;
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
          message.chunk = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestLoadSnapshotChunk {
    const message = {
      ...baseRequestLoadSnapshotChunk,
    } as RequestLoadSnapshotChunk;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    message.format =
      object.format !== undefined && object.format !== null
        ? Number(object.format)
        : 0;
    message.chunk =
      object.chunk !== undefined && object.chunk !== null
        ? Number(object.chunk)
        : 0;
    return message;
  },

  toJSON(message: RequestLoadSnapshotChunk): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.format !== undefined && (obj.format = Math.round(message.format));
    message.chunk !== undefined && (obj.chunk = Math.round(message.chunk));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestLoadSnapshotChunk>, I>>(
    object: I
  ): RequestLoadSnapshotChunk {
    const message = {
      ...baseRequestLoadSnapshotChunk,
    } as RequestLoadSnapshotChunk;
    message.height = object.height ?? 0;
    message.format = object.format ?? 0;
    message.chunk = object.chunk ?? 0;
    return message;
  },
};

const baseRequestApplySnapshotChunk: object = { index: 0, sender: "" };

export const RequestApplySnapshotChunk = {
  encode(
    message: RequestApplySnapshotChunk,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== 0) {
      writer.uint32(8).uint32(message.index);
    }
    if (message.chunk.length !== 0) {
      writer.uint32(18).bytes(message.chunk);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RequestApplySnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseRequestApplySnapshotChunk,
    } as RequestApplySnapshotChunk;
    message.chunk = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        case 2:
          message.chunk = reader.bytes();
          break;
        case 3:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestApplySnapshotChunk {
    const message = {
      ...baseRequestApplySnapshotChunk,
    } as RequestApplySnapshotChunk;
    message.index =
      object.index !== undefined && object.index !== null
        ? Number(object.index)
        : 0;
    message.chunk =
      object.chunk !== undefined && object.chunk !== null
        ? bytesFromBase64(object.chunk)
        : new Uint8Array();
    message.sender =
      object.sender !== undefined && object.sender !== null
        ? String(object.sender)
        : "";
    return message;
  },

  toJSON(message: RequestApplySnapshotChunk): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = Math.round(message.index));
    message.chunk !== undefined &&
      (obj.chunk = base64FromBytes(
        message.chunk !== undefined ? message.chunk : new Uint8Array()
      ));
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RequestApplySnapshotChunk>, I>>(
    object: I
  ): RequestApplySnapshotChunk {
    const message = {
      ...baseRequestApplySnapshotChunk,
    } as RequestApplySnapshotChunk;
    message.index = object.index ?? 0;
    message.chunk = object.chunk ?? new Uint8Array();
    message.sender = object.sender ?? "";
    return message;
  },
};

const baseResponse: object = {};

export const Response = {
  encode(
    message: Response,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.exception !== undefined) {
      ResponseException.encode(
        message.exception,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.echo !== undefined) {
      ResponseEcho.encode(message.echo, writer.uint32(18).fork()).ldelim();
    }
    if (message.flush !== undefined) {
      ResponseFlush.encode(message.flush, writer.uint32(26).fork()).ldelim();
    }
    if (message.info !== undefined) {
      ResponseInfo.encode(message.info, writer.uint32(34).fork()).ldelim();
    }
    if (message.set_option !== undefined) {
      ResponseSetOption.encode(
        message.set_option,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.init_chain !== undefined) {
      ResponseInitChain.encode(
        message.init_chain,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.query !== undefined) {
      ResponseQuery.encode(message.query, writer.uint32(58).fork()).ldelim();
    }
    if (message.begin_block !== undefined) {
      ResponseBeginBlock.encode(
        message.begin_block,
        writer.uint32(66).fork()
      ).ldelim();
    }
    if (message.check_tx !== undefined) {
      ResponseCheckTx.encode(
        message.check_tx,
        writer.uint32(74).fork()
      ).ldelim();
    }
    if (message.deliver_tx !== undefined) {
      ResponseDeliverTx.encode(
        message.deliver_tx,
        writer.uint32(82).fork()
      ).ldelim();
    }
    if (message.end_block !== undefined) {
      ResponseEndBlock.encode(
        message.end_block,
        writer.uint32(90).fork()
      ).ldelim();
    }
    if (message.commit !== undefined) {
      ResponseCommit.encode(message.commit, writer.uint32(98).fork()).ldelim();
    }
    if (message.list_snapshots !== undefined) {
      ResponseListSnapshots.encode(
        message.list_snapshots,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.offer_snapshot !== undefined) {
      ResponseOfferSnapshot.encode(
        message.offer_snapshot,
        writer.uint32(114).fork()
      ).ldelim();
    }
    if (message.load_snapshot_chunk !== undefined) {
      ResponseLoadSnapshotChunk.encode(
        message.load_snapshot_chunk,
        writer.uint32(122).fork()
      ).ldelim();
    }
    if (message.apply_snapshot_chunk !== undefined) {
      ResponseApplySnapshotChunk.encode(
        message.apply_snapshot_chunk,
        writer.uint32(130).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponse } as Response;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.exception = ResponseException.decode(reader, reader.uint32());
          break;
        case 2:
          message.echo = ResponseEcho.decode(reader, reader.uint32());
          break;
        case 3:
          message.flush = ResponseFlush.decode(reader, reader.uint32());
          break;
        case 4:
          message.info = ResponseInfo.decode(reader, reader.uint32());
          break;
        case 5:
          message.set_option = ResponseSetOption.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.init_chain = ResponseInitChain.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.query = ResponseQuery.decode(reader, reader.uint32());
          break;
        case 8:
          message.begin_block = ResponseBeginBlock.decode(
            reader,
            reader.uint32()
          );
          break;
        case 9:
          message.check_tx = ResponseCheckTx.decode(reader, reader.uint32());
          break;
        case 10:
          message.deliver_tx = ResponseDeliverTx.decode(
            reader,
            reader.uint32()
          );
          break;
        case 11:
          message.end_block = ResponseEndBlock.decode(reader, reader.uint32());
          break;
        case 12:
          message.commit = ResponseCommit.decode(reader, reader.uint32());
          break;
        case 13:
          message.list_snapshots = ResponseListSnapshots.decode(
            reader,
            reader.uint32()
          );
          break;
        case 14:
          message.offer_snapshot = ResponseOfferSnapshot.decode(
            reader,
            reader.uint32()
          );
          break;
        case 15:
          message.load_snapshot_chunk = ResponseLoadSnapshotChunk.decode(
            reader,
            reader.uint32()
          );
          break;
        case 16:
          message.apply_snapshot_chunk = ResponseApplySnapshotChunk.decode(
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

  fromJSON(object: any): Response {
    const message = { ...baseResponse } as Response;
    message.exception =
      object.exception !== undefined && object.exception !== null
        ? ResponseException.fromJSON(object.exception)
        : undefined;
    message.echo =
      object.echo !== undefined && object.echo !== null
        ? ResponseEcho.fromJSON(object.echo)
        : undefined;
    message.flush =
      object.flush !== undefined && object.flush !== null
        ? ResponseFlush.fromJSON(object.flush)
        : undefined;
    message.info =
      object.info !== undefined && object.info !== null
        ? ResponseInfo.fromJSON(object.info)
        : undefined;
    message.set_option =
      object.set_option !== undefined && object.set_option !== null
        ? ResponseSetOption.fromJSON(object.set_option)
        : undefined;
    message.init_chain =
      object.init_chain !== undefined && object.init_chain !== null
        ? ResponseInitChain.fromJSON(object.init_chain)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? ResponseQuery.fromJSON(object.query)
        : undefined;
    message.begin_block =
      object.begin_block !== undefined && object.begin_block !== null
        ? ResponseBeginBlock.fromJSON(object.begin_block)
        : undefined;
    message.check_tx =
      object.check_tx !== undefined && object.check_tx !== null
        ? ResponseCheckTx.fromJSON(object.check_tx)
        : undefined;
    message.deliver_tx =
      object.deliver_tx !== undefined && object.deliver_tx !== null
        ? ResponseDeliverTx.fromJSON(object.deliver_tx)
        : undefined;
    message.end_block =
      object.end_block !== undefined && object.end_block !== null
        ? ResponseEndBlock.fromJSON(object.end_block)
        : undefined;
    message.commit =
      object.commit !== undefined && object.commit !== null
        ? ResponseCommit.fromJSON(object.commit)
        : undefined;
    message.list_snapshots =
      object.list_snapshots !== undefined && object.list_snapshots !== null
        ? ResponseListSnapshots.fromJSON(object.list_snapshots)
        : undefined;
    message.offer_snapshot =
      object.offer_snapshot !== undefined && object.offer_snapshot !== null
        ? ResponseOfferSnapshot.fromJSON(object.offer_snapshot)
        : undefined;
    message.load_snapshot_chunk =
      object.load_snapshot_chunk !== undefined &&
      object.load_snapshot_chunk !== null
        ? ResponseLoadSnapshotChunk.fromJSON(object.load_snapshot_chunk)
        : undefined;
    message.apply_snapshot_chunk =
      object.apply_snapshot_chunk !== undefined &&
      object.apply_snapshot_chunk !== null
        ? ResponseApplySnapshotChunk.fromJSON(object.apply_snapshot_chunk)
        : undefined;
    return message;
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.exception !== undefined &&
      (obj.exception = message.exception
        ? ResponseException.toJSON(message.exception)
        : undefined);
    message.echo !== undefined &&
      (obj.echo = message.echo ? ResponseEcho.toJSON(message.echo) : undefined);
    message.flush !== undefined &&
      (obj.flush = message.flush
        ? ResponseFlush.toJSON(message.flush)
        : undefined);
    message.info !== undefined &&
      (obj.info = message.info ? ResponseInfo.toJSON(message.info) : undefined);
    message.set_option !== undefined &&
      (obj.set_option = message.set_option
        ? ResponseSetOption.toJSON(message.set_option)
        : undefined);
    message.init_chain !== undefined &&
      (obj.init_chain = message.init_chain
        ? ResponseInitChain.toJSON(message.init_chain)
        : undefined);
    message.query !== undefined &&
      (obj.query = message.query
        ? ResponseQuery.toJSON(message.query)
        : undefined);
    message.begin_block !== undefined &&
      (obj.begin_block = message.begin_block
        ? ResponseBeginBlock.toJSON(message.begin_block)
        : undefined);
    message.check_tx !== undefined &&
      (obj.check_tx = message.check_tx
        ? ResponseCheckTx.toJSON(message.check_tx)
        : undefined);
    message.deliver_tx !== undefined &&
      (obj.deliver_tx = message.deliver_tx
        ? ResponseDeliverTx.toJSON(message.deliver_tx)
        : undefined);
    message.end_block !== undefined &&
      (obj.end_block = message.end_block
        ? ResponseEndBlock.toJSON(message.end_block)
        : undefined);
    message.commit !== undefined &&
      (obj.commit = message.commit
        ? ResponseCommit.toJSON(message.commit)
        : undefined);
    message.list_snapshots !== undefined &&
      (obj.list_snapshots = message.list_snapshots
        ? ResponseListSnapshots.toJSON(message.list_snapshots)
        : undefined);
    message.offer_snapshot !== undefined &&
      (obj.offer_snapshot = message.offer_snapshot
        ? ResponseOfferSnapshot.toJSON(message.offer_snapshot)
        : undefined);
    message.load_snapshot_chunk !== undefined &&
      (obj.load_snapshot_chunk = message.load_snapshot_chunk
        ? ResponseLoadSnapshotChunk.toJSON(message.load_snapshot_chunk)
        : undefined);
    message.apply_snapshot_chunk !== undefined &&
      (obj.apply_snapshot_chunk = message.apply_snapshot_chunk
        ? ResponseApplySnapshotChunk.toJSON(message.apply_snapshot_chunk)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Response>, I>>(object: I): Response {
    const message = { ...baseResponse } as Response;
    message.exception =
      object.exception !== undefined && object.exception !== null
        ? ResponseException.fromPartial(object.exception)
        : undefined;
    message.echo =
      object.echo !== undefined && object.echo !== null
        ? ResponseEcho.fromPartial(object.echo)
        : undefined;
    message.flush =
      object.flush !== undefined && object.flush !== null
        ? ResponseFlush.fromPartial(object.flush)
        : undefined;
    message.info =
      object.info !== undefined && object.info !== null
        ? ResponseInfo.fromPartial(object.info)
        : undefined;
    message.set_option =
      object.set_option !== undefined && object.set_option !== null
        ? ResponseSetOption.fromPartial(object.set_option)
        : undefined;
    message.init_chain =
      object.init_chain !== undefined && object.init_chain !== null
        ? ResponseInitChain.fromPartial(object.init_chain)
        : undefined;
    message.query =
      object.query !== undefined && object.query !== null
        ? ResponseQuery.fromPartial(object.query)
        : undefined;
    message.begin_block =
      object.begin_block !== undefined && object.begin_block !== null
        ? ResponseBeginBlock.fromPartial(object.begin_block)
        : undefined;
    message.check_tx =
      object.check_tx !== undefined && object.check_tx !== null
        ? ResponseCheckTx.fromPartial(object.check_tx)
        : undefined;
    message.deliver_tx =
      object.deliver_tx !== undefined && object.deliver_tx !== null
        ? ResponseDeliverTx.fromPartial(object.deliver_tx)
        : undefined;
    message.end_block =
      object.end_block !== undefined && object.end_block !== null
        ? ResponseEndBlock.fromPartial(object.end_block)
        : undefined;
    message.commit =
      object.commit !== undefined && object.commit !== null
        ? ResponseCommit.fromPartial(object.commit)
        : undefined;
    message.list_snapshots =
      object.list_snapshots !== undefined && object.list_snapshots !== null
        ? ResponseListSnapshots.fromPartial(object.list_snapshots)
        : undefined;
    message.offer_snapshot =
      object.offer_snapshot !== undefined && object.offer_snapshot !== null
        ? ResponseOfferSnapshot.fromPartial(object.offer_snapshot)
        : undefined;
    message.load_snapshot_chunk =
      object.load_snapshot_chunk !== undefined &&
      object.load_snapshot_chunk !== null
        ? ResponseLoadSnapshotChunk.fromPartial(object.load_snapshot_chunk)
        : undefined;
    message.apply_snapshot_chunk =
      object.apply_snapshot_chunk !== undefined &&
      object.apply_snapshot_chunk !== null
        ? ResponseApplySnapshotChunk.fromPartial(object.apply_snapshot_chunk)
        : undefined;
    return message;
  },
};

const baseResponseException: object = { error: "" };

export const ResponseException = {
  encode(
    message: ResponseException,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.error !== "") {
      writer.uint32(10).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseException {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseException } as ResponseException;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseException {
    const message = { ...baseResponseException } as ResponseException;
    message.error =
      object.error !== undefined && object.error !== null
        ? String(object.error)
        : "";
    return message;
  },

  toJSON(message: ResponseException): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseException>, I>>(
    object: I
  ): ResponseException {
    const message = { ...baseResponseException } as ResponseException;
    message.error = object.error ?? "";
    return message;
  },
};

const baseResponseEcho: object = { message: "" };

export const ResponseEcho = {
  encode(
    message: ResponseEcho,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseEcho {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseEcho } as ResponseEcho;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseEcho {
    const message = { ...baseResponseEcho } as ResponseEcho;
    message.message =
      object.message !== undefined && object.message !== null
        ? String(object.message)
        : "";
    return message;
  },

  toJSON(message: ResponseEcho): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseEcho>, I>>(
    object: I
  ): ResponseEcho {
    const message = { ...baseResponseEcho } as ResponseEcho;
    message.message = object.message ?? "";
    return message;
  },
};

const baseResponseFlush: object = {};

export const ResponseFlush = {
  encode(
    _: ResponseFlush,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseFlush {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseFlush } as ResponseFlush;
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

  fromJSON(_: any): ResponseFlush {
    const message = { ...baseResponseFlush } as ResponseFlush;
    return message;
  },

  toJSON(_: ResponseFlush): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseFlush>, I>>(
    _: I
  ): ResponseFlush {
    const message = { ...baseResponseFlush } as ResponseFlush;
    return message;
  },
};

const baseResponseInfo: object = {
  data: "",
  version: "",
  app_version: 0,
  last_block_height: 0,
};

export const ResponseInfo = {
  encode(
    message: ResponseInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.app_version !== 0) {
      writer.uint32(24).uint64(message.app_version);
    }
    if (message.last_block_height !== 0) {
      writer.uint32(32).int64(message.last_block_height);
    }
    if (message.last_block_app_hash.length !== 0) {
      writer.uint32(42).bytes(message.last_block_app_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseInfo } as ResponseInfo;
    message.last_block_app_hash = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        case 3:
          message.app_version = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.last_block_height = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.last_block_app_hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseInfo {
    const message = { ...baseResponseInfo } as ResponseInfo;
    message.data =
      object.data !== undefined && object.data !== null
        ? String(object.data)
        : "";
    message.version =
      object.version !== undefined && object.version !== null
        ? String(object.version)
        : "";
    message.app_version =
      object.app_version !== undefined && object.app_version !== null
        ? Number(object.app_version)
        : 0;
    message.last_block_height =
      object.last_block_height !== undefined &&
      object.last_block_height !== null
        ? Number(object.last_block_height)
        : 0;
    message.last_block_app_hash =
      object.last_block_app_hash !== undefined &&
      object.last_block_app_hash !== null
        ? bytesFromBase64(object.last_block_app_hash)
        : new Uint8Array();
    return message;
  },

  toJSON(message: ResponseInfo): unknown {
    const obj: any = {};
    message.data !== undefined && (obj.data = message.data);
    message.version !== undefined && (obj.version = message.version);
    message.app_version !== undefined &&
      (obj.app_version = Math.round(message.app_version));
    message.last_block_height !== undefined &&
      (obj.last_block_height = Math.round(message.last_block_height));
    message.last_block_app_hash !== undefined &&
      (obj.last_block_app_hash = base64FromBytes(
        message.last_block_app_hash !== undefined
          ? message.last_block_app_hash
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseInfo>, I>>(
    object: I
  ): ResponseInfo {
    const message = { ...baseResponseInfo } as ResponseInfo;
    message.data = object.data ?? "";
    message.version = object.version ?? "";
    message.app_version = object.app_version ?? 0;
    message.last_block_height = object.last_block_height ?? 0;
    message.last_block_app_hash =
      object.last_block_app_hash ?? new Uint8Array();
    return message;
  },
};

const baseResponseSetOption: object = { code: 0, log: "", info: "" };

export const ResponseSetOption = {
  encode(
    message: ResponseSetOption,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseSetOption {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseSetOption } as ResponseSetOption;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.uint32();
          break;
        case 3:
          message.log = reader.string();
          break;
        case 4:
          message.info = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseSetOption {
    const message = { ...baseResponseSetOption } as ResponseSetOption;
    message.code =
      object.code !== undefined && object.code !== null
        ? Number(object.code)
        : 0;
    message.log =
      object.log !== undefined && object.log !== null ? String(object.log) : "";
    message.info =
      object.info !== undefined && object.info !== null
        ? String(object.info)
        : "";
    return message;
  },

  toJSON(message: ResponseSetOption): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.log !== undefined && (obj.log = message.log);
    message.info !== undefined && (obj.info = message.info);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseSetOption>, I>>(
    object: I
  ): ResponseSetOption {
    const message = { ...baseResponseSetOption } as ResponseSetOption;
    message.code = object.code ?? 0;
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    return message;
  },
};

const baseResponseInitChain: object = {};

export const ResponseInitChain = {
  encode(
    message: ResponseInitChain,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.consensus_params !== undefined) {
      ConsensusParams.encode(
        message.consensus_params,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.validators) {
      ValidatorUpdate.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.app_hash.length !== 0) {
      writer.uint32(26).bytes(message.app_hash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseInitChain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseInitChain } as ResponseInitChain;
    message.validators = [];
    message.app_hash = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensus_params = ConsensusParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.validators.push(
            ValidatorUpdate.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.app_hash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseInitChain {
    const message = { ...baseResponseInitChain } as ResponseInitChain;
    message.consensus_params =
      object.consensus_params !== undefined && object.consensus_params !== null
        ? ConsensusParams.fromJSON(object.consensus_params)
        : undefined;
    message.validators = (object.validators ?? []).map((e: any) =>
      ValidatorUpdate.fromJSON(e)
    );
    message.app_hash =
      object.app_hash !== undefined && object.app_hash !== null
        ? bytesFromBase64(object.app_hash)
        : new Uint8Array();
    return message;
  },

  toJSON(message: ResponseInitChain): unknown {
    const obj: any = {};
    message.consensus_params !== undefined &&
      (obj.consensus_params = message.consensus_params
        ? ConsensusParams.toJSON(message.consensus_params)
        : undefined);
    if (message.validators) {
      obj.validators = message.validators.map((e) =>
        e ? ValidatorUpdate.toJSON(e) : undefined
      );
    } else {
      obj.validators = [];
    }
    message.app_hash !== undefined &&
      (obj.app_hash = base64FromBytes(
        message.app_hash !== undefined ? message.app_hash : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseInitChain>, I>>(
    object: I
  ): ResponseInitChain {
    const message = { ...baseResponseInitChain } as ResponseInitChain;
    message.consensus_params =
      object.consensus_params !== undefined && object.consensus_params !== null
        ? ConsensusParams.fromPartial(object.consensus_params)
        : undefined;
    message.validators =
      object.validators?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.app_hash = object.app_hash ?? new Uint8Array();
    return message;
  },
};

const baseResponseQuery: object = {
  code: 0,
  log: "",
  info: "",
  index: 0,
  height: 0,
  codespace: "",
};

export const ResponseQuery = {
  encode(
    message: ResponseQuery,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.index !== 0) {
      writer.uint32(40).int64(message.index);
    }
    if (message.key.length !== 0) {
      writer.uint32(50).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(58).bytes(message.value);
    }
    if (message.proof_ops !== undefined) {
      ProofOps.encode(message.proof_ops, writer.uint32(66).fork()).ldelim();
    }
    if (message.height !== 0) {
      writer.uint32(72).int64(message.height);
    }
    if (message.codespace !== "") {
      writer.uint32(82).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseQuery {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseQuery } as ResponseQuery;
    message.key = new Uint8Array();
    message.value = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.uint32();
          break;
        case 3:
          message.log = reader.string();
          break;
        case 4:
          message.info = reader.string();
          break;
        case 5:
          message.index = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.key = reader.bytes();
          break;
        case 7:
          message.value = reader.bytes();
          break;
        case 8:
          message.proof_ops = ProofOps.decode(reader, reader.uint32());
          break;
        case 9:
          message.height = longToNumber(reader.int64() as Long);
          break;
        case 10:
          message.codespace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseQuery {
    const message = { ...baseResponseQuery } as ResponseQuery;
    message.code =
      object.code !== undefined && object.code !== null
        ? Number(object.code)
        : 0;
    message.log =
      object.log !== undefined && object.log !== null ? String(object.log) : "";
    message.info =
      object.info !== undefined && object.info !== null
        ? String(object.info)
        : "";
    message.index =
      object.index !== undefined && object.index !== null
        ? Number(object.index)
        : 0;
    message.key =
      object.key !== undefined && object.key !== null
        ? bytesFromBase64(object.key)
        : new Uint8Array();
    message.value =
      object.value !== undefined && object.value !== null
        ? bytesFromBase64(object.value)
        : new Uint8Array();
    message.proof_ops =
      object.proof_ops !== undefined && object.proof_ops !== null
        ? ProofOps.fromJSON(object.proof_ops)
        : undefined;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    message.codespace =
      object.codespace !== undefined && object.codespace !== null
        ? String(object.codespace)
        : "";
    return message;
  },

  toJSON(message: ResponseQuery): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.log !== undefined && (obj.log = message.log);
    message.info !== undefined && (obj.info = message.info);
    message.index !== undefined && (obj.index = Math.round(message.index));
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array()
      ));
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    message.proof_ops !== undefined &&
      (obj.proof_ops = message.proof_ops
        ? ProofOps.toJSON(message.proof_ops)
        : undefined);
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.codespace !== undefined && (obj.codespace = message.codespace);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseQuery>, I>>(
    object: I
  ): ResponseQuery {
    const message = { ...baseResponseQuery } as ResponseQuery;
    message.code = object.code ?? 0;
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.index = object.index ?? 0;
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    message.proof_ops =
      object.proof_ops !== undefined && object.proof_ops !== null
        ? ProofOps.fromPartial(object.proof_ops)
        : undefined;
    message.height = object.height ?? 0;
    message.codespace = object.codespace ?? "";
    return message;
  },
};

const baseResponseBeginBlock: object = {};

export const ResponseBeginBlock = {
  encode(
    message: ResponseBeginBlock,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseBeginBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseBeginBlock } as ResponseBeginBlock;
    message.events = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseBeginBlock {
    const message = { ...baseResponseBeginBlock } as ResponseBeginBlock;
    message.events = (object.events ?? []).map((e: any) => Event.fromJSON(e));
    return message;
  },

  toJSON(message: ResponseBeginBlock): unknown {
    const obj: any = {};
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseBeginBlock>, I>>(
    object: I
  ): ResponseBeginBlock {
    const message = { ...baseResponseBeginBlock } as ResponseBeginBlock;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
};

const baseResponseCheckTx: object = {
  code: 0,
  log: "",
  info: "",
  gas_wanted: 0,
  gas_used: 0,
  codespace: "",
};

export const ResponseCheckTx = {
  encode(
    message: ResponseCheckTx,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.gas_wanted !== 0) {
      writer.uint32(40).int64(message.gas_wanted);
    }
    if (message.gas_used !== 0) {
      writer.uint32(48).int64(message.gas_used);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.codespace !== "") {
      writer.uint32(66).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCheckTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseCheckTx } as ResponseCheckTx;
    message.events = [];
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.uint32();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.log = reader.string();
          break;
        case 4:
          message.info = reader.string();
          break;
        case 5:
          message.gas_wanted = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.gas_used = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        case 8:
          message.codespace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseCheckTx {
    const message = { ...baseResponseCheckTx } as ResponseCheckTx;
    message.code =
      object.code !== undefined && object.code !== null
        ? Number(object.code)
        : 0;
    message.data =
      object.data !== undefined && object.data !== null
        ? bytesFromBase64(object.data)
        : new Uint8Array();
    message.log =
      object.log !== undefined && object.log !== null ? String(object.log) : "";
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
    message.events = (object.events ?? []).map((e: any) => Event.fromJSON(e));
    message.codespace =
      object.codespace !== undefined && object.codespace !== null
        ? String(object.codespace)
        : "";
    return message;
  },

  toJSON(message: ResponseCheckTx): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.log !== undefined && (obj.log = message.log);
    message.info !== undefined && (obj.info = message.info);
    message.gas_wanted !== undefined &&
      (obj.gas_wanted = Math.round(message.gas_wanted));
    message.gas_used !== undefined &&
      (obj.gas_used = Math.round(message.gas_used));
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    message.codespace !== undefined && (obj.codespace = message.codespace);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseCheckTx>, I>>(
    object: I
  ): ResponseCheckTx {
    const message = { ...baseResponseCheckTx } as ResponseCheckTx;
    message.code = object.code ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.gas_wanted = object.gas_wanted ?? 0;
    message.gas_used = object.gas_used ?? 0;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.codespace = object.codespace ?? "";
    return message;
  },
};

const baseResponseDeliverTx: object = {
  code: 0,
  log: "",
  info: "",
  gas_wanted: 0,
  gas_used: 0,
  codespace: "",
};

export const ResponseDeliverTx = {
  encode(
    message: ResponseDeliverTx,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.code !== 0) {
      writer.uint32(8).uint32(message.code);
    }
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.log !== "") {
      writer.uint32(26).string(message.log);
    }
    if (message.info !== "") {
      writer.uint32(34).string(message.info);
    }
    if (message.gas_wanted !== 0) {
      writer.uint32(40).int64(message.gas_wanted);
    }
    if (message.gas_used !== 0) {
      writer.uint32(48).int64(message.gas_used);
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.codespace !== "") {
      writer.uint32(66).string(message.codespace);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseDeliverTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseDeliverTx } as ResponseDeliverTx;
    message.events = [];
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code = reader.uint32();
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.log = reader.string();
          break;
        case 4:
          message.info = reader.string();
          break;
        case 5:
          message.gas_wanted = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.gas_used = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        case 8:
          message.codespace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseDeliverTx {
    const message = { ...baseResponseDeliverTx } as ResponseDeliverTx;
    message.code =
      object.code !== undefined && object.code !== null
        ? Number(object.code)
        : 0;
    message.data =
      object.data !== undefined && object.data !== null
        ? bytesFromBase64(object.data)
        : new Uint8Array();
    message.log =
      object.log !== undefined && object.log !== null ? String(object.log) : "";
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
    message.events = (object.events ?? []).map((e: any) => Event.fromJSON(e));
    message.codespace =
      object.codespace !== undefined && object.codespace !== null
        ? String(object.codespace)
        : "";
    return message;
  },

  toJSON(message: ResponseDeliverTx): unknown {
    const obj: any = {};
    message.code !== undefined && (obj.code = Math.round(message.code));
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.log !== undefined && (obj.log = message.log);
    message.info !== undefined && (obj.info = message.info);
    message.gas_wanted !== undefined &&
      (obj.gas_wanted = Math.round(message.gas_wanted));
    message.gas_used !== undefined &&
      (obj.gas_used = Math.round(message.gas_used));
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    message.codespace !== undefined && (obj.codespace = message.codespace);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseDeliverTx>, I>>(
    object: I
  ): ResponseDeliverTx {
    const message = { ...baseResponseDeliverTx } as ResponseDeliverTx;
    message.code = object.code ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.log = object.log ?? "";
    message.info = object.info ?? "";
    message.gas_wanted = object.gas_wanted ?? 0;
    message.gas_used = object.gas_used ?? 0;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.codespace = object.codespace ?? "";
    return message;
  },
};

const baseResponseEndBlock: object = {};

export const ResponseEndBlock = {
  encode(
    message: ResponseEndBlock,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.validator_updates) {
      ValidatorUpdate.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.consensus_param_updates !== undefined) {
      ConsensusParams.encode(
        message.consensus_param_updates,
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseEndBlock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseEndBlock } as ResponseEndBlock;
    message.validator_updates = [];
    message.events = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator_updates.push(
            ValidatorUpdate.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.consensus_param_updates = ConsensusParams.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseEndBlock {
    const message = { ...baseResponseEndBlock } as ResponseEndBlock;
    message.validator_updates = (object.validator_updates ?? []).map((e: any) =>
      ValidatorUpdate.fromJSON(e)
    );
    message.consensus_param_updates =
      object.consensus_param_updates !== undefined &&
      object.consensus_param_updates !== null
        ? ConsensusParams.fromJSON(object.consensus_param_updates)
        : undefined;
    message.events = (object.events ?? []).map((e: any) => Event.fromJSON(e));
    return message;
  },

  toJSON(message: ResponseEndBlock): unknown {
    const obj: any = {};
    if (message.validator_updates) {
      obj.validator_updates = message.validator_updates.map((e) =>
        e ? ValidatorUpdate.toJSON(e) : undefined
      );
    } else {
      obj.validator_updates = [];
    }
    message.consensus_param_updates !== undefined &&
      (obj.consensus_param_updates = message.consensus_param_updates
        ? ConsensusParams.toJSON(message.consensus_param_updates)
        : undefined);
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseEndBlock>, I>>(
    object: I
  ): ResponseEndBlock {
    const message = { ...baseResponseEndBlock } as ResponseEndBlock;
    message.validator_updates =
      object.validator_updates?.map((e) => ValidatorUpdate.fromPartial(e)) ||
      [];
    message.consensus_param_updates =
      object.consensus_param_updates !== undefined &&
      object.consensus_param_updates !== null
        ? ConsensusParams.fromPartial(object.consensus_param_updates)
        : undefined;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    return message;
  },
};

const baseResponseCommit: object = { retain_height: 0 };

export const ResponseCommit = {
  encode(
    message: ResponseCommit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(18).bytes(message.data);
    }
    if (message.retain_height !== 0) {
      writer.uint32(24).int64(message.retain_height);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseCommit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseCommit } as ResponseCommit;
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.retain_height = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseCommit {
    const message = { ...baseResponseCommit } as ResponseCommit;
    message.data =
      object.data !== undefined && object.data !== null
        ? bytesFromBase64(object.data)
        : new Uint8Array();
    message.retain_height =
      object.retain_height !== undefined && object.retain_height !== null
        ? Number(object.retain_height)
        : 0;
    return message;
  },

  toJSON(message: ResponseCommit): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.retain_height !== undefined &&
      (obj.retain_height = Math.round(message.retain_height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseCommit>, I>>(
    object: I
  ): ResponseCommit {
    const message = { ...baseResponseCommit } as ResponseCommit;
    message.data = object.data ?? new Uint8Array();
    message.retain_height = object.retain_height ?? 0;
    return message;
  },
};

const baseResponseListSnapshots: object = {};

export const ResponseListSnapshots = {
  encode(
    message: ResponseListSnapshots,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.snapshots) {
      Snapshot.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ResponseListSnapshots {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseListSnapshots } as ResponseListSnapshots;
    message.snapshots = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.snapshots.push(Snapshot.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseListSnapshots {
    const message = { ...baseResponseListSnapshots } as ResponseListSnapshots;
    message.snapshots = (object.snapshots ?? []).map((e: any) =>
      Snapshot.fromJSON(e)
    );
    return message;
  },

  toJSON(message: ResponseListSnapshots): unknown {
    const obj: any = {};
    if (message.snapshots) {
      obj.snapshots = message.snapshots.map((e) =>
        e ? Snapshot.toJSON(e) : undefined
      );
    } else {
      obj.snapshots = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseListSnapshots>, I>>(
    object: I
  ): ResponseListSnapshots {
    const message = { ...baseResponseListSnapshots } as ResponseListSnapshots;
    message.snapshots =
      object.snapshots?.map((e) => Snapshot.fromPartial(e)) || [];
    return message;
  },
};

const baseResponseOfferSnapshot: object = { result: 0 };

export const ResponseOfferSnapshot = {
  encode(
    message: ResponseOfferSnapshot,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ResponseOfferSnapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseOfferSnapshot } as ResponseOfferSnapshot;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseOfferSnapshot {
    const message = { ...baseResponseOfferSnapshot } as ResponseOfferSnapshot;
    message.result =
      object.result !== undefined && object.result !== null
        ? responseOfferSnapshot_ResultFromJSON(object.result)
        : 0;
    return message;
  },

  toJSON(message: ResponseOfferSnapshot): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = responseOfferSnapshot_ResultToJSON(message.result));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseOfferSnapshot>, I>>(
    object: I
  ): ResponseOfferSnapshot {
    const message = { ...baseResponseOfferSnapshot } as ResponseOfferSnapshot;
    message.result = object.result ?? 0;
    return message;
  },
};

const baseResponseLoadSnapshotChunk: object = {};

export const ResponseLoadSnapshotChunk = {
  encode(
    message: ResponseLoadSnapshotChunk,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.chunk.length !== 0) {
      writer.uint32(10).bytes(message.chunk);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ResponseLoadSnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseResponseLoadSnapshotChunk,
    } as ResponseLoadSnapshotChunk;
    message.chunk = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chunk = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseLoadSnapshotChunk {
    const message = {
      ...baseResponseLoadSnapshotChunk,
    } as ResponseLoadSnapshotChunk;
    message.chunk =
      object.chunk !== undefined && object.chunk !== null
        ? bytesFromBase64(object.chunk)
        : new Uint8Array();
    return message;
  },

  toJSON(message: ResponseLoadSnapshotChunk): unknown {
    const obj: any = {};
    message.chunk !== undefined &&
      (obj.chunk = base64FromBytes(
        message.chunk !== undefined ? message.chunk : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseLoadSnapshotChunk>, I>>(
    object: I
  ): ResponseLoadSnapshotChunk {
    const message = {
      ...baseResponseLoadSnapshotChunk,
    } as ResponseLoadSnapshotChunk;
    message.chunk = object.chunk ?? new Uint8Array();
    return message;
  },
};

const baseResponseApplySnapshotChunk: object = {
  result: 0,
  refetch_chunks: 0,
  reject_senders: "",
};

export const ResponseApplySnapshotChunk = {
  encode(
    message: ResponseApplySnapshotChunk,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    writer.uint32(18).fork();
    for (const v of message.refetch_chunks) {
      writer.uint32(v);
    }
    writer.ldelim();
    for (const v of message.reject_senders) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ResponseApplySnapshotChunk {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseResponseApplySnapshotChunk,
    } as ResponseApplySnapshotChunk;
    message.refetch_chunks = [];
    message.reject_senders = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.result = reader.int32() as any;
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.refetch_chunks.push(reader.uint32());
            }
          } else {
            message.refetch_chunks.push(reader.uint32());
          }
          break;
        case 3:
          message.reject_senders.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ResponseApplySnapshotChunk {
    const message = {
      ...baseResponseApplySnapshotChunk,
    } as ResponseApplySnapshotChunk;
    message.result =
      object.result !== undefined && object.result !== null
        ? responseApplySnapshotChunk_ResultFromJSON(object.result)
        : 0;
    message.refetch_chunks = (object.refetch_chunks ?? []).map((e: any) =>
      Number(e)
    );
    message.reject_senders = (object.reject_senders ?? []).map((e: any) =>
      String(e)
    );
    return message;
  },

  toJSON(message: ResponseApplySnapshotChunk): unknown {
    const obj: any = {};
    message.result !== undefined &&
      (obj.result = responseApplySnapshotChunk_ResultToJSON(message.result));
    if (message.refetch_chunks) {
      obj.refetch_chunks = message.refetch_chunks.map((e) => Math.round(e));
    } else {
      obj.refetch_chunks = [];
    }
    if (message.reject_senders) {
      obj.reject_senders = message.reject_senders.map((e) => e);
    } else {
      obj.reject_senders = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ResponseApplySnapshotChunk>, I>>(
    object: I
  ): ResponseApplySnapshotChunk {
    const message = {
      ...baseResponseApplySnapshotChunk,
    } as ResponseApplySnapshotChunk;
    message.result = object.result ?? 0;
    message.refetch_chunks = object.refetch_chunks?.map((e) => e) || [];
    message.reject_senders = object.reject_senders?.map((e) => e) || [];
    return message;
  },
};

const baseConsensusParams: object = {};

export const ConsensusParams = {
  encode(
    message: ConsensusParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.block !== undefined) {
      BlockParams.encode(message.block, writer.uint32(10).fork()).ldelim();
    }
    if (message.evidence !== undefined) {
      EvidenceParams.encode(
        message.evidence,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.validator !== undefined) {
      ValidatorParams.encode(
        message.validator,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.version !== undefined) {
      VersionParams.encode(message.version, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConsensusParams } as ConsensusParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.block = BlockParams.decode(reader, reader.uint32());
          break;
        case 2:
          message.evidence = EvidenceParams.decode(reader, reader.uint32());
          break;
        case 3:
          message.validator = ValidatorParams.decode(reader, reader.uint32());
          break;
        case 4:
          message.version = VersionParams.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsensusParams {
    const message = { ...baseConsensusParams } as ConsensusParams;
    message.block =
      object.block !== undefined && object.block !== null
        ? BlockParams.fromJSON(object.block)
        : undefined;
    message.evidence =
      object.evidence !== undefined && object.evidence !== null
        ? EvidenceParams.fromJSON(object.evidence)
        : undefined;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? ValidatorParams.fromJSON(object.validator)
        : undefined;
    message.version =
      object.version !== undefined && object.version !== null
        ? VersionParams.fromJSON(object.version)
        : undefined;
    return message;
  },

  toJSON(message: ConsensusParams): unknown {
    const obj: any = {};
    message.block !== undefined &&
      (obj.block = message.block
        ? BlockParams.toJSON(message.block)
        : undefined);
    message.evidence !== undefined &&
      (obj.evidence = message.evidence
        ? EvidenceParams.toJSON(message.evidence)
        : undefined);
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? ValidatorParams.toJSON(message.validator)
        : undefined);
    message.version !== undefined &&
      (obj.version = message.version
        ? VersionParams.toJSON(message.version)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsensusParams>, I>>(
    object: I
  ): ConsensusParams {
    const message = { ...baseConsensusParams } as ConsensusParams;
    message.block =
      object.block !== undefined && object.block !== null
        ? BlockParams.fromPartial(object.block)
        : undefined;
    message.evidence =
      object.evidence !== undefined && object.evidence !== null
        ? EvidenceParams.fromPartial(object.evidence)
        : undefined;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? ValidatorParams.fromPartial(object.validator)
        : undefined;
    message.version =
      object.version !== undefined && object.version !== null
        ? VersionParams.fromPartial(object.version)
        : undefined;
    return message;
  },
};

const baseBlockParams: object = { max_bytes: 0, max_gas: 0 };

export const BlockParams = {
  encode(
    message: BlockParams,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.max_bytes !== 0) {
      writer.uint32(8).int64(message.max_bytes);
    }
    if (message.max_gas !== 0) {
      writer.uint32(16).int64(message.max_gas);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockParams {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBlockParams } as BlockParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.max_bytes = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.max_gas = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BlockParams {
    const message = { ...baseBlockParams } as BlockParams;
    message.max_bytes =
      object.max_bytes !== undefined && object.max_bytes !== null
        ? Number(object.max_bytes)
        : 0;
    message.max_gas =
      object.max_gas !== undefined && object.max_gas !== null
        ? Number(object.max_gas)
        : 0;
    return message;
  },

  toJSON(message: BlockParams): unknown {
    const obj: any = {};
    message.max_bytes !== undefined &&
      (obj.max_bytes = Math.round(message.max_bytes));
    message.max_gas !== undefined &&
      (obj.max_gas = Math.round(message.max_gas));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BlockParams>, I>>(
    object: I
  ): BlockParams {
    const message = { ...baseBlockParams } as BlockParams;
    message.max_bytes = object.max_bytes ?? 0;
    message.max_gas = object.max_gas ?? 0;
    return message;
  },
};

const baseLastCommitInfo: object = { round: 0 };

export const LastCommitInfo = {
  encode(
    message: LastCommitInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.round !== 0) {
      writer.uint32(8).int32(message.round);
    }
    for (const v of message.votes) {
      VoteInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LastCommitInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLastCommitInfo } as LastCommitInfo;
    message.votes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.round = reader.int32();
          break;
        case 2:
          message.votes.push(VoteInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LastCommitInfo {
    const message = { ...baseLastCommitInfo } as LastCommitInfo;
    message.round =
      object.round !== undefined && object.round !== null
        ? Number(object.round)
        : 0;
    message.votes = (object.votes ?? []).map((e: any) => VoteInfo.fromJSON(e));
    return message;
  },

  toJSON(message: LastCommitInfo): unknown {
    const obj: any = {};
    message.round !== undefined && (obj.round = Math.round(message.round));
    if (message.votes) {
      obj.votes = message.votes.map((e) =>
        e ? VoteInfo.toJSON(e) : undefined
      );
    } else {
      obj.votes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LastCommitInfo>, I>>(
    object: I
  ): LastCommitInfo {
    const message = { ...baseLastCommitInfo } as LastCommitInfo;
    message.round = object.round ?? 0;
    message.votes = object.votes?.map((e) => VoteInfo.fromPartial(e)) || [];
    return message;
  },
};

const baseEvent: object = { type: "" };

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    for (const v of message.attributes) {
      EventAttribute.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEvent } as Event;
    message.attributes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.string();
          break;
        case 2:
          message.attributes.push(
            EventAttribute.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event {
    const message = { ...baseEvent } as Event;
    message.type =
      object.type !== undefined && object.type !== null
        ? String(object.type)
        : "";
    message.attributes = (object.attributes ?? []).map((e: any) =>
      EventAttribute.fromJSON(e)
    );
    return message;
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    if (message.attributes) {
      obj.attributes = message.attributes.map((e) =>
        e ? EventAttribute.toJSON(e) : undefined
      );
    } else {
      obj.attributes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = { ...baseEvent } as Event;
    message.type = object.type ?? "";
    message.attributes =
      object.attributes?.map((e) => EventAttribute.fromPartial(e)) || [];
    return message;
  },
};

const baseEventAttribute: object = { index: false };

export const EventAttribute = {
  encode(
    message: EventAttribute,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    if (message.index === true) {
      writer.uint32(24).bool(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventAttribute {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEventAttribute } as EventAttribute;
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
          message.index = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventAttribute {
    const message = { ...baseEventAttribute } as EventAttribute;
    message.key =
      object.key !== undefined && object.key !== null
        ? bytesFromBase64(object.key)
        : new Uint8Array();
    message.value =
      object.value !== undefined && object.value !== null
        ? bytesFromBase64(object.value)
        : new Uint8Array();
    message.index =
      object.index !== undefined && object.index !== null
        ? Boolean(object.index)
        : false;
    return message;
  },

  toJSON(message: EventAttribute): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array()
      ));
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventAttribute>, I>>(
    object: I
  ): EventAttribute {
    const message = { ...baseEventAttribute } as EventAttribute;
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    message.index = object.index ?? false;
    return message;
  },
};

const baseTxResult: object = { height: 0, index: 0 };

export const TxResult = {
  encode(
    message: TxResult,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).int64(message.height);
    }
    if (message.index !== 0) {
      writer.uint32(16).uint32(message.index);
    }
    if (message.tx.length !== 0) {
      writer.uint32(26).bytes(message.tx);
    }
    if (message.result !== undefined) {
      ResponseDeliverTx.encode(
        message.result,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTxResult } as TxResult;
    message.tx = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.index = reader.uint32();
          break;
        case 3:
          message.tx = reader.bytes();
          break;
        case 4:
          message.result = ResponseDeliverTx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxResult {
    const message = { ...baseTxResult } as TxResult;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    message.index =
      object.index !== undefined && object.index !== null
        ? Number(object.index)
        : 0;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? bytesFromBase64(object.tx)
        : new Uint8Array();
    message.result =
      object.result !== undefined && object.result !== null
        ? ResponseDeliverTx.fromJSON(object.result)
        : undefined;
    return message;
  },

  toJSON(message: TxResult): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.index !== undefined && (obj.index = Math.round(message.index));
    message.tx !== undefined &&
      (obj.tx = base64FromBytes(
        message.tx !== undefined ? message.tx : new Uint8Array()
      ));
    message.result !== undefined &&
      (obj.result = message.result
        ? ResponseDeliverTx.toJSON(message.result)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TxResult>, I>>(object: I): TxResult {
    const message = { ...baseTxResult } as TxResult;
    message.height = object.height ?? 0;
    message.index = object.index ?? 0;
    message.tx = object.tx ?? new Uint8Array();
    message.result =
      object.result !== undefined && object.result !== null
        ? ResponseDeliverTx.fromPartial(object.result)
        : undefined;
    return message;
  },
};

const baseValidator: object = { power: 0 };

export const Validator = {
  encode(
    message: Validator,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    if (message.power !== 0) {
      writer.uint32(24).int64(message.power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Validator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValidator } as Validator;
    message.address = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        case 3:
          message.power = longToNumber(reader.int64() as Long);
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
        ? bytesFromBase64(object.address)
        : new Uint8Array();
    message.power =
      object.power !== undefined && object.power !== null
        ? Number(object.power)
        : 0;
    return message;
  },

  toJSON(message: Validator): unknown {
    const obj: any = {};
    message.address !== undefined &&
      (obj.address = base64FromBytes(
        message.address !== undefined ? message.address : new Uint8Array()
      ));
    message.power !== undefined && (obj.power = Math.round(message.power));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Validator>, I>>(
    object: I
  ): Validator {
    const message = { ...baseValidator } as Validator;
    message.address = object.address ?? new Uint8Array();
    message.power = object.power ?? 0;
    return message;
  },
};

const baseValidatorUpdate: object = { power: 0 };

export const ValidatorUpdate = {
  encode(
    message: ValidatorUpdate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pub_key !== undefined) {
      PublicKey.encode(message.pub_key, writer.uint32(10).fork()).ldelim();
    }
    if (message.power !== 0) {
      writer.uint32(16).int64(message.power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorUpdate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValidatorUpdate } as ValidatorUpdate;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pub_key = PublicKey.decode(reader, reader.uint32());
          break;
        case 2:
          message.power = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorUpdate {
    const message = { ...baseValidatorUpdate } as ValidatorUpdate;
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? PublicKey.fromJSON(object.pub_key)
        : undefined;
    message.power =
      object.power !== undefined && object.power !== null
        ? Number(object.power)
        : 0;
    return message;
  },

  toJSON(message: ValidatorUpdate): unknown {
    const obj: any = {};
    message.pub_key !== undefined &&
      (obj.pub_key = message.pub_key
        ? PublicKey.toJSON(message.pub_key)
        : undefined);
    message.power !== undefined && (obj.power = Math.round(message.power));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidatorUpdate>, I>>(
    object: I
  ): ValidatorUpdate {
    const message = { ...baseValidatorUpdate } as ValidatorUpdate;
    message.pub_key =
      object.pub_key !== undefined && object.pub_key !== null
        ? PublicKey.fromPartial(object.pub_key)
        : undefined;
    message.power = object.power ?? 0;
    return message;
  },
};

const baseVoteInfo: object = { signed_last_block: false };

export const VoteInfo = {
  encode(
    message: VoteInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    if (message.signed_last_block === true) {
      writer.uint32(16).bool(message.signed_last_block);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoteInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVoteInfo } as VoteInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = Validator.decode(reader, reader.uint32());
          break;
        case 2:
          message.signed_last_block = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoteInfo {
    const message = { ...baseVoteInfo } as VoteInfo;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromJSON(object.validator)
        : undefined;
    message.signed_last_block =
      object.signed_last_block !== undefined &&
      object.signed_last_block !== null
        ? Boolean(object.signed_last_block)
        : false;
    return message;
  },

  toJSON(message: VoteInfo): unknown {
    const obj: any = {};
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? Validator.toJSON(message.validator)
        : undefined);
    message.signed_last_block !== undefined &&
      (obj.signed_last_block = message.signed_last_block);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VoteInfo>, I>>(object: I): VoteInfo {
    const message = { ...baseVoteInfo } as VoteInfo;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromPartial(object.validator)
        : undefined;
    message.signed_last_block = object.signed_last_block ?? false;
    return message;
  },
};

const baseEvidence: object = { type: 0, height: 0, total_voting_power: 0 };

export const Evidence = {
  encode(
    message: Evidence,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(18).fork()).ldelim();
    }
    if (message.height !== 0) {
      writer.uint32(24).int64(message.height);
    }
    if (message.time !== undefined) {
      Timestamp.encode(
        toTimestamp(message.time),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.total_voting_power !== 0) {
      writer.uint32(40).int64(message.total_voting_power);
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
          message.type = reader.int32() as any;
          break;
        case 2:
          message.validator = Validator.decode(reader, reader.uint32());
          break;
        case 3:
          message.height = longToNumber(reader.int64() as Long);
          break;
        case 4:
          message.time = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.total_voting_power = longToNumber(reader.int64() as Long);
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
    message.type =
      object.type !== undefined && object.type !== null
        ? evidenceTypeFromJSON(object.type)
        : 0;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromJSON(object.validator)
        : undefined;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    message.time =
      object.time !== undefined && object.time !== null
        ? fromJsonTimestamp(object.time)
        : undefined;
    message.total_voting_power =
      object.total_voting_power !== undefined &&
      object.total_voting_power !== null
        ? Number(object.total_voting_power)
        : 0;
    return message;
  },

  toJSON(message: Evidence): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = evidenceTypeToJSON(message.type));
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? Validator.toJSON(message.validator)
        : undefined);
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.time !== undefined && (obj.time = message.time.toISOString());
    message.total_voting_power !== undefined &&
      (obj.total_voting_power = Math.round(message.total_voting_power));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Evidence>, I>>(object: I): Evidence {
    const message = { ...baseEvidence } as Evidence;
    message.type = object.type ?? 0;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromPartial(object.validator)
        : undefined;
    message.height = object.height ?? 0;
    message.time = object.time ?? undefined;
    message.total_voting_power = object.total_voting_power ?? 0;
    return message;
  },
};

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
    if (message.metadata.length !== 0) {
      writer.uint32(42).bytes(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Snapshot {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSnapshot } as Snapshot;
    message.hash = new Uint8Array();
    message.metadata = new Uint8Array();
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
          message.metadata = reader.bytes();
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
        ? bytesFromBase64(object.metadata)
        : new Uint8Array();
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
      (obj.metadata = base64FromBytes(
        message.metadata !== undefined ? message.metadata : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Snapshot>, I>>(object: I): Snapshot {
    const message = { ...baseSnapshot } as Snapshot;
    message.height = object.height ?? 0;
    message.format = object.format ?? 0;
    message.chunks = object.chunks ?? 0;
    message.hash = object.hash ?? new Uint8Array();
    message.metadata = object.metadata ?? new Uint8Array();
    return message;
  },
};

export interface ABCIApplication {
  Echo(request: RequestEcho): Promise<ResponseEcho>;
  Flush(request: RequestFlush): Promise<ResponseFlush>;
  Info(request: RequestInfo): Promise<ResponseInfo>;
  SetOption(request: RequestSetOption): Promise<ResponseSetOption>;
  DeliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx>;
  CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx>;
  Query(request: RequestQuery): Promise<ResponseQuery>;
  Commit(request: RequestCommit): Promise<ResponseCommit>;
  InitChain(request: RequestInitChain): Promise<ResponseInitChain>;
  BeginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock>;
  EndBlock(request: RequestEndBlock): Promise<ResponseEndBlock>;
  ListSnapshots(request: RequestListSnapshots): Promise<ResponseListSnapshots>;
  OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot>;
  LoadSnapshotChunk(
    request: RequestLoadSnapshotChunk
  ): Promise<ResponseLoadSnapshotChunk>;
  ApplySnapshotChunk(
    request: RequestApplySnapshotChunk
  ): Promise<ResponseApplySnapshotChunk>;
}

export class ABCIApplicationClientImpl implements ABCIApplication {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Echo = this.Echo.bind(this);
    this.Flush = this.Flush.bind(this);
    this.Info = this.Info.bind(this);
    this.SetOption = this.SetOption.bind(this);
    this.DeliverTx = this.DeliverTx.bind(this);
    this.CheckTx = this.CheckTx.bind(this);
    this.Query = this.Query.bind(this);
    this.Commit = this.Commit.bind(this);
    this.InitChain = this.InitChain.bind(this);
    this.BeginBlock = this.BeginBlock.bind(this);
    this.EndBlock = this.EndBlock.bind(this);
    this.ListSnapshots = this.ListSnapshots.bind(this);
    this.OfferSnapshot = this.OfferSnapshot.bind(this);
    this.LoadSnapshotChunk = this.LoadSnapshotChunk.bind(this);
    this.ApplySnapshotChunk = this.ApplySnapshotChunk.bind(this);
  }
  Echo(request: RequestEcho): Promise<ResponseEcho> {
    const data = RequestEcho.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "Echo",
      data
    );
    return promise.then((data) => ResponseEcho.decode(new _m0.Reader(data)));
  }

  Flush(request: RequestFlush): Promise<ResponseFlush> {
    const data = RequestFlush.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "Flush",
      data
    );
    return promise.then((data) => ResponseFlush.decode(new _m0.Reader(data)));
  }

  Info(request: RequestInfo): Promise<ResponseInfo> {
    const data = RequestInfo.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "Info",
      data
    );
    return promise.then((data) => ResponseInfo.decode(new _m0.Reader(data)));
  }

  SetOption(request: RequestSetOption): Promise<ResponseSetOption> {
    const data = RequestSetOption.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "SetOption",
      data
    );
    return promise.then((data) =>
      ResponseSetOption.decode(new _m0.Reader(data))
    );
  }

  DeliverTx(request: RequestDeliverTx): Promise<ResponseDeliverTx> {
    const data = RequestDeliverTx.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "DeliverTx",
      data
    );
    return promise.then((data) =>
      ResponseDeliverTx.decode(new _m0.Reader(data))
    );
  }

  CheckTx(request: RequestCheckTx): Promise<ResponseCheckTx> {
    const data = RequestCheckTx.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "CheckTx",
      data
    );
    return promise.then((data) => ResponseCheckTx.decode(new _m0.Reader(data)));
  }

  Query(request: RequestQuery): Promise<ResponseQuery> {
    const data = RequestQuery.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "Query",
      data
    );
    return promise.then((data) => ResponseQuery.decode(new _m0.Reader(data)));
  }

  Commit(request: RequestCommit): Promise<ResponseCommit> {
    const data = RequestCommit.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "Commit",
      data
    );
    return promise.then((data) => ResponseCommit.decode(new _m0.Reader(data)));
  }

  InitChain(request: RequestInitChain): Promise<ResponseInitChain> {
    const data = RequestInitChain.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "InitChain",
      data
    );
    return promise.then((data) =>
      ResponseInitChain.decode(new _m0.Reader(data))
    );
  }

  BeginBlock(request: RequestBeginBlock): Promise<ResponseBeginBlock> {
    const data = RequestBeginBlock.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "BeginBlock",
      data
    );
    return promise.then((data) =>
      ResponseBeginBlock.decode(new _m0.Reader(data))
    );
  }

  EndBlock(request: RequestEndBlock): Promise<ResponseEndBlock> {
    const data = RequestEndBlock.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "EndBlock",
      data
    );
    return promise.then((data) =>
      ResponseEndBlock.decode(new _m0.Reader(data))
    );
  }

  ListSnapshots(request: RequestListSnapshots): Promise<ResponseListSnapshots> {
    const data = RequestListSnapshots.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "ListSnapshots",
      data
    );
    return promise.then((data) =>
      ResponseListSnapshots.decode(new _m0.Reader(data))
    );
  }

  OfferSnapshot(request: RequestOfferSnapshot): Promise<ResponseOfferSnapshot> {
    const data = RequestOfferSnapshot.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "OfferSnapshot",
      data
    );
    return promise.then((data) =>
      ResponseOfferSnapshot.decode(new _m0.Reader(data))
    );
  }

  LoadSnapshotChunk(
    request: RequestLoadSnapshotChunk
  ): Promise<ResponseLoadSnapshotChunk> {
    const data = RequestLoadSnapshotChunk.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "LoadSnapshotChunk",
      data
    );
    return promise.then((data) =>
      ResponseLoadSnapshotChunk.decode(new _m0.Reader(data))
    );
  }

  ApplySnapshotChunk(
    request: RequestApplySnapshotChunk
  ): Promise<ResponseApplySnapshotChunk> {
    const data = RequestApplySnapshotChunk.encode(request).finish();
    const promise = this.rpc.request(
      "tendermint.abci.ABCIApplication",
      "ApplySnapshotChunk",
      data
    );
    return promise.then((data) =>
      ResponseApplySnapshotChunk.decode(new _m0.Reader(data))
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
