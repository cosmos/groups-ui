import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import { Button, Paper } from '@material-ui/core'

export const Groups: React.FC<{}> = observer(() => {
    const { groups, fetchGroups, updateGroup } = useStores().groupsStore
    useEffect(() => {
        fetchGroups()
    }, [fetchGroups])

    // console.log(JSON.stringify(groupsStore.groups))

    return (
        <div>
            <div>
                groups
                <Button
                    color="primary"
                    onClick={updateGroup}
                >
                    {'Create Group'}
                </Button>
            </div>

            <Paper>
                <pre>
                { JSON.stringify(groups, null, 2) }
                </pre>
            </Paper>
        </div>
    )
})
