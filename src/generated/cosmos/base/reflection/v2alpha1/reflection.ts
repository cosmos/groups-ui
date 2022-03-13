/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.base.reflection.v2alpha1";

/** Since: cosmos-sdk 0.43 */

/** AppDescriptor describes a cosmos-sdk based application */
export interface AppDescriptor {
  /**
   * AuthnDescriptor provides information on how to authenticate transactions on the application
   * NOTE: experimental and subject to change in future releases.
   */
  authn: AuthnDescriptor | undefined;
  /** chain provides the chain descriptor */
  chain: ChainDescriptor | undefined;
  /** codec provides metadata information regarding codec related types */
  codec: CodecDescriptor | undefined;
  /** configuration provides metadata information regarding the sdk.Config type */
  configuration: ConfigurationDescriptor | undefined;
  /** query_services provides metadata information regarding the available queriable endpoints */
  query_services: QueryServicesDescriptor | undefined;
  /** tx provides metadata information regarding how to send transactions to the given application */
  tx: TxDescriptor | undefined;
}

/** TxDescriptor describes the accepted transaction type */
export interface TxDescriptor {
  /**
   * fullname is the protobuf fullname of the raw transaction type (for instance the tx.Tx type)
   * it is not meant to support polymorphism of transaction types, it is supposed to be used by
   * reflection clients to understand if they can handle a specific transaction type in an application.
   */
  fullname: string;
  /** msgs lists the accepted application messages (sdk.Msg) */
  msgs: MsgDescriptor[];
}

/**
 * AuthnDescriptor provides information on how to sign transactions without relying
 * on the online RPCs GetTxMetadata and CombineUnsignedTxAndSignatures
 */
export interface AuthnDescriptor {
  /** sign_modes defines the supported signature algorithm */
  sign_modes: SigningModeDescriptor[];
}

/**
 * SigningModeDescriptor provides information on a signing flow of the application
 * NOTE(fdymylja): here we could go as far as providing an entire flow on how
 * to sign a message given a SigningModeDescriptor, but it's better to think about
 * this another time
 */
export interface SigningModeDescriptor {
  /** name defines the unique name of the signing mode */
  name: string;
  /** number is the unique int32 identifier for the sign_mode enum */
  number: number;
  /**
   * authn_info_provider_method_fullname defines the fullname of the method to call to get
   * the metadata required to authenticate using the provided sign_modes
   */
  authn_info_provider_method_fullname: string;
}

/** ChainDescriptor describes chain information of the application */
export interface ChainDescriptor {
  /** id is the chain id */
  id: string;
}

/** CodecDescriptor describes the registered interfaces and provides metadata information on the types */
export interface CodecDescriptor {
  /** interfaces is a list of the registerted interfaces descriptors */
  interfaces: InterfaceDescriptor[];
}

/** InterfaceDescriptor describes the implementation of an interface */
export interface InterfaceDescriptor {
  /** fullname is the name of the interface */
  fullname: string;
  /**
   * interface_accepting_messages contains information regarding the proto messages which contain the interface as
   * google.protobuf.Any field
   */
  interface_accepting_messages: InterfaceAcceptingMessageDescriptor[];
  /** interface_implementers is a list of the descriptors of the interface implementers */
  interface_implementers: InterfaceImplementerDescriptor[];
}

/** InterfaceImplementerDescriptor describes an interface implementer */
export interface InterfaceImplementerDescriptor {
  /** fullname is the protobuf queryable name of the interface implementer */
  fullname: string;
  /**
   * type_url defines the type URL used when marshalling the type as any
   * this is required so we can provide type safe google.protobuf.Any marshalling and
   * unmarshalling, making sure that we don't accept just 'any' type
   * in our interface fields
   */
  type_url: string;
}

/**
 * InterfaceAcceptingMessageDescriptor describes a protobuf message which contains
 * an interface represented as a google.protobuf.Any
 */
export interface InterfaceAcceptingMessageDescriptor {
  /** fullname is the protobuf fullname of the type containing the interface */
  fullname: string;
  /**
   * field_descriptor_names is a list of the protobuf name (not fullname) of the field
   * which contains the interface as google.protobuf.Any (the interface is the same, but
   * it can be in multiple fields of the same proto message)
   */
  field_descriptor_names: string[];
}

/** ConfigurationDescriptor contains metadata information on the sdk.Config */
export interface ConfigurationDescriptor {
  /** bech32_account_address_prefix is the account address prefix */
  bech32_account_address_prefix: string;
}

/** MsgDescriptor describes a cosmos-sdk message that can be delivered with a transaction */
export interface MsgDescriptor {
  /** msg_type_url contains the TypeURL of a sdk.Msg. */
  msg_type_url: string;
}

/** GetAuthnDescriptorRequest is the request used for the GetAuthnDescriptor RPC */
export interface GetAuthnDescriptorRequest {}

/** GetAuthnDescriptorResponse is the response returned by the GetAuthnDescriptor RPC */
export interface GetAuthnDescriptorResponse {
  /** authn describes how to authenticate to the application when sending transactions */
  authn: AuthnDescriptor | undefined;
}

/** GetChainDescriptorRequest is the request used for the GetChainDescriptor RPC */
export interface GetChainDescriptorRequest {}

/** GetChainDescriptorResponse is the response returned by the GetChainDescriptor RPC */
export interface GetChainDescriptorResponse {
  /** chain describes application chain information */
  chain: ChainDescriptor | undefined;
}

/** GetCodecDescriptorRequest is the request used for the GetCodecDescriptor RPC */
export interface GetCodecDescriptorRequest {}

/** GetCodecDescriptorResponse is the response returned by the GetCodecDescriptor RPC */
export interface GetCodecDescriptorResponse {
  /** codec describes the application codec such as registered interfaces and implementations */
  codec: CodecDescriptor | undefined;
}

/** GetConfigurationDescriptorRequest is the request used for the GetConfigurationDescriptor RPC */
export interface GetConfigurationDescriptorRequest {}

