import React from "react";
import {Paper} from "@material-ui/core";
import {useStores} from "../../../shared-state/repo";
import {truncateAddress} from "../../../utils";
import {observer} from "mobx-react-lite";
import {useStyles} from "../create-proposal-styles";
import {StakeActionData, TextActionData} from "../../../shared-state/proposals-store";

export const PreviewTextAction: React.FC<{id: symbol}> = observer(({id}) => {
    const classes = useStyles()
    const {newProposal} = useStores().proposalsStore
    const data = newProposal.actions.find(a => a.id === id)?.data as TextActionData

    return (
        <Paper elevation={1} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '30px' }}>
            <div className={classes.paperHead}>
                <h2>Text</h2>
            </div>
            <div className={classes.paperBody}>
                <pre className={classes.description}>{data.text}</pre>
            </div>
        </Paper>
    )
})
