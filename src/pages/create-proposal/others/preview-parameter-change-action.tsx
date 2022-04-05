import React from "react";
import {Paper} from "@material-ui/core";
import {useStores} from "../../../shared-state/repo";
import {observer} from "mobx-react-lite";
import {useStyles} from "../create-proposal-styles";
import {ParameterChangeActionData} from "../../../shared-state/create-proposal-store";

export const PreviewParameterChangeAction: React.FC<{id: symbol}> = observer(({id}) => {
    const classes = useStyles()
    const {newProposal} = useStores().createProposalStore
    const data = newProposal.actions.find(a => a.id === id)?.data as ParameterChangeActionData

    return (
        <Paper elevation={1} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '30px' }}>
            <div className={classes.paperHead}>
                <h2>Parameter change</h2>
            </div>
            <div className={classes.paperBody}>
                <div className="marginB">
                    <p className={classes.previewTitle}>Module</p>
                    <p className={classes.description}>{data.module}</p>
                </div>
                <div className="marginB">
                    <div>
                        <p className={classes.previewTitle}>Parameter</p>
                        <p className={classes.description}>{data.parameter}</p>
                    </div>
                </div>
                <div className="marginB">
                    <div>
                        <p className={classes.previewTitle}>Value</p>
                        <p className={classes.description}>{data.value}</p>
                    </div>
                </div>
            </div>
        </Paper>
    )
})
