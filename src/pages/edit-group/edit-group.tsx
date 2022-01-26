import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import { Button, Paper, Step, StepLabel, Stepper, TextField } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Routes } from '../../routes'
import { toUint8Array } from '../../shared-state/groups-store'

export const EditGroup: React.FC<{}> = observer(() => {
    const {
        editedGroup, updateEditedGroup, setDefaultNewGroup, resetEditedGroup, saveGroup, createGroup,
        fetchEditedGroupById
    } = useStores().groupsStore
    const [activeStep, setActiveStep] = useState(0)
    const history = useHistory()
    const pathParams: any = useParams()
    const groupId = pathParams.id === 'new' ? -1 : Number(pathParams.id)

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
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#E5E5E5'
            }}>
                <div style={{
                    maxWidth: '1200px'
                }}>
                    {activeStep === 0 && (
                        <>
                            <div>
                                {'Create Group'}
                            </div>
                            <Paper style={{
                                minWidth: '700px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <TextField
                                        label="Group admin"
                                        value={editedGroup.info.admin}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <TextField
                                        label="Group name"
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
                                </div>
                                <div>
                                    <TextField
                                        label="Description"
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
                                </div>
                                <div>
                                    <TextField
                                        label="Link to forum"
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
                                </div>
                                <div>
                                    <TextField
                                        label="Other metadata"
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
                                </div>
                                <div>
                                    <div>{'Add member accounts'}</div>
                                    { editedGroup.members.map((m, i) => {
                                        return (
                                            <div key={i}>
                                                <TextField
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
                                                { i === editedGroup.members.length - 1 && (
                                                    <Button
                                                        color="primary"
                                                        onClick={() => {
                                                            updateEditedGroup({
                                                                ...editedGroup,
                                                                members: [...editedGroup.members, {
                                                                    group_id: editedGroup.info.group_id,
                                                                    member: {
                                                                        address: "",
                                                                        weight: "1",
                                                                        metadata: toUint8Array(JSON.stringify({
                                                                            name: "",
                                                                        }))
                                                                    }
                                                                }]
                                                            })
                                                        }}
                                                    >
                                                        {'Add'}
                                                    </Button>
                                                ) }
                                            </div>
                                        )
                                    }) }
                                </div>
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
            </div>
        </div>
    )
})
