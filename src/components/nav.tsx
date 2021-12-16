import React from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { Routes } from '../routes'
import { Link, useLocation } from 'react-router-dom'

import './nav.css'

export const Nav: React.FC<{}> = observer(() => {
    const { pathname } = useLocation()

    return (
        <>
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
                    'active': pathname === Routes.GROUPS_CREATE
                })}>
                    <Link to={Routes.GROUPS_CREATE}>CREATE GROUP</Link>
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
            <hr />
        </>
    )
})
