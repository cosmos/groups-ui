import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import { StoresRepository } from './shared-state/repo'
import { applyChainInfo } from './protocol/services'

import './index.css'

// BaseHttpService.commonErrorMiddlewares.push((error: AxiosError) => {
//     if (get(error, 'response.status') === 401) {
//         console.warn('server returned 401 status')
//     }
// })
//
// BaseHttpService.commonErrorMiddlewares.push((error: AxiosError | any) => {
//     if ('toJSON' in error) {
//         console.log('Axios error JSONed:', error.toJSON())
//     }
// })

(async () => {
    await applyChainInfo(StoresRepository.instance.chainInfoStore.chainInfo)
    document.title = window.location.host  // TODO hardcode

    ReactDOM.render(<App />, document.getElementById('root'))
})()
