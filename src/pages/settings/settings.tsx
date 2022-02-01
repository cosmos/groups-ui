import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Step, StepLabel, Stepper, TextField } from '@material-ui/core'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Routes } from '../../routes'
import { toUint8Array } from '../../shared-state/groups-store'
import { makeStyles } from '@material-ui/core/styles'
import { Page } from '../page'

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
