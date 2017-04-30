import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import makeRootReducer from './reducers'

import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { firebase as fbConfig, reduxFirebase as reduxConfig } from '../config'
import { version } from '../../package.json'

const logger = createLogger({
  // ...options
  // Add firebase updates here....
  // collapsed: (getState, action, logEntry) => {
  //   console.log('what is log?', logEntry)
  // }
});

export default (initialState = {}, history) => {
  // ======================================================
  // Window Vars Config
  // ======================================================
  window.version = version

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk.withExtraArgument(getFirebase),

    // This is where you add other middleware like redux-observable

    // Note: logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions
    logger
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      reactReduxFirebase(fbConfig, reduxConfig),
      ...enhancers
    )
  )
  store.asyncReducers = {}



  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
