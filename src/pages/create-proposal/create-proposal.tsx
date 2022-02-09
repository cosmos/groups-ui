import { Button, Divider, Drawer, FormControl, IconButton, InputLabel, List, ListItem, ListItemText, makeStyles, MenuItem, Paper, Select, Step, StepLabel, Stepper, SvgIcon, TextField } from "@material-ui/core";
import { Close, CreateRounded, InfoOutlined, SettingsOutlined, SettingsRounded } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Page } from "../page";
import { ReactComponent as VectorIcon } from '../../icons/vector.svg'
import classNames from "classnames";
type Anchor = 'top' | 'left' | 'bottom' | 'right';

const expand = (place) => {
    const block = document.querySelector(place)
    block.classList.toggle("active")
    return (console.log(block))
}

const drawerStyles = makeStyles((theme) => ({
    list: {
        width: '420px',
        padding: '41px 45px 0 38px',

        "& h1": {
            fontSize: '24px',
            fontWeight: 900,
            lineHeight: '35px',
            color: '#202020',
            marginBottom: '35px'
        }
    },
    button: {
        padding: 0,
        display: 'flex',
        borderRadius: '5px',
        border: '1px solid #EFEFEF',
        height: '60px',
        margin: '10px 0'
    },
    iconBox: {
        padding: '10px',
        backgroundColor: '#B1CAEC',
        height: '100%',
        width: '55px',
        borderRadius: '5px 0 0 5px'
    },
    text: {
        '& span': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            '& p': {
                marginLeft: '8px'
            }
        }
    }
}))
const useStyles = makeStyles((theme) => ({
    root: {
        width: '560px',
        "& .active": {
            display: 'block',
        }
    },

    heroBlock: {

        '& h1': {
            fontWeight: 900,
            fontSize: '38px',
            lineHeight: '49px'
        }
    },

    description: {
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
            marginRight: '6px',
        },
        '& p': {
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
        borderRadius: '10px 10px 0 0',

        '& h2': {
            fontSize: '18px'
        }
    },

    paperBody: {
        padding: '33px 30px',
        fontFamily: " 'Lato', sans-serif ",
        fontWeight: 400,
        fontSize: '14px',

        '& .marginB': {
            marginBottom: '30px'
        }
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
    },

    inputBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expandBtn: {
        position: 'absolute',
        left: '48.4%',
        verticalAlign: 'top',
        top: '-55px',
        backgroundColor: '#D2D5D9',
        color: '#545555',
        minWidth: '30px',
        height: '30px',
        borderRadius: '100%',
        padding: 0,
        cursor: 'pointer',
        border: 'none',

        '& .horizontal': {
            backgroundColor: '#545555',
            height: '3px',
            position: 'absolute',
            top: '46%',
            left: '20%',
            right: '20%',
        },
        '& .vertical': {
            position: 'absolute',
            top: '46%',
            left: '20%',
            right: '20%',
            transform: 'rotate(90deg)',
            height: '3px',
            backgroundColor: '#545555',
        },
    },
    actionBtn: {
        backgroundColor: 'white',
        borderRadius: '10px',
        color: '#545555',
        fontSize: '14px',
        lineHeight: '18px',
        fontWeight: 800,
        padding: '40px 0',
    },
    hiddenBlock: {
        display: 'none',
        marginBottom: '100px'
    },
    finishedBtn: {
        display: 'block',
        margin: '50px auto',
        marginBottom: '200px',
        backgroundColor: '#3D7ACF',
        borderRadius: '2px',
        padding: '8px 20px',
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '18px',
        lineHeight: '23px'
    },
}))

