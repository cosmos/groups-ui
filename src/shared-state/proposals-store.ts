import {ProposalsService} from "../protocol/proposals-service";

export interface Proposal {

}

export class ProposalsStore {
    constructor() {
        // makeObservable(this)
    }

    fetchProposals = async (policyAddress: string): Promise<readonly Proposal[]> => {
        const all = await ProposalsService.instance.proposalsByGroupPolicy(policyAddress)
        return []
    }
}
