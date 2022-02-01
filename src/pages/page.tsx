import React from 'react'
import { GroupDetails } from './groups/group-details'

import './page.css'

export const Page: React.FC = props => {
    return (
        <div className="page">
            <div className="page-inner">
                {/* {props.children} */}
                <GroupDetails></GroupDetails>
            </div>
        </div>
    )
}