export const CreateProposal: React.FC<{}> = observer(() => {

    const [age, setAge] = React.useState('');
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [activeStep, setActiveStep] = useState(0)
    const classes = useStyles()
    const drawer = drawerStyles()
    const list = (anchor: Anchor) => (
        <div
            className={drawer.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <IconButton style={{ marginLeft: '90%' }} onClick={toggleDrawer('right', false)}><Close /></IconButton>
            <h1>Add New Action</h1>
            <p className={classes.paperTitle} style={{ marginBottom: '0' }}>Event type</p>
            <List>
                {['Text', 'Spend proposal', 'Parameter change', 'Delegate funds', 'Create account'].map((text) => (
                    <ListItem button key={text} className={drawer.button} onClick={() => (console.log('click'))}>
                        <div className={drawer.iconBox}>
                            <SettingsOutlined style={{ width: '100%', height: '100%', color: '#3D7ACF' }} />
                        </div>
                        <ListItemText className={drawer.text} >
                            <p>{text}</p>
                            <IconButton style={{ padding: '0px', marginRight: '23px', }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </div>
    );
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
                    {activeStep === 0 && (
                        <>
                            <div className={classes.root}>
                                <div className={classes.heroBlock}>
                                    <h1>Regen #22 Stake 500 REGEN and spend 100 REGEN
                                        <Button className={classes.heroLink} color="primary">
                                            <CreateRounded style={{ fontSize: 16, marginRight: '4px' }}></CreateRounded>
                                            rename
                                        </Button>
                                    </h1>
                                </div>
                                <div className={classes.description} style={{ margin: '30px 0', }}>
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

                                <Paper elevation={0} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '72px' }}>
                                    <div className={classes.paperHead}>
                                        <h2>Delegate funds</h2>
                                    </div>
                                    <div className={classes.paperBody}>
                                        <div className="marginB">
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
                                        <div className="marginB">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <p className={classes.paperTitle}>Delegation amount</p>
                                                <div className={classes.paperSubtitle}>
                                                    <p style={{ marginRight: '5px' }}>Available:</p>
                                                    <span>1500 REGEN</span>
                                                </div>
                                            </div>
                                            <div className={classes.inputBlock}>
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
                                        <div>
                                            <p className={classes.paperTitle}>Transaction fee</p>
                                            <div className={classes.paperSubtitle}><span >.001 regen</span></div>
                                        </div>
                                    </div>

                                </Paper>
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', width: '100%' }}>
                                        <SvgIcon component={VectorIcon} style={{ height: '125px', width: '23px', position: 'absolute', top: '-123px', left: '50%' }} />
                                        <button aria-label="expand" className={classes.expandBtn} onClick={() => { expand("#newAction") }}>
                                            <span className="horizontal"></span>
                                            <span className="vertical"></span>
                                        </button>
                                    </div>
                                </div>
                                <div id="newAction" className={classes.hiddenBlock}>
                                    <Button fullWidth color="primary" variant="outlined" className={classes.actionBtn} onClick={toggleDrawer('right', true)}>
                                        + new action
                                    </Button>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', width: '100%', top: '72px' }}>
                                            <SvgIcon component={VectorIcon} style={{ height: '125px', width: '23px', position: 'absolute', top: '-123px', left: '50%' }} />
                                            <button aria-label="expand" className={classes.expandBtn} onClick={() => { expand("#spendProp") }}>
                                                <span className="horizontal"></span>
                                                <span className="vertical"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <Paper id="spendProp" className={classes.hiddenBlock} elevation={0} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', margin: '72px 0', }}>
                                        <div className={classes.paperHead}>
                                            <h2>Spend proposal</h2>
                                        </div>
                                        <div className={classes.paperBody}>
                                            <div className="marginB">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <p className={classes.paperTitle}>From</p>
                                                    <p className={classes.paperTitle} style={{ marginRight: '43%' }}>To</p>
                                                </div>
                                                <div className={classes.inputBlock}>
                                                    <TextField id="outlined-basic" label="From" variant="outlined" style={{ width: '48%' }} />
                                                    <TextField id="outlined-basic" label="To" variant="outlined" style={{ width: '48%' }} />
                                                </div>
                                            </div>
                                            <div className="marginB">
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <p className={classes.paperTitle}>Amount</p>
                                                </div>
                                                <div className={classes.inputBlock}>
                                                    <TextField id="outlined-basic" label="From" variant="outlined" style={{ width: '48%' }} />
                                                    <span style={{ fontSize: '16px', marginRight: '37%' }}>REGEN</span>
                                                </div>
                                            </div>

                                        </div>
                                    </Paper>
                                </div>

                                <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                                    {list('right')}
                                </Drawer>
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
                            </div>
                        </>
                    )}
                    {activeStep === 1 && (
                        <>
                            <div className={classes.root}>
                                <div className={classes.heroBlock}>
                                    <h1 style={{ margin: ' 55px auto', textAlign: 'center' }}>Reviev your proposal</h1>
                                </div>

                                <Paper elevation={1} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '72px' }}>
                                    <div className={classes.paperBody}>
                                        <div className={classes.heroBlock}>
                                            <h2>Regen #22 Stake 500 REGEN and spend 100 REGEN</h2>
                                        </div>
                                        <div className={classes.description} style={{ margin: '30px 0', }}>
                                            <span>We propose to delegate 500 Regen to LOACOM and to spend 100 REGEN.</span>
                                        </div>
                                        <div className={classes.groupName} style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>group:</span>
                                            <p>Foo dev gorup</p>
                                        </div>
                                    </div>

                                </Paper>
                                <Paper elevation={1} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '72px' }}>
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

                                </Paper>
                                <Paper elevation={1} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', marginBottom: '72px' }}>
                                    <div className={classes.paperHead}>
                                        <h2>Delegate funds</h2>
                                    </div>
                                    <div className={classes.paperBody}>
                                        <div className="marginB">
                                            <p className={classes.paperTitle}>Validator</p>
                                            <p className={classes.description}>regensdk192...kd81k0sk</p>
                                        </div>
                                        <div className="marginB">
                                            <div>
                                                <p className={classes.paperTitle}>Delegation amount:</p>
                                                <p className={classes.description}>regensdk192...kd81k0sk</p>
                                            </div>
                                            <div className={classes.inputBlock}>
                                            </div>
                                        </div>
                                        <div>
                                            <p className={classes.paperTitle}>Transaction fee</p>
                                            <div className={classes.paperSubtitle}><span >.001 regen</span></div>
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
                            </div>
                        </>
                    )}
                    {activeStep === 2 && (
                        <>
                            <div className={classes.root}>
                                <div className={classes.heroBlock} style={{ textAlign: 'center' }}>
                                    <h1 style={{ margin: ' 55px auto', }}>Your proposal is open</h1>
                                    <div className={classes.description} style={{ margin: '30px 0', }}>
                                        <span>You have successfully created a proposal!</span>
                                    </div>
                                    <Button className={classes.finishedBtn} variant="contained" color="primary" >view your proposal</Button>
                                </div>
                            </div>
                        </>
                    )}
                </Page>

            </div>
        </div>
    )
})