import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, TextField } from '@material-ui/core'
import { toJS } from 'mobx'
import { useStyles } from './admin-view'
import EditMembersButton from './edit-members-button'
import { useStores } from '../../shared-state/repo'
import { IGroupPolicyBody } from './groups-type'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const GroupPolicyBody: React.FC<IGroupPolicyBody> = observer(
    ({
         setReset,
         setNewMember,
         membersEditMode,
         newMember,
         setMembersEditMode
     }) => {
        const classes = useStyles()

        const { saveChanges, updateEditedGroup, editedGroup } =
            useStores().groupsStore

        const handleSaveChanges = async () => {
            const { status } = await saveChanges()
            toast(status)
            // TODO delete error case
            if (status === 'error') {
                setReset(true)
            }
            if (status === 'success') {
                setReset(true)
            }
        }
        const addMemberOnClick = () => {
            const members = toJS(editedGroup.members)
            let isSameAddress = members.some(
                ({ member }) => member.address === newMember
            )
            if (isSameAddress || !newMember) {
                return
            }

            updateEditedGroup({
                ...editedGroup,
                members: [
                    ...editedGroup.members,
                    {
                        group_id: editedGroup.info.id,
                        member: {
                            address: newMember,
                            weight: '1',
                            added_at: new Date(),
                            metadata: JSON.stringify({
                                name: ''
                            })
                        }
                    }
                ]
            })
        }

        return (
            <div className={classes.heroBlock}>
                <h2 style={{ padding: '40px', fontWeight: 900 }}>Members</h2>
                {membersEditMode ? (
                    <div
                        style={{
                            display: 'flex',
                            paddingRight: '24px',
                            width: '100%'
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={newMember}
                            onChange={(e) => setNewMember(e.target.value)}
                        />
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '16px'
                            }}
                        >
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{
                                    width: '200px',
                                    padding: '12px 5px',
                                    fontSize: '18px',
                                    fontWeight: 800
                                }}
                                onClick={addMemberOnClick}
                            >
                                + Add member
                            </Button>
                            <Button
                                variant="text"
                                color="primary"
                                style={{
                                    margin: '0 20px',
                                    fontWeight: 800,
                                    fontSize: '12px',
                                    color: '#545555'
                                }}
                                onClick={console.log}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    width: '200px',
                                    padding: '12px 5px',
                                    fontSize: '18px',
                                    fontWeight: 800
                                }}
                                onClick={handleSaveChanges}
                            >
                                Save changes
                            </Button>
                        </div>
                    </div>
                ) : (
                    <EditMembersButton setMembersEditMode={setMembersEditMode}/>
                )}
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={true}
                    closeOnClick
                    pauseOnHover
                />
            </div>
        )
    }
)

export default GroupPolicyBody
