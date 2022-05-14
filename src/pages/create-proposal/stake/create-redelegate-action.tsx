import React, {useEffect} from "react";
import {Button, FormControl, FormGroup, MenuItem, Select, TextField} from "@material-ui/core";
import {useStores} from "../../../shared-state/repo";
import {BankService} from "../../../protocol/bank-service";
import {useStyles} from "../create-proposal-styles";
import {ActionStateType, RedelegateActionData} from "../../../shared-state/create-proposal-store";

export const CreateRedelegateAction: React.FC<{id: symbol}> = ({id}) => {
    // todo: fee
    const classes = useStyles()
    const {updateAction, newProposal} = useStores().createProposalStore
    const {allValidators, fetchAllValidators} = useStores().validatorsStore
    const {chainInfo} = useStores().chainInfoStore

    const initialData = newProposal.actions.find( a => a.id === id).data as RedelegateActionData
    const [fromValidatorAddress, setFromValidatorAddress] = React.useState(initialData.fromValidatorAddress)
    const [toValidatorAddress, setToValidatorAddress] = React.useState(initialData.toValidatorAddress)
    const [currencyDenom, setCurrencyDenom] = React.useState(initialData.coinDenom || chainInfo.currencies[0].coinDenom)
    const [balance, setBalance] = React.useState<number>(0)
    const [amount, setAmount] = React.useState<number>(initialData.amount)

    useEffect(() => {
        updateAction(id, {
            type: ActionStateType.REDELEGATE,
            fromValidatorAddress,
            toValidatorAddress,
            coinDenom: currencyDenom,
            amount
        })
    }, [fromValidatorAddress, toValidatorAddress, currencyDenom, amount])

    useEffect(() => {
        fetchAllValidators()
            .then( list => {
                if (list.length === 1) {
                    setFromValidatorAddress(list[0].operator_address)
                    setToValidatorAddress(list[0].operator_address)
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

    const handleFromValidatorChange = (event) => {
        const validator = allValidators.find(v => v.operator_address === event.target.value);
        setFromValidatorAddress(validator?.operator_address)
    }

    const handleToValidatorChange = (event) => {
        const validator = allValidators.find(v => v.operator_address === event.target.value);
        setToValidatorAddress(validator?.operator_address)
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
              <p className={classes.paperTitle}>From validator</p>
              <FormControl variant="outlined" fullWidth>
                  <Select
                      fullWidth
                      placeholder="Select validator"
                      value={fromValidatorAddress}
                      onChange={handleFromValidatorChange}
                  >
                      { !allValidators ? (<MenuItem value={''}>Loading...</MenuItem>) : allValidators.map( validator => (
                          <MenuItem key={validator.operator_address} value={validator.operator_address}>{validator.description.moniker}</MenuItem>
                      ))}
                  </Select>
              </FormControl>
          </div>
          <div className="marginB">
              <p className={classes.paperTitle}>To validator</p>
              <FormControl variant="outlined" fullWidth>
                  <Select
                      fullWidth
                      placeholder="Select validator"
                      value={toValidatorAddress}
                      onChange={handleToValidatorChange}
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
