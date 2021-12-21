import { observable, runInAction } from 'mobx'
import { GroupsService } from '../protocol/groups-service'
import { GroupInfo } from '../generated/regen/group/v1alpha1/types'

export class GroupsStore {
    @observable
    groups: GroupInfo[] = []

    fetchGroups = async () => {
        const groups = await GroupsService.instance.groupsByAdmin("regen1c4tmw7cknjkppazxc4d36ueww56t6vvgg69pk8")
        runInAction(() => {
            this.groups = groups
        })
    }
}
