import { BaseHttpService, GET, MethodMiddlewares } from './base-http-service'
import { getService, service } from './services'

@service
export class GroupsService extends BaseHttpService {

    static serviceName: string = 'GroupsService'

    static get instance(): GroupsService {
        return getService<GroupsService>(GroupsService.serviceName)
    }

    getGroups = async (methodMiddlewares: MethodMiddlewares = {}) => {
        return super.send<string[]>({
            url: '/groups',
            method: GET,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        }, methodMiddlewares)
    }
}
