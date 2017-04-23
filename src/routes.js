import React from 'react';
import { Route, IndexRoute } from 'react-router'

import { UserIsNotAuthenticated, UserIsAuthenticated } from './util/wrappers.js'

import Home from './layouts/Home'
import Login from './layouts/Login'
import Admin from './layouts/Admin'
import CreateFaucet from './layouts/CreateFaucet'
import Faucet from './layouts/Faucet'

const routes = (
    <Route path="/">
        <IndexRoute component={Home} />

        <Route path="login" component={UserIsNotAuthenticated(Login)} />

        <Route path="admin" component={UserIsAuthenticated(Admin)} />

        <Route path="faucets/:faucetName" component={UserIsNotAuthenticated(Faucet)} />
        <Route path="faucet/create" component={UserIsAuthenticated(CreateFaucet)} />
    </Route>
)

export default routes;
