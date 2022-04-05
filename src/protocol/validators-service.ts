import { getService, service } from './services'
import { ChainInfo } from '@keplr-wallet/types'
import { CosmosClient } from './cosmos-client'
import { QueryValidatorsResponse } from '../generated/cosmos/staking/v1beta1/query'
import { Validator } from '../generated/cosmos/staking/v1beta1/staking'

@service
export class ValidatorsService {
    static serviceName = ValidatorsService.name

    static get instance(): ValidatorsService {
        return getService<ValidatorsService>(ValidatorsService.serviceName)
    }

    cosmosClient: CosmosClient

    constructor(cosmosClient: CosmosClient) {
        this.cosmosClient = cosmosClient
    }

    applyChainInfo = async (chainInfo: ChainInfo): Promise<void> => {}

    allValidators = async (): Promise<readonly Validator[]> => {
        // fixme: maybe only BondStatus.BOND_STATUS_BONDED and not jailed
        const res = await this.cosmosClient.lcdClientGet(
            `/cosmos/staking/v1beta1/validators`
        ) as QueryValidatorsResponse

        return Object.freeze(res.validators)

        // fixme: implement paganation
        /*const request = async (key: Uint8Array | undefined = undefined) => {
            return await this.cosmosClient.lcdClientGet(
                `/cosmos/staking/v1beta1/validators` + (key ? `?key=${key}` : '') // ??? how to set key
            ) as QueryValidatorsResponse
        }
        let all: Validator[] = []
        let next_key: Uint8Array | undefined

        do {
            const res = await request(next_key)
            all = [...all, ...res.validators]
            next_key = res.pagination?.next_key
        } while (next_key)

        return all
        */
    }
}
