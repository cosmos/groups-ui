import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import { Button, Paper, Step, StepLabel, Stepper, TextField } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Routes } from '../../routes'
import { toUint8Array } from '../../shared-state/groups-store'
import { makeStyles } from '@material-ui/core/styles'
import { Page } from '../page'

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
    label: {
        width: '100%',
        display: 'block',
        margin: '0 auto 42px auto'
    },
    inputTitle: {
        fontFamily: '\'Lato\', sans-serif',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '18px',
        lineHeight: '145%',
        marginBottom: '9px',
        '& span': {
            color: '#D2D5D9'
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

    const classes = useStyles()

    useEffect(() => {
        if (!editedGroup) {
            if (groupId === -1) {
                setDefaultNewGroup()
            } else {
                (async () => {
                    const group = await fetchEditedGroupById(groupId)
                    console.log('group', group)
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
                                <div>
                                    {'Create Group'}
                                </div>
                                <Paper elevation={2}>
                                    <form action="">
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
                                        {editedGroup.members.map((m, i) => {
                                            return (
                                                <div className={classes.label} key={i}>
                                                    <p className={classes.inputTitle}>Add member accounts</p>
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
                                    </form>
                                </Paper>
                            </>
                        )}
                        {(() => {
                            switch (activeStep) {
                                case 2:
                                    if (editedGroup.info.group_id === -1) {
                                        return (
                                            <div>
                                                <Button
                                                    color="primary"
                                                    onClick={createGroup}
                                                >
                                                    {'Create Group'}
                                                </Button>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div>
                                                <Button
                                                    color="primary"
                                                    onClick={saveGroup}
                                                >
                                                    {'Save Group'}
                                                </Button>
                                            </div>
                                        )
                                    }
                                default:
                                    return (
                                        <div>
                                            <Button
                                                color="primary"
                                                onClick={() => setActiveStep(activeStep + 1)}
                                            >
                                                {'Next'}
                                            </Button>
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
