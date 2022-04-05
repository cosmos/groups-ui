import React, { createContext } from 'react'
import { GroupsStore } from './groups-store'
import { ChainInfoStore } from './chain-info-store'
import { CreateProposalStore } from './create-proposal-store'
import {ValidatorsStore} from "./validators-store";
import {ProposalsStore} from "./proposals-store";

// import { configure } from "mobx"
// configure({
//     enforceActions: "always",
//     computedRequiresReaction: true,
//     reactionRequiresObservable: true,
//     observableRequiresReaction: true,
//     disableErrorBoundaries: true,
//     isolateGlobalState: false,
// })

export const stores = {
    chainInfoStore: new ChainInfoStore(),
    groupsStore: new GroupsStore(),
    createProposalStore: new CreateProposalStore(),
    proposalsStore: new ProposalsStore(),
    validatorsStore: new ValidatorsStore()
}

window['stores'] = stores // for debug
export const useStores = () => React.useContext(createContext(stores))
