import { observable } from 'mobx'

export class GroupsStore {
    @observable
    groups: string[] = []
}
