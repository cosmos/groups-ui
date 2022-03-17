import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { Page } from './pages/page'
import { Groups } from './pages/groups/groups'
import { Nav } from './components/nav'
import { Routes } from './routes'

import { Settings } from './pages/settings/settings'
import { GroupAdminView } from './pages/groups/admin-view'
import { GroupDetails } from './pages/groups/group-details'
import { ProposalPage } from './pages/create-proposal/proposal'
import { CreateProposal } from './pages/create-proposal/create-proposal'

import './app.css'
import { EditGroup } from './pages/edit-group/edit-group'


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
                <Route exact path={Routes.GROUPS_ADMIN_VIEW}>
                    <GroupAdminView />
                </Route>
                <Route exact path={Routes.GROUPS_DETAILS}>
                    <GroupDetails />
                </Route>
                <Route exact path={Routes.GROUPS_EDIT}>
                    <EditGroup />
                </Route>
                <Route exact path={Routes.PROPOSALS_EDIT}>
                    <CreateProposal />
                </Route>
                <Route exact path={Routes.SETTINGS}>
                    <Page>
                        <Settings />
                    </Page>
                </Route>
                <Route exact path='/my/component'>
                    <ProposalPage />
                </Route>
            </Switch>
        </Router>
    )
}
