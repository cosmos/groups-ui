import React from 'react'
import { Button } from '@material-ui/core'

const EditMembersButton = ({ setMembersEditMode }) => {
    return (
        <Button
            variant="outlined"
            color="primary"
            className="tableBtn"
            onClick={() => setMembersEditMode(true)}
        >
            Edit members
        </Button>
    )
}

export default EditMembersButton
