import { Button, makeStyles, Paper, Step, StepLabel, Stepper } from "@material-ui/core";
import { CreateRounded } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Page } from "../page";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '560px'
    },

    heroBlock: {

        '& h1': {
            fontWeight: 900,
            fontSize: '38px',
            lineHeight: '49px'
        }
    },

    description: {
        margin: '30px 0',
        color: '#545555',
        fontSize: '18px',
        fontWeight: 400,
        lineHeight: '27px',
        fontFamily: " 'Lato', sans-serif "
    },

    heroLink: {
        padding: 4,
        fontFamily: " 'Mulish', sans-serif ",
        fontWeight: 800,
        fontSize: '14px',
        lineHeight: '17.5px',
        marginLeft: '20px'
    },

    groupName: {
        fontWeight: 800,
        fontSize: '12px',
        lineHeight: '15px',
        marginBottom: '30px',

        '& span': {
            textTransform: 'uppercase',
        },
        '& p': {
            marginLeft: '6px',
            display: 'inline',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '27px',
            fontFamily: " 'Lato', sans-serif "
        }
    }
}))

export const CreateProposal: React.FC<{}> = observer(() => {
    const [activeStep, setActiveStep] = useState(0)
    const classes = useStyles()
    return (
        <div>
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {[
                        'Propose Action',
                        'Reviev Proposal',
                        'Proposal Opened'
                    ].map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div>
                <Page>
                    <div className={classes.root}>
                        <div className={classes.heroBlock}>
                            <h1>Regen #22 Stake 500 REGEN and spend 100 REGEN
                                <Button className={classes.heroLink} color="primary">
                                    <CreateRounded style={{ fontSize: 16, marginRight: '4px' }}></CreateRounded>
                                    rename
                                </Button>
                            </h1>
                        </div>
                        <div className={classes.description}>
                            <span>We propose to delegate 500 Regen to LOACOM and to spend 100 REGEN.
                                <Button className={classes.heroLink} color="primary">
                                    <CreateRounded style={{ fontSize: 16, marginRight: '4px' }}></CreateRounded>
                                    Add description
                                </Button>
                            </span>
                        </div>
                        <div className={classes.groupName}>
                            <span>group:</span>
                            <p>Foo dev gorup</p>
                        </div>
                    </div>
                    <Paper elevation={1}>
                        <div>
                            <h2>Deligate funds</h2>
                        </div>
                        <div>
                            <div>
                                <p>Choose validator</p>
                            </div>
                            <div>
                                <p>Deligation Amount</p>
                                <p>Available:</p>
                                <span>1500 REGEN</span>
                            </div>
                        </div>

                    </Paper>
                    <div>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => setActiveStep(activeStep + 1)}
                            >
                                {'Next'}
                            </Button>
                        </div>
                    </div>
                </Page>

            </div>
        </div>
    )
})
