/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  SignMode,
  signModeFromJSON,
  signModeToJSON,
} from "../../../cosmos/tx/signing/v1beta1/signing";
import { Any } from "../../../google/protobuf/any";
import { CompactBitArray } from "../../../cosmos/crypto/multisig/v1beta1/multisig";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "cosmos.tx.v1beta1";

/** Tx is the standard type used for broadcasting transactions. */
export interface Tx {
  /** body is the processable content of the transaction */
  body: TxBody | undefined;
  /**
   * auth_info is the authorization related content of the transaction,
   * specifically signers, signer modes and fee
   */
  auth_info: AuthInfo | undefined;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}

/**
 * TxRaw is a variant of Tx that pins the signer's exact binary representation
 * of body and auth_info. This is used for signing, broadcasting and
 * verification. The binary `serialize(tx: TxRaw)` is stored in Tendermint and
 * the hash `sha256(serialize(tx: TxRaw))` becomes the "txhash", commonly used
 * as the transaction ID.
 */
export interface TxRaw {
  /**
   * body_bytes is a protobuf serialization of a TxBody that matches the
   * representation in SignDoc.
   */
  body_bytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in SignDoc.
   */
  auth_info_bytes: Uint8Array;
  /**
   * signatures is a list of signatures that matches the length and order of
   * AuthInfo's signer_infos to allow connecting signature meta information like
   * public key and signing mode by position.
   */
  signatures: Uint8Array[];
}

/** SignDoc is the type used for generating sign bytes for SIGN_MODE_DIRECT. */
export interface SignDoc {
  /**
   * body_bytes is protobuf serialization of a TxBody that matches the
   * representation in TxRaw.
   */
  body_bytes: Uint8Array;
  /**
   * auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
   * representation in TxRaw.
   */
  auth_info_bytes: Uint8Array;
  /**
   * chain_id is the unique identifier of the chain this transaction targets.
   * It prevents signed transactions from being used on another chain by an
   * attacker
   */
  chain_id: string;
  /** account_number is the account number of the account in state */
  account_number: number;
}

/**
 * SignDocDirectAux is the type used for generating sign bytes for
 * SIGN_MODE_DIRECT_AUX.
 *
 * Since: cosmos-sdk 0.46
 */
export interface SignDocDirectAux {
  /**
   * body_bytes is protobuf serialization of a TxBody that matches the
   * representation in TxRaw.
   */
  body_bytes: Uint8Array;
  /** public_key is the public key of the signing account. */
  public_key: Any | undefined;
  /**
   * chain_id is the identifier of the chain this transaction targets.
   * It prevents signed transactions from being used on another chain by an
   * attacker.
   */
  chain_id: string;
  /** account_number is the account number of the account in state. */
  account_number: number;
  /** sequence is the sequence number of the signing account. */
  sequence: number;
  /**
   * Tip is the optional tip used for meta-transactions. It should be left
   * empty if the signer is not the tipper for this transaction.
   */
  tip: Tip | undefined;
}

/** TxBody is the body of a transaction that all signers sign over. */
export interface TxBody {
  /**
   * messages is a list of messages to be executed. The required signers of
   * those messages define the number and order of elements in AuthInfo's
   * signer_infos and Tx's signatures. Each required signer address is added to
   * the list only the first time it occurs.
   * By convention, the first required signer (usually from the first message)
   * is referred to as the primary signer and pays the fee for the whole
   * transaction.
   */
  messages: Any[];
  /**
   * memo is any arbitrary note/comment to be added to the transaction.
   * WARNING: in clients, any publicly exposed text should not be called memo,
   * but should be called `note` instead (see https://github.com/cosmos/cosmos-sdk/issues/9122).
   */
  memo: string;
  /**
   * timeout is the block height after which this transaction will not
   * be processed by the chain
   */
  timeout_height: number;
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, the transaction will be rejected
   */
  extension_options: Any[];
  /**
   * extension_options are arbitrary options that can be added by chains
   * when the default options are not sufficient. If any of these are present
   * and can't be handled, they will be ignored
   */
  non_critical_extension_options: Any[];
}

/**
 * AuthInfo describes the fee and signer modes that are used to sign a
 * transaction.
 */
