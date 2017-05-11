import { Constants } from './constants'
import { getRandomAddress } from 'env'

export const initialState = {
  defaultAddress: null,
  addresses: [],
  transfers: [],
  transferInitialValue: {
    amountInEther: 0.125
  }
}

const handlers = {
  [Constants.RECEIVE_WEB3_ACCOUNTS]: (state, action) => {
    return Object.assign({}, state, {
      addresses: action.payload,
      defaultAddress: getRandomAddress(action.payload)
    })
  },
  [Constants.ETHER_TRANSFERED]: (state, action) => {
    return Object.assign({}, state, {
      transfers: state.transfers.concat(action.payload)
    })
  }
}

export const web3Reducer = (state = initialState, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}
