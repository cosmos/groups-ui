import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Page } from './pages/page'
import { Groups } from './pages/groups/groups'
import { Nav } from './components/nav'
import { Routes } from './routes'

import './app.css'

export const App: React.FC = () => {
    return (
        <Router>
            <Nav/>
            <Switch>
                <Route exact path={Routes.ROOT}>
                    <span>home</span>
                </Route>
                <Route exact path={Routes.GROUPS}>
                    <Page>
                        <Groups />
                    </Page>
                </Route>
                <Route exact path={Routes.GROUPS_CREATE}>
                    <Page>
                        <span>groups create</span>
                    </Page>
                </Route>
                <Route exact path={Routes.GROUPS_EDIT}>
                    <Page>
                        <span>groups edit</span>
                    </Page>
                </Route>
                <Route exact path={Routes.SETTINGS}>
                    <Page>
                        <span>settings</span>
                    </Page>
                </Route>
            </Switch>
        </Router>
    )
}