export interface AuthInfo {
  /**
   * signer_infos defines the signing modes for the required signers. The number
   * and order of elements must match the required signers from TxBody's
   * messages. The first element is the primary signer and the one which pays
   * the fee.
   */
  signer_infos: SignerInfo[];
  /**
   * Fee is the fee and gas limit for the transaction. The first signer is the
   * primary signer and the one which pays the fee. The fee can be calculated
   * based on the cost of evaluating the body and doing signature verification
   * of the signers. This can be estimated via simulation.
   */
  fee: Fee | undefined;
  /**
   * Tip is the optional tip used for meta-transactions.
   *
   * Since: cosmos-sdk 0.46
   */
  tip: Tip | undefined;
}

/**
 * SignerInfo describes the public key and signing mode of a single top-level
 * signer.
 */
export interface SignerInfo {
  /**
   * public_key is the public key of the signer. It is optional for accounts
   * that already exist in state. If unset, the verifier can use the required \
   * signer address for this position and lookup the public key.
   */
  public_key: Any | undefined;
  /**
   * mode_info describes the signing mode of the signer and is a nested
   * structure to support nested multisig pubkey's
   */
  mode_info: ModeInfo | undefined;
  /**
   * sequence is the sequence of the account, which describes the
   * number of committed transactions signed by a given address. It is used to
   * prevent replay attacks.
   */
  sequence: number;
}

/** ModeInfo describes the signing mode of a single or nested multisig signer. */
export interface ModeInfo {
  /** single represents a single signer */
  single: ModeInfo_Single | undefined;
  /** multi represents a nested multisig signer */
  multi: ModeInfo_Multi | undefined;
}

/**
 * Single is the mode info for a single signer. It is structured as a message
 * to allow for additional fields such as locale for SIGN_MODE_TEXTUAL in the
 * future
 */
export interface ModeInfo_Single {
  /** mode is the signing mode of the single signer */
  mode: SignMode;
}

/** Multi is the mode info for a multisig public key */
export interface ModeInfo_Multi {
  /** bitarray specifies which keys within the multisig are signing */
  bitarray: CompactBitArray | undefined;
  /**
   * mode_infos is the corresponding modes of the signers of the multisig
   * which could include nested multisig public keys
   */
  mode_infos: ModeInfo[];
}

/**
 * Fee includes the amount of coins paid in fees and the maximum
 * gas to be used by the transaction. The ratio yields an effective "gasprice",
 * which must be above some miminum to be accepted into the mempool.
 */
export interface Fee {
  /** amount is the amount of coins to be paid as a fee */
  amount: Coin[];
  /**
   * gas_limit is the maximum gas that can be used in transaction processing
   * before an out of gas error occurs
   */
  gas_limit: number;
  /**
   * if unset, the first signer is responsible for paying the fees. If set, the specified account must pay the fees.
   * the payer must be a tx signer (and thus have signed this field in AuthInfo).
   * setting this field does *not* change the ordering of required signers for the transaction.
   */
  payer: string;
  /**
   * if set, the fee payer (either the first signer or the value of the payer field) requests that a fee grant be used
   * to pay fees instead of the fee payer's own balance. If an appropriate fee grant does not exist or the chain does
   * not support fee grants, this will fail
   */
  granter: string;
}

/**
 * Tip is the tip used for meta-transactions.
 *
 * Since: cosmos-sdk 0.46
 */
export interface Tip {
  /** amount is the amount of the tip */
  amount: Coin[];
  /** tipper is the address of the account paying for the tip */
  tipper: string;
}

/**
 * AuxSignerData is the intermediary format that an auxiliary signer (e.g. a
 * tipper) builds and sends to the fee payer (who will build and broadcast the
 * actual tx). AuxSignerData is not a valid tx in itself, and will be rejected
 * by the node if sent directly as-is.
 *
 * Since: cosmos-sdk 0.46
 */
export interface AuxSignerData {
  /**
   * address is the bech32-encoded address of the auxiliary signer. If using
   * AuxSignerData across different chains, the bech32 prefix of the target
   * chain (where the final transaction is broadcasted) should be used.
   */
  address: string;
  /**
   * sign_doc is the SIGN_MOD_DIRECT_AUX sign doc that the auxiliary signer
   * signs. Note: we use the same sign doc even if we're signing with
   * LEGACY_AMINO_JSON.
   */
  sign_doc: SignDocDirectAux | undefined;
  /** mode is the signing mode of the single signer */
  mode: SignMode;
  /** sig is the signature of the sign doc. */
  sig: Uint8Array;
}

const baseTx: object = {};