/** GetConfigurationDescriptorResponse is the response returned by the GetConfigurationDescriptor RPC */
export interface GetConfigurationDescriptorResponse {
  /** config describes the application's sdk.Config */
  config: ConfigurationDescriptor | undefined;
}

/** GetQueryServicesDescriptorRequest is the request used for the GetQueryServicesDescriptor RPC */
export interface GetQueryServicesDescriptorRequest {}

/** GetQueryServicesDescriptorResponse is the response returned by the GetQueryServicesDescriptor RPC */
export interface GetQueryServicesDescriptorResponse {
  /** queries provides information on the available queryable services */
  queries: QueryServicesDescriptor | undefined;
}

/** GetTxDescriptorRequest is the request used for the GetTxDescriptor RPC */
export interface GetTxDescriptorRequest {}

/** GetTxDescriptorResponse is the response returned by the GetTxDescriptor RPC */
export interface GetTxDescriptorResponse {
  /**
   * tx provides information on msgs that can be forwarded to the application
   * alongside the accepted transaction protobuf type
   */
  tx: TxDescriptor | undefined;
}

/** QueryServicesDescriptor contains the list of cosmos-sdk queriable services */
export interface QueryServicesDescriptor {
  /** query_services is a list of cosmos-sdk QueryServiceDescriptor */
  query_services: QueryServiceDescriptor[];
}

/** QueryServiceDescriptor describes a cosmos-sdk queryable service */
export interface QueryServiceDescriptor {
  /** fullname is the protobuf fullname of the service descriptor */
  fullname: string;
  /** is_module describes if this service is actually exposed by an application's module */
  is_module: boolean;
  /** methods provides a list of query service methods */
  methods: QueryMethodDescriptor[];
}

/**
 * QueryMethodDescriptor describes a queryable method of a query service
 * no other info is provided beside method name and tendermint queryable path
 * because it would be redundant with the grpc reflection service
 */
export interface QueryMethodDescriptor {
  /** name is the protobuf name (not fullname) of the method */
  name: string;
  /**
   * full_query_path is the path that can be used to query
   * this method via tendermint abci.Query
   */
  full_query_path: string;
}

const baseAppDescriptor: object = {};

