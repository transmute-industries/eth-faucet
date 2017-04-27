import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import reducer from './reducer'
import { createLogger } from 'redux-logger'

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const routingMiddleware = routerMiddleware(browserHistory)
const logger = createLogger({
  // ...options
});

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware,
      logger
    )
  )
)

export default store
