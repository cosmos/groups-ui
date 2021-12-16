import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../../shared-state/repo'

export const Groups: React.FC<{}> = observer(() => {
    const { groupsStore } = useStores()
    console.log(groupsStore.groups)
    return (
        <div>
            groups
        </div>
    )
})
