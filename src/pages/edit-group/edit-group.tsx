import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import { Button, Paper, Step, StepLabel, Stepper, TextField } from '@material-ui/core'
import { GroupAccountInfo, GroupInfo, GroupMember } from '../../generated/regen/group/v1alpha1/types'

export const EditGroup: React.FC<{}> = observer(() => {
    const { editedGroup, updateEditedGroup, setDefaultEditedGroup, resetEditedGroup, saveGroup, createGroup } = useStores().groupsStore

    useEffect(() => {
        if (!editedGroup) {
            setDefaultEditedGroup()
        }

        return () => {
            resetEditedGroup()
        }
    }, [setDefaultEditedGroup, resetEditedGroup])

    if (!editedGroup) {
        return null
    }

    return (
        <div>
            <div>
                <Stepper activeStep={0} alternativeLabel>
                    { [
                        "Create Group",
                        "Create Group Policy",
                        "Finished",
                    ].map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    )) }
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
                    <div>
                        { 'Create Group' }
                    </div>
                    <Paper style={{
                        minWidth: '400px',
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
                    </Paper>
                    { editedGroup.info.group_id === -1 ? (
                        <div>
                            <Button
                                color="primary"
                                onClick={createGroup}
                            >
                                { 'Create Group' }
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button
                                color="primary"
                                onClick={saveGroup}
                            >
                                { 'Save Group' }
                            </Button>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
})
