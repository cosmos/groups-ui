import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import { TextField } from '@material-ui/core'

export const Settings: React.FC<{}> = observer(() => {
    const { chainInfo, setChainInfo } = useStores().chainInfoStore

    return (
        <div>
            <label>
                <p>Chain info</p>
                <TextField
                    style={{
                        minWidth: '600px'
                    }}
                    fullWidth
                    multiline
                    rows={35}
                    value={JSON.stringify(chainInfo, null, 2)}
                    onChange={e => {
                        setChainInfo(JSON.parse(`${e.target.value}`))
                    }}
                />
            </label>
        </div>
    )
})
