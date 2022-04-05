import React, {useState} from "react";
import {FormControlLabel, Paper, Radio, RadioGroup} from "@material-ui/core";
import {CreateDelegateAction} from "./create-delegate-action";
import {useStyles} from "../create-proposal-styles";
import {ActionStateType} from "../../../shared-state/create-proposal-store";
import {CreateRedelegateAction} from "./create-redelegate-action";
import {CreateClaimRewardAction} from "./create-claim-reward-action";

export const CreateStakeAction: React.FC<{id: symbol}> = ({id}) => {
    const classes = useStyles()
    const [type, setType] = useState(ActionStateType.DELEGATE)

    return (
      <Paper elevation={0} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '72px' }}>
          <div className={classes.paperHead}>
              <h2>Stake</h2>
          </div>
          <div className={classes.paperBody}>
              <p className={classes.paperTitle}>Type</p>

              <RadioGroup
                  style={{marginBottom: '30px'}}
                  value={type}
                  onChange={(e) => { setType(e.target.value as ActionStateType) }}
              >
                  <FormControlLabel className={type === ActionStateType.DELEGATE ? "checked" : ""}
                                    value={ActionStateType.DELEGATE} control={<Radio />}
                                    label="Delegate" />
                  <FormControlLabel className={type === ActionStateType.REDELEGATE ? "checked" : ""}
                                    value={ActionStateType.REDELEGATE} control={<Radio />}
                                    label="Redelegate" />
                  <FormControlLabel className={type === ActionStateType.UNDELEGATE ? "checked" : ""}
                                    value={ActionStateType.UNDELEGATE} control={<Radio />}
                                    label="Undelegate" />
                  <FormControlLabel className={type === ActionStateType.CLAIM_REWARD ? "checked" : ""}
                                    value={ActionStateType.CLAIM_REWARD} control={<Radio />}
                                    label="Claim reward" />
              </RadioGroup>

              <div>
                  { type === ActionStateType.DELEGATE && ( <CreateDelegateAction id={id} type={ActionStateType.DELEGATE}/> )}
                  { type === ActionStateType.REDELEGATE && ( <CreateRedelegateAction id={id}/> ) }
                  { type === ActionStateType.UNDELEGATE && ( <CreateDelegateAction id={id} type={ActionStateType.UNDELEGATE}/> ) }
                  { type === ActionStateType.CLAIM_REWARD && ( <CreateClaimRewardAction id={id}/> ) }
              </div>
          </div>
      </Paper>
    )
}
