import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'

export const Groups: React.FC<{}> = observer(() => {
    const { groupsStore } = useStores()
    groupsStore.fetchGroups()

    return (
        <div>
            groups
            { JSON.stringify(groupsStore.groups) }
        </div>
    )
})
