import React from 'react'
import { GroupsStore } from './groups-store'
import { ChainInfoStore } from './chain-info-store'

let storesContext: React.Context<StoresRepository>
export const useStores = () => React.useContext(storesContext)

export class StoresRepository {
    static _instance: StoresRepository
    static get instance(): StoresRepository {
        const chainInfoStore = new ChainInfoStore()
        const groupsStore = new GroupsStore()

        StoresRepository._instance = new StoresRepository(
            chainInfoStore,
            groupsStore,
        )
        storesContext = React.createContext(StoresRepository._instance)
        window['storesRepository'] = StoresRepository._instance // for debug

        return StoresRepository._instance
    }

    constructor(
        public chainInfoStore: ChainInfoStore,
        public groupsStore: GroupsStore,
    ) {}
}
