import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Routes } from '../routes'
import { Link, useLocation } from 'react-router-dom'
import './nav.css'
import { CosmosNodeService } from '../protocol/cosmos-node-service'
import {createStyles, makeStyles, Theme} from '@material-ui/core'
import {truncateAddress} from "../utils";
import ChainSelector from "./chain-selector/chain-selector";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userLabel: {
            fontFamily: 'Lato',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '150%',
            color: '#545555',
            paddingLeft: '40px'
        }
    }),
);

export const Nav: React.FC<{}> = observer(() => {
    const { pathname } = useLocation()
    const [userString, setUserString] = useState('')

    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            const key = await CosmosNodeService.instance.cosmosClient.keplr.getKey(CosmosNodeService.instance.chainInfo.chainId)
            console.log('key', key)
            setUserString(`${key.name}: ${truncateAddress(key.bech32Address)}`)
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
                maxWidth: '1140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
            }}>
                <div>
                    <Link to={Routes.GROUPS}>
                        <img src={`${window.location.origin}/groups_logo.svg`} alt="logo" width="53px" />
                    </Link>
                </div>
                {/* <ul className="nav">
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
                </ul> */}
                <div style={{ display: 'flex', alignItems: "center" }}>
                    <ChainSelector />
                    <div className={classes.userLabel}>{userString}</div>
                </div>
            </div>
        </div>
    )
})