export const AppDescriptor = {
  encode(
    message: AppDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.authn !== undefined) {
      AuthnDescriptor.encode(message.authn, writer.uint32(10).fork()).ldelim();
    }
    if (message.chain !== undefined) {
      ChainDescriptor.encode(message.chain, writer.uint32(18).fork()).ldelim();
    }
    if (message.codec !== undefined) {
      CodecDescriptor.encode(message.codec, writer.uint32(26).fork()).ldelim();
    }
    if (message.configuration !== undefined) {
      ConfigurationDescriptor.encode(
        message.configuration,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.query_services !== undefined) {
      QueryServicesDescriptor.encode(
        message.query_services,
        writer.uint32(42).fork()
      ).ldelim();
    }
    if (message.tx !== undefined) {
      TxDescriptor.encode(message.tx, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AppDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAppDescriptor } as AppDescriptor;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authn = AuthnDescriptor.decode(reader, reader.uint32());
          break;
        case 2:
          message.chain = ChainDescriptor.decode(reader, reader.uint32());
          break;
        case 3:
          message.codec = CodecDescriptor.decode(reader, reader.uint32());
          break;
        case 4:
          message.configuration = ConfigurationDescriptor.decode(
            reader,
            reader.uint32()
          );
          break;
        case 5:
          message.query_services = QueryServicesDescriptor.decode(
            reader,
            reader.uint32()
          );
          break;
        case 6:
          message.tx = TxDescriptor.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AppDescriptor {
    const message = { ...baseAppDescriptor } as AppDescriptor;
    message.authn =
      object.authn !== undefined && object.authn !== null
        ? AuthnDescriptor.fromJSON(object.authn)
        : undefined;
    message.chain =
      object.chain !== undefined && object.chain !== null
        ? ChainDescriptor.fromJSON(object.chain)
        : undefined;
    message.codec =
      object.codec !== undefined && object.codec !== null
        ? CodecDescriptor.fromJSON(object.codec)
        : undefined;
    message.configuration =
      object.configuration !== undefined && object.configuration !== null
        ? ConfigurationDescriptor.fromJSON(object.configuration)
        : undefined;
    message.query_services =
      object.query_services !== undefined && object.query_services !== null
        ? QueryServicesDescriptor.fromJSON(object.query_services)
        : undefined;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? TxDescriptor.fromJSON(object.tx)
        : undefined;
    return message;
  },

  toJSON(message: AppDescriptor): unknown {
    const obj: any = {};
    message.authn !== undefined &&
      (obj.authn = message.authn
        ? AuthnDescriptor.toJSON(message.authn)
        : undefined);
    message.chain !== undefined &&
      (obj.chain = message.chain
        ? ChainDescriptor.toJSON(message.chain)
        : undefined);
    message.codec !== undefined &&
      (obj.codec = message.codec
        ? CodecDescriptor.toJSON(message.codec)
        : undefined);
    message.configuration !== undefined &&
      (obj.configuration = message.configuration
        ? ConfigurationDescriptor.toJSON(message.configuration)
        : undefined);
    message.query_services !== undefined &&
      (obj.query_services = message.query_services
        ? QueryServicesDescriptor.toJSON(message.query_services)
        : undefined);
    message.tx !== undefined &&
      (obj.tx = message.tx ? TxDescriptor.toJSON(message.tx) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AppDescriptor>, I>>(
    object: I
  ): AppDescriptor {
    const message = { ...baseAppDescriptor } as AppDescriptor;
    message.authn =
      object.authn !== undefined && object.authn !== null
        ? AuthnDescriptor.fromPartial(object.authn)
        : undefined;
    message.chain =
      object.chain !== undefined && object.chain !== null
        ? ChainDescriptor.fromPartial(object.chain)
        : undefined;
    message.codec =
      object.codec !== undefined && object.codec !== null
        ? CodecDescriptor.fromPartial(object.codec)
        : undefined;
    message.configuration =
      object.configuration !== undefined && object.configuration !== null
        ? ConfigurationDescriptor.fromPartial(object.configuration)
        : undefined;
    message.query_services =
      object.query_services !== undefined && object.query_services !== null
        ? QueryServicesDescriptor.fromPartial(object.query_services)
        : undefined;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? TxDescriptor.fromPartial(object.tx)
        : undefined;
    return message;
  },
};

const baseTxDescriptor: object = { fullname: "" };

export const TxDescriptor = {
  encode(
    message: TxDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fullname !== "") {
      writer.uint32(10).string(message.fullname);
    }
    for (const v of message.msgs) {
      MsgDescriptor.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TxDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTxDescriptor } as TxDescriptor;
    message.msgs = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fullname = reader.string();
          break;
        case 2:
          message.msgs.push(MsgDescriptor.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TxDescriptor {
    const message = { ...baseTxDescriptor } as TxDescriptor;
    message.fullname =
      object.fullname !== undefined && object.fullname !== null
        ? String(object.fullname)
        : "";
    message.msgs = (object.msgs ?? []).map((e: any) =>
      MsgDescriptor.fromJSON(e)
    );
    return message;
  },

  toJSON(message: TxDescriptor): unknown {
    const obj: any = {};
    message.fullname !== undefined && (obj.fullname = message.fullname);
    if (message.msgs) {
      obj.msgs = message.msgs.map((e) =>
        e ? MsgDescriptor.toJSON(e) : undefined
      );
    } else {
      obj.msgs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TxDescriptor>, I>>(
    object: I
  ): TxDescriptor {
    const message = { ...baseTxDescriptor } as TxDescriptor;
    message.fullname = object.fullname ?? "";
    message.msgs = object.msgs?.map((e) => MsgDescriptor.fromPartial(e)) || [];
    return message;
  },
};

const baseAuthnDescriptor: object = {};

export const AuthnDescriptor = {
  encode(
    message: AuthnDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.sign_modes) {
      SigningModeDescriptor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AuthnDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAuthnDescriptor } as AuthnDescriptor;
    message.sign_modes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sign_modes.push(
            SigningModeDescriptor.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AuthnDescriptor {
    const message = { ...baseAuthnDescriptor } as AuthnDescriptor;
    message.sign_modes = (object.sign_modes ?? []).map((e: any) =>
      SigningModeDescriptor.fromJSON(e)
    );
    return message;
  },

  toJSON(message: AuthnDescriptor): unknown {
    const obj: any = {};
    if (message.sign_modes) {
      obj.sign_modes = message.sign_modes.map((e) =>
        e ? SigningModeDescriptor.toJSON(e) : undefined
      );
    } else {
      obj.sign_modes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AuthnDescriptor>, I>>(
    object: I
  ): AuthnDescriptor {
    const message = { ...baseAuthnDescriptor } as AuthnDescriptor;
    message.sign_modes =
      object.sign_modes?.map((e) => SigningModeDescriptor.fromPartial(e)) || [];
    return message;
  },
};

const baseSigningModeDescriptor: object = {
  name: "",
  number: 0,
  authn_info_provider_method_fullname: "",
};

export const SigningModeDescriptor = {
  encode(
    message: SigningModeDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.number !== 0) {
      writer.uint32(16).int32(message.number);
    }
    if (message.authn_info_provider_method_fullname !== "") {
      writer.uint32(26).string(message.authn_info_provider_method_fullname);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): SigningModeDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSigningModeDescriptor } as SigningModeDescriptor;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.number = reader.int32();
          break;
        case 3:
          message.authn_info_provider_method_fullname = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SigningModeDescriptor {
    const message = { ...baseSigningModeDescriptor } as SigningModeDescriptor;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.number =
      object.number !== undefined && object.number !== null
        ? Number(object.number)
        : 0;
    message.authn_info_provider_method_fullname =
      object.authn_info_provider_method_fullname !== undefined &&
      object.authn_info_provider_method_fullname !== null
        ? String(object.authn_info_provider_method_fullname)
        : "";
    return message;
  },

  toJSON(message: SigningModeDescriptor): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.number !== undefined && (obj.number = Math.round(message.number));
    message.authn_info_provider_method_fullname !== undefined &&
      (obj.authn_info_provider_method_fullname =
        message.authn_info_provider_method_fullname);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SigningModeDescriptor>, I>>(
    object: I
  ): SigningModeDescriptor {
    const message = { ...baseSigningModeDescriptor } as SigningModeDescriptor;
    message.name = object.name ?? "";
    message.number = object.number ?? 0;
    message.authn_info_provider_method_fullname =
      object.authn_info_provider_method_fullname ?? "";
    return message;
  },
};

const baseChainDescriptor: object = { id: "" };

export const ChainDescriptor = {
  encode(
    message: ChainDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChainDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChainDescriptor } as ChainDescriptor;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChainDescriptor {
    const message = { ...baseChainDescriptor } as ChainDescriptor;
    message.id =
      object.id !== undefined && object.id !== null ? String(object.id) : "";
    return message;
  },

  toJSON(message: ChainDescriptor): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChainDescriptor>, I>>(
    object: I
  ): ChainDescriptor {
    const message = { ...baseChainDescriptor } as ChainDescriptor;
    message.id = object.id ?? "";
    return message;
  },
};

const baseCodecDescriptor: object = {};

export const CodecDescriptor = {
  encode(
    message: CodecDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.interfaces) {
      InterfaceDescriptor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CodecDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCodecDescriptor } as CodecDescriptor;
    message.interfaces = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.interfaces.push(
            InterfaceDescriptor.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CodecDescriptor {
    const message = { ...baseCodecDescriptor } as CodecDescriptor;
    message.interfaces = (object.interfaces ?? []).map((e: any) =>
      InterfaceDescriptor.fromJSON(e)
    );
    return message;
  },

  toJSON(message: CodecDescriptor): unknown {
    const obj: any = {};
    if (message.interfaces) {
      obj.interfaces = message.interfaces.map((e) =>
        e ? InterfaceDescriptor.toJSON(e) : undefined
      );
    } else {
      obj.interfaces = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CodecDescriptor>, I>>(
    object: I
  ): CodecDescriptor {
    const message = { ...baseCodecDescriptor } as CodecDescriptor;
    message.interfaces =
      object.interfaces?.map((e) => InterfaceDescriptor.fromPartial(e)) || [];
    return message;
  },
};

const baseInterfaceDescriptor: object = { fullname: "" };

export const InterfaceDescriptor = {
  encode(
    message: InterfaceDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fullname !== "") {
      writer.uint32(10).string(message.fullname);
    }
    for (const v of message.interface_accepting_messages) {
      InterfaceAcceptingMessageDescriptor.encode(
        v!,
        writer.uint32(18).fork()
      ).ldelim();
    }
    for (const v of message.interface_implementers) {
      InterfaceImplementerDescriptor.encode(
        v!,
        writer.uint32(26).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InterfaceDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseInterfaceDescriptor } as InterfaceDescriptor;
    message.interface_accepting_messages = [];
    message.interface_implementers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fullname = reader.string();
          break;
        case 2:
          message.interface_accepting_messages.push(
            InterfaceAcceptingMessageDescriptor.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.interface_implementers.push(
            InterfaceImplementerDescriptor.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InterfaceDescriptor {
    const message = { ...baseInterfaceDescriptor } as InterfaceDescriptor;
    message.fullname =
      object.fullname !== undefined && object.fullname !== null
        ? String(object.fullname)
        : "";
    message.interface_accepting_messages = (
      object.interface_accepting_messages ?? []
    ).map((e: any) => InterfaceAcceptingMessageDescriptor.fromJSON(e));
    message.interface_implementers = (object.interface_implementers ?? []).map(
      (e: any) => InterfaceImplementerDescriptor.fromJSON(e)
    );
    return message;
  },

  toJSON(message: InterfaceDescriptor): unknown {
    const obj: any = {};
    message.fullname !== undefined && (obj.fullname = message.fullname);
    if (message.interface_accepting_messages) {
      obj.interface_accepting_messages =
        message.interface_accepting_messages.map((e) =>
          e ? InterfaceAcceptingMessageDescriptor.toJSON(e) : undefined
        );
    } else {
      obj.interface_accepting_messages = [];
    }
    if (message.interface_implementers) {
      obj.interface_implementers = message.interface_implementers.map((e) =>
        e ? InterfaceImplementerDescriptor.toJSON(e) : undefined
      );
    } else {
      obj.interface_implementers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InterfaceDescriptor>, I>>(
    object: I
  ): InterfaceDescriptor {
    const message = { ...baseInterfaceDescriptor } as InterfaceDescriptor;
    message.fullname = object.fullname ?? "";
    message.interface_accepting_messages =
      object.interface_accepting_messages?.map((e) =>
        InterfaceAcceptingMessageDescriptor.fromPartial(e)
      ) || [];
    message.interface_implementers =
      object.interface_implementers?.map((e) =>
        InterfaceImplementerDescriptor.fromPartial(e)
      ) || [];
    return message;
  },
};

const baseInterfaceImplementerDescriptor: object = {
  fullname: "",
  type_url: "",
};

export const InterfaceImplementerDescriptor = {
  encode(
    message: InterfaceImplementerDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fullname !== "") {
      writer.uint32(10).string(message.fullname);
    }
    if (message.type_url !== "") {
      writer.uint32(18).string(message.type_url);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): InterfaceImplementerDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseInterfaceImplementerDescriptor,
    } as InterfaceImplementerDescriptor;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fullname = reader.string();
          break;
        case 2:
          message.type_url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InterfaceImplementerDescriptor {
    const message = {
      ...baseInterfaceImplementerDescriptor,
    } as InterfaceImplementerDescriptor;
    message.fullname =
      object.fullname !== undefined && object.fullname !== null
        ? String(object.fullname)
        : "";
    message.type_url =
      object.type_url !== undefined && object.type_url !== null
        ? String(object.type_url)
        : "";
    return message;
  },

  toJSON(message: InterfaceImplementerDescriptor): unknown {
    const obj: any = {};
    message.fullname !== undefined && (obj.fullname = message.fullname);
    message.type_url !== undefined && (obj.type_url = message.type_url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InterfaceImplementerDescriptor>, I>>(
    object: I
  ): InterfaceImplementerDescriptor {
    const message = {
      ...baseInterfaceImplementerDescriptor,
    } as InterfaceImplementerDescriptor;
    message.fullname = object.fullname ?? "";
    message.type_url = object.type_url ?? "";
    return message;
  },
};

const baseInterfaceAcceptingMessageDescriptor: object = {
  fullname: "",
  field_descriptor_names: "",
};

export const InterfaceAcceptingMessageDescriptor = {
  encode(
    message: InterfaceAcceptingMessageDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fullname !== "") {
      writer.uint32(10).string(message.fullname);
    }
    for (const v of message.field_descriptor_names) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): InterfaceAcceptingMessageDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseInterfaceAcceptingMessageDescriptor,
    } as InterfaceAcceptingMessageDescriptor;
    message.field_descriptor_names = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fullname = reader.string();
          break;
        case 2:
          message.field_descriptor_names.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InterfaceAcceptingMessageDescriptor {
    const message = {
      ...baseInterfaceAcceptingMessageDescriptor,
    } as InterfaceAcceptingMessageDescriptor;
    message.fullname =
      object.fullname !== undefined && object.fullname !== null
        ? String(object.fullname)
        : "";
    message.field_descriptor_names = (object.field_descriptor_names ?? []).map(
      (e: any) => String(e)
    );
    return message;
  },

  toJSON(message: InterfaceAcceptingMessageDescriptor): unknown {
    const obj: any = {};
    message.fullname !== undefined && (obj.fullname = message.fullname);
    if (message.field_descriptor_names) {
      obj.field_descriptor_names = message.field_descriptor_names.map((e) => e);
    } else {
      obj.field_descriptor_names = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<InterfaceAcceptingMessageDescriptor>, I>
  >(object: I): InterfaceAcceptingMessageDescriptor {
    const message = {
      ...baseInterfaceAcceptingMessageDescriptor,
    } as InterfaceAcceptingMessageDescriptor;
    message.fullname = object.fullname ?? "";
    message.field_descriptor_names =
      object.field_descriptor_names?.map((e) => e) || [];
    return message;
  },
};

const baseConfigurationDescriptor: object = {
  bech32_account_address_prefix: "",
};

export const ConfigurationDescriptor = {
  encode(
    message: ConfigurationDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.bech32_account_address_prefix !== "") {
      writer.uint32(10).string(message.bech32_account_address_prefix);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ConfigurationDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseConfigurationDescriptor,
    } as ConfigurationDescriptor;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bech32_account_address_prefix = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConfigurationDescriptor {
    const message = {
      ...baseConfigurationDescriptor,
    } as ConfigurationDescriptor;
    message.bech32_account_address_prefix =
      object.bech32_account_address_prefix !== undefined &&
      object.bech32_account_address_prefix !== null
        ? String(object.bech32_account_address_prefix)
        : "";
    return message;
  },

  toJSON(message: ConfigurationDescriptor): unknown {
    const obj: any = {};
    message.bech32_account_address_prefix !== undefined &&
      (obj.bech32_account_address_prefix =
        message.bech32_account_address_prefix);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConfigurationDescriptor>, I>>(
    object: I
  ): ConfigurationDescriptor {
    const message = {
      ...baseConfigurationDescriptor,
    } as ConfigurationDescriptor;
    message.bech32_account_address_prefix =
      object.bech32_account_address_prefix ?? "";
    return message;
  },
};

const baseMsgDescriptor: object = { msg_type_url: "" };

export const MsgDescriptor = {
  encode(
    message: MsgDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.msg_type_url !== "") {
      writer.uint32(10).string(message.msg_type_url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDescriptor } as MsgDescriptor;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msg_type_url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDescriptor {
    const message = { ...baseMsgDescriptor } as MsgDescriptor;
    message.msg_type_url =
      object.msg_type_url !== undefined && object.msg_type_url !== null
        ? String(object.msg_type_url)
        : "";
    return message;
  },

  toJSON(message: MsgDescriptor): unknown {
    const obj: any = {};
    message.msg_type_url !== undefined &&
      (obj.msg_type_url = message.msg_type_url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDescriptor>, I>>(
    object: I
  ): MsgDescriptor {
    const message = { ...baseMsgDescriptor } as MsgDescriptor;
    message.msg_type_url = object.msg_type_url ?? "";
    return message;
  },
};

const baseGetAuthnDescriptorRequest: object = {};

export const GetAuthnDescriptorRequest = {
  encode(
    _: GetAuthnDescriptorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAuthnDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetAuthnDescriptorRequest,
    } as GetAuthnDescriptorRequest;
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

  fromJSON(_: any): GetAuthnDescriptorRequest {
    const message = {
      ...baseGetAuthnDescriptorRequest,
    } as GetAuthnDescriptorRequest;
    return message;
  },

  toJSON(_: GetAuthnDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAuthnDescriptorRequest>, I>>(
    _: I
  ): GetAuthnDescriptorRequest {
    const message = {
      ...baseGetAuthnDescriptorRequest,
    } as GetAuthnDescriptorRequest;
    return message;
  },
};

const baseGetAuthnDescriptorResponse: object = {};

export const GetAuthnDescriptorResponse = {
  encode(
    message: GetAuthnDescriptorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.authn !== undefined) {
      AuthnDescriptor.encode(message.authn, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetAuthnDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetAuthnDescriptorResponse,
    } as GetAuthnDescriptorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authn = AuthnDescriptor.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetAuthnDescriptorResponse {
    const message = {
      ...baseGetAuthnDescriptorResponse,
    } as GetAuthnDescriptorResponse;
    message.authn =
      object.authn !== undefined && object.authn !== null
        ? AuthnDescriptor.fromJSON(object.authn)
        : undefined;
    return message;
  },

  toJSON(message: GetAuthnDescriptorResponse): unknown {
    const obj: any = {};
    message.authn !== undefined &&
      (obj.authn = message.authn
        ? AuthnDescriptor.toJSON(message.authn)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetAuthnDescriptorResponse>, I>>(
    object: I
  ): GetAuthnDescriptorResponse {
    const message = {
      ...baseGetAuthnDescriptorResponse,
    } as GetAuthnDescriptorResponse;
    message.authn =
      object.authn !== undefined && object.authn !== null
        ? AuthnDescriptor.fromPartial(object.authn)
        : undefined;
    return message;
  },
};

const baseGetChainDescriptorRequest: object = {};

export const GetChainDescriptorRequest = {
  encode(
    _: GetChainDescriptorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetChainDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetChainDescriptorRequest,
    } as GetChainDescriptorRequest;
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

  fromJSON(_: any): GetChainDescriptorRequest {
    const message = {
      ...baseGetChainDescriptorRequest,
    } as GetChainDescriptorRequest;
    return message;
  },

  toJSON(_: GetChainDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetChainDescriptorRequest>, I>>(
    _: I
  ): GetChainDescriptorRequest {
    const message = {
      ...baseGetChainDescriptorRequest,
    } as GetChainDescriptorRequest;
    return message;
  },
};

const baseGetChainDescriptorResponse: object = {};

export const GetChainDescriptorResponse = {
  encode(
    message: GetChainDescriptorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.chain !== undefined) {
      ChainDescriptor.encode(message.chain, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetChainDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetChainDescriptorResponse,
    } as GetChainDescriptorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chain = ChainDescriptor.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetChainDescriptorResponse {
    const message = {
      ...baseGetChainDescriptorResponse,
    } as GetChainDescriptorResponse;
    message.chain =
      object.chain !== undefined && object.chain !== null
        ? ChainDescriptor.fromJSON(object.chain)
        : undefined;
    return message;
  },

  toJSON(message: GetChainDescriptorResponse): unknown {
    const obj: any = {};
    message.chain !== undefined &&
      (obj.chain = message.chain
        ? ChainDescriptor.toJSON(message.chain)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetChainDescriptorResponse>, I>>(
    object: I
  ): GetChainDescriptorResponse {
    const message = {
      ...baseGetChainDescriptorResponse,
    } as GetChainDescriptorResponse;
    message.chain =
      object.chain !== undefined && object.chain !== null
        ? ChainDescriptor.fromPartial(object.chain)
        : undefined;
    return message;
  },
};

const baseGetCodecDescriptorRequest: object = {};

export const GetCodecDescriptorRequest = {
  encode(
    _: GetCodecDescriptorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetCodecDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetCodecDescriptorRequest,
    } as GetCodecDescriptorRequest;
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

  fromJSON(_: any): GetCodecDescriptorRequest {
    const message = {
      ...baseGetCodecDescriptorRequest,
    } as GetCodecDescriptorRequest;
    return message;
  },

  toJSON(_: GetCodecDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCodecDescriptorRequest>, I>>(
    _: I
  ): GetCodecDescriptorRequest {
    const message = {
      ...baseGetCodecDescriptorRequest,
    } as GetCodecDescriptorRequest;
    return message;
  },
};

const baseGetCodecDescriptorResponse: object = {};

export const GetCodecDescriptorResponse = {
  encode(
    message: GetCodecDescriptorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.codec !== undefined) {
      CodecDescriptor.encode(message.codec, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetCodecDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetCodecDescriptorResponse,
    } as GetCodecDescriptorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codec = CodecDescriptor.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCodecDescriptorResponse {
    const message = {
      ...baseGetCodecDescriptorResponse,
    } as GetCodecDescriptorResponse;
    message.codec =
      object.codec !== undefined && object.codec !== null
        ? CodecDescriptor.fromJSON(object.codec)
        : undefined;
    return message;
  },

  toJSON(message: GetCodecDescriptorResponse): unknown {
    const obj: any = {};
    message.codec !== undefined &&
      (obj.codec = message.codec
        ? CodecDescriptor.toJSON(message.codec)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCodecDescriptorResponse>, I>>(
    object: I
  ): GetCodecDescriptorResponse {
    const message = {
      ...baseGetCodecDescriptorResponse,
    } as GetCodecDescriptorResponse;
    message.codec =
      object.codec !== undefined && object.codec !== null
        ? CodecDescriptor.fromPartial(object.codec)
        : undefined;
    return message;
  },
};

const baseGetConfigurationDescriptorRequest: object = {};

export const GetConfigurationDescriptorRequest = {
  encode(
    _: GetConfigurationDescriptorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetConfigurationDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetConfigurationDescriptorRequest,
    } as GetConfigurationDescriptorRequest;
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

  fromJSON(_: any): GetConfigurationDescriptorRequest {
    const message = {
      ...baseGetConfigurationDescriptorRequest,
    } as GetConfigurationDescriptorRequest;
    return message;
  },

  toJSON(_: GetConfigurationDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetConfigurationDescriptorRequest>, I>
  >(_: I): GetConfigurationDescriptorRequest {
    const message = {
      ...baseGetConfigurationDescriptorRequest,
    } as GetConfigurationDescriptorRequest;
    return message;
  },
};

const baseGetConfigurationDescriptorResponse: object = {};

export const GetConfigurationDescriptorResponse = {
  encode(
    message: GetConfigurationDescriptorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.config !== undefined) {
      ConfigurationDescriptor.encode(
        message.config,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetConfigurationDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetConfigurationDescriptorResponse,
    } as GetConfigurationDescriptorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.config = ConfigurationDescriptor.decode(
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

  fromJSON(object: any): GetConfigurationDescriptorResponse {
    const message = {
      ...baseGetConfigurationDescriptorResponse,
    } as GetConfigurationDescriptorResponse;
    message.config =
      object.config !== undefined && object.config !== null
        ? ConfigurationDescriptor.fromJSON(object.config)
        : undefined;
    return message;
  },

  toJSON(message: GetConfigurationDescriptorResponse): unknown {
    const obj: any = {};
    message.config !== undefined &&
      (obj.config = message.config
        ? ConfigurationDescriptor.toJSON(message.config)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetConfigurationDescriptorResponse>, I>
  >(object: I): GetConfigurationDescriptorResponse {
    const message = {
      ...baseGetConfigurationDescriptorResponse,
    } as GetConfigurationDescriptorResponse;
    message.config =
      object.config !== undefined && object.config !== null
        ? ConfigurationDescriptor.fromPartial(object.config)
        : undefined;
    return message;
  },
};

const baseGetQueryServicesDescriptorRequest: object = {};

export const GetQueryServicesDescriptorRequest = {
  encode(
    _: GetQueryServicesDescriptorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetQueryServicesDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetQueryServicesDescriptorRequest,
    } as GetQueryServicesDescriptorRequest;
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

  fromJSON(_: any): GetQueryServicesDescriptorRequest {
    const message = {
      ...baseGetQueryServicesDescriptorRequest,
    } as GetQueryServicesDescriptorRequest;
    return message;
  },

  toJSON(_: GetQueryServicesDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetQueryServicesDescriptorRequest>, I>
  >(_: I): GetQueryServicesDescriptorRequest {
    const message = {
      ...baseGetQueryServicesDescriptorRequest,
    } as GetQueryServicesDescriptorRequest;
    return message;
  },
};

const baseGetQueryServicesDescriptorResponse: object = {};

export const GetQueryServicesDescriptorResponse = {
  encode(
    message: GetQueryServicesDescriptorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.queries !== undefined) {
      QueryServicesDescriptor.encode(
        message.queries,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetQueryServicesDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetQueryServicesDescriptorResponse,
    } as GetQueryServicesDescriptorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.queries = QueryServicesDescriptor.decode(
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

  fromJSON(object: any): GetQueryServicesDescriptorResponse {
    const message = {
      ...baseGetQueryServicesDescriptorResponse,
    } as GetQueryServicesDescriptorResponse;
    message.queries =
      object.queries !== undefined && object.queries !== null
        ? QueryServicesDescriptor.fromJSON(object.queries)
        : undefined;
    return message;
  },

  toJSON(message: GetQueryServicesDescriptorResponse): unknown {
    const obj: any = {};
    message.queries !== undefined &&
      (obj.queries = message.queries
        ? QueryServicesDescriptor.toJSON(message.queries)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<GetQueryServicesDescriptorResponse>, I>
  >(object: I): GetQueryServicesDescriptorResponse {
    const message = {
      ...baseGetQueryServicesDescriptorResponse,
    } as GetQueryServicesDescriptorResponse;
    message.queries =
      object.queries !== undefined && object.queries !== null
        ? QueryServicesDescriptor.fromPartial(object.queries)
        : undefined;
    return message;
  },
};

const baseGetTxDescriptorRequest: object = {};

export const GetTxDescriptorRequest = {
  encode(
    _: GetTxDescriptorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetTxDescriptorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGetTxDescriptorRequest } as GetTxDescriptorRequest;
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

  fromJSON(_: any): GetTxDescriptorRequest {
    const message = { ...baseGetTxDescriptorRequest } as GetTxDescriptorRequest;
    return message;
  },

  toJSON(_: GetTxDescriptorRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTxDescriptorRequest>, I>>(
    _: I
  ): GetTxDescriptorRequest {
    const message = { ...baseGetTxDescriptorRequest } as GetTxDescriptorRequest;
    return message;
  },
};

const baseGetTxDescriptorResponse: object = {};

export const GetTxDescriptorResponse = {
  encode(
    message: GetTxDescriptorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.tx !== undefined) {
      TxDescriptor.encode(message.tx, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetTxDescriptorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGetTxDescriptorResponse,
    } as GetTxDescriptorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tx = TxDescriptor.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTxDescriptorResponse {
    const message = {
      ...baseGetTxDescriptorResponse,
    } as GetTxDescriptorResponse;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? TxDescriptor.fromJSON(object.tx)
        : undefined;
    return message;
  },

  toJSON(message: GetTxDescriptorResponse): unknown {
    const obj: any = {};
    message.tx !== undefined &&
      (obj.tx = message.tx ? TxDescriptor.toJSON(message.tx) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTxDescriptorResponse>, I>>(
    object: I
  ): GetTxDescriptorResponse {
    const message = {
      ...baseGetTxDescriptorResponse,
    } as GetTxDescriptorResponse;
    message.tx =
      object.tx !== undefined && object.tx !== null
        ? TxDescriptor.fromPartial(object.tx)
        : undefined;
    return message;
  },
};

const baseQueryServicesDescriptor: object = {};

export const QueryServicesDescriptor = {
  encode(
    message: QueryServicesDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.query_services) {
      QueryServiceDescriptor.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryServicesDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryServicesDescriptor,
    } as QueryServicesDescriptor;
    message.query_services = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.query_services.push(
            QueryServiceDescriptor.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryServicesDescriptor {
    const message = {
      ...baseQueryServicesDescriptor,
    } as QueryServicesDescriptor;
    message.query_services = (object.query_services ?? []).map((e: any) =>
      QueryServiceDescriptor.fromJSON(e)
    );
    return message;
  },

  toJSON(message: QueryServicesDescriptor): unknown {
    const obj: any = {};
    if (message.query_services) {
      obj.query_services = message.query_services.map((e) =>
        e ? QueryServiceDescriptor.toJSON(e) : undefined
      );
    } else {
      obj.query_services = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryServicesDescriptor>, I>>(
    object: I
  ): QueryServicesDescriptor {
    const message = {
      ...baseQueryServicesDescriptor,
    } as QueryServicesDescriptor;
    message.query_services =
      object.query_services?.map((e) =>
        QueryServiceDescriptor.fromPartial(e)
      ) || [];
    return message;
  },
};

const baseQueryServiceDescriptor: object = { fullname: "", is_module: false };

export const QueryServiceDescriptor = {
  encode(
    message: QueryServiceDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.fullname !== "") {
      writer.uint32(10).string(message.fullname);
    }
    if (message.is_module === true) {
      writer.uint32(16).bool(message.is_module);
    }
    for (const v of message.methods) {
      QueryMethodDescriptor.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryServiceDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryServiceDescriptor } as QueryServiceDescriptor;
    message.methods = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fullname = reader.string();
          break;
        case 2:
          message.is_module = reader.bool();
          break;
        case 3:
          message.methods.push(
            QueryMethodDescriptor.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryServiceDescriptor {
    const message = { ...baseQueryServiceDescriptor } as QueryServiceDescriptor;
    message.fullname =
      object.fullname !== undefined && object.fullname !== null
        ? String(object.fullname)
        : "";
    message.is_module =
      object.is_module !== undefined && object.is_module !== null
        ? Boolean(object.is_module)
        : false;
    message.methods = (object.methods ?? []).map((e: any) =>
      QueryMethodDescriptor.fromJSON(e)
    );
    return message;
  },

  toJSON(message: QueryServiceDescriptor): unknown {
    const obj: any = {};
    message.fullname !== undefined && (obj.fullname = message.fullname);
    message.is_module !== undefined && (obj.is_module = message.is_module);
    if (message.methods) {
      obj.methods = message.methods.map((e) =>
        e ? QueryMethodDescriptor.toJSON(e) : undefined
      );
    } else {
      obj.methods = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryServiceDescriptor>, I>>(
    object: I
  ): QueryServiceDescriptor {
    const message = { ...baseQueryServiceDescriptor } as QueryServiceDescriptor;
    message.fullname = object.fullname ?? "";
    message.is_module = object.is_module ?? false;
    message.methods =
      object.methods?.map((e) => QueryMethodDescriptor.fromPartial(e)) || [];
    return message;
  },
};

const baseQueryMethodDescriptor: object = { name: "", full_query_path: "" };

export const QueryMethodDescriptor = {
  encode(
    message: QueryMethodDescriptor,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.full_query_path !== "") {
      writer.uint32(18).string(message.full_query_path);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryMethodDescriptor {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryMethodDescriptor } as QueryMethodDescriptor;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.full_query_path = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryMethodDescriptor {
    const message = { ...baseQueryMethodDescriptor } as QueryMethodDescriptor;
    message.name =
      object.name !== undefined && object.name !== null
        ? String(object.name)
        : "";
    message.full_query_path =
      object.full_query_path !== undefined && object.full_query_path !== null
        ? String(object.full_query_path)
        : "";
    return message;
  },

  toJSON(message: QueryMethodDescriptor): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.full_query_path !== undefined &&
      (obj.full_query_path = message.full_query_path);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryMethodDescriptor>, I>>(
    object: I
  ): QueryMethodDescriptor {
    const message = { ...baseQueryMethodDescriptor } as QueryMethodDescriptor;
    message.name = object.name ?? "";
    message.full_query_path = object.full_query_path ?? "";
    return message;
  },
};

/** ReflectionService defines a service for application reflection. */
export interface ReflectionService {
  /**
   * GetAuthnDescriptor returns information on how to authenticate transactions in the application
   * NOTE: this RPC is still experimental and might be subject to breaking changes or removal in
   * future releases of the cosmos-sdk.
   */
  GetAuthnDescriptor(
    request: GetAuthnDescriptorRequest
  ): Promise<GetAuthnDescriptorResponse>;
  /** GetChainDescriptor returns the description of the chain */
  GetChainDescriptor(
    request: GetChainDescriptorRequest
  ): Promise<GetChainDescriptorResponse>;
  /** GetCodecDescriptor returns the descriptor of the codec of the application */
  GetCodecDescriptor(
    request: GetCodecDescriptorRequest
  ): Promise<GetCodecDescriptorResponse>;
  /** GetConfigurationDescriptor returns the descriptor for the sdk.Config of the application */
  GetConfigurationDescriptor(
    request: GetConfigurationDescriptorRequest
  ): Promise<GetConfigurationDescriptorResponse>;
  /** GetQueryServicesDescriptor returns the available gRPC queryable services of the application */
  GetQueryServicesDescriptor(
    request: GetQueryServicesDescriptorRequest
  ): Promise<GetQueryServicesDescriptorResponse>;
  /** GetTxDescriptor returns information on the used transaction object and available msgs that can be used */
  GetTxDescriptor(
    request: GetTxDescriptorRequest
  ): Promise<GetTxDescriptorResponse>;
}

export class ReflectionServiceClientImpl implements ReflectionService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetAuthnDescriptor = this.GetAuthnDescriptor.bind(this);
    this.GetChainDescriptor = this.GetChainDescriptor.bind(this);
    this.GetCodecDescriptor = this.GetCodecDescriptor.bind(this);
    this.GetConfigurationDescriptor =
      this.GetConfigurationDescriptor.bind(this);
    this.GetQueryServicesDescriptor =
      this.GetQueryServicesDescriptor.bind(this);
    this.GetTxDescriptor = this.GetTxDescriptor.bind(this);
  }
  GetAuthnDescriptor(
    request: GetAuthnDescriptorRequest
  ): Promise<GetAuthnDescriptorResponse> {
    const data = GetAuthnDescriptorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.reflection.v2alpha1.ReflectionService",
      "GetAuthnDescriptor",
      data
    );
    return promise.then((data) =>
      GetAuthnDescriptorResponse.decode(new _m0.Reader(data))
    );
  }

  GetChainDescriptor(
    request: GetChainDescriptorRequest
  ): Promise<GetChainDescriptorResponse> {
    const data = GetChainDescriptorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.reflection.v2alpha1.ReflectionService",
      "GetChainDescriptor",
      data
    );
    return promise.then((data) =>
      GetChainDescriptorResponse.decode(new _m0.Reader(data))
    );
  }

  GetCodecDescriptor(
    request: GetCodecDescriptorRequest
  ): Promise<GetCodecDescriptorResponse> {
    const data = GetCodecDescriptorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.reflection.v2alpha1.ReflectionService",
      "GetCodecDescriptor",
      data
    );
    return promise.then((data) =>
      GetCodecDescriptorResponse.decode(new _m0.Reader(data))
    );
  }

  GetConfigurationDescriptor(
    request: GetConfigurationDescriptorRequest
  ): Promise<GetConfigurationDescriptorResponse> {
    const data = GetConfigurationDescriptorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.reflection.v2alpha1.ReflectionService",
      "GetConfigurationDescriptor",
      data
    );
    return promise.then((data) =>
      GetConfigurationDescriptorResponse.decode(new _m0.Reader(data))
    );
  }

  GetQueryServicesDescriptor(
    request: GetQueryServicesDescriptorRequest
  ): Promise<GetQueryServicesDescriptorResponse> {
    const data = GetQueryServicesDescriptorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.reflection.v2alpha1.ReflectionService",
      "GetQueryServicesDescriptor",
      data
    );
    return promise.then((data) =>
      GetQueryServicesDescriptorResponse.decode(new _m0.Reader(data))
    );
  }

  GetTxDescriptor(
    request: GetTxDescriptorRequest
  ): Promise<GetTxDescriptorResponse> {
    const data = GetTxDescriptorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.base.reflection.v2alpha1.ReflectionService",
      "GetTxDescriptor",
      data
    );
    return promise.then((data) =>
      GetTxDescriptorResponse.decode(new _m0.Reader(data))
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
