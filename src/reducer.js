import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import userReducer from './reducers/user'
import faucetReducer from './reducers/faucet'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  faucet: faucetReducer
})

export default reducer
