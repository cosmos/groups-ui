import React from 'react'
import { GroupAdminViev } from './groups/admin-viev'

import './page.css'

export const Page: React.FC = props => {
    return (
        <div className="page">
            <div className="page-inner">
                {props.children}
            </div>
        </div>
    )
}
