import React from 'react'
import { Route, IndexRoute } from 'react-router'

import {
  DEBUG_PATH as DebugRoute,
  CREATE_FAUCET_PATH as CreateFaucetRoute,
  NAME_FAUCET_PATH as FaucetRoute,
  AUTHORIZE_FAUCET_PATH as AuthorizeFaucetRoute
} from './constants/paths'

import CoreLayout from './layouts/CoreLayout/CoreLayout'
import HomePage from './components/HomePage'
import DebugFormContainer from './containers/DebugForm/DebugFormContainer'
import CreateFaucetPage from './components/CreateFaucetPage'
import FaucetPage from './components/FaucetPage'
import AuthorizeFaucetPage from './components/AuthorizeFaucetPage'

const routes = (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomePage} />
    <Route path={DebugRoute} component={DebugFormContainer} />
    <Route path={CreateFaucetRoute} component={CreateFaucetPage} />
    <Route path={FaucetRoute} component={FaucetPage} />
    <Route path={AuthorizeFaucetRoute} component={AuthorizeFaucetPage} />
  </Route>
)

export default routes
