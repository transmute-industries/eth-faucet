import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'

import faucetReducer from './faucet/Reducers'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  faucet: faucetReducer
})

export default reducer
