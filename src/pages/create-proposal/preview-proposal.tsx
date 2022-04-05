import React from "react";
import {Button, Paper} from "@material-ui/core";
import {stores, useStores} from "../../shared-state/repo";
import {ActionStateType, ActionType, StakeActionData} from "../../shared-state/create-proposal-store";
import {observer} from "mobx-react-lite";
import {useStyles} from "./create-proposal-styles";
import {PreviewDelegateAction} from "./stake/preview-delegate-action";
import {PreviewRedelegateAction} from "./stake/preview-redelegate-action";
import {PreviewUndelegateAction} from "./stake/preview-undelegate-action";
import {PreviewClaimRewardAction} from "./stake/preview-claim-reward-action";
import {PreviewTextAction} from "./others/preview-text-action";
import {PreviewSpendAction} from "./others/preview-spend-action";
import {PreviewParameterChangeAction} from "./others/preview-parameter-change-action";

export const PreviewProposal: React.FC<{}> = observer(({}) => {
    const classes = useStyles()
    const {newProposal} = useStores().createProposalStore

    return (
        <>
            <div className={classes.root}>
                <div className={classes.heroBlock}>
                    <h1 style={{ margin: ' 55px auto', textAlign: 'center' }}>Review your proposal</h1>
                </div>

                <Paper elevation={1} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '30px' }}>
                    <div className={classes.paperBody}>
                        <div className={classes.heroBlock}>
                            <h2>{newProposal.name}</h2>
                        </div>
                        <div className={classes.description} style={{ margin: '30px 0', }}>
                            <span>{newProposal.description}</span>
                        </div>
                        <div className={classes.groupName} style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>group:</span>
                            <p>{stores.groupsStore?.editedGroup?.metadata?.name}</p>
                        </div>
                    </div>
                </Paper>

                {newProposal.actions.map( ({id, data}, index) => {
                    switch (id.description) {
                        case ActionType.STAKE:
                            switch (data['type']) {
                                case ActionStateType.DELEGATE:
                                    return (<PreviewDelegateAction id={id}/>)
                                case ActionStateType.REDELEGATE:
                                    return (<PreviewRedelegateAction id={id}/>)
                                case ActionStateType.UNDELEGATE:
                                    return (<PreviewUndelegateAction id={id}/>)
                                case ActionStateType.CLAIM_REWARD:
                                    return (<PreviewClaimRewardAction id={id}/>)
                            }
                            break
                        case ActionType.TEXT:
                            return (<PreviewTextAction id={id}/>)
                        case ActionType.SPEND:
                            return (<PreviewSpendAction id={id}/>)
                        case ActionType.PARAMETER_CHANGE:
                            return (<PreviewParameterChangeAction id={id}/>)
                    }
                    return ''
                })}

                {/*<Paper elevation={1} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '72px' }}>
                    <div className={classes.paperHead}>
                        <h2>Spend Proposal</h2>
                    </div>
                    <div className={classes.paperBody}>
                        <div className="marginB">
                            <p className={classes.paperTitle}>From</p>
                            <p className={classes.description}>regensdk192...kd81k0sk</p>
                        </div>
                        <div className="marginB">
                            <div>
                                <p className={classes.paperTitle}>To</p>
                                <p className={classes.description}>regensdk192...kd81k0sk</p>
                            </div>
                            <div className={classes.inputBlock}>
                            </div>
                        </div>
                        <div>
                            <p className={classes.paperTitle}>Amount</p>
                            <div className={classes.paperSubtitle}><span >100 regen</span></div>
                        </div>
                    </div>

                </Paper>*/}
            </div>
        </>
    )
})