export const Tx = {
  encode(message: Tx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.body !== undefined) {
      TxBody.encode(message.body, writer.uint32(10).fork()).ldelim();
    }
    if (message.auth_info !== undefined) {
      AuthInfo.encode(message.auth_info, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.signatures) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTx } as Tx;
    message.signatures = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.body = TxBody.decode(reader, reader.uint32());
          break;
        case 2:
          message.auth_info = AuthInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.signatures.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tx {
    const message = { ...baseTx } as Tx;
    message.body =
      object.body !== undefined && object.body !== null
        ? TxBody.fromJSON(object.body)
        : undefined;
    message.auth_info =
      object.auth_info !== undefined && object.auth_info !== null
        ? AuthInfo.fromJSON(object.auth_info)
        : undefined;
    message.signatures = (object.signatures ?? []).map((e: any) =>
      bytesFromBase64(e)
    );
    return message;
  },

  toJSON(message: Tx): unknown {
    const obj: any = {};
    message.body !== undefined &&
      (obj.body = message.body ? TxBody.toJSON(message.body) : undefined);
    message.auth_info !== undefined &&
      (obj.auth_info = message.auth_info
        ? AuthInfo.toJSON(message.auth_info)
        : undefined);
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array())
      );
    } else {
      obj.signatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tx>, I>>(object: I): Tx {
    const message = { ...baseTx } as Tx;
    message.body =
      object.body !== undefined && object.body !== null
        ? TxBody.fromPartial(object.body)
        : undefined;
    message.auth_info =
      object.auth_info !== undefined && object.auth_info !== null
        ? AuthInfo.fromPartial(object.auth_info)
        : undefined;
    message.signatures = object.signatures?.map((e) => e) || [];
    return message;
  },
};

const baseTxRaw: object = {};

