import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Routes } from '../routes'
import { Link, useLocation } from 'react-router-dom'

import './nav.css'
import { CosmosNodeService } from '../protocol/cosmos-node-service'
import { Backdrop, Button, createStyles, Fade, FormControl, InputLabel, makeStyles, MenuItem, Modal, Paper, Select, TextField, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 178,
            height: 52,
            fontSize: '12px',
            fontWeight: 800,
        },
        menuItem: {
            fontFamily: " 'Lato' ",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: '37px'
        },
        addChainBtn: {
            backgroundColor: 'transparent',
            fontFamily: " 'Lato' ",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: '37px',
            justifyContent: 'start',
            paddingLeft: '16px'
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '28px'
        },
        modalPaper: {
            padding: '43px 30px',
            width: '556px',
            marginTop: '28px',

            "& h2": {
                fontWeight: 900,
                fontSize: "32px",
                lineHeight: '44px',
                textAlign: 'center',
                marginBottom: '57px'
            },

            "& h3": {
                fontFamily: " 'Lato' ",
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: '26px',
                marginBottom: '10px',
                marginTop: '43px'
            }
        }
    }),
);

export const Nav: React.FC<{}> = observer(() => {
    const { pathname } = useLocation()
    const [userString, setUserString] = useState('')

    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
            console.log('key', key)
            setUserString(`${key.name}: ${key.bech32Address}`)
        }

        fetchData()
    }, [])

    return (
        <div style={{
            height: '121px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #EFEFEF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingLeft: '24px',
            paddingRight: '24px',
        }}>
            <div style={{
                maxWidth: '1200px',
                display: 'flex',
                alignItems: 'center',
                flex: 1,
            }}>
                <div>
                    <img src={`${window.location.origin}/groups_logo.svg`} alt="logo" width="53px" />
                </div>
                <ul className="nav">
                    <li className={classNames({
                        'active': pathname === Routes.ROOT
                    })}>
                        <Link to={Routes.ROOT}>Home</Link>
                    </li>

                    <li className={classNames({
                        'active': pathname === Routes.GROUPS
                    })}>
                        <Link to={Routes.GROUPS}>Groups</Link>
                    </li>

                    <li className={classNames({
                        'active': pathname === Routes.GROUPS_EDIT
                    })}>
                        <Link to={Routes.GROUPS_EDIT}>EDIT GROUP</Link>
                    </li>

                    <li className={classNames({
                        'active': pathname === Routes.SETTINGS
                    })}>
                        <Link to={Routes.SETTINGS}>SETTINGS</Link>
                    </li>
                </ul>
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label" style={{ textTransform: 'uppercase', color: 'black' }}>regen chain</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={age}
                            onChange={handleChange}
                            label="REGEN CHAIN"
                        >
                            <MenuItem value={10} className={classes.menuItem}>REGEN</MenuItem>
                            <MenuItem value={20} className={classes.menuItem}>Osmosis</MenuItem>
                            <MenuItem value={30} className={classes.menuItem}>Cosmos</MenuItem>
                            <MenuItem style={{ padding: '0' }}>
                                <Button className={classes.addChainBtn}
                                    fullWidth
                                    onClick={handleOpen}>
                                    + new chain
                                </Button>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {userString}
                </div>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper className={classes.modalPaper}>
                        <h2>Add chain</h2>
                        <div>
                            <h3>REST endpoint</h3>
                            <TextField id="outlined-basic" variant="outlined" fullWidth />
                            <h3>Chain ID</h3>
                            <TextField id="outlined-basic" variant="outlined" fullWidth />
                            <h3>Coin Denom</h3>
                            <TextField id="outlined-basic" variant="outlined" fullWidth />
                            <h3>Coin Minimal Denom</h3>
                            <TextField id="outlined-basic" variant="outlined" fullWidth />
                            <h3>Select chain preset:</h3>
                            <FormControl variant="outlined" fullWidth>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value={10} className={classes.menuItem}>REGEN</MenuItem>
                                    <MenuItem value={20} className={classes.menuItem}>Osmosis</MenuItem>
                                    <MenuItem value={30} className={classes.menuItem}>Cosmos</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    )
})
