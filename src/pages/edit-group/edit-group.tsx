import React, { useEffect, useState, useLayoutEffect } from 'react'
import { observer } from 'mobx-react-lite'
import {
  Button,
  IconButton,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from '@material-ui/core'
import { cloneDeep } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import { Delete, InfoOutlined } from '@material-ui/icons'
import { toJS } from 'mobx'
import { useStores } from '../../shared-state/repo'
import { Routes } from '../../routes'
import { Page } from '../page'
import { useStyles } from './edity-group'

export const EditGroup: React.FC<{}> = observer(() => {
  const {
    editedGroup,
    updateEditedGroup,
    setDefaultNewGroup,
    resetEditedGroup,
    saveGroup,
    createGroup,
    fetchEditedGroupById,
  } = useStores().groupsStore

  const propStore = useStores().createProposalStore
  // const [activeStep, setActiveStep] = useState(1) // TODO hardcoded 1 for development
  const [activeStep, setActiveStep] = useState(0)
  const history = useHistory()
  const pathParams: any = useParams()
  const groupId = pathParams.id ? Number(pathParams.id) : -1
  const [group, setGroup] = React.useState(10)
  const [loading, setLoading] = React.useState(false)

  const handleChange = (event) => {
    setGroup(event.target.value)
  }
  const handleFormSubmit = (e: any): void => {
    e.preventDefault()
    setActiveStep(activeStep + 1)
  }

  const classes = useStyles()

  useEffect(() => {
    if (!editedGroup) {
      if (groupId === -1) {
        setDefaultNewGroup()
      } else {
        ;(async () => {
          const group = await fetchEditedGroupById(groupId)
          if (!group) {
            history.push(Routes.GROUPS)
          }
        })()
      }
    }
  }, [
    setDefaultNewGroup,
    resetEditedGroup,
    editedGroup,
    groupId,
    fetchEditedGroupById,
    history,
  ])

  const [nameFieldError, setNameFieldError] = useState<boolean>(false)
  const [nameField, setNameField] = useState('')
  const [members, setMembers] = useState<any>([])
  const [membersError, setMembersError] = useState(false)

  const handleChangeValidationName = () => {
    if (name === '') {
      setNameFieldError(true)
    } else {
      setNameFieldError(false)
      setNameField(name)
    }
  }

  const handleChangeValidationMember = () => {
    let isMembersFieldsValid = members.some(({ member }) => member.address)
    if (!isMembersFieldsValid) {
      setMembersError(true)
    } else {
      setMembersError(false)
    }
  }

  const formIsValid = () => {
    let isValid: boolean
    let isMembersFieldsValid = members.some(({ member }) => member.address)
    if (!nameFieldError && isMembersFieldsValid && Boolean(nameField)) {
      isValid = true
    } else isValid = false
    return isValid
  }
  const IsNextPageButtonValid = formIsValid()

  useEffect(
    () => editedGroup?.members && setMembers(toJS(editedGroup.members)),
    [editedGroup]
  )

  if (!editedGroup) {
    return null
  }
  const {
    metadata: { description, linkToForum, other, name },
  } = editedGroup

  return (
    <div>
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {['Create Group', 'Create Group Policy', 'Finished'].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div
        style={
          {
            // padding: '24px',
            // flex: 1,
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'center',
            // backgroundColor: '#E5E5E5'
          }
        }
      >
        <Page>
          <div
            className={classes.root}
            style={
              {
                // maxWidth: '1200px'
              }
            }
          >
            {activeStep === 0 && (
              <>
                <div className={classes.title}>
                  {groupId === -1 ? 'Create Group' : 'Edit Group'}
                </div>
                <Paper elevation={2}>
                  <p className={classes.inputTitle}>Group admin</p>
                  <form action="">
                    <div className={classes.radioBox}>
                      <label htmlFor="adminChoise1" className={classes.radio}>
                        <input type="radio" name="admin" id="adminChoise1" />
                        <p>Group policy</p>
                        <IconButton
                          style={{ padding: '0px', marginLeft: 'auto' }}
                        >
                          <InfoOutlined
                            style={{
                              width: '25px',
                              height: '25px',
                              color: '#3D7ACF',
                            }}
                          />
                        </IconButton>
                      </label>
                    </div>
                    <div className={classes.radioBox}>
                      <label htmlFor="adminChoise2" className={classes.radio}>
                        <input type="radio" name="admin" id="adminChoise2" />
                        <p>
                          You <span>(regenadjk..1kkk)</span>
                        </p>
                        <IconButton
                          style={{ padding: '0px', marginLeft: 'auto' }}
                        >
                          <InfoOutlined
                            style={{
                              width: '25px',
                              height: '25px',
                              color: '#3D7ACF',
                            }}
                          />
                        </IconButton>
                      </label>
                    </div>
                    <div className={classes.radioBox}>
                      <label htmlFor="adminChoise3" className={classes.radio}>
                        <input type="radio" name="admin" id="adminChoise3" />
                        <p>Another account</p>
                        <IconButton
                          style={{ padding: '0px', marginLeft: 'auto' }}
                        >
                          <InfoOutlined
                            style={{
                              width: '25px',
                              height: '25px',
                              color: '#3D7ACF',
                            }}
                          />
                        </IconButton>
                      </label>
                      <label
                        className={classes.label}
                        style={{ padding: '0 20px', marginBottom: '20px' }}
                      >
                        <p className={classes.inputTitle}>Admin address</p>
                        <TextField
                          fullWidth
                          value={editedGroup.info.admin}
                          id="outlined-disabled"
                          variant="outlined"
                        />
                      </label>
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
                  <label
                    className={classes.label}
                    style={{ marginTop: '40px' }}
                  >
                    <p className={classes.inputTitle}>Group name</p>
                    <TextField
                      name="name"
                      fullWidth
                      variant="outlined"
                      value={name}
                      error={nameFieldError}
                      onBlur={handleChangeValidationName}
                      helperText={nameFieldError ? 'Empty field' : ''}
                      onChange={(e) => {
                        updateEditedGroup({
                          ...editedGroup,
                          metadata: {
                            ...editedGroup.metadata,
                            name: e.target.value,
                          },
                        })
                      }}
                    />
                  </label>
                  <label className={classes.label}>
                    <p className={classes.inputTitle}>
                      Description <span>(optional)</span>
                    </p>
                    <TextField
                      name="description"
                      fullWidth
                      id="outlined"
                      variant="outlined"
                      multiline
                      rows={5}
                      value={description}
                      onChange={(e) => {
                        updateEditedGroup({
                          ...editedGroup,
                          metadata: {
                            ...editedGroup.metadata,
                            description: e.target.value,
                          },
                        })
                      }}
                    />
                  </label>
                  <label className={classes.label}>
                    <p className={classes.inputTitle}>
                      Link to forum <span>(optional)</span>
                    </p>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={linkToForum}
                      onChange={(e) => {
                        updateEditedGroup({
                          ...editedGroup,
                          metadata: {
                            ...editedGroup.metadata,
                            linkToForum: e.target.value,
                          },
                        })
                      }}
                    />
                  </label>
                  <label className={classes.label}>
                    <p className={classes.inputTitle}>
                      Other metadata <span>(optional)</span>
                    </p>
                    <TextField
                      fullWidth
                      id="outlined"
                      variant="outlined"
                      multiline
                      rows={5}
                      // label="Other metadata"
                      value={other}
                      onChange={(e) => {
                        updateEditedGroup({
                          ...editedGroup,
                          metadata: {
                            ...editedGroup.metadata,
                            other: e.target.value,
                          },
                        })
                      }}
                    />
                  </label>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <p className={classes.inputTitle}>Add member accounts</p>
                    <p
                      className={classes.inputTitle}
                      style={{ marginRight: '115px' }}
                    >
                      Weight
                    </p>
                  </div>
                  {editedGroup.members.map((m, i) => {
                    return (
                      <div className={classes.label} key={i}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <TextField
                            style={{ width: '80%' }}
                            id="outlined"
                            variant="outlined"
                            label="Group member address"
                            value={m.member.address}
                            error={membersError}
                            onBlur={handleChangeValidationMember}
                            helperText={membersError ? 'Empty field' : ''}
                            onChange={(e) => {
                              const newMembers = cloneDeep(
                                toJS(editedGroup.members)
                              )
                              newMembers[i].member.address = e.target.value
                              updateEditedGroup({
                                ...editedGroup,
                                members: newMembers,
                              })
                            }}
                          />
                          <TextField
                            placeholder="1"
                            variant="outlined"
                            style={{ width: '84px', marginLeft: '20px' }}
                          />
                          <IconButton
                            aria-label="delete"
                            disabled={editedGroup.members.length === 1}
                            onClick={() => {
                              updateEditedGroup({
                                ...editedGroup,
                                members: editedGroup.members.filter(
                                  (i) => m.member.address !== i.member.address
                                ),
                              })
                            }}
                          >
                            <Delete />
                          </IconButton>
                          {i === editedGroup.members.length - 1 && (
                            <Button
                              className={classes.cardBtn}
                              disabled={
                                editedGroup.members[
                                  editedGroup.members.length - 1
                                ].member.address.length === 0
                              }
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                updateEditedGroup({
                                  ...editedGroup,
                                  members: [
                                    ...editedGroup.members,
                                    {
                                      group_id: editedGroup.info.id,
                                      member: {
                                        address: '',
                                        weight: '1',
                                        added_at: new Date(),
                                        metadata: JSON.stringify({
                                          name: '',
                                        }),
                                      },
                                    },
                                  ],
                                })
                              }}
                            >
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      color={!IsNextPageButtonValid ? 'default' : 'primary'}
                      variant="outlined"
                      onClick={handleFormSubmit}
                      disabled={!IsNextPageButtonValid}
                    >
                      Next
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
                  {/* <div className={classes.label}> */}{' '}
                  {/* TODO What does it select from? */}
                  {/*    <div className={classes.inputTitle}>Group */}
                  {/*        <p className="subTitle">All members addresses of this group will be added to */}
                  {/*            this group account</p> */}
                  {/*    </div> */}
                  {/*    <FormControl variant="outlined" fullWidth> */}
                  {/*        <InputLabel id="demo-simple-select-outlined-label" ></InputLabel> */}
                  {/*        <Select */}
                  {/*            style={{ height: '56px' }} */}
                  {/*            fullWidth */}
                  {/*            id="demo-simple-select-outlined" */}
                  {/*            value={group} */}
                  {/*            onChange={handleChange} */}
                  {/*        > */}
                  {/*            <MenuItem value=""> */}
                  {/*                <em>None</em> */}
                  {/*            </MenuItem> */}
                  {/*            <MenuItem value={10}>Ten</MenuItem> */}
                  {/*            <MenuItem value={20}>Twenty</MenuItem> */}
                  {/*            <MenuItem value={30}>Thirty</MenuItem> */}
                  {/*        </Select> */}
                  {/*    </FormControl> */}
                  {/* </div> */}
                  <p className={classes.inputTitle}>Group policy admin</p>
                  <form action="">
                    <div className={classes.radioBox}>
                      <label htmlFor="adminChoise1" className={classes.radio}>
                        <input type="radio" name="admin" id="adminChoise1" />
                        <p>Group policy</p>
                        <IconButton
                          style={{ padding: '0px', marginLeft: 'auto' }}
                        >
                          <InfoOutlined
                            style={{
                              width: '25px',
                              height: '25px',
                              color: '#3D7ACF',
                            }}
                          />
                        </IconButton>
                      </label>
                    </div>
                    <div className={classes.radioBox}>
                      <label htmlFor="adminChoise2" className={classes.radio}>
                        <input type="radio" name="admin" id="adminChoise2" />
                        <p>
                          You <span>(regenadjk..1kkk)</span>
                        </p>
                        <IconButton
                          style={{ padding: '0px', marginLeft: 'auto' }}
                        >
                          <InfoOutlined
                            style={{
                              width: '25px',
                              height: '25px',
                              color: '#3D7ACF',
                            }}
                          />
                        </IconButton>
                      </label>
                    </div>
                    <div className={classes.radioBox}>
                      <label htmlFor="adminChoise3" className={classes.radio}>
                        <input type="radio" name="admin" id="adminChoise3" />
                        <p>Another account</p>
                        <IconButton
                          style={{ padding: '0px', marginLeft: 'auto' }}
                        >
                          <InfoOutlined
                            style={{
                              width: '25px',
                              height: '25px',
                              color: '#3D7ACF',
                            }}
                          />
                        </IconButton>
                      </label>
                    </div>
                  </form>
                  <div className={classes.label} style={{ marginTop: '40px' }}>
                    <div className={classes.inputTitle}>
                      Voting window
                      <p className="subTitle">
                        Define the maximum amount of time that must pass in
                        order for a proposal to potentially pass.
                      </p>
                    </div>
                    <p className="max">Maximum</p>
                    <div className={classes.input}>
                      <TextField
                        fullWidth
                        id="outlined"
                        variant="outlined"
                        value={editedGroup.policy.timeoutInDays}
                        onChange={(e) => {
                          updateEditedGroup({
                            ...editedGroup,
                            policy: {
                              ...editedGroup.policy,
                              timeoutInDays: Number(e.target.value),
                            },
                          })
                        }}
                      />
                      <p>days</p>
                    </div>
                  </div>
                  <div className={classes.label}>
                    <div className={classes.inputTitle}>
                      Set a threshold
                      <p className="subTitle">
                        Defines a threshold of yes votes (based on a tally of
                        voter weights) that must be achieved in order for a
                        proposal to pass.
                      </p>
                    </div>
                    <div className={classes.input}>
                      <TextField
                        fullWidth
                        id="outlined"
                        variant="outlined"
                        value={editedGroup.policy.threshold}
                        onChange={(e) => {
                          updateEditedGroup({
                            ...editedGroup,
                            policy: {
                              ...editedGroup.policy,
                              threshold: Number(e.target.value),
                            },
                          })
                        }}
                      />
                      <p>yes votes of 100</p>
                    </div>
                  </div>
                  {/* <div className={classes.label}> */}{' '}
                  {/* TODO doesn't exist in ThresholdDecisionPolicy */}
                  {/*    <div className={classes.inputTitle}> */}
                  {/*        Define a quorum <span>(optional)</span> */}
                  {/*        <p className="subTitle">Quorums define the percentage of total voting power */}
                  {/*            that needs to vote for a proposal to pass.</p> */}
                  {/*    </div> */}
                  {/*    <div className={classes.input}> */}
                  {/*        <TextField */}
                  {/*            variant="outlined"> */}
                  {/*        </TextField> */}
                  {/*        <p>% of total voting power</p> */}
                  {/*    </div> */}
                  {/* </div> */}
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      Prev
                    </Button>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleFormSubmit}
                    >
                      Next
                    </Button>
                  </div>
                </Paper>
              </>
            )}
            {activeStep === 2 &&
              (() => {
                if (editedGroup.info.id === -1) {
                  return (
                    <div>
                      <div className={classes.title}>Finished</div>
                      <div className={classes.subTitle}>
                        You have successfully set up your group and group
                        policy.
                      </div>
                      <div>
                        <Button
                          className={classes.finishedBtn}
                          color="primary"
                          disabled={loading}
                          onClick={async () => {
                            setLoading(true)
                            try {
                              const [createdId, broadcastResults] =
                                await createGroup()
                              // alert(`BroadcastRes: ${JSON.stringify(broadcastResults, null, 2)}`)
                              history.push(
                                Routes.GROUPS_ADMIN_VIEW.replace(
                                  ':id',
                                  createdId.toString()
                                )
                              )
                            } finally {
                              setLoading(false)
                            }
                          }}
                        >
                          Create group
                        </Button>
                      </div>
                    </div>
                  )
                }
                return (
                  <div>
                    <div className={classes.title}>Finished editing</div>
                    <div className={classes.subTitle}>
                      You have successfully edited your group.
                    </div>
                    <div>
                      <Button
                        color="primary"
                        disabled={loading}
                        onClick={async () => {
                          setLoading(true)
                          try {
                            const broadcastRes = await saveGroup()
                            alert(`BroadcastRes: 
    ${JSON.stringify(broadcastRes, null, 2)}`)
                          } finally {
                            setLoading(false)
                          }
                        }}
                      >
                        Save Group
                      </Button>
                    </div>
                  </div>
                )
              })()}
          </div>
        </Page>
      </div>
    </div>
  )
})
