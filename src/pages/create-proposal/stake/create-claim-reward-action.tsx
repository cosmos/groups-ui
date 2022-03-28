import React, {useEffect} from "react";
import {Button, FormGroup, TextField} from "@material-ui/core";
import {useStores} from "../../../shared-state/repo";
import {BankService} from "../../../protocol/bank-service";
import {useStyles} from "../create-proposal-styles";
import {ActionStateType, StakeActionData} from "../../../shared-state/proposals-store";

export const CreateClaimRewardAction: React.FC<{id: symbol}> = ({id}) => {
    // todo: fee
    const classes = useStyles()
    const {updateAction, newProposal} = useStores().proposalsStore
    const {chainInfo} = useStores().chainInfoStore

    const initialData = newProposal.actions.find( a => a.id === id).data as StakeActionData
    const [balance, setBalance] = React.useState<number>(0)
    const [amount, setAmount] = React.useState<number>(initialData.amount)

    useEffect(() => {
        updateAction(id, {
            type: ActionStateType.CLAIM_REWARD,
            amount
        })
    }, [amount])

    useEffect(() => {
        BankService.instance.getAllBalances().then( balances => {
            let balance = balances.find(coin => coin.denom.toUpperCase() === "REGEN");
            if (balance) {
                const currency = chainInfo.currencies.find( currency => currency.coinDenom.toUpperCase() === "REGEN")
                setBalance(parseFloat(balance.amount) / 10**currency.coinDecimals)
            }
        })
    }, [chainInfo])

    const handleAmountChange = (event) => {
        let amount = parseFloat(event.target.value);
        setAmount(amount)
    }

    return (
        <>
          <div className="marginB">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p className={classes.paperTitle}>Amount</p>
                  <div className={classes.paperSubtitle}>
                      <p style={{ marginRight: '5px' }}>Available:</p>
                      <span>{balance} REGEN</span>
                  </div>
              </div>
              <div className={classes.inputBlock}>
                  <FormGroup row >
                      <TextField variant="outlined" style={{width: '430px'}} value={amount} onChange={handleAmountChange}/>
                      <Button variant="contained" disableElevation onClick={() => setAmount(balance)}>
                          max
                      </Button>
                  </FormGroup>
              </div>
          </div>
          <div>
              <p className={classes.paperTitle}>Transaction fee</p>
              <div className={classes.paperSubtitle}><span >.001 regen</span></div>
          </div>
      </>
    )
}
