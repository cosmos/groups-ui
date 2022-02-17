/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import {
  Validator,
  DelegationResponse,
  UnbondingDelegation,
  RedelegationResponse,
  HistoricalInfo,
  Pool,
  Params,
} from "../../../cosmos/staking/v1beta1/staking";

export const protobufPackage = "cosmos.staking.v1beta1";

/** QueryValidatorsRequest is request type for Query/Validators RPC method. */
export interface QueryValidatorsRequest {
  /** status enables to query for validators matching a given status. */
  status: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryValidatorsResponse is response type for the Query/Validators RPC method */
export interface QueryValidatorsResponse {
  /** validators contains all the queried validators. */
  validators: Validator[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryValidatorRequest is response type for the Query/Validator RPC method */
export interface QueryValidatorRequest {
  /** validator_addr defines the validator address to query for. */
  validator_addr: string;
}

/** QueryValidatorResponse is response type for the Query/Validator RPC method */
export interface QueryValidatorResponse {
  /** validator defines the the validator info. */
  validator: Validator | undefined;
}

/**
 * QueryValidatorDelegationsRequest is request type for the
 * Query/ValidatorDelegations RPC method
 */
export interface QueryValidatorDelegationsRequest {
  /** validator_addr defines the validator address to query for. */
  validator_addr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryValidatorDelegationsResponse is response type for the
 * Query/ValidatorDelegations RPC method
 */
export interface QueryValidatorDelegationsResponse {
  delegation_responses: DelegationResponse[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryValidatorUnbondingDelegationsRequest is required type for the
 * Query/ValidatorUnbondingDelegations RPC method
 */
export interface QueryValidatorUnbondingDelegationsRequest {
  /** validator_addr defines the validator address to query for. */
  validator_addr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryValidatorUnbondingDelegationsResponse is response type for the
 * Query/ValidatorUnbondingDelegations RPC method.
 */
export interface QueryValidatorUnbondingDelegationsResponse {
  unbonding_responses: UnbondingDelegation[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryDelegationRequest is request type for the Query/Delegation RPC method. */
export interface QueryDelegationRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegator_addr: string;
  /** validator_addr defines the validator address to query for. */
  validator_addr: string;
}

/** QueryDelegationResponse is response type for the Query/Delegation RPC method. */
export interface QueryDelegationResponse {
  /** delegation_responses defines the delegation info of a delegation. */
  delegation_response: DelegationResponse | undefined;
}

/**
 * QueryUnbondingDelegationRequest is request type for the
 * Query/UnbondingDelegation RPC method.
 */
export interface QueryUnbondingDelegationRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegator_addr: string;
  /** validator_addr defines the validator address to query for. */
  validator_addr: string;
}

/**
 * QueryDelegationResponse is response type for the Query/UnbondingDelegation
 * RPC method.
 */
export interface QueryUnbondingDelegationResponse {
  /** unbond defines the unbonding information of a delegation. */
  unbond: UnbondingDelegation | undefined;
}

/**
 * QueryDelegatorDelegationsRequest is request type for the
 * Query/DelegatorDelegations RPC method.
 */
export interface QueryDelegatorDelegationsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegator_addr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryDelegatorDelegationsResponse is response type for the
 * Query/DelegatorDelegations RPC method.
 */
export interface QueryDelegatorDelegationsResponse {
  /** delegation_responses defines all the delegations' info of a delegator. */
  delegation_responses: DelegationResponse[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryDelegatorUnbondingDelegationsRequest is request type for the
 * Query/DelegatorUnbondingDelegations RPC method.
 */
export interface QueryDelegatorUnbondingDelegationsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegator_addr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryUnbondingDelegatorDelegationsResponse is response type for the
 * Query/UnbondingDelegatorDelegations RPC method.
 */
export interface QueryDelegatorUnbondingDelegationsResponse {
  unbonding_responses: UnbondingDelegation[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryRedelegationsRequest is request type for the Query/Redelegations RPC
 * method.
 */
export interface QueryRedelegationsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegator_addr: string;
  /** src_validator_addr defines the validator address to redelegate from. */
  src_validator_addr: string;
  /** dst_validator_addr defines the validator address to redelegate to. */
  dst_validator_addr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryRedelegationsResponse is response type for the Query/Redelegations RPC
 * method.
 */
export interface QueryRedelegationsResponse {
  redelegation_responses: RedelegationResponse[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryDelegatorValidatorsRequest is request type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegator_addr: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryDelegatorValidatorsResponse is response type for the
 * Query/DelegatorValidators RPC method.
 */
export interface QueryDelegatorValidatorsResponse {
  /** validators defines the the validators' info of a delegator. */
  validators: Validator[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/**
 * QueryDelegatorValidatorRequest is request type for the
 * Query/DelegatorValidator RPC method.
 */
export interface QueryDelegatorValidatorRequest {
  /** delegator_addr defines the delegator address to query for. */
  delegator_addr: string;
  /** validator_addr defines the validator address to query for. */
  validator_addr: string;
}

/**
 * QueryDelegatorValidatorResponse response type for the
 * Query/DelegatorValidator RPC method.
 */
export interface QueryDelegatorValidatorResponse {
  /** validator defines the the validator info. */
  validator: Validator | undefined;
}

/**
 * QueryHistoricalInfoRequest is request type for the Query/HistoricalInfo RPC
 * method.
 */
export interface QueryHistoricalInfoRequest {
  /** height defines at which height to query the historical info. */
  height: number;
}

/**
 * QueryHistoricalInfoResponse is response type for the Query/HistoricalInfo RPC
 * method.
 */
export interface QueryHistoricalInfoResponse {
  /** hist defines the historical info at the given height. */
  hist: HistoricalInfo | undefined;
}

/** QueryPoolRequest is request type for the Query/Pool RPC method. */
export interface QueryPoolRequest {}

/** QueryPoolResponse is response type for the Query/Pool RPC method. */
export interface QueryPoolResponse {
  /** pool defines the pool info. */
  pool: Pool | undefined;
}

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

const baseQueryValidatorsRequest: object = { status: "" };

export const QueryValidatorsRequest = {
  encode(
    message: QueryValidatorsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryValidatorsRequest } as QueryValidatorsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.string();
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

  fromJSON(object: any): QueryValidatorsRequest {
    const message = { ...baseQueryValidatorsRequest } as QueryValidatorsRequest;
    message.status =
      object.status !== undefined && object.status !== null
        ? String(object.status)
        : "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryValidatorsRequest): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidatorsRequest>, I>>(
    object: I
  ): QueryValidatorsRequest {
    const message = { ...baseQueryValidatorsRequest } as QueryValidatorsRequest;
    message.status = object.status ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryValidatorsResponse: object = {};

export const QueryValidatorsResponse = {
  encode(
    message: QueryValidatorsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryValidatorsResponse,
    } as QueryValidatorsResponse;
    message.validators = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validators.push(Validator.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorsResponse {
    const message = {
      ...baseQueryValidatorsResponse,
    } as QueryValidatorsResponse;
    message.validators = (object.validators ?? []).map((e: any) =>
      Validator.fromJSON(e)
    );
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryValidatorsResponse): unknown {
    const obj: any = {};
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

  fromPartial<I extends Exact<DeepPartial<QueryValidatorsResponse>, I>>(
    object: I
  ): QueryValidatorsResponse {
    const message = {
      ...baseQueryValidatorsResponse,
    } as QueryValidatorsResponse;
    message.validators =
      object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryValidatorRequest: object = { validator_addr: "" };

export const QueryValidatorRequest = {
  encode(
    message: QueryValidatorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.validator_addr !== "") {
      writer.uint32(10).string(message.validator_addr);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryValidatorRequest } as QueryValidatorRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator_addr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorRequest {
    const message = { ...baseQueryValidatorRequest } as QueryValidatorRequest;
    message.validator_addr =
      object.validator_addr !== undefined && object.validator_addr !== null
        ? String(object.validator_addr)
        : "";
    return message;
  },

  toJSON(message: QueryValidatorRequest): unknown {
    const obj: any = {};
    message.validator_addr !== undefined &&
      (obj.validator_addr = message.validator_addr);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidatorRequest>, I>>(
    object: I
  ): QueryValidatorRequest {
    const message = { ...baseQueryValidatorRequest } as QueryValidatorRequest;
    message.validator_addr = object.validator_addr ?? "";
    return message;
  },
};

const baseQueryValidatorResponse: object = {};

export const QueryValidatorResponse = {
  encode(
    message: QueryValidatorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryValidatorResponse } as QueryValidatorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = Validator.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorResponse {
    const message = { ...baseQueryValidatorResponse } as QueryValidatorResponse;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromJSON(object.validator)
        : undefined;
    return message;
  },

  toJSON(message: QueryValidatorResponse): unknown {
    const obj: any = {};
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? Validator.toJSON(message.validator)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidatorResponse>, I>>(
    object: I
  ): QueryValidatorResponse {
    const message = { ...baseQueryValidatorResponse } as QueryValidatorResponse;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromPartial(object.validator)
        : undefined;
    return message;
  },
};

const baseQueryValidatorDelegationsRequest: object = { validator_addr: "" };

export const QueryValidatorDelegationsRequest = {
  encode(
    message: QueryValidatorDelegationsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.validator_addr !== "") {
      writer.uint32(10).string(message.validator_addr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorDelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryValidatorDelegationsRequest,
    } as QueryValidatorDelegationsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator_addr = reader.string();
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

  fromJSON(object: any): QueryValidatorDelegationsRequest {
    const message = {
      ...baseQueryValidatorDelegationsRequest,
    } as QueryValidatorDelegationsRequest;
    message.validator_addr =
      object.validator_addr !== undefined && object.validator_addr !== null
        ? String(object.validator_addr)
        : "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryValidatorDelegationsRequest): unknown {
    const obj: any = {};
    message.validator_addr !== undefined &&
      (obj.validator_addr = message.validator_addr);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryValidatorDelegationsRequest>, I>
  >(object: I): QueryValidatorDelegationsRequest {
    const message = {
      ...baseQueryValidatorDelegationsRequest,
    } as QueryValidatorDelegationsRequest;
    message.validator_addr = object.validator_addr ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryValidatorDelegationsResponse: object = {};

export const QueryValidatorDelegationsResponse = {
  encode(
    message: QueryValidatorDelegationsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.delegation_responses) {
      DelegationResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorDelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryValidatorDelegationsResponse,
    } as QueryValidatorDelegationsResponse;
    message.delegation_responses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegation_responses.push(
            DelegationResponse.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorDelegationsResponse {
    const message = {
      ...baseQueryValidatorDelegationsResponse,
    } as QueryValidatorDelegationsResponse;
    message.delegation_responses = (object.delegation_responses ?? []).map(
      (e: any) => DelegationResponse.fromJSON(e)
    );
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryValidatorDelegationsResponse): unknown {
    const obj: any = {};
    if (message.delegation_responses) {
      obj.delegation_responses = message.delegation_responses.map((e) =>
        e ? DelegationResponse.toJSON(e) : undefined
      );
    } else {
      obj.delegation_responses = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryValidatorDelegationsResponse>, I>
  >(object: I): QueryValidatorDelegationsResponse {
    const message = {
      ...baseQueryValidatorDelegationsResponse,
    } as QueryValidatorDelegationsResponse;
    message.delegation_responses =
      object.delegation_responses?.map((e) =>
        DelegationResponse.fromPartial(e)
      ) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryValidatorUnbondingDelegationsRequest: object = {
  validator_addr: "",
};

export const QueryValidatorUnbondingDelegationsRequest = {
  encode(
    message: QueryValidatorUnbondingDelegationsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.validator_addr !== "") {
      writer.uint32(10).string(message.validator_addr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorUnbondingDelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryValidatorUnbondingDelegationsRequest,
    } as QueryValidatorUnbondingDelegationsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator_addr = reader.string();
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

  fromJSON(object: any): QueryValidatorUnbondingDelegationsRequest {
    const message = {
      ...baseQueryValidatorUnbondingDelegationsRequest,
    } as QueryValidatorUnbondingDelegationsRequest;
    message.validator_addr =
      object.validator_addr !== undefined && object.validator_addr !== null
        ? String(object.validator_addr)
        : "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryValidatorUnbondingDelegationsRequest): unknown {
    const obj: any = {};
    message.validator_addr !== undefined &&
      (obj.validator_addr = message.validator_addr);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryValidatorUnbondingDelegationsRequest>, I>
  >(object: I): QueryValidatorUnbondingDelegationsRequest {
    const message = {
      ...baseQueryValidatorUnbondingDelegationsRequest,
    } as QueryValidatorUnbondingDelegationsRequest;
    message.validator_addr = object.validator_addr ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryValidatorUnbondingDelegationsResponse: object = {};

export const QueryValidatorUnbondingDelegationsResponse = {
  encode(
    message: QueryValidatorUnbondingDelegationsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.unbonding_responses) {
      UnbondingDelegation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorUnbondingDelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryValidatorUnbondingDelegationsResponse,
    } as QueryValidatorUnbondingDelegationsResponse;
    message.unbonding_responses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbonding_responses.push(
            UnbondingDelegation.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorUnbondingDelegationsResponse {
    const message = {
      ...baseQueryValidatorUnbondingDelegationsResponse,
    } as QueryValidatorUnbondingDelegationsResponse;
    message.unbonding_responses = (object.unbonding_responses ?? []).map(
      (e: any) => UnbondingDelegation.fromJSON(e)
    );
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryValidatorUnbondingDelegationsResponse): unknown {
    const obj: any = {};
    if (message.unbonding_responses) {
      obj.unbonding_responses = message.unbonding_responses.map((e) =>
        e ? UnbondingDelegation.toJSON(e) : undefined
      );
    } else {
      obj.unbonding_responses = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryValidatorUnbondingDelegationsResponse>, I>
  >(object: I): QueryValidatorUnbondingDelegationsResponse {
    const message = {
      ...baseQueryValidatorUnbondingDelegationsResponse,
    } as QueryValidatorUnbondingDelegationsResponse;
    message.unbonding_responses =
      object.unbonding_responses?.map((e) =>
        UnbondingDelegation.fromPartial(e)
      ) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryDelegationRequest: object = {
  delegator_addr: "",
  validator_addr: "",
};

export const QueryDelegationRequest = {
  encode(
    message: QueryDelegationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_addr !== "") {
      writer.uint32(10).string(message.delegator_addr);
    }
    if (message.validator_addr !== "") {
      writer.uint32(18).string(message.validator_addr);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryDelegationRequest } as QueryDelegationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_addr = reader.string();
          break;
        case 2:
          message.validator_addr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDelegationRequest {
    const message = { ...baseQueryDelegationRequest } as QueryDelegationRequest;
    message.delegator_addr =
      object.delegator_addr !== undefined && object.delegator_addr !== null
        ? String(object.delegator_addr)
        : "";
    message.validator_addr =
      object.validator_addr !== undefined && object.validator_addr !== null
        ? String(object.validator_addr)
        : "";
    return message;
  },

  toJSON(message: QueryDelegationRequest): unknown {
    const obj: any = {};
    message.delegator_addr !== undefined &&
      (obj.delegator_addr = message.delegator_addr);
    message.validator_addr !== undefined &&
      (obj.validator_addr = message.validator_addr);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDelegationRequest>, I>>(
    object: I
  ): QueryDelegationRequest {
    const message = { ...baseQueryDelegationRequest } as QueryDelegationRequest;
    message.delegator_addr = object.delegator_addr ?? "";
    message.validator_addr = object.validator_addr ?? "";
    return message;
  },
};

const baseQueryDelegationResponse: object = {};

export const QueryDelegationResponse = {
  encode(
    message: QueryDelegationResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegation_response !== undefined) {
      DelegationResponse.encode(
        message.delegation_response,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDelegationResponse,
    } as QueryDelegationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegation_response = DelegationResponse.decode(
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

  fromJSON(object: any): QueryDelegationResponse {
    const message = {
      ...baseQueryDelegationResponse,
    } as QueryDelegationResponse;
    message.delegation_response =
      object.delegation_response !== undefined &&
      object.delegation_response !== null
        ? DelegationResponse.fromJSON(object.delegation_response)
        : undefined;
    return message;
  },

  toJSON(message: QueryDelegationResponse): unknown {
    const obj: any = {};
    message.delegation_response !== undefined &&
      (obj.delegation_response = message.delegation_response
        ? DelegationResponse.toJSON(message.delegation_response)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDelegationResponse>, I>>(
    object: I
  ): QueryDelegationResponse {
    const message = {
      ...baseQueryDelegationResponse,
    } as QueryDelegationResponse;
    message.delegation_response =
      object.delegation_response !== undefined &&
      object.delegation_response !== null
        ? DelegationResponse.fromPartial(object.delegation_response)
        : undefined;
    return message;
  },
};

const baseQueryUnbondingDelegationRequest: object = {
  delegator_addr: "",
  validator_addr: "",
};

export const QueryUnbondingDelegationRequest = {
  encode(
    message: QueryUnbondingDelegationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_addr !== "") {
      writer.uint32(10).string(message.delegator_addr);
    }
    if (message.validator_addr !== "") {
      writer.uint32(18).string(message.validator_addr);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryUnbondingDelegationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryUnbondingDelegationRequest,
    } as QueryUnbondingDelegationRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_addr = reader.string();
          break;
        case 2:
          message.validator_addr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryUnbondingDelegationRequest {
    const message = {
      ...baseQueryUnbondingDelegationRequest,
    } as QueryUnbondingDelegationRequest;
    message.delegator_addr =
      object.delegator_addr !== undefined && object.delegator_addr !== null
        ? String(object.delegator_addr)
        : "";
    message.validator_addr =
      object.validator_addr !== undefined && object.validator_addr !== null
        ? String(object.validator_addr)
        : "";
    return message;
  },

  toJSON(message: QueryUnbondingDelegationRequest): unknown {
    const obj: any = {};
    message.delegator_addr !== undefined &&
      (obj.delegator_addr = message.delegator_addr);
    message.validator_addr !== undefined &&
      (obj.validator_addr = message.validator_addr);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryUnbondingDelegationRequest>, I>>(
    object: I
  ): QueryUnbondingDelegationRequest {
    const message = {
      ...baseQueryUnbondingDelegationRequest,
    } as QueryUnbondingDelegationRequest;
    message.delegator_addr = object.delegator_addr ?? "";
    message.validator_addr = object.validator_addr ?? "";
    return message;
  },
};

const baseQueryUnbondingDelegationResponse: object = {};

export const QueryUnbondingDelegationResponse = {
  encode(
    message: QueryUnbondingDelegationResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.unbond !== undefined) {
      UnbondingDelegation.encode(
        message.unbond,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryUnbondingDelegationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryUnbondingDelegationResponse,
    } as QueryUnbondingDelegationResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbond = UnbondingDelegation.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryUnbondingDelegationResponse {
    const message = {
      ...baseQueryUnbondingDelegationResponse,
    } as QueryUnbondingDelegationResponse;
    message.unbond =
      object.unbond !== undefined && object.unbond !== null
        ? UnbondingDelegation.fromJSON(object.unbond)
        : undefined;
    return message;
  },

  toJSON(message: QueryUnbondingDelegationResponse): unknown {
    const obj: any = {};
    message.unbond !== undefined &&
      (obj.unbond = message.unbond
        ? UnbondingDelegation.toJSON(message.unbond)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryUnbondingDelegationResponse>, I>
  >(object: I): QueryUnbondingDelegationResponse {
    const message = {
      ...baseQueryUnbondingDelegationResponse,
    } as QueryUnbondingDelegationResponse;
    message.unbond =
      object.unbond !== undefined && object.unbond !== null
        ? UnbondingDelegation.fromPartial(object.unbond)
        : undefined;
    return message;
  },
};

const baseQueryDelegatorDelegationsRequest: object = { delegator_addr: "" };

export const QueryDelegatorDelegationsRequest = {
  encode(
    message: QueryDelegatorDelegationsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_addr !== "") {
      writer.uint32(10).string(message.delegator_addr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorDelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDelegatorDelegationsRequest,
    } as QueryDelegatorDelegationsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_addr = reader.string();
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

  fromJSON(object: any): QueryDelegatorDelegationsRequest {
    const message = {
      ...baseQueryDelegatorDelegationsRequest,
    } as QueryDelegatorDelegationsRequest;
    message.delegator_addr =
      object.delegator_addr !== undefined && object.delegator_addr !== null
        ? String(object.delegator_addr)
        : "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryDelegatorDelegationsRequest): unknown {
    const obj: any = {};
    message.delegator_addr !== undefined &&
      (obj.delegator_addr = message.delegator_addr);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryDelegatorDelegationsRequest>, I>
  >(object: I): QueryDelegatorDelegationsRequest {
    const message = {
      ...baseQueryDelegatorDelegationsRequest,
    } as QueryDelegatorDelegationsRequest;
    message.delegator_addr = object.delegator_addr ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryDelegatorDelegationsResponse: object = {};

export const QueryDelegatorDelegationsResponse = {
  encode(
    message: QueryDelegatorDelegationsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.delegation_responses) {
      DelegationResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorDelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDelegatorDelegationsResponse,
    } as QueryDelegatorDelegationsResponse;
    message.delegation_responses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegation_responses.push(
            DelegationResponse.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDelegatorDelegationsResponse {
    const message = {
      ...baseQueryDelegatorDelegationsResponse,
    } as QueryDelegatorDelegationsResponse;
    message.delegation_responses = (object.delegation_responses ?? []).map(
      (e: any) => DelegationResponse.fromJSON(e)
    );
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryDelegatorDelegationsResponse): unknown {
    const obj: any = {};
    if (message.delegation_responses) {
      obj.delegation_responses = message.delegation_responses.map((e) =>
        e ? DelegationResponse.toJSON(e) : undefined
      );
    } else {
      obj.delegation_responses = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryDelegatorDelegationsResponse>, I>
  >(object: I): QueryDelegatorDelegationsResponse {
    const message = {
      ...baseQueryDelegatorDelegationsResponse,
    } as QueryDelegatorDelegationsResponse;
    message.delegation_responses =
      object.delegation_responses?.map((e) =>
        DelegationResponse.fromPartial(e)
      ) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryDelegatorUnbondingDelegationsRequest: object = {
  delegator_addr: "",
};

export const QueryDelegatorUnbondingDelegationsRequest = {
  encode(
    message: QueryDelegatorUnbondingDelegationsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_addr !== "") {
      writer.uint32(10).string(message.delegator_addr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorUnbondingDelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDelegatorUnbondingDelegationsRequest,
    } as QueryDelegatorUnbondingDelegationsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_addr = reader.string();
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

  fromJSON(object: any): QueryDelegatorUnbondingDelegationsRequest {
    const message = {
      ...baseQueryDelegatorUnbondingDelegationsRequest,
    } as QueryDelegatorUnbondingDelegationsRequest;
    message.delegator_addr =
      object.delegator_addr !== undefined && object.delegator_addr !== null
        ? String(object.delegator_addr)
        : "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryDelegatorUnbondingDelegationsRequest): unknown {
    const obj: any = {};
    message.delegator_addr !== undefined &&
      (obj.delegator_addr = message.delegator_addr);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryDelegatorUnbondingDelegationsRequest>, I>
  >(object: I): QueryDelegatorUnbondingDelegationsRequest {
    const message = {
      ...baseQueryDelegatorUnbondingDelegationsRequest,
    } as QueryDelegatorUnbondingDelegationsRequest;
    message.delegator_addr = object.delegator_addr ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryDelegatorUnbondingDelegationsResponse: object = {};

export const QueryDelegatorUnbondingDelegationsResponse = {
  encode(
    message: QueryDelegatorUnbondingDelegationsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.unbonding_responses) {
      UnbondingDelegation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorUnbondingDelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDelegatorUnbondingDelegationsResponse,
    } as QueryDelegatorUnbondingDelegationsResponse;
    message.unbonding_responses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbonding_responses.push(
            UnbondingDelegation.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDelegatorUnbondingDelegationsResponse {
    const message = {
      ...baseQueryDelegatorUnbondingDelegationsResponse,
    } as QueryDelegatorUnbondingDelegationsResponse;
    message.unbonding_responses = (object.unbonding_responses ?? []).map(
      (e: any) => UnbondingDelegation.fromJSON(e)
    );
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryDelegatorUnbondingDelegationsResponse): unknown {
    const obj: any = {};
    if (message.unbonding_responses) {
      obj.unbonding_responses = message.unbonding_responses.map((e) =>
        e ? UnbondingDelegation.toJSON(e) : undefined
      );
    } else {
      obj.unbonding_responses = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryDelegatorUnbondingDelegationsResponse>, I>
  >(object: I): QueryDelegatorUnbondingDelegationsResponse {
    const message = {
      ...baseQueryDelegatorUnbondingDelegationsResponse,
    } as QueryDelegatorUnbondingDelegationsResponse;
    message.unbonding_responses =
      object.unbonding_responses?.map((e) =>
        UnbondingDelegation.fromPartial(e)
      ) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryRedelegationsRequest: object = {
  delegator_addr: "",
  src_validator_addr: "",
  dst_validator_addr: "",
};

export const QueryRedelegationsRequest = {
  encode(
    message: QueryRedelegationsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_addr !== "") {
      writer.uint32(10).string(message.delegator_addr);
    }
    if (message.src_validator_addr !== "") {
      writer.uint32(18).string(message.src_validator_addr);
    }
    if (message.dst_validator_addr !== "") {
      writer.uint32(26).string(message.dst_validator_addr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryRedelegationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryRedelegationsRequest,
    } as QueryRedelegationsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_addr = reader.string();
          break;
        case 2:
          message.src_validator_addr = reader.string();
          break;
        case 3:
          message.dst_validator_addr = reader.string();
          break;
        case 4:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRedelegationsRequest {
    const message = {
      ...baseQueryRedelegationsRequest,
    } as QueryRedelegationsRequest;
    message.delegator_addr =
      object.delegator_addr !== undefined && object.delegator_addr !== null
        ? String(object.delegator_addr)
        : "";
    message.src_validator_addr =
      object.src_validator_addr !== undefined &&
      object.src_validator_addr !== null
        ? String(object.src_validator_addr)
        : "";
    message.dst_validator_addr =
      object.dst_validator_addr !== undefined &&
      object.dst_validator_addr !== null
        ? String(object.dst_validator_addr)
        : "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryRedelegationsRequest): unknown {
    const obj: any = {};
    message.delegator_addr !== undefined &&
      (obj.delegator_addr = message.delegator_addr);
    message.src_validator_addr !== undefined &&
      (obj.src_validator_addr = message.src_validator_addr);
    message.dst_validator_addr !== undefined &&
      (obj.dst_validator_addr = message.dst_validator_addr);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryRedelegationsRequest>, I>>(
    object: I
  ): QueryRedelegationsRequest {
    const message = {
      ...baseQueryRedelegationsRequest,
    } as QueryRedelegationsRequest;
    message.delegator_addr = object.delegator_addr ?? "";
    message.src_validator_addr = object.src_validator_addr ?? "";
    message.dst_validator_addr = object.dst_validator_addr ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryRedelegationsResponse: object = {};

export const QueryRedelegationsResponse = {
  encode(
    message: QueryRedelegationsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.redelegation_responses) {
      RedelegationResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryRedelegationsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryRedelegationsResponse,
    } as QueryRedelegationsResponse;
    message.redelegation_responses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redelegation_responses.push(
            RedelegationResponse.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRedelegationsResponse {
    const message = {
      ...baseQueryRedelegationsResponse,
    } as QueryRedelegationsResponse;
    message.redelegation_responses = (object.redelegation_responses ?? []).map(
      (e: any) => RedelegationResponse.fromJSON(e)
    );
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryRedelegationsResponse): unknown {
    const obj: any = {};
    if (message.redelegation_responses) {
      obj.redelegation_responses = message.redelegation_responses.map((e) =>
        e ? RedelegationResponse.toJSON(e) : undefined
      );
    } else {
      obj.redelegation_responses = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryRedelegationsResponse>, I>>(
    object: I
  ): QueryRedelegationsResponse {
    const message = {
      ...baseQueryRedelegationsResponse,
    } as QueryRedelegationsResponse;
    message.redelegation_responses =
      object.redelegation_responses?.map((e) =>
        RedelegationResponse.fromPartial(e)
      ) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryDelegatorValidatorsRequest: object = { delegator_addr: "" };

export const QueryDelegatorValidatorsRequest = {
  encode(
    message: QueryDelegatorValidatorsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_addr !== "") {
      writer.uint32(10).string(message.delegator_addr);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorValidatorsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDelegatorValidatorsRequest,
    } as QueryDelegatorValidatorsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_addr = reader.string();
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

  fromJSON(object: any): QueryDelegatorValidatorsRequest {
    const message = {
      ...baseQueryDelegatorValidatorsRequest,
    } as QueryDelegatorValidatorsRequest;
    message.delegator_addr =
      object.delegator_addr !== undefined && object.delegator_addr !== null
        ? String(object.delegator_addr)
        : "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryDelegatorValidatorsRequest): unknown {
    const obj: any = {};
    message.delegator_addr !== undefined &&
      (obj.delegator_addr = message.delegator_addr);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDelegatorValidatorsRequest>, I>>(
    object: I
  ): QueryDelegatorValidatorsRequest {
    const message = {
      ...baseQueryDelegatorValidatorsRequest,
    } as QueryDelegatorValidatorsRequest;
    message.delegator_addr = object.delegator_addr ?? "";
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryDelegatorValidatorsResponse: object = {};

export const QueryDelegatorValidatorsResponse = {
  encode(
    message: QueryDelegatorValidatorsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorValidatorsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDelegatorValidatorsResponse,
    } as QueryDelegatorValidatorsResponse;
    message.validators = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validators.push(Validator.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDelegatorValidatorsResponse {
    const message = {
      ...baseQueryDelegatorValidatorsResponse,
    } as QueryDelegatorValidatorsResponse;
    message.validators = (object.validators ?? []).map((e: any) =>
      Validator.fromJSON(e)
    );
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromJSON(object.pagination)
        : undefined;
    return message;
  },

  toJSON(message: QueryDelegatorValidatorsResponse): unknown {
    const obj: any = {};
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

  fromPartial<
    I extends Exact<DeepPartial<QueryDelegatorValidatorsResponse>, I>
  >(object: I): QueryDelegatorValidatorsResponse {
    const message = {
      ...baseQueryDelegatorValidatorsResponse,
    } as QueryDelegatorValidatorsResponse;
    message.validators =
      object.validators?.map((e) => Validator.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

const baseQueryDelegatorValidatorRequest: object = {
  delegator_addr: "",
  validator_addr: "",
};

export const QueryDelegatorValidatorRequest = {
  encode(
    message: QueryDelegatorValidatorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator_addr !== "") {
      writer.uint32(10).string(message.delegator_addr);
    }
    if (message.validator_addr !== "") {
      writer.uint32(18).string(message.validator_addr);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorValidatorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDelegatorValidatorRequest,
    } as QueryDelegatorValidatorRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_addr = reader.string();
          break;
        case 2:
          message.validator_addr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDelegatorValidatorRequest {
    const message = {
      ...baseQueryDelegatorValidatorRequest,
    } as QueryDelegatorValidatorRequest;
    message.delegator_addr =
      object.delegator_addr !== undefined && object.delegator_addr !== null
        ? String(object.delegator_addr)
        : "";
    message.validator_addr =
      object.validator_addr !== undefined && object.validator_addr !== null
        ? String(object.validator_addr)
        : "";
    return message;
  },

  toJSON(message: QueryDelegatorValidatorRequest): unknown {
    const obj: any = {};
    message.delegator_addr !== undefined &&
      (obj.delegator_addr = message.delegator_addr);
    message.validator_addr !== undefined &&
      (obj.validator_addr = message.validator_addr);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDelegatorValidatorRequest>, I>>(
    object: I
  ): QueryDelegatorValidatorRequest {
    const message = {
      ...baseQueryDelegatorValidatorRequest,
    } as QueryDelegatorValidatorRequest;
    message.delegator_addr = object.delegator_addr ?? "";
    message.validator_addr = object.validator_addr ?? "";
    return message;
  },
};

const baseQueryDelegatorValidatorResponse: object = {};

export const QueryDelegatorValidatorResponse = {
  encode(
    message: QueryDelegatorValidatorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorValidatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryDelegatorValidatorResponse,
    } as QueryDelegatorValidatorResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = Validator.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDelegatorValidatorResponse {
    const message = {
      ...baseQueryDelegatorValidatorResponse,
    } as QueryDelegatorValidatorResponse;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromJSON(object.validator)
        : undefined;
    return message;
  },

  toJSON(message: QueryDelegatorValidatorResponse): unknown {
    const obj: any = {};
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? Validator.toJSON(message.validator)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDelegatorValidatorResponse>, I>>(
    object: I
  ): QueryDelegatorValidatorResponse {
    const message = {
      ...baseQueryDelegatorValidatorResponse,
    } as QueryDelegatorValidatorResponse;
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromPartial(object.validator)
        : undefined;
    return message;
  },
};

const baseQueryHistoricalInfoRequest: object = { height: 0 };

export const QueryHistoricalInfoRequest = {
  encode(
    message: QueryHistoricalInfoRequest,
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
  ): QueryHistoricalInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryHistoricalInfoRequest,
    } as QueryHistoricalInfoRequest;
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

  fromJSON(object: any): QueryHistoricalInfoRequest {
    const message = {
      ...baseQueryHistoricalInfoRequest,
    } as QueryHistoricalInfoRequest;
    message.height =
      object.height !== undefined && object.height !== null
        ? Number(object.height)
        : 0;
    return message;
  },

  toJSON(message: QueryHistoricalInfoRequest): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryHistoricalInfoRequest>, I>>(
    object: I
  ): QueryHistoricalInfoRequest {
    const message = {
      ...baseQueryHistoricalInfoRequest,
    } as QueryHistoricalInfoRequest;
    message.height = object.height ?? 0;
    return message;
  },
};

const baseQueryHistoricalInfoResponse: object = {};

export const QueryHistoricalInfoResponse = {
  encode(
    message: QueryHistoricalInfoResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.hist !== undefined) {
      HistoricalInfo.encode(message.hist, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryHistoricalInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryHistoricalInfoResponse,
    } as QueryHistoricalInfoResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hist = HistoricalInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryHistoricalInfoResponse {
    const message = {
      ...baseQueryHistoricalInfoResponse,
    } as QueryHistoricalInfoResponse;
    message.hist =
      object.hist !== undefined && object.hist !== null
        ? HistoricalInfo.fromJSON(object.hist)
        : undefined;
    return message;
  },

  toJSON(message: QueryHistoricalInfoResponse): unknown {
    const obj: any = {};
    message.hist !== undefined &&
      (obj.hist = message.hist
        ? HistoricalInfo.toJSON(message.hist)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryHistoricalInfoResponse>, I>>(
    object: I
  ): QueryHistoricalInfoResponse {
    const message = {
      ...baseQueryHistoricalInfoResponse,
    } as QueryHistoricalInfoResponse;
    message.hist =
      object.hist !== undefined && object.hist !== null
        ? HistoricalInfo.fromPartial(object.hist)
        : undefined;
    return message;
  },
};

const baseQueryPoolRequest: object = {};

export const QueryPoolRequest = {
  encode(
    _: QueryPoolRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolRequest } as QueryPoolRequest;
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

  fromJSON(_: any): QueryPoolRequest {
    const message = { ...baseQueryPoolRequest } as QueryPoolRequest;
    return message;
  },

  toJSON(_: QueryPoolRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPoolRequest>, I>>(
    _: I
  ): QueryPoolRequest {
    const message = { ...baseQueryPoolRequest } as QueryPoolRequest;
    return message;
  },
};

const baseQueryPoolResponse: object = {};

export const QueryPoolResponse = {
  encode(
    message: QueryPoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryPoolResponse } as QueryPoolResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = Pool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPoolResponse {
    const message = { ...baseQueryPoolResponse } as QueryPoolResponse;
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromJSON(object.pool)
        : undefined;
    return message;
  },

  toJSON(message: QueryPoolResponse): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Pool.toJSON(message.pool) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPoolResponse>, I>>(
    object: I
  ): QueryPoolResponse {
    const message = { ...baseQueryPoolResponse } as QueryPoolResponse;
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromPartial(object.pool)
        : undefined;
    return message;
  },
};

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(
    _: QueryParamsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
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

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(
    _: I
  ): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromJSON(object.params)
        : undefined;
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(
    object: I
  ): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Validators queries all validators that match the given status. */
  Validators(request: QueryValidatorsRequest): Promise<QueryValidatorsResponse>;
  /** Validator queries validator info for given validator address. */
  Validator(request: QueryValidatorRequest): Promise<QueryValidatorResponse>;
  /** ValidatorDelegations queries delegate info for given validator. */
  ValidatorDelegations(
    request: QueryValidatorDelegationsRequest
  ): Promise<QueryValidatorDelegationsResponse>;
  /** ValidatorUnbondingDelegations queries unbonding delegations of a validator. */
  ValidatorUnbondingDelegations(
    request: QueryValidatorUnbondingDelegationsRequest
  ): Promise<QueryValidatorUnbondingDelegationsResponse>;
  /** Delegation queries delegate info for given validator delegator pair. */
  Delegation(request: QueryDelegationRequest): Promise<QueryDelegationResponse>;
  /**
   * UnbondingDelegation queries unbonding info for given validator delegator
   * pair.
   */
  UnbondingDelegation(
    request: QueryUnbondingDelegationRequest
  ): Promise<QueryUnbondingDelegationResponse>;
  /** DelegatorDelegations queries all delegations of a given delegator address. */
  DelegatorDelegations(
    request: QueryDelegatorDelegationsRequest
  ): Promise<QueryDelegatorDelegationsResponse>;
  /**
   * DelegatorUnbondingDelegations queries all unbonding delegations of a given
   * delegator address.
   */
  DelegatorUnbondingDelegations(
    request: QueryDelegatorUnbondingDelegationsRequest
  ): Promise<QueryDelegatorUnbondingDelegationsResponse>;
  /** Redelegations queries redelegations of given address. */
  Redelegations(
    request: QueryRedelegationsRequest
  ): Promise<QueryRedelegationsResponse>;
  /**
   * DelegatorValidators queries all validators info for given delegator
   * address.
   */
  DelegatorValidators(
    request: QueryDelegatorValidatorsRequest
  ): Promise<QueryDelegatorValidatorsResponse>;
  /**
   * DelegatorValidator queries validator info for given delegator validator
   * pair.
   */
  DelegatorValidator(
    request: QueryDelegatorValidatorRequest
  ): Promise<QueryDelegatorValidatorResponse>;
  /** HistoricalInfo queries the historical info for given height. */
  HistoricalInfo(
    request: QueryHistoricalInfoRequest
  ): Promise<QueryHistoricalInfoResponse>;
  /** Pool queries the pool info. */
  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  /** Parameters queries the staking parameters. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Validators = this.Validators.bind(this);
    this.Validator = this.Validator.bind(this);
    this.ValidatorDelegations = this.ValidatorDelegations.bind(this);
    this.ValidatorUnbondingDelegations =
      this.ValidatorUnbondingDelegations.bind(this);
    this.Delegation = this.Delegation.bind(this);
    this.UnbondingDelegation = this.UnbondingDelegation.bind(this);
    this.DelegatorDelegations = this.DelegatorDelegations.bind(this);
    this.DelegatorUnbondingDelegations =
      this.DelegatorUnbondingDelegations.bind(this);
    this.Redelegations = this.Redelegations.bind(this);
    this.DelegatorValidators = this.DelegatorValidators.bind(this);
    this.DelegatorValidator = this.DelegatorValidator.bind(this);
    this.HistoricalInfo = this.HistoricalInfo.bind(this);
    this.Pool = this.Pool.bind(this);
    this.Params = this.Params.bind(this);
  }
  Validators(
    request: QueryValidatorsRequest
  ): Promise<QueryValidatorsResponse> {
    const data = QueryValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "Validators",
      data
    );
    return promise.then((data) =>
      QueryValidatorsResponse.decode(new _m0.Reader(data))
    );
  }

  Validator(request: QueryValidatorRequest): Promise<QueryValidatorResponse> {
    const data = QueryValidatorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "Validator",
      data
    );
    return promise.then((data) =>
      QueryValidatorResponse.decode(new _m0.Reader(data))
    );
  }

  ValidatorDelegations(
    request: QueryValidatorDelegationsRequest
  ): Promise<QueryValidatorDelegationsResponse> {
    const data = QueryValidatorDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "ValidatorDelegations",
      data
    );
    return promise.then((data) =>
      QueryValidatorDelegationsResponse.decode(new _m0.Reader(data))
    );
  }

  ValidatorUnbondingDelegations(
    request: QueryValidatorUnbondingDelegationsRequest
  ): Promise<QueryValidatorUnbondingDelegationsResponse> {
    const data =
      QueryValidatorUnbondingDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "ValidatorUnbondingDelegations",
      data
    );
    return promise.then((data) =>
      QueryValidatorUnbondingDelegationsResponse.decode(new _m0.Reader(data))
    );
  }

  Delegation(
    request: QueryDelegationRequest
  ): Promise<QueryDelegationResponse> {
    const data = QueryDelegationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "Delegation",
      data
    );
    return promise.then((data) =>
      QueryDelegationResponse.decode(new _m0.Reader(data))
    );
  }

  UnbondingDelegation(
    request: QueryUnbondingDelegationRequest
  ): Promise<QueryUnbondingDelegationResponse> {
    const data = QueryUnbondingDelegationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "UnbondingDelegation",
      data
    );
    return promise.then((data) =>
      QueryUnbondingDelegationResponse.decode(new _m0.Reader(data))
    );
  }

  DelegatorDelegations(
    request: QueryDelegatorDelegationsRequest
  ): Promise<QueryDelegatorDelegationsResponse> {
    const data = QueryDelegatorDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "DelegatorDelegations",
      data
    );
    return promise.then((data) =>
      QueryDelegatorDelegationsResponse.decode(new _m0.Reader(data))
    );
  }

  DelegatorUnbondingDelegations(
    request: QueryDelegatorUnbondingDelegationsRequest
  ): Promise<QueryDelegatorUnbondingDelegationsResponse> {
    const data =
      QueryDelegatorUnbondingDelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "DelegatorUnbondingDelegations",
      data
    );
    return promise.then((data) =>
      QueryDelegatorUnbondingDelegationsResponse.decode(new _m0.Reader(data))
    );
  }

  Redelegations(
    request: QueryRedelegationsRequest
  ): Promise<QueryRedelegationsResponse> {
    const data = QueryRedelegationsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "Redelegations",
      data
    );
    return promise.then((data) =>
      QueryRedelegationsResponse.decode(new _m0.Reader(data))
    );
  }

  DelegatorValidators(
    request: QueryDelegatorValidatorsRequest
  ): Promise<QueryDelegatorValidatorsResponse> {
    const data = QueryDelegatorValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "DelegatorValidators",
      data
    );
    return promise.then((data) =>
      QueryDelegatorValidatorsResponse.decode(new _m0.Reader(data))
    );
  }

  DelegatorValidator(
    request: QueryDelegatorValidatorRequest
  ): Promise<QueryDelegatorValidatorResponse> {
    const data = QueryDelegatorValidatorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "DelegatorValidator",
      data
    );
    return promise.then((data) =>
      QueryDelegatorValidatorResponse.decode(new _m0.Reader(data))
    );
  }

  HistoricalInfo(
    request: QueryHistoricalInfoRequest
  ): Promise<QueryHistoricalInfoResponse> {
    const data = QueryHistoricalInfoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "HistoricalInfo",
      data
    );
    return promise.then((data) =>
      QueryHistoricalInfoResponse.decode(new _m0.Reader(data))
    );
  }

  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse> {
    const data = QueryPoolRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "Pool",
      data
    );
    return promise.then((data) =>
      QueryPoolResponse.decode(new _m0.Reader(data))
    );
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.staking.v1beta1.Query",
      "Params",
      data
    );
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
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
