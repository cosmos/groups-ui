import React, {SyntheticEvent, useEffect, useRef, useState} from "react";
import {FormControlLabel, makeStyles, Paper, Radio, RadioGroup} from "@material-ui/core";
import {useStyles} from "../create-proposal-styles";
import {useStores} from "../../../shared-state/repo";

export const CreateTextAction: React.FC<{id: symbol}> = ({id}) => {
    const classes = useStyles()
    const {newProposal} = useStores().createProposalStore
    const [text, setText] = useState(newProposal.actions.find(a => a.id === id).data['text'])

    const textRef = useRef<any>();

    const onChangeHandler = (e: SyntheticEvent) => {
        const target = e.target as HTMLTextAreaElement;
        textRef.current.style.height = "inherit";
        textRef.current.style.height = `${target.scrollHeight}px`;

        setText(e.target['value'])
    }

    useEffect(() => {
        newProposal.actions.find(a => a.id === id).data['text'] = text
    }, [text])

    return (
      <Paper elevation={0} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '72px' }}>
          <div className={classes.paperHead}>
              <h2>Text</h2>
          </div>
          <div className={classes.paperBody}>
              <textarea className={classes.textArea}
                        value={text}
                        ref={textRef}
                        onChange={onChangeHandler}/>
          </div>
      </Paper>
    )
}
