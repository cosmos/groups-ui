import React from 'react'
import ReactDOM from 'react-dom'
import { get } from 'lodash'
import { App } from './app'
import { setServerUrl } from './protocol/services'
import { initStores } from './shared-state/repo'
import { BaseHttpService } from './protocol/base-http-service'
import { AxiosError } from 'axios'

import './index.css'

BaseHttpService.commonErrorMiddlewares.push((error: AxiosError) => {
    if (get(error, 'response.status') === 401) {
        console.warn('server returned 401 status')
    }
})

BaseHttpService.commonErrorMiddlewares.push((error: AxiosError | any) => {
    if ('toJSON' in error) {
        console.log('Axios error JSONed:', error.toJSON())
    }
})

setServerUrl('http://localhost:8080') // TODO hardcode
initStores()

document.title = window.location.host  // TODO hardcode

ReactDOM.render(<App />, document.getElementById('root'))
