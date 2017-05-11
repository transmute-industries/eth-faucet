import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import AppContainer from './containers/AppContainer'

import { getWeb3Accounts } from './store/ethereum/web3'

import routes from './routes'
import createStore from './store/createStore'

const initialState = window.___INITIAL_STATE__
export const store = createStore(initialState)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(getWeb3Accounts())

ReactDOM.render(
  <AppContainer
    store={store}
    history={history}
    routes={routes(store)}
  />,
  document.getElementById('mount')
)
