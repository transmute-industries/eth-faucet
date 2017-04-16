import React from 'react';
import { Route, IndexRoute } from 'react-router'

import { UserIsNotAuthenticated, UserIsAuthenticated } from './util/wrappers.js'

import Home from './layouts/Home'
import SignUp from './layouts/SignUp'
import Profile from './layouts/Profile'
import CreateFaucet from './layouts/CreateFaucet'

const routes = (
    <Route path="/">
        <IndexRoute component={Home} />

        <Route path="profile" component={UserIsAuthenticated(Profile)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />

        <Route path="faucet/create" component={UserIsAuthenticated(CreateFaucet)} />
    </Route>
)

export default routes;