import {
  getFaucetByCreator,
  getFaucetByName,
  getAllFaucetAddresses,
  getAllFaucetObjects,
  createFaucet,
  requestFaucetAccess,
  authorizeFaucetAccess,
  revokeFaucetAccess,
  sendWei,
  getEventStore
} from './actions'

import {
  faucetReducer,
  initialState
} from './reducer'

export {
  getFaucetByCreator,
  getFaucetByName,
  getAllFaucetAddresses,
  getAllFaucetObjects,
  createFaucet,
  requestFaucetAccess,
  authorizeFaucetAccess,
  revokeFaucetAccess,
  sendWei,
  getEventStore,
  faucetReducer,
  initialState
}
