import { BaseHttpService } from './base-http-service'

interface Service extends BaseHttpService {}

const servicesMap: Map<string, Service> = new Map<string, Service>()

export const getService = <T extends Service>(s: string): T => {
    if (!servicesMap.has(s)) {
        throw new Error(`No service in repository with name: ${s}, check initialization pipeline`)
    }
    return servicesMap.get(s) as T
}

export function setServerUrl(serverUrl: string): void {
    servicesMap.forEach(serv => {
        serv.setServerUrl(serverUrl)
    })
}

/**
 * Helper decorator that sets static methods to class to make it singleton
 */
export function service(ServiceClassRef) {
    servicesMap.set(ServiceClassRef.serviceName, new ServiceClassRef())

    return ServiceClassRef
}
