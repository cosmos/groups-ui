import {
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Step,
    StepLabel,
    Stepper,
    SvgIcon
} from "@material-ui/core";
import {Close, Description, InfoOutlined, SettingsOutlined, Tune} from "@material-ui/icons";
import {observer} from "mobx-react-lite";
import React, {useState} from "react";
import {Page} from "../page";
import {ReactComponent as DeligateIcon} from '../../icons/deligate.svg'
import {ReactComponent as SpendIcon} from '../../icons/spend.svg'
import {PreviewProposal} from "./preview-proposal";
import {useStores} from "../../shared-state/repo";
import {useStyles} from "./create-proposal-styles";
import {ActionsComposer} from "./actions-composer";
import {ActionType} from "../../shared-state/create-proposal-store";
import CreateProposalNavPanel from "./create-proposal-nav-panel";
import {PrimaryButton} from "../../components/primary-button";
import {useParams} from "react-router-dom";

type Anchor = 'top' | 'left' | 'bottom' | 'right';


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

export const CreateProposal: React.FC<{initialProposerType: ActionType}> = observer(({initialProposerType}) => {
    const {addAction, createProposal} = useStores().createProposalStore
    const {fetchGroupById} = useStores().groupsStore
    const params: any = useParams()
    const groupId = params.id

    const saveProposal = async () => {
        await createProposal(await fetchGroupById(groupId))
        setActiveStep(activeStep + 1)
    }

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    })

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return
        }

        setState({ ...state, [anchor]: open })
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
            <p className={classes.paperTitle} style={{ marginBottom: '0' }}>Action type</p>
            <List>
                {/* {['T', 'Spend proposal', 'Parameter change', 'Delegate funds', 'Create account'].map((text) => ( */}
                <ListItem button className={drawer.button} onClick={() => addAction(ActionType.TEXT)}>
                    <div className={drawer.iconBox}>
                        <Description style={{ width: '100%', height: '100%', color: '#3D7ACF' }} />
                    </div>
                    <ListItemText className={drawer.text} >
                        <p>Text</p>
                        <IconButton style={{ padding: '0px', marginRight: '23px', }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>
                    </ListItemText>
                </ListItem>
                <ListItem button className={drawer.button} onClick={() => addAction(ActionType.SPEND)}>
                    <div className={drawer.iconBox}>
                        <SvgIcon component={SpendIcon} style={{ width: '75%', height: '100%', marginLeft: '15%', color: '#3D7ACF' }} />
                    </div>
                    <ListItemText className={drawer.text} >
                        <p>Spend proposal</p>
                        <IconButton style={{ padding: '0px', marginRight: '23px', }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>
                    </ListItemText>
                </ListItem>
                <ListItem button className={drawer.button} onClick={() => addAction(ActionType.PARAMETER_CHANGE)}>
                    <div className={drawer.iconBox}>
                        <Tune style={{ width: '100%', height: '100%', color: '#3D7ACF' }} />
                    </div>
                    <ListItemText className={drawer.text} >
                        <p>Parameter change</p>
                        <IconButton style={{ padding: '0px', marginRight: '23px', }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>
                    </ListItemText>
                </ListItem>
                <ListItem button className={drawer.button} onClick={() => addAction(ActionType.STAKE)}>
                    <div className={drawer.iconBox}>
                        <SvgIcon component={DeligateIcon} style={{ width: '100%', height: '100%', color: '#3D7ACF' }} />
                    </div>
                    <ListItemText className={drawer.text} >
                        <p>Delegate funds</p>
                        <IconButton style={{ padding: '0px', marginRight: '23px', }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>
                    </ListItemText>
                </ListItem>
                <ListItem button className={drawer.button} onClick={() => addAction(ActionType.CREATE_ACCOUNT)}>
                    <div className={drawer.iconBox}>
                        <SettingsOutlined style={{ width: '100%', height: '100%', color: '#3D7ACF' }} />
                    </div>
                    <ListItemText className={drawer.text} >
                        <p>Create account</p>
                        <IconButton style={{ padding: '0px', marginRight: '23px', }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>
                    </ListItemText>
                </ListItem>
                {/* ))} */}
            </List>
        </div>
    );
    return (
        <div>
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {[
                        'Propose Action',
                        'Review Proposal',
                        'Proposal Opened'
                    ].map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div style={{ paddingBlock: '120px'}}>
                <Page>
                    {activeStep === 0 && (
                        <>
                            <ActionsComposer
                                initialProposerType={initialProposerType}
                                newAction={() => toggleDrawer('right', true)}/>
                            <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                                {list('right')}
                            </Drawer>
                            <CreateProposalNavPanel buttonLabel={'Save & Next'} progress={1/3}
                                                    onClick={() => setActiveStep(activeStep + 1)}/>
                        </>
                    )}
                    {activeStep === 1 && (
                        <>
                            <PreviewProposal />
                            <CreateProposalNavPanel buttonLabel={'Submit proposal'} progress={2/3}
                                                    enableBackButton={true} onBackClick={() => setActiveStep(activeStep - 1)}
                                                    onClick={saveProposal}/>
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
                                    <PrimaryButton >view your proposal</PrimaryButton>
                                </div>
                            </div>
                        </>
                    )}
                </Page>

            </div>
        </div>
    )
})
