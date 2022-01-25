import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Page } from './pages/page'
import { Groups } from './pages/groups/groups'
import { Nav } from './components/nav'
import { Routes } from './routes'
import { EditGroup } from './pages/edit-group/edit-group'
import CreateGroup from './pages/groups/create'

import './app.css'


export const App: React.FC = () => {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route exact path={Routes.ROOT}>
                    <span>home</span>
                    <Link to={Routes.GROUPS}>Groups</Link>
                </Route>
                <Route exact path={Routes.GROUPS}>
                    <Page>
                        <Groups />
                    </Page>
                </Route>
                <Route exact path={Routes.GROUPS_CREATE}>
                    <Page>
                        <CreateGroup />
                    </Page>
                <Route exact path={Routes.GROUPS_NEW}>
                    <EditGroup />
                </Route>
                <Route exact path={Routes.GROUPS_EDIT}>
                    <EditGroup />
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
