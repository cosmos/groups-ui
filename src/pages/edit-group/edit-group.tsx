import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import {
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Step,
    StepLabel,
    Stepper,
    TextField
} from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Routes } from '../../routes'
import { toUint8Array } from '../../shared-state/groups-store'
import { makeStyles } from '@material-ui/core/styles'
import { Page } from '../page'
import { Delete } from '@material-ui/icons'

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
        borderRadius: '2px',
        padding: '5px 9px',
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 800,
        fontSize: '18px',
        lineHeight: '23px'
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
    }
}))

export const EditGroup: React.FC<{}> = observer(() => {
    const {
        editedGroup, updateEditedGroup, setDefaultNewGroup, resetEditedGroup, saveGroup, createGroup,
        fetchEditedGroupById
    } = useStores().groupsStore
    const [activeStep, setActiveStep] = useState(0)
    const history = useHistory()
    const pathParams: any = useParams()
    const groupId = pathParams.id === 'new' ? -1 : Number(pathParams.id)
    const [group, setGroup] = React.useState(10)
    const [loading, setLoading] = React.useState(false)

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

        return () => {
            resetEditedGroup()
        }
    }, [setDefaultNewGroup, resetEditedGroup])

    if (!editedGroup) {
        return null
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
                                    <label className={classes.label}>
                                        <p className={classes.inputTitle}>Admin address</p>
                                        <TextField
                                            style={{ backgroundColor: '#EFEFEF' }}
                                            fullWidth
                                            value={editedGroup.info.admin}
                                            disabled
                                            id="outlined-disabled"
                                            variant="outlined"
                                        />
                                    </label>
                                    <label className={classes.label}>
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
                                    <p className={classes.inputTitle}>Add member accounts</p>
                                    {editedGroup.members.map((m, i) => {
                                        return (
                                            <div className={classes.label} key={`${m.member.address}_${i}`}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <TextField
                                                        style={{ width: '80%' }}
                                                        id="outlined"
                                                        variant="outlined"
                                                        label="Group member address"
                                                        value={m.member.address}
                                                        onChange={e => {
                                                            const newMembers = editedGroup.members
                                                            newMembers[i].member.address = e.target.value
                                                            updateEditedGroup({
                                                                ...editedGroup,
                                                                members: newMembers
                                                            })
                                                        }}
                                                    />
                                                    <IconButton aria-label="delete">
                                                        <Delete />
                                                    </IconButton>
                                                    {i === editedGroup.members.length - 1 && (
                                                        <Button
                                                            className={classes.cardBtn}
                                                            variant="outlined"
                                                            color="primary"
                                                            onClick={() => {
                                                                updateEditedGroup({
                                                                    ...editedGroup,
                                                                    members: [...editedGroup.members, {
                                                                        group_id: editedGroup.info.group_id,
                                                                        member: {
                                                                            address: '',
                                                                            weight: '1',
                                                                            metadata: toUint8Array(JSON.stringify({
                                                                                name: ''
                                                                            }))
                                                                        }
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

                                    <div className={classes.label}>
                                        <div className={classes.inputTitle}>Group
                                            <p className="subTitle">All members addresses of this group will be added to
                                                this group account</p>

                                        </div>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel id="demo-simple-select-outlined-label" ></InputLabel>
                                            <Select
                                                style={{ height: '56px' }}
                                                fullWidth
                                                id="demo-simple-select-outlined"
                                                value={group}
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
                                    <div className={classes.label}>
                                        <div className={classes.inputTitle}>
                                            Voting window
                                            <p className="subTitle">Define the maximum amount of time that must pass in
                                                order for a proposal to potentially pass.</p>
                                        </div>
                                        <p className="max">Maximum</p>
                                        <div className={classes.input}>
                                            <TextField
                                                variant="outlined">
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
                                                variant="outlined">
                                            </TextField>
                                            <p>yes votes of 100</p>
                                        </div>
                                    </div>
                                    <div className={classes.label}>
                                        <div className={classes.inputTitle}>
                                            Define a quorum <span>(optional)</span>
                                            <p className="subTitle">Quorums define the percentage of total voting power
                                                that needs to vote for a proposal to pass.</p>
                                        </div>
                                        <div className={classes.input}>
                                            <TextField
                                                variant="outlined">
                                            </TextField>
                                            <p>% of total voting power</p>
                                        </div>
                                    </div>
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
                        {activeStep === 2 && (() => {
                            if (editedGroup.info.group_id === -1) {
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
                                                onClick={async () => {
                                                    setLoading(true)
                                                    const broadcastRes = await createGroup()
                                                    setLoading(false)
                                                    alert(`BroadcastRes: 
${JSON.stringify(broadcastRes, null, 2)}`)
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
                                                variant='outlined'
                                                color="primary"
                                                disabled={loading}
                                                onClick={async () => {
                                                    setLoading(true)
                                                    const broadcastRes = await saveGroup()
                                                    setLoading(false)
                                                    alert(`BroadcastRes: 
${JSON.stringify(broadcastRes, null, 2)}`)
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
