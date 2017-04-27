import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import locationReducer from './location'

import { reducer as form } from 'redux-form'

import { debugReducer as debug } from './debug'
import { web3Reducer as web3 } from './ethereum/web3'
import { uportReducer as uport } from './ethereum/uport'
import { faucetReducer as faucet } from './ethereum/faucet'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    debug,
    web3,
    uport,
    faucet,
    // Add sync reducers here
    firebase,
    form,
    location: locationReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
