import React from 'react';
import { Route, IndexRoute } from 'react-router'

import { UserIsNotAuthenticated, UserIsAuthenticated } from './util/wrappers.js'

import Home from './layouts/Home'
import SignUp from './layouts/SignUp'
import Admin from './layouts/Admin'
import Profile from './layouts/Profile'
import CreateFaucet from './layouts/CreateFaucet'

import Faucet from './layouts/Faucet'

const routes = (
    <Route path="/">
        <IndexRoute component={Home} />

        <Route path="profile" component={UserIsAuthenticated(Profile)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />

        <Route path="admin" component={UserIsAuthenticated(Admin)} />
        <Route path="profile" component={UserIsAuthenticated(Profile)} />

        <Route path="faucets/:faucetName" component={UserIsNotAuthenticated(Faucet)} />
        <Route path="faucet/create" component={UserIsAuthenticated(CreateFaucet)} />
    </Route>
)

export default routes;
