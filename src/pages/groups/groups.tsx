import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'

export const Groups: React.FC<{}> = observer(() => {
    const { groups, fetchGroups } = useStores().groupsStore
    fetchGroups()

    // console.log(JSON.stringify(groupsStore.groups))

    return (
        <div>
            groups
            { JSON.stringify(groups) }
        </div>
    )
})
