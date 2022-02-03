import { Button, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, Step, StepLabel, Stepper, TextField } from "@material-ui/core";
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
    },

    paperHead: {
        padding: '30px',
        backgroundColor: '#EFEFEF',
        borderBottom: '1px solid #D2D5D9',
        borderRadius: '10px 10px 0 0'
    },

    paperBody: {
        padding: '33px 30px',
        fontFamily: " 'Lato', sans-serif ",
        fontWeight: 400,
        fontSize: '14px'
    },

    paperTitle: {
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '26px',
        marginBottom: '9px'
    },

    paperSubtitle: {
        lineHeight: '21px',
        display: 'flex',
        alignItems: 'center',

        '& span': {
            fontWeight: 800,
            lineHeight: '17.5px'
        }
    }
}))

export const CreateProposal: React.FC<{}> = observer(() => {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
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
                    <Paper elevation={1} style={{ borderRadius: '10px', border: '1px solid #D2D5D9' }}>
                        <div className={classes.paperHead}>
                            <h2>Deligate funds</h2>
                        </div>
                        <div className={classes.paperBody}>
                            <div>
                                <p className={classes.paperTitle}>Choose validator</p>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                                    <Select
                                        fullWidth
                                        id="demo-simple-select-outlined"
                                        value={age}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className={classes.paperTitle}>Deligation Amount</p>
                                <div className={classes.paperSubtitle}>
                                    <p>Available:</p>
                                    <span>1500 REGEN</span>
                                </div>
                            </div>
                            <div>
                                <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{ width: '48%' }} />
                                <FormControl variant="outlined" style={{ width: '48%' }}>
                                    <InputLabel id="demo-simple-select-outlined-label" ></InputLabel>
                                    <Select
                                        style={{ height: '56px' }}
                                        fullWidth
                                        id="demo-simple-select-outlined"
                                        value={age}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
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