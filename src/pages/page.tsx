import React from 'react'

import './page.css'

export const Page: React.FC = props => {
    return (
        <div className="page">
            { props.children }
        </div>
    )
}
