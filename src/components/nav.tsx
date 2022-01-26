import React from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import { Routes } from '../routes'
import { Link, useLocation } from 'react-router-dom'

import './nav.css'

export const Nav: React.FC<{}> = observer(() => {
    const { pathname } = useLocation()

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
                {/*<ul className="nav">*/}
                {/*    <li className={classNames({*/}
                {/*        'active': pathname === Routes.ROOT*/}
                {/*    })}>*/}
                {/*        <Link to={Routes.ROOT}>Home</Link>*/}
                {/*    </li>*/}

                {/*    <li className={classNames({*/}
                {/*        'active': pathname === Routes.GROUPS*/}
                {/*    })}>*/}
                {/*        <Link to={Routes.GROUPS}>Groups</Link>*/}
                {/*    </li>*/}

                {/*    <li className={classNames({*/}
                {/*        'active': pathname === Routes.GROUPS_EDIT*/}
                {/*    })}>*/}
                {/*        <Link to={Routes.GROUPS_EDIT}>EDIT GROUP</Link>*/}
                {/*    </li>*/}

                {/*    <li className={classNames({*/}
                {/*        'active': pathname === Routes.SETTINGS*/}
                {/*    })}>*/}
                {/*        <Link to={Routes.SETTINGS}>SETTINGS</Link>*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </div>
        </div>
    )
})
