import { getRandomAddress } from 'env'

export const initialState = {
  defaultAddress: null,
  addresses: [],
  transfers: [],
  transferInitialValue: {
    amountInEther: 0.125
  }
}

import {
  RECEIVE_WEB3_ACCOUNTS,
  ETHER_TRANSFERED
} from './actions'

export function web3Reducer (state = initialState, action) {
  if (action.type === RECEIVE_WEB3_ACCOUNTS) {
    return Object.assign({}, state, {
      addresses: action.payload,
      defaultAddress: getRandomAddress(action.payload)
    })
  }

  if (action.type === ETHER_TRANSFERED) {
    return Object.assign({}, state, {
      transfers: state.transfers.concat(action.payload)
    })
  }
  return state
}
