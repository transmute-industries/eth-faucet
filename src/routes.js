import React from 'react';
import { Route, IndexRoute } from 'react-router'

// TODO:
// Use UserIsAuthenticated for admin interface for contracts (owner === logged in user address)
import {UserIsNotAuthenticated } from './util/wrappers.js'


import Home from './layouts/Home'
import CreateFaucet from './layouts/CreateFaucet'
import SignUp from './layouts/SignUp'

const routes = (
    <Route path="/">
        <IndexRoute component={Home} />
        <Route path="faucet/create" component={UserIsNotAuthenticated(CreateFaucet)} />
        <Route path="signup" component={UserIsNotAuthenticated(SignUp)} />
    </Route>
)

export default routes;