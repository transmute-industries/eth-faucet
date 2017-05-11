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
import DebugFormContainer from './containers/DebugFormContainer'
import CreateFaucetPage from './components/CreateFaucetPage'
import FaucetPage from './components/FaucetPage'
import AuthorizeFaucetPage from './components/AuthorizeFaucetPage'

import { getFaucetByName } from './store/ethereum/faucet/actions'

const routes = (store) => {
  const fetchFaucet = () => {
    let faucetName = getFaucetNameFromPath(window.location.pathname)
    if (faucetName) {
      store.dispatch(getFaucetByName(faucetName))
    }
  }

  const getFaucetNameFromPath = (path) => {
    if (pathContainsFaucet(path)) {
      var parts = decodeURI(path).split('/')
      let cleanName = parts[2].toLowerCase().replace(/\s+/g, '-')
      return cleanName
    }
    return null
  }

  const pathContainsFaucet = (pathname) => {
    return pathname.indexOf('/faucets/') !== -1
  }

  return (
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={HomePage} />
      <Route path={DebugRoute} component={DebugFormContainer} />
      <Route path={CreateFaucetRoute} component={CreateFaucetPage} />
      <Route path={FaucetRoute} component={FaucetPage} onEnter={fetchFaucet} />
      <Route path={AuthorizeFaucetRoute} component={AuthorizeFaucetPage} />
    </Route>
  )
}

export default routes
