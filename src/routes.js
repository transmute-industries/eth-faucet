import React from 'react';
import { Route, IndexRoute } from 'react-router'

import { UserIsNotAuthenticated, UserIsAuthenticated } from './util/wrappers.js'

import HomePage from './layouts/HomePage'
import LoginPage from './layouts/LoginPage'
import AdminPage from './layouts/AdminPage'
import CreateFaucetPage from './layouts/CreateFaucetPage'
import FaucetPage from './layouts/FaucetPage'

const routes = (
    <Route path="/">
        <IndexRoute component={HomePage} />
        <Route path="login" component={UserIsNotAuthenticated(LoginPage)} />
        <Route path="admin" component={UserIsAuthenticated(AdminPage)} />
        <Route path="faucets/:faucetName" component={FaucetPage} />
        <Route path="faucet/create" component={UserIsAuthenticated(CreateFaucetPage)} />
    </Route>
)

export default routes;