export const TxRaw = {
  encode(message: TxRaw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.body_bytes.length !== 0) {
      writer.uint32(10).bytes(message.body_bytes);
    }
    if (message.auth_info_bytes.length !== 0) {
      writer.uint32(18).bytes(message.auth_info_bytes);
    }
    for (const v of message.signatures) {
      writer.uint32(26).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxRaw {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTxRaw } as TxRaw;
    message.signatures = [];
    message.body_bytes = new Uint8Array();
    message.auth_info_bytes = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.body_bytes = reader.bytes();
          break;
        case 2:
          message.auth_info_bytes = reader.bytes();
          break;
        case 3:
          message.signatures.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxRaw {
    const message = { ...baseTxRaw } as TxRaw;
    message.body_bytes =
      object.body_bytes !== undefined && object.body_bytes !== null
        ? bytesFromBase64(object.body_bytes)
        : new Uint8Array();
    message.auth_info_bytes =
      object.auth_info_bytes !== undefined && object.auth_info_bytes !== null
        ? bytesFromBase64(object.auth_info_bytes)
        : new Uint8Array();
    message.signatures = (object.signatures ?? []).map((e: any) =>
      bytesFromBase64(e)
    );
    return message;
  },

  toJSON(message: TxRaw): unknown {
    const obj: any = {};
    message.body_bytes !== undefined &&
      (obj.body_bytes = base64FromBytes(
        message.body_bytes !== undefined ? message.body_bytes : new Uint8Array()
      ));
    message.auth_info_bytes !== undefined &&
      (obj.auth_info_bytes = base64FromBytes(
        message.auth_info_bytes !== undefined
          ? message.auth_info_bytes
          : new Uint8Array()
      ));
    if (message.signatures) {
      obj.signatures = message.signatures.map((e) =>
        base64FromBytes(e !== undefined ? e : new Uint8Array())
      );
    } else {
      obj.signatures = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TxRaw>, I>>(object: I): TxRaw {
    const message = { ...baseTxRaw } as TxRaw;
    message.body_bytes = object.body_bytes ?? new Uint8Array();
    message.auth_info_bytes = object.auth_info_bytes ?? new Uint8Array();
    message.signatures = object.signatures?.map((e) => e) || [];
    return message;
  },
};

const baseSignDoc: object = { chain_id: "", account_number: 0 };

export const SignDoc = {
  encode(
    message: SignDoc,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.body_bytes.length !== 0) {
      writer.uint32(10).bytes(message.body_bytes);
    }
    if (message.auth_info_bytes.length !== 0) {
      writer.uint32(18).bytes(message.auth_info_bytes);
    }
    if (message.chain_id !== "") {
      writer.uint32(26).string(message.chain_id);
    }
    if (message.account_number !== 0) {
      writer.uint32(32).uint64(message.account_number);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignDoc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSignDoc } as SignDoc;
    message.body_bytes = new Uint8Array();
    message.auth_info_bytes = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.body_bytes = reader.bytes();
          break;
        case 2:
          message.auth_info_bytes = reader.bytes();
          break;
        case 3:
          message.chain_id = reader.string();
          break;
        case 4:
          message.account_number = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignDoc {
    const message = { ...baseSignDoc } as SignDoc;
    message.body_bytes =
      object.body_bytes !== undefined && object.body_bytes !== null
        ? bytesFromBase64(object.body_bytes)
        : new Uint8Array();
    message.auth_info_bytes =
      object.auth_info_bytes !== undefined && object.auth_info_bytes !== null
        ? bytesFromBase64(object.auth_info_bytes)
        : new Uint8Array();
    message.chain_id =
      object.chain_id !== undefined && object.chain_id !== null
        ? String(object.chain_id)
        : "";
    message.account_number =
      object.account_number !== undefined && object.account_number !== null
        ? Number(object.account_number)
        : 0;
    return message;
  },

  toJSON(message: SignDoc): unknown {
    const obj: any = {};
    message.body_bytes !== undefined &&
      (obj.body_bytes = base64FromBytes(
        message.body_bytes !== undefined ? message.body_bytes : new Uint8Array()
      ));
    message.auth_info_bytes !== undefined &&
      (obj.auth_info_bytes = base64FromBytes(
        message.auth_info_bytes !== undefined
          ? message.auth_info_bytes
          : new Uint8Array()
      ));
    message.chain_id !== undefined && (obj.chain_id = message.chain_id);
    message.account_number !== undefined &&
      (obj.account_number = Math.round(message.account_number));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignDoc>, I>>(object: I): SignDoc {
    const message = { ...baseSignDoc } as SignDoc;
    message.body_bytes = object.body_bytes ?? new Uint8Array();
    message.auth_info_bytes = object.auth_info_bytes ?? new Uint8Array();
    message.chain_id = object.chain_id ?? "";
    message.account_number = object.account_number ?? 0;
    return message;
  },
};

const baseSignDocDirectAux: object = {
  chain_id: "",
  account_number: 0,
  sequence: 0,
};

export const SignDocDirectAux = {
  encode(
    message: SignDocDirectAux,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.body_bytes.length !== 0) {
      writer.uint32(10).bytes(message.body_bytes);
    }
    if (message.public_key !== undefined) {
      Any.encode(message.public_key, writer.uint32(18).fork()).ldelim();
    }
    if (message.chain_id !== "") {
      writer.uint32(26).string(message.chain_id);
    }
    if (message.account_number !== 0) {
      writer.uint32(32).uint64(message.account_number);
    }
    if (message.sequence !== 0) {
      writer.uint32(40).uint64(message.sequence);
    }
    if (message.tip !== undefined) {
      Tip.encode(message.tip, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignDocDirectAux {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSignDocDirectAux } as SignDocDirectAux;
    message.body_bytes = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.body_bytes = reader.bytes();
          break;
        case 2:
          message.public_key = Any.decode(reader, reader.uint32());
          break;
        case 3:
          message.chain_id = reader.string();
          break;
        case 4:
          message.account_number = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.sequence = longToNumber(reader.uint64() as Long);
          break;
        case 6:
          message.tip = Tip.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignDocDirectAux {
    const message = { ...baseSignDocDirectAux } as SignDocDirectAux;
    message.body_bytes =
      object.body_bytes !== undefined && object.body_bytes !== null
        ? bytesFromBase64(object.body_bytes)
        : new Uint8Array();
    message.public_key =
      object.public_key !== undefined && object.public_key !== null
        ? Any.fromJSON(object.public_key)
        : undefined;
    message.chain_id =
      object.chain_id !== undefined && object.chain_id !== null
        ? String(object.chain_id)
        : "";
    message.account_number =
      object.account_number !== undefined && object.account_number !== null
        ? Number(object.account_number)
        : 0;
    message.sequence =
      object.sequence !== undefined && object.sequence !== null
        ? Number(object.sequence)
        : 0;
    message.tip =
      object.tip !== undefined && object.tip !== null
        ? Tip.fromJSON(object.tip)
        : undefined;
    return message;
  },

  toJSON(message: SignDocDirectAux): unknown {
    const obj: any = {};
    message.body_bytes !== undefined &&
      (obj.body_bytes = base64FromBytes(
        message.body_bytes !== undefined ? message.body_bytes : new Uint8Array()
      ));
    message.public_key !== undefined &&
      (obj.public_key = message.public_key
        ? Any.toJSON(message.public_key)
        : undefined);
    message.chain_id !== undefined && (obj.chain_id = message.chain_id);
    message.account_number !== undefined &&
      (obj.account_number = Math.round(message.account_number));
    message.sequence !== undefined &&
      (obj.sequence = Math.round(message.sequence));
    message.tip !== undefined &&
      (obj.tip = message.tip ? Tip.toJSON(message.tip) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignDocDirectAux>, I>>(
    object: I
  ): SignDocDirectAux {
    const message = { ...baseSignDocDirectAux } as SignDocDirectAux;
    message.body_bytes = object.body_bytes ?? new Uint8Array();
    message.public_key =
      object.public_key !== undefined && object.public_key !== null
        ? Any.fromPartial(object.public_key)
        : undefined;
    message.chain_id = object.chain_id ?? "";
    message.account_number = object.account_number ?? 0;
    message.sequence = object.sequence ?? 0;
    message.tip =
      object.tip !== undefined && object.tip !== null
        ? Tip.fromPartial(object.tip)
        : undefined;
    return message;
  },
};

const baseTxBody: object = { memo: "", timeout_height: 0 };

export const TxBody = {
  encode(
    message: TxBody,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.memo !== "") {
      writer.uint32(18).string(message.memo);
    }
    if (message.timeout_height !== 0) {
      writer.uint32(24).uint64(message.timeout_height);
    }
    for (const v of message.extension_options) {
      Any.encode(v!, writer.uint32(8186).fork()).ldelim();
    }
    for (const v of message.non_critical_extension_options) {
      Any.encode(v!, writer.uint32(16378).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxBody {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTxBody } as TxBody;
    message.messages = [];
    message.extension_options = [];
    message.non_critical_extension_options = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messages.push(Any.decode(reader, reader.uint32()));
          break;
        case 2:
          message.memo = reader.string();
          break;
        case 3:
          message.timeout_height = longToNumber(reader.uint64() as Long);
          break;
        case 1023:
          message.extension_options.push(Any.decode(reader, reader.uint32()));
          break;
        case 2047:
          message.non_critical_extension_options.push(
            Any.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxBody {
    const message = { ...baseTxBody } as TxBody;
    message.messages = (object.messages ?? []).map((e: any) => Any.fromJSON(e));
    message.memo =
      object.memo !== undefined && object.memo !== null
        ? String(object.memo)
        : "";
    message.timeout_height =
      object.timeout_height !== undefined && object.timeout_height !== null
        ? Number(object.timeout_height)
        : 0;
    message.extension_options = (object.extension_options ?? []).map((e: any) =>
      Any.fromJSON(e)
    );
    message.non_critical_extension_options = (
      object.non_critical_extension_options ?? []
    ).map((e: any) => Any.fromJSON(e));
    return message;
  },

  toJSON(message: TxBody): unknown {
    const obj: any = {};
    if (message.messages) {
      obj.messages = message.messages.map((e) =>
        e ? Any.toJSON(e) : undefined
      );
    } else {
      obj.messages = [];
    }
    message.memo !== undefined && (obj.memo = message.memo);
    message.timeout_height !== undefined &&
      (obj.timeout_height = Math.round(message.timeout_height));
    if (message.extension_options) {
      obj.extension_options = message.extension_options.map((e) =>
        e ? Any.toJSON(e) : undefined
      );
    } else {
      obj.extension_options = [];
    }
    if (message.non_critical_extension_options) {
      obj.non_critical_extension_options =
        message.non_critical_extension_options.map((e) =>
          e ? Any.toJSON(e) : undefined
        );
    } else {
      obj.non_critical_extension_options = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TxBody>, I>>(object: I): TxBody {
    const message = { ...baseTxBody } as TxBody;
    message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
    message.memo = object.memo ?? "";
    message.timeout_height = object.timeout_height ?? 0;
    message.extension_options =
      object.extension_options?.map((e) => Any.fromPartial(e)) || [];
    message.non_critical_extension_options =
      object.non_critical_extension_options?.map((e) => Any.fromPartial(e)) ||
      [];
    return message;
  },
};

const baseAuthInfo: object = {};

export const AuthInfo = {
  encode(
    message: AuthInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.signer_infos) {
      SignerInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.fee !== undefined) {
      Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
    }
    if (message.tip !== undefined) {
      Tip.encode(message.tip, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAuthInfo } as AuthInfo;
    message.signer_infos = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signer_infos.push(SignerInfo.decode(reader, reader.uint32()));
          break;
        case 2:
          message.fee = Fee.decode(reader, reader.uint32());
          break;
        case 3:
          message.tip = Tip.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthInfo {
    const message = { ...baseAuthInfo } as AuthInfo;
    message.signer_infos = (object.signer_infos ?? []).map((e: any) =>
      SignerInfo.fromJSON(e)
    );
    message.fee =
      object.fee !== undefined && object.fee !== null
        ? Fee.fromJSON(object.fee)
        : undefined;
    message.tip =
      object.tip !== undefined && object.tip !== null
        ? Tip.fromJSON(object.tip)
        : undefined;
    return message;
  },

  toJSON(message: AuthInfo): unknown {
    const obj: any = {};
    if (message.signer_infos) {
      obj.signer_infos = message.signer_infos.map((e) =>
        e ? SignerInfo.toJSON(e) : undefined
      );
    } else {
      obj.signer_infos = [];
    }
    message.fee !== undefined &&
      (obj.fee = message.fee ? Fee.toJSON(message.fee) : undefined);
    message.tip !== undefined &&
      (obj.tip = message.tip ? Tip.toJSON(message.tip) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthInfo>, I>>(object: I): AuthInfo {
    const message = { ...baseAuthInfo } as AuthInfo;
    message.signer_infos =
      object.signer_infos?.map((e) => SignerInfo.fromPartial(e)) || [];
    message.fee =
      object.fee !== undefined && object.fee !== null
        ? Fee.fromPartial(object.fee)
        : undefined;
    message.tip =
      object.tip !== undefined && object.tip !== null
        ? Tip.fromPartial(object.tip)
        : undefined;
    return message;
  },
};

const baseSignerInfo: object = { sequence: 0 };

export const SignerInfo = {
  encode(
    message: SignerInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.public_key !== undefined) {
      Any.encode(message.public_key, writer.uint32(10).fork()).ldelim();
    }
    if (message.mode_info !== undefined) {
      ModeInfo.encode(message.mode_info, writer.uint32(18).fork()).ldelim();
    }
    if (message.sequence !== 0) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignerInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSignerInfo } as SignerInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.public_key = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.mode_info = ModeInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.sequence = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SignerInfo {
    const message = { ...baseSignerInfo } as SignerInfo;
    message.public_key =
      object.public_key !== undefined && object.public_key !== null
        ? Any.fromJSON(object.public_key)
        : undefined;
    message.mode_info =
      object.mode_info !== undefined && object.mode_info !== null
        ? ModeInfo.fromJSON(object.mode_info)
        : undefined;
    message.sequence =
      object.sequence !== undefined && object.sequence !== null
        ? Number(object.sequence)
        : 0;
    return message;
  },

  toJSON(message: SignerInfo): unknown {
    const obj: any = {};
    message.public_key !== undefined &&
      (obj.public_key = message.public_key
        ? Any.toJSON(message.public_key)
        : undefined);
    message.mode_info !== undefined &&
      (obj.mode_info = message.mode_info
        ? ModeInfo.toJSON(message.mode_info)
        : undefined);
    message.sequence !== undefined &&
      (obj.sequence = Math.round(message.sequence));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignerInfo>, I>>(
    object: I
  ): SignerInfo {
    const message = { ...baseSignerInfo } as SignerInfo;
    message.public_key =
      object.public_key !== undefined && object.public_key !== null
        ? Any.fromPartial(object.public_key)
        : undefined;
    message.mode_info =
      object.mode_info !== undefined && object.mode_info !== null
        ? ModeInfo.fromPartial(object.mode_info)
        : undefined;
    message.sequence = object.sequence ?? 0;
    return message;
  },
};

const baseModeInfo: object = {};

export const ModeInfo = {
  encode(
    message: ModeInfo,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.single !== undefined) {
      ModeInfo_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
    }
    if (message.multi !== undefined) {
      ModeInfo_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseModeInfo } as ModeInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.single = ModeInfo_Single.decode(reader, reader.uint32());
          break;
        case 2:
          message.multi = ModeInfo_Multi.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModeInfo {
    const message = { ...baseModeInfo } as ModeInfo;
    message.single =
      object.single !== undefined && object.single !== null
        ? ModeInfo_Single.fromJSON(object.single)
        : undefined;
    message.multi =
      object.multi !== undefined && object.multi !== null
        ? ModeInfo_Multi.fromJSON(object.multi)
        : undefined;
    return message;
  },

  toJSON(message: ModeInfo): unknown {
    const obj: any = {};
    message.single !== undefined &&
      (obj.single = message.single
        ? ModeInfo_Single.toJSON(message.single)
        : undefined);
    message.multi !== undefined &&
      (obj.multi = message.multi
        ? ModeInfo_Multi.toJSON(message.multi)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModeInfo>, I>>(object: I): ModeInfo {
    const message = { ...baseModeInfo } as ModeInfo;
    message.single =
      object.single !== undefined && object.single !== null
        ? ModeInfo_Single.fromPartial(object.single)
        : undefined;
    message.multi =
      object.multi !== undefined && object.multi !== null
        ? ModeInfo_Multi.fromPartial(object.multi)
        : undefined;
    return message;
  },
};

const baseModeInfo_Single: object = { mode: 0 };

export const ModeInfo_Single = {
  encode(
    message: ModeInfo_Single,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo_Single {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseModeInfo_Single } as ModeInfo_Single;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mode = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModeInfo_Single {
    const message = { ...baseModeInfo_Single } as ModeInfo_Single;
    message.mode =
      object.mode !== undefined && object.mode !== null
        ? signModeFromJSON(object.mode)
        : 0;
    return message;
  },

  toJSON(message: ModeInfo_Single): unknown {
    const obj: any = {};
    message.mode !== undefined && (obj.mode = signModeToJSON(message.mode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModeInfo_Single>, I>>(
    object: I
  ): ModeInfo_Single {
    const message = { ...baseModeInfo_Single } as ModeInfo_Single;
    message.mode = object.mode ?? 0;
    return message;
  },
};

const baseModeInfo_Multi: object = {};

export const ModeInfo_Multi = {
  encode(
    message: ModeInfo_Multi,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bitarray !== undefined) {
      CompactBitArray.encode(
        message.bitarray,
        writer.uint32(10).fork()
      ).ldelim();
    }
    for (const v of message.mode_infos) {
      ModeInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModeInfo_Multi {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseModeInfo_Multi } as ModeInfo_Multi;
    message.mode_infos = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bitarray = CompactBitArray.decode(reader, reader.uint32());
          break;
        case 2:
          message.mode_infos.push(ModeInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModeInfo_Multi {
    const message = { ...baseModeInfo_Multi } as ModeInfo_Multi;
    message.bitarray =
      object.bitarray !== undefined && object.bitarray !== null
        ? CompactBitArray.fromJSON(object.bitarray)
        : undefined;
    message.mode_infos = (object.mode_infos ?? []).map((e: any) =>
      ModeInfo.fromJSON(e)
    );
    return message;
  },

  toJSON(message: ModeInfo_Multi): unknown {
    const obj: any = {};
    message.bitarray !== undefined &&
      (obj.bitarray = message.bitarray
        ? CompactBitArray.toJSON(message.bitarray)
        : undefined);
    if (message.mode_infos) {
      obj.mode_infos = message.mode_infos.map((e) =>
        e ? ModeInfo.toJSON(e) : undefined
      );
    } else {
      obj.mode_infos = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModeInfo_Multi>, I>>(
    object: I
  ): ModeInfo_Multi {
    const message = { ...baseModeInfo_Multi } as ModeInfo_Multi;
    message.bitarray =
      object.bitarray !== undefined && object.bitarray !== null
        ? CompactBitArray.fromPartial(object.bitarray)
        : undefined;
    message.mode_infos =
      object.mode_infos?.map((e) => ModeInfo.fromPartial(e)) || [];
    return message;
  },
};

const baseFee: object = { gas_limit: 0, payer: "", granter: "" };

export const Fee = {
  encode(message: Fee, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.gas_limit !== 0) {
      writer.uint32(16).uint64(message.gas_limit);
    }
    if (message.payer !== "") {
      writer.uint32(26).string(message.payer);
    }
    if (message.granter !== "") {
      writer.uint32(34).string(message.granter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fee {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFee } as Fee;
    message.amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.gas_limit = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.payer = reader.string();
          break;
        case 4:
          message.granter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Fee {
    const message = { ...baseFee } as Fee;
    message.amount = (object.amount ?? []).map((e: any) => Coin.fromJSON(e));
    message.gas_limit =
      object.gas_limit !== undefined && object.gas_limit !== null
        ? Number(object.gas_limit)
        : 0;
    message.payer =
      object.payer !== undefined && object.payer !== null
        ? String(object.payer)
        : "";
    message.granter =
      object.granter !== undefined && object.granter !== null
        ? String(object.granter)
        : "";
    return message;
  },

  toJSON(message: Fee): unknown {
    const obj: any = {};
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    message.gas_limit !== undefined &&
      (obj.gas_limit = Math.round(message.gas_limit));
    message.payer !== undefined && (obj.payer = message.payer);
    message.granter !== undefined && (obj.granter = message.granter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Fee>, I>>(object: I): Fee {
    const message = { ...baseFee } as Fee;
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.gas_limit = object.gas_limit ?? 0;
    message.payer = object.payer ?? "";
    message.granter = object.granter ?? "";
    return message;
  },
};

const baseTip: object = { tipper: "" };

export const Tip = {
  encode(message: Tip, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.tipper !== "") {
      writer.uint32(18).string(message.tipper);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Tip {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTip } as Tip;
    message.amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.tipper = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Tip {
    const message = { ...baseTip } as Tip;
    message.amount = (object.amount ?? []).map((e: any) => Coin.fromJSON(e));
    message.tipper =
      object.tipper !== undefined && object.tipper !== null
        ? String(object.tipper)
        : "";
    return message;
  },

  toJSON(message: Tip): unknown {
    const obj: any = {};
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    message.tipper !== undefined && (obj.tipper = message.tipper);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Tip>, I>>(object: I): Tip {
    const message = { ...baseTip } as Tip;
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    message.tipper = object.tipper ?? "";
    return message;
  },
};

const baseAuxSignerData: object = { address: "", mode: 0 };

export const AuxSignerData = {
  encode(
    message: AuxSignerData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.sign_doc !== undefined) {
      SignDocDirectAux.encode(
        message.sign_doc,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.mode !== 0) {
      writer.uint32(24).int32(message.mode);
    }
    if (message.sig.length !== 0) {
      writer.uint32(34).bytes(message.sig);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuxSignerData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAuxSignerData } as AuxSignerData;
    message.sig = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.sign_doc = SignDocDirectAux.decode(reader, reader.uint32());
          break;
        case 3:
          message.mode = reader.int32() as any;
          break;
        case 4:
          message.sig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuxSignerData {
    const message = { ...baseAuxSignerData } as AuxSignerData;
    message.address =
      object.address !== undefined && object.address !== null
        ? String(object.address)
        : "";
    message.sign_doc =
      object.sign_doc !== undefined && object.sign_doc !== null
        ? SignDocDirectAux.fromJSON(object.sign_doc)
        : undefined;
    message.mode =
      object.mode !== undefined && object.mode !== null
        ? signModeFromJSON(object.mode)
        : 0;
    message.sig =
      object.sig !== undefined && object.sig !== null
        ? bytesFromBase64(object.sig)
        : new Uint8Array();
    return message;
  },

  toJSON(message: AuxSignerData): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.sign_doc !== undefined &&
      (obj.sign_doc = message.sign_doc
        ? SignDocDirectAux.toJSON(message.sign_doc)
        : undefined);
    message.mode !== undefined && (obj.mode = signModeToJSON(message.mode));
    message.sig !== undefined &&
      (obj.sig = base64FromBytes(
        message.sig !== undefined ? message.sig : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuxSignerData>, I>>(
    object: I
  ): AuxSignerData {
    const message = { ...baseAuxSignerData } as AuxSignerData;
    message.address = object.address ?? "";
    message.sign_doc =
      object.sign_doc !== undefined && object.sign_doc !== null
        ? SignDocDirectAux.fromPartial(object.sign_doc)
        : undefined;
    message.mode = object.mode ?? 0;
    message.sig = object.sig ?? new Uint8Array();
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
