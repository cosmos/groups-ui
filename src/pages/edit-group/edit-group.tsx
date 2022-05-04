import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import { Button, FormControl, FormControlLabel, FormLabel, IconButton, Paper, Radio, RadioGroup, RadioProps, Step, StepLabel, Stepper, TextField } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { Routes } from '../../routes'
import { makeStyles } from '@material-ui/core/styles'
import { Page } from '../page'
import { Delete, InfoOutlined } from '@material-ui/icons'
import { cloneDeep } from 'lodash'
import { toJS } from 'mobx'
import {truncateAddress} from "../../utils";
import {CosmosNodeService} from "../../protocol/cosmos-node-service";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        flexWrap: 'wrap',
        '& > *': {
            margin: '0 auto',
            width: '560px',
            padding: '50px 30px'
        }
    },
    title: {
        fontWeight: 900,
        fontSize: '38px',
        margin: '0 auto',
        textAlign: 'center'
    },
    subTitle: {
        marginTop: '25px',
        textAlign: 'center',
        fontSize: '18px',
        lineHeight: '27px'
    },
    finishedBtn: {
        display: 'block',
        margin: '50px auto',
        backgroundColor: '#3D7ACF',
        borderRadius: '4px',
        padding: '14px 49px',
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '18px',
        lineHeight: '23px',
        transition: ".3s",

        "&:hover": {
            backgroundColor: '#3061a6',
        }
    },
    label: {
        width: '100%',
        display: 'block',
        margin: '0 auto 42px auto',
        '& .max': {
            marginTop: '10px',
            marginBottom: '10px',
            fontSize: '16px',
            lineHeight: '24px'
        }
    },
    input: {
        display: 'flex',
        alignItems: 'center',

        '& p': {
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '23.2px',
            marginLeft: '20px'
        }
    },
    inputTitle: {
        fontFamily: '\'Lato\', sans-serif',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '18px',
        lineHeight: '145%',
        marginBottom: '10px',
        '& span': {
            color: '#D2D5D9'
        },
        '& .subTitle': {
            marginTop: '5px',
            color: '#545555',
            fontSize: '14px',
            lineHeight: '21px',
            fontWeight: 400
        }
    },
    cardBtn: {
        padding: '12px',
        fontFamily: '\'Mulish\' sans-serif',
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '23px'
    },
    radio: {
        width: "100%",
        padding: "20px",
        display: "flex",
        cursor: "pointer",
        alignItems: "center",

        "& p": {
            fontFamily: '\'Lato\', sans-serif',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '18px',
            lineHeight: '145%',

            '& span': {
                color: '#545555'
            },
        },

        "& input": {
            appearance: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            border: "2px solid #999",
            transition: "0.2s all linear",
            marginRight: "12px",
        },
        "& input:checked": {
            border: "5px solid #3D7ACF"
        }
    },
    radioBox: {
        border: "1px solid #D2D5D9",
        borderRadius: "5px",
        marginBottom: "10px",
    }
}))

const radioStyles = makeStyles((theme)=>({
    root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
          outline: '2px auto rgba(19,124,189,.6)',
          outlineOffset: 2,
        },
        'input:hover ~ &': {
          backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background: 'rgba(206,217,224,.5)',
        },
      },
      checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
          display: 'block',
          width: 16,
          height: 16,
          backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
          content: '""',
        },
        'input:hover ~ &': {
          backgroundColor: '#106ba3',
        },
      },
}))

