import React, {useEffect} from "react";
import {Button, FormControl, FormGroup, MenuItem, Select, TextField} from "@material-ui/core";
import {useStores} from "../../../shared-state/repo";
import {BankService} from "../../../protocol/bank-service";
import {useStyles} from "../create-proposal-styles";
import {ActionStateType, DelegateActionData} from "../../../shared-state/create-proposal-store";

export const CreateDelegateAction: React.FC<{id: symbol, type: ActionStateType}> = ({id, type}) => {
    // todo: fee
    const classes = useStyles()
    // const [id] = useState(Symbol(ProposalType.STAKE_DELEGATE))
    const {updateAction, newProposal} = useStores().createProposalStore
    // in case of editing
    const initialData = newProposal.actions.find( a => a.id === id).data as DelegateActionData
    const {allValidators, fetchAllValidators} = useStores().validatorsStore
    const {chainInfo} = useStores().chainInfoStore
    const [validatorAddress, setValidatorAddress] = React.useState(initialData.validatorAddress)
    const [currencyDenom, setCurrencyDenom] = React.useState(initialData.coinDenom || chainInfo.currencies[0].coinDenom)
    const [balance, setBalance] = React.useState<number>(0)
    const [amount, setAmount] = React.useState<number>(initialData.amount)

    useEffect(() => {
        // maybe we need just update initialData object?
        updateAction(id, {
            type,
            validatorAddress,
            coinDenom: currencyDenom,
            amount
        })
    }, [validatorAddress, currencyDenom, amount])

    useEffect(() => {
        fetchAllValidators()
            .then( list => {
                if (list.length === 1) {
                    setValidatorAddress(list[0].operator_address)
                }
            })
    }, [fetchAllValidators])

    useEffect(() => {
        BankService.instance.getAllUserBalances().then(balances => {
            let balance = balances.find(coin => coin.denom.toUpperCase() === currencyDenom.toUpperCase());
            if (balance) {
                const currency = chainInfo.currencies.find( currency => currency.coinDenom === currencyDenom)
                setBalance(parseFloat(balance.amount) / 10**currency.coinDecimals)
            }
        })
    }, [currencyDenom, chainInfo])

    const handleValidatorChange = (event) => {
        const validator = allValidators.find(v => v.operator_address === event.target.value);
        setValidatorAddress(validator?.operator_address)
    }

    const handleCurrencyChange = (event) => {
        const coinDenom = chainInfo.currencies.find( c => c.coinDenom === event.target.value).coinDenom
        setCurrencyDenom(coinDenom)
    }

    const handleAmountChange = (event) => {
        let amount = parseFloat(event.target.value);
        setAmount(amount)
    }

    return (
        <>
          <div className="marginB">
              <p className={classes.paperTitle}>Validator</p>
              <FormControl variant="outlined" fullWidth>
                  <Select
                      fullWidth
                      placeholder="Select validator"
                      value={validatorAddress}
                      onChange={handleValidatorChange}
                  >
                      { !allValidators ? (<MenuItem value={''}>Loading...</MenuItem>) : allValidators.map( validator => (
                          <MenuItem key={validator.operator_address} value={validator.operator_address}>{validator.description.moniker}</MenuItem>
                      ))}
                  </Select>
              </FormControl>
          </div>
          <div className="marginB">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p className={classes.paperTitle}>Amount</p>
                  <div className={classes.paperSubtitle}>
                      <p style={{ marginRight: '5px' }}>Available:</p>
                      <span>{balance} {currencyDenom}</span>
                  </div>
              </div>
              <div className={classes.inputBlock}>
                  <FormGroup row style={{ width: '48%' }} >
                      <TextField variant="outlined" style={{width: '174px'}} value={amount} onChange={handleAmountChange}/>
                      <Button variant="contained" disableElevation onClick={() => setAmount(balance)}>
                          max
                      </Button>
                  </FormGroup>

                  <FormControl variant="outlined" style={{ width: '48%' }}>
                      <Select
                          style={{ height: '56px' }}
                          fullWidth
                          value={currencyDenom}
                          onChange={handleCurrencyChange}
                      >
                          { chainInfo.feeCurrencies.map( currency => (
                              <MenuItem key={currency.coinDenom} value={currency.coinDenom}>{currency.coinDenom}</MenuItem>
                          ))}
                      </Select>
                  </FormControl>
              </div>
          </div>
          <div>
              <p className={classes.paperTitle}>Transaction fee</p>
              <div className={classes.paperSubtitle}><span >.001 regen</span></div>
          </div>
      </>
    )
}
