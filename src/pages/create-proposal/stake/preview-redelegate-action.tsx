import React from "react";
import {Paper} from "@material-ui/core";
import {useStores} from "../../../shared-state/repo";
import {truncateAddress} from "../../../utils";
import {observer} from "mobx-react-lite";
import {useStyles} from "../create-proposal-styles";
import {RedelegateActionData} from "../../../shared-state/create-proposal-store";

export const PreviewRedelegateAction: React.FC<{id: symbol}> = observer(({id}) => {
    const classes = useStyles()
    const {newProposal} = useStores().createProposalStore
    const data = newProposal.actions.find(a => a.id === id)?.data as RedelegateActionData

    return (
        <Paper elevation={1} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '72px' }}>
            <div className={classes.paperHead}>
                <h2>Redelegate funds</h2>
            </div>
            <div className={classes.paperBody}>
                <div className="marginB">
                    <p className={classes.previewTitle}>From validator</p>
                    <p className={classes.description}>{truncateAddress(data.fromValidatorAddress)}</p>
                </div>
                <div className="marginB">
                    <p className={classes.previewTitle}>To validator</p>
                    <p className={classes.description}>{truncateAddress(data.toValidatorAddress)}</p>
                </div>
                <div className="marginB">
                    <div>
                        <p className={classes.previewTitle}>Delegation amount:</p>
                        <p className={classes.description}>{data.amount} {data.coinDenom}</p>
                    </div>
                    <div className={classes.inputBlock}>
                    </div>
                </div>
                <div>
                    <p className={classes.previewTitle}>Transaction fee</p>
                    <p className={classes.description}>.001 regen</p>
                </div>
            </div>
        </Paper>
    )
})
