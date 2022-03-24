import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Paper, SvgIcon, TextField} from "@material-ui/core";
import {CreateRounded} from "@material-ui/icons";
import {ReactComponent as VectorIcon} from '../../icons/vector.svg'
import {stores, useStores} from "../../shared-state/repo";
import {useStyles} from "./create-proposal-styles";
import {ActionType} from "../../shared-state/proposals-store";
import {CreateStakeAction} from "./stake/create-stake-action";
import {CreateTextAction} from "./others/create-text-action";
import {CreateSpendAction} from "./others/create-spend-action";
import {CreateParameterChangeAction} from "./others/create-parameter-change-action";
import EasyEdit, { Types } from "react-easy-edit";


const expand = (place) => {
    const block = document.querySelector(place)
    block.classList.toggle("active")
    return (console.log(block))
}

export const ActionsComposer: React.FC<{initialProposerType: ActionType, newAction: Function}> = observer((props) => {
    const classes = useStyles()
    const [name, setName] = useState('New Proposal')
    const [nameEditing, setNameEditing] = useState(false)
    const [description, setDescription] = useState('Test')
    const [descriptionEditing, setDescriptionEditing] = useState(false)
    const {newProposal, addAction} = useStores().proposalsStore

    useEffect( () => {
        if (newProposal.actions.length === 0) {
            addAction(props.initialProposerType)
        }
    }, [])

    useEffect(() => {
        newProposal.name = name
        newProposal.description = description
    }, [name, description, newProposal])

    return (
        <>
            <div className={classes.root}>
                <div className={classes.heroBlock}>
                    <h1>
                        <EasyEdit
                            type={Types.TEXTAREA}
                            value={name}
                            editMode={nameEditing}
                            onCancel={() => setNameEditing(false)}
                            onSave={(name) => { setName(name); setNameEditing(false) }}
                        />
                        <Button className={classes.heroLink} color="primary"
                                style={{display: nameEditing ? 'none' : 'inline'}}
                                onClick={() => setNameEditing(true)}>
                            <CreateRounded style={{ fontSize: 16, marginRight: '4px' }}/>
                            rename
                        </Button>
                    </h1>
                </div>
                <div className={classes.description} style={{ margin: '30px 0', }}>
                    <span>
                        <EasyEdit
                            type={Types.TEXTAREA}
                            value={description}
                            editMode={descriptionEditing}
                            onCancel={() => setDescriptionEditing(false)}
                            onSave={(val) => { setDescription(val); setDescriptionEditing(false) }}
                        />
                        <Button className={classes.heroLink} color="primary"
                                onClick={() => setDescriptionEditing(true)}
                                style={{display: descriptionEditing ? 'none' : 'inline'}}>
                            <CreateRounded style={{ fontSize: 16, marginRight: '4px' }}/>
                            {description ? 'Edit description' : 'Add description'}
                        </Button>
                    </span>
                </div>
                <div className={classes.groupName}>
                    <span>group:</span>
                    <p>{stores.groupsStore?.editedGroup?.metadata?.name}</p>
                </div>

                {newProposal.actions.map( ({id}, index) => {
                    return (
                        <>
                            { index > 0 && (
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', width: '100%' }}>
                                        <SvgIcon component={VectorIcon} style={{ height: '125px', width: '23px', position: 'absolute', top: '-123px', left: '50%' }} />
                                        {/*<button aria-label="expand" className={classes.expandBtn} onClick={() => { expand("#newAction") }}>
                                            <span className="horizontal"></span>
                                            <span className="vertical"></span>
                                        </button>*/}
                                    </div>
                                </div>
                            )}
                            { id.description === ActionType.STAKE && (
                                <CreateStakeAction id={id} />
                            )}
                            { id.description === ActionType.SPEND && (
                                <CreateSpendAction id={id} />
                            )}
                            { id.description === ActionType.TEXT && (
                                <CreateTextAction id={id} />
                            )}
                            { id.description === ActionType.PARAMETER_CHANGE && (
                                <CreateParameterChangeAction id={id} />
                            )}
                        </>
                    )
                })}

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
                    <Button fullWidth color="primary" variant="outlined" className={classes.actionBtn} onClick={ props.newAction() }>
                        + new action
                    </Button>
                    {/*<div style={{ position: 'relative' }}>*/}
                    {/*    <div style={{ position: 'absolute', width: '100%', top: '72px' }}>*/}
                    {/*        <SvgIcon component={VectorIcon} style={{ height: '125px', width: '23px', position: 'absolute', top: '-123px', left: '50%' }} />*/}
                    {/*        <button aria-label="expand" className={classes.expandBtn} onClick={() => { expand("#spendProp") }}>*/}
                    {/*            <span className="horizontal"></span>*/}
                    {/*            <span className="vertical"></span>*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<Paper id="spendProp" className={classes.hiddenBlock} elevation={0} style={{ borderRadius: '10px', border: '1px solid #D2D5D9', margin: '72px 0', }}>*/}
                    {/*    <div className={classes.paperHead}>*/}
                    {/*        <h2>Spend proposal</h2>*/}
                    {/*    </div>*/}
                    {/*    <div className={classes.paperBody}>*/}
                    {/*        <div className="marginB">*/}
                    {/*            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>*/}
                    {/*                <p className={classes.paperTitle}>From</p>*/}
                    {/*                <p className={classes.paperTitle} style={{ marginRight: '43%' }}>To</p>*/}
                    {/*            </div>*/}
                    {/*            <div className={classes.inputBlock}>*/}
                    {/*                <TextField id="outlined-basic" label="From" variant="outlined" style={{ width: '48%' }} />*/}
                    {/*                <TextField id="outlined-basic" label="To" variant="outlined" style={{ width: '48%' }} />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*        <div className="marginB">*/}
                    {/*            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>*/}
                    {/*                <p className={classes.paperTitle}>Amount</p>*/}
                    {/*            </div>*/}
                    {/*            <div className={classes.inputBlock}>*/}
                    {/*                <TextField id="outlined-basic" label="From" variant="outlined" style={{ width: '48%' }} />*/}
                    {/*                <span style={{ fontSize: '16px', marginRight: '37%' }}>REGEN</span>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}

                    {/*    </div>*/}
                    {/*</Paper>*/}
                </div>



            </div>
        </>
    )
})
