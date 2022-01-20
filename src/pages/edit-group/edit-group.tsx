import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import { Button, Paper } from '@material-ui/core'

export const EditGroup: React.FC<{}> = observer(() => {
    const { updateGroup } = useStores().groupsStore
    return (
        <div>
            <div>
                groups
                <Button
                    color="primary"
                    onClick={updateGroup}
                >
                    {'Update Group'}
                </Button>
            </div>
        </div>
    )
})
