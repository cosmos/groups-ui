import React from "react";
import {Paper} from "@material-ui/core";
import {useStores} from "../../../shared-state/repo";
import {observer} from "mobx-react-lite";
import {useStyles} from "../create-proposal-styles";
import {ClaimRewardActionData} from "../../../shared-state/create-proposal-store";

export const PreviewClaimRewardAction: React.FC<{id: symbol}> = observer(({id}) => {
    const classes = useStyles()
    const {newProposal} = useStores().createProposalStore
    const data = newProposal.actions.find(a => a.id === id)?.data as ClaimRewardActionData

    return (
        <Paper elevation={1} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '30px' }}>
            <div className={classes.paperHead}>
                <h2>Claim reward</h2>
            </div>
            <div className={classes.paperBody}>
                Some description text
            </div>
        </Paper>
    )
})
