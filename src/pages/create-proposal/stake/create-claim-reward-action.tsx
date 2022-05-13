import React, {useEffect} from "react";
import {Button, FormGroup, TextField} from "@material-ui/core";
import {useStores} from "../../../shared-state/repo";
import {BankService} from "../../../protocol/bank-service";
import {useStyles} from "../create-proposal-styles";
import {ActionStateType} from "../../../shared-state/create-proposal-store";

export const CreateClaimRewardAction: React.FC<{id: symbol}> = ({id}) => {
    // todo: fee
    const classes = useStyles()
    const {updateAction, newProposal} = useStores().createProposalStore
    const {chainInfo} = useStores().chainInfoStore

    // const initialData = newProposal.actions.find( a => a.id === id).data as ClaimRewardActionData
    // const [balance, setBalance] = React.useState<number>(0)
    // const [amount, setAmount] = React.useState<number>(initialData.amount)

    useEffect(() => {
        updateAction(id, {
            type: ActionStateType.CLAIM_REWARD
        })
    }, [])

    /*useEffect(() => {
        BankService.instance.getAllUserBalances().then(balances => {
            let balance = balances.find(coin => coin.denom.toUpperCase() === "REGEN");
            if (balance) {
                const currency = chainInfo.currencies.find( currency => currency.coinDenom.toUpperCase() === "REGEN")
                setBalance(parseFloat(balance.amount) / 10**currency.coinDecimals)
            }
        })
    }, [chainInfo])*/

    /*const handleAmountChange = (event) => {
        let amount = parseFloat(event.target.value);
        setAmount(amount)
    }*/

    return (
        <>
          <div className="marginB">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p className={classes.paperTitle}>Some description</p>
              </div>
          </div>
      </>
    )
}
