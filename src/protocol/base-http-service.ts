import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export const GET = 'get'
export const POST = 'post'
export const PUT = 'put'
export const PATCH = 'patch'
export const DELETE = 'delete'

export type ServiceRequestMiddleware = (config: AxiosRequestConfig) => void
export type ServiceResponseMiddleware = (response: AxiosResponse) => void
export type ServiceErrorMiddleware = (error: AxiosError) => void

export interface MethodMiddlewares {
    requestMiddlewares?: ServiceRequestMiddleware[]
    responseMiddlewares?: ServiceResponseMiddleware[]
    errorMiddlewares?: ServiceErrorMiddleware[]
}

const defaultMethodMiddlewares: MethodMiddlewares = {
    requestMiddlewares: [],
    responseMiddlewares: [],
    errorMiddlewares: []
}

export abstract class BaseHttpService {
    static serviceName: string = 'BaseHttpService'

    static commonRequestMiddlewares: ServiceRequestMiddleware[] = []
    static commonResponseMiddlewares: ServiceResponseMiddleware[] = []
    static commonErrorMiddlewares: ServiceErrorMiddleware[] = []

    private serverUrl: string = ''

    setServerUrl = (serverUrl: string) => {
        this.serverUrl = serverUrl
    }

    send<T>(
        config: AxiosRequestConfig,
        methodMiddlewares: MethodMiddlewares = {}
    ): Promise<T | undefined> {
        if (!this.serverUrl) {
            throw new Error('No serverUrl is set!')
        }

        const { requestMiddlewares, responseMiddlewares, errorMiddlewares }
            = { ...defaultMethodMiddlewares, ...methodMiddlewares }

        let requestStart: number = Date.now()

        BaseHttpService.commonRequestMiddlewares.forEach(middleware => middleware(config))
        requestMiddlewares.forEach(middleware => middleware(config))

        return axios.request({
            baseURL: this.serverUrl,
            ...config,
        })
            .then((response) => {
                console.debug(`<== ${Date.now() - requestStart}ms, data:\n`, {
                    method: config.method,
                    params: config.params,
                    url: config.url,
                    data: config.data,
                    response: response.data
                })

                BaseHttpService.commonResponseMiddlewares.forEach(middleware => middleware(response))
                responseMiddlewares.forEach(middleware => middleware(response))

                return response.data
            })
            .catch((error: AxiosError) => {
                console.error(`<== ${Date.now() - requestStart}ms, Axios error:\n`, {
                    method: config.method,
                    params: config.params,
                    url: config.url,
                    data: config.data,
                    error: error
                })

                BaseHttpService.commonErrorMiddlewares.forEach(middleware => middleware(error))
                errorMiddlewares.forEach(middleware => middleware(error))
            })
    }
}
