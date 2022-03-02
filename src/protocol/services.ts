import { CosmosClient } from './cosmos-client'
import { ChainInfo } from '@keplr-wallet/types'

interface Service {
    applyChainInfo: (chainInfo: ChainInfo) => Promise<void>
}

const servicesMap: Map<string, Service> = new Map<string, Service>()

export const getService = <T extends Service>(s: string): T => {
    if (!servicesMap.has(s)) {
        throw new Error(`No service in repository with name: ${s}, check initialization pipeline`)
    }
    return servicesMap.get(s) as T
}

/**
 * Helper decorator that sets static methods to class to make it singleton
 */
export function service(ServiceClassRef) {
    servicesMap.set(ServiceClassRef.name, new ServiceClassRef(CosmosClient.instance))

    return ServiceClassRef
}

export async function applyChainInfo (chainInfo: ChainInfo): Promise<unknown[]> {
    await CosmosClient.instance.applyChainInfo(chainInfo)
    return Promise.all(Array.from(servicesMap.values()).map(s => s.applyChainInfo(chainInfo)))
}
