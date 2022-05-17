import React from 'react'
import ReactDOM from 'react-dom'
import { stores } from './shared-state/repo'
import { App } from './app'
import { applyChainInfo } from './protocol/services'

(async () => {
    await applyChainInfo(stores.chainInfoStore.chainInfo)
    document.title = window.location.host  // TODO hardcode

    ReactDOM.render(<App/>, document.getElementById('root'))
})()