function StyledRadio(props: RadioProps) {
    const classes = radioStyles();
  
    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

export const EditGroup: React.FC<{}> = observer(() => {
    const {
        editedGroup, updateEditedGroup, setDefaultNewGroup, resetEditedGroup, saveGroup, createGroup,
        fetchEditedGroupById
    } = useStores().groupsStore
    const propStore = useStores().createProposalStore
    // const [activeStep, setActiveStep] = useState(1) // TODO hardcoded 1 for development
    const [activeStep, setActiveStep] = useState(0)
    const history = useHistory()
    const pathParams: any = useParams()
    const groupId = pathParams.id ? Number(pathParams.id) : -1
    const [group, setGroup] = React.useState(10)
    const [loading, setLoading] = React.useState(false)
    const [admin, setAdmin] = React.useState('')
    const [me, setMe] = React.useState('')

    const handleChange = (event) => {
        setGroup(event.target.value)
    }

    const classes = useStyles()

    useEffect(() => {
        if (!editedGroup) {
            if (groupId === -1) {
                setDefaultNewGroup()
            } else {
                (async () => {
                    const group = await fetchEditedGroupById(groupId)
                    if (!group) {
                        history.push(Routes.GROUPS)
                    }
                })()
            }
        }
    }, [setDefaultNewGroup, resetEditedGroup])

    useEffect(() => {
        editedGroup && setAdmin(editedGroup.admin)
    }, [editedGroup])

    useEffect(() => {
        CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
            .then( key => setMe(key.bech32Address) )
    }, [])


    if (!editedGroup) {
        return null
    }

    console.log("group", toJS(editedGroup));

    // const res = propStore.createProposal(toJS(editedGroup))

    function updateAdmin(value: string) {
        setAdmin(value)
        editedGroup.admin = value
    }

    return (
        <div>
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {[
                        'Create Group',
                        'Create Group Policy',
                        'Finished'
                    ].map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div style={{
                // padding: '24px',
                // flex: 1,
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // backgroundColor: '#E5E5E5'
            }}>
                <Page>
                    <div className={classes.root} style={{
                        // maxWidth: '1200px'
                    }}>
                        {activeStep === 0 && (
                            <>
                                <div className={classes.title}>
                                    {groupId === -1 ? 'Create Group' : 'Edit Group'}
                                </div>
                                <Paper elevation={2}>
                                    <p className={classes.inputTitle}>Group admin</p>
                                    <form action="">
                                        <div className={classes.radioBox} onClick={() => updateAdmin('')}>
                                            <label htmlFor="adminChoise1" className={classes.radio}>
                                                <input type="radio" checked={admin === ''} name="admin" id="adminChoise1"/>
                                                <p>Group policy</p>
                                                <IconButton style={{ padding: '0px', marginLeft: "auto" }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>
                                            </label>
                                        </div>
                                        <div className={classes.radioBox} onClick={() => updateAdmin(me)}>
                                            <label htmlFor="adminChoise2" className={classes.radio}>
                                                <input type="radio" checked={admin === me} name="admin" id="adminChoise2"/>
                                                <p>You <span>({truncateAddress(me)})</span></p>
                                                <IconButton style={{ padding: '0px', marginLeft: "auto" }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>
                                            </label>
                                        </div>
                                        <div className={classes.radioBox} onClick={() => {(!admin || admin === me) && updateAdmin('cosmos')}}>
                                            <label htmlFor="adminChoise3" className={classes.radio}>
                                                <input type="radio" checked={admin && admin !== me} name="admin" id="adminChoise3"/>
                                                <p>Another account</p>
                                                <IconButton style={{ padding: '0px', marginLeft: "auto" }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>
                                            </label>
                                            {admin && admin !== me &&
                                                <label className={classes.label}
                                                       style={{padding: "0 20px", marginBottom: "20px"}}>
                                                    <p className={classes.inputTitle}>Admin address</p>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-disabled"
                                                        variant="outlined"
                                                        value={admin}
                                                        onChange={e => updateAdmin(e.target.value as unknown as string)}
                                                    />
                                                </label>
                                            }
                                        </div>
                                    </form>
                                    {/* <FormControl component="fieldset" className={classes.radioBox}>
                                        <FormLabel component="legend" className={classes.inputTitle} style={{color: "#000000"}}>Group admin</FormLabel>
                                        <RadioGroup defaultValue="female" aria-label="gender" name="customized-radios">
                                            <FormControlLabel value="female" control={<StyledRadio />} label="Female <p>TEXT</p>" />
                                            <FormControlLabel value="male" control={<StyledRadio />} label="Male" />
                                            <FormControlLabel value="other" control={<StyledRadio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl> */}
                                    <label className={classes.label} style={{marginTop:"40px"}}>
                                        <p className={classes.inputTitle}>Group name</p>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={editedGroup.metadata.name}
                                            onChange={e => {
                                                updateEditedGroup({
                                                    ...editedGroup,
                                                    metadata: {
                                                        ...editedGroup.metadata,
                                                        name: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </label>
                                    <label className={classes.label}>
                                        <p className={classes.inputTitle}>Description <span>(optional)</span></p>
                                        <TextField
                                            fullWidth
                                            id="outlined"
                                            variant="outlined"
                                            multiline
                                            rows={5}
                                            value={editedGroup.metadata.description}
                                            onChange={e => {
                                                updateEditedGroup({
                                                    ...editedGroup,
                                                    metadata: {
                                                        ...editedGroup.metadata,
                                                        description: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </label>
                                    <label className={classes.label}>
                                        <p className={classes.inputTitle}>Link to forum <span>(optional)</span></p>
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            value={editedGroup.metadata.linkToForum}
                                            onChange={e => {
                                                updateEditedGroup({
                                                    ...editedGroup,
                                                    metadata: {
                                                        ...editedGroup.metadata,
                                                        linkToForum: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </label>
                                    <label className={classes.label}>
                                        <p className={classes.inputTitle}>Other metadata <span>(optional)</span></p>
                                        <TextField
                                            fullWidth
                                            id="outlined"
                                            variant="outlined"
                                            multiline
                                            rows={5}
                                            // label="Other metadata"
                                            value={editedGroup.metadata.other}
                                            onChange={e => {
                                                updateEditedGroup({
                                                    ...editedGroup,
                                                    metadata: {
                                                        ...editedGroup.metadata,
                                                        other: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </label>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <p className={classes.inputTitle}>Add member accounts</p>
                                        <p className={classes.inputTitle} style={{ marginRight: "115px" }}>Weight</p>
                                    </div>
                                    {editedGroup.members.map((m, i) => {
                                        return (
                                            <div className={classes.label} key={i}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <TextField
                                                        style={{ width: '80%' }}
                                                        id="outlined"
                                                        variant="outlined"
                                                        label="Group member address"
                                                        value={m.address}
                                                        onChange={e => {
                                                            const newMembers = cloneDeep(toJS(editedGroup.members))
                                                            newMembers[i].address = e.target.value
                                                            updateEditedGroup({
                                                                ...editedGroup,
                                                                members: newMembers
                                                            })
                                                        }}
                                                    />
                                                    <TextField placeholder='1' variant="outlined" style={{ width: "84px", marginLeft: "20px" }} />
                                                    <IconButton
                                                        aria-label="delete"
                                                        disabled={editedGroup.members.length === 1}
                                                        onClick={() => {
                                                            updateEditedGroup({
                                                                ...editedGroup,
                                                                members: editedGroup.members.filter(i => m.address !== i.address)
                                                            })
                                                        }}
                                                    >
                                                        <Delete/>
                                                    </IconButton>
                                                    {i === editedGroup.members.length - 1 && (
                                                        <Button
                                                            className={classes.cardBtn}
                                                            disabled={editedGroup.members[editedGroup.members.length - 1].address.length === 0}
                                                            variant="outlined"
                                                            color="primary"
                                                            onClick={() => {
                                                                updateEditedGroup({
                                                                    ...editedGroup,
                                                                    members: [...editedGroup.members, {
                                                                        address: '',
                                                                        weight: '1',
                                                                        added_at: new Date(),
                                                                        metadata: JSON.stringify({
                                                                            name: ''
                                                                        })
                                                                    }]
                                                                })
                                                            }}
                                                        >
                                                            {'Add'}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
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
                                </Paper>
                            </>
                        )}
                        {activeStep === 1 && (
                            <>
                                <div className={classes.title}>
                                    {groupId === -1 ? 'Create Group Policy' : 'Edit Group Policy'}
                                </div>
                                <Paper elevation={2} style={{ padding: '50px 30px' }}>

                                    {/*<div className={classes.label}>*/} {/* TODO What does it select from? */}
                                    {/*    <div className={classes.inputTitle}>Group*/}
                                    {/*        <p className="subTitle">All members addresses of this group will be added to*/}
                                    {/*            this group account</p>*/}

                                    {/*    </div>*/}
                                    {/*    <FormControl variant="outlined" fullWidth>*/}
                                    {/*        <InputLabel id="demo-simple-select-outlined-label" ></InputLabel>*/}
                                    {/*        <Select*/}
                                    {/*            style={{ height: '56px' }}*/}
                                    {/*            fullWidth*/}
                                    {/*            id="demo-simple-select-outlined"*/}
                                    {/*            value={group}*/}
                                    {/*            onChange={handleChange}*/}
                                    {/*        >*/}
                                    {/*            <MenuItem value="">*/}
                                    {/*                <em>None</em>*/}
                                    {/*            </MenuItem>*/}
                                    {/*            <MenuItem value={10}>Ten</MenuItem>*/}
                                    {/*            <MenuItem value={20}>Twenty</MenuItem>*/}
                                    {/*            <MenuItem value={30}>Thirty</MenuItem>*/}
                                    {/*        </Select>*/}
                                    {/*    </FormControl>*/}

                                    {/*</div>*/}
                                    {/*<p className={classes.inputTitle}>Group policy admin</p>*/}
                                    {/*<form action="">*/}
                                    {/*    <div className={classes.radioBox}>*/}
                                    {/*        <label htmlFor="adminChoise1" className={classes.radio}>*/}
                                    {/*            <input type="radio" name="admin" id="adminChoise1"/>*/}
                                    {/*            <p>Group policy</p>*/}
                                    {/*            <IconButton style={{ padding: '0px', marginLeft: "auto" }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>*/}
                                    {/*        </label>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={classes.radioBox}>*/}
                                    {/*        <label htmlFor="adminChoise2" className={classes.radio}>*/}
                                    {/*            <input type="radio" name="admin" id="adminChoise2"/>*/}
                                    {/*            <p>You <span>({truncateAddress(me)})</span></p>*/}
                                    {/*            <IconButton style={{ padding: '0px', marginLeft: "auto" }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>*/}
                                    {/*        </label>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={classes.radioBox}>*/}
                                    {/*        <label htmlFor="adminChoise3" className={classes.radio}>*/}
                                    {/*            <input type="radio" name="admin" id="adminChoise3"/>*/}
                                    {/*            <p>Another account</p>*/}
                                    {/*            <IconButton style={{ padding: '0px', marginLeft: "auto" }}><InfoOutlined style={{ width: '25px', height: '25px', color: '#3D7ACF' }}></InfoOutlined></IconButton>*/}
                                    {/*        </label>*/}
                                    {/*    </div>*/}
                                    {/*</form>*/}
                                    <div className={classes.label} style={{marginTop: "40px"}}>
                                        <div className={classes.inputTitle}>
                                            Voting window
                                            <p className="subTitle">Define the maximum amount of time that must pass in
                                                order for a proposal to potentially pass.</p>
                                        </div>
                                        <p className="max">Maximum</p>
                                        <div className={classes.input}>
                                            <TextField
                                                fullWidth
                                                id="outlined"
                                                variant="outlined"
                                                value={editedGroup.policy.timeoutInDays}
                                                onChange={e => {
                                                    updateEditedGroup({
                                                        ...editedGroup,
                                                        policy: {
                                                            ...editedGroup.policy,
                                                            timeoutInDays: isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                                                        }
                                                    })
                                                }}
                                            >
                                            </TextField>
                                            <p>days</p>
                                        </div>
                                    </div>
                                    <div className={classes.label}>
                                        <div className={classes.inputTitle}>
                                            Set a threshold
                                            <p className="subTitle">Defines a threshold of yes votes (based on a tally
                                                of voter weights) that must be achieved in order for a proposal to
                                                pass.</p>
                                        </div>
                                        <div className={classes.input}>
                                            <TextField
                                                fullWidth
                                                id="outlined"
                                                variant="outlined"
                                                value={editedGroup.policy.threshold}
                                                onChange={e => {
                                                    updateEditedGroup({
                                                        ...editedGroup,
                                                        policy: {
                                                            ...editedGroup.policy,
                                                            threshold: isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
                                                        }
                                                    })
                                                }}
                                            >
                                            </TextField>
                                            <p>yes votes of 100</p>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={() => setActiveStep(activeStep - 1)}
                                        >
                                            {'Prev'}
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            onClick={() => setActiveStep(activeStep + 1)}
                                        >
                                            {'Next'}
                                        </Button>
                                    </div>
                                </Paper>
                            </>
                        )}
                        {activeStep === 2 && (() => {
                            if (editedGroup.info.id === -1) {
                                return (
                                    <div>
                                        <div className={classes.title}>
                                            {'Finished'}
                                        </div>
                                        <div className={classes.subTitle}>
                                            You have successfully set up your group and group policy.
                                        </div>
                                        <div>
                                            <Button className={classes.finishedBtn}
                                                    color="primary"
                                                    disabled={loading}
                                                    onClick={async () => {
                                                        setLoading(true)
                                                        try {
                                                            const [createdId, broadcastResults] = await createGroup()
                                                            // alert(`BroadcastRes: ${JSON.stringify(broadcastResults, null, 2)}`)
                                                            history.push(Routes.GROUPS_ADMIN_VIEW.replace(':id', createdId.toString()))
                                                        } finally {
                                                            setLoading(false)
                                                        }
                                                    }}
                                            >
                                                {'Create group'}
                                            </Button>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div>
                                        <div className={classes.title}>
                                            {'Finished editing'}
                                        </div>
                                        <div className={classes.subTitle}>
                                            You have successfully edited your group.
                                        </div>
                                        <div>
                                            <Button
                                                className={classes.finishedBtn}
                                                color="primary"
                                                disabled={loading}
                                                onClick={async () => {
                                                    setLoading(true)
                                                    try {
                                                        const broadcastRes = await saveGroup()
                                                        // alert(`BroadcastRes:
    // ${JSON.stringify(broadcastRes, null, 2)}`)
                                                        history.push(Routes.GROUPS_ADMIN_VIEW.replace(':id', editedGroup.info.id.toString()))
                                                    } finally {
                                                        setLoading(false)
                                                    }
                                                }}
                                            >
                                                {'Save Group'}
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                </Page>
            </div>
        </div>
    )
})
