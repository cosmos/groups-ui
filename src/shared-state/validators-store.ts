import { makeObservable, observable, runInAction } from 'mobx'
import { ValidatorsService } from '../protocol/validators-service'
import { Validator } from '../generated/cosmos/staking/v1beta1/staking'


export class ValidatorsStore {
    @observable
    allValidators: readonly Validator[] = []

    constructor() {
        makeObservable(this)
    }

    fetchAllValidators = async (): Promise<readonly Validator[]> => {
        const validators = await ValidatorsService.instance.allValidators()

        runInAction(() => {
            this.allValidators = validators
        })

        return validators
    }
}
