import React from 'react'
import { GroupsStore } from './groups-store'

export class StoresRepository {
    static instance: StoresRepository

    constructor(
        public groupsStore: GroupsStore,
    ) {}
}

let storesContext: React.Context<StoresRepository>

export function initStores(): void {
    const groupsStore = new GroupsStore()

    StoresRepository.instance = new StoresRepository(
        groupsStore,
    )
    storesContext = React.createContext(StoresRepository.instance)
    window['storesRepository'] = StoresRepository.instance // for debug
}

export const useStores = () => React.useContext(storesContext)
