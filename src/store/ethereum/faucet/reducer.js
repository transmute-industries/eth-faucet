import { getRandomAddress } from 'env'
import { without } from 'lodash'

import {
  RECEIVE_WEB3_ACCOUNTS
} from 'store/ethereum/web3'

import {
  RECEIVE_FAUCET,
  RECEIVE_FAUCETS,
  FAUCET_CREATED,
  FAUCET_UPDATED,
  getFaucetByCreator
} from './actions'

export const initialState = {
  addresses: [],
  selected: null,
  defaultAddress: null
}

import { store } from 'main'

export const faucetReducer = (state = initialState, action) => {
  if (action.type === RECEIVE_WEB3_ACCOUNTS) {
    let defaultAddress = getRandomAddress(action.payload)
    store.dispatch(getFaucetByCreator(defaultAddress))

    return Object.assign({}, state, {
      defaultAddress: defaultAddress
    })
  }

  if (action.type === RECEIVE_FAUCET) {
    let faucet = action.payload
    return Object.assign({}, state, {
      selected: faucet,
      isOwner: faucet && faucet.creator === state.defaultAddress
    })
  }

  if (action.type === RECEIVE_FAUCETS) {
    return Object.assign({}, state, {
      addresses: without(action.payload, 0)
    })
  }

  if (action.type === FAUCET_CREATED) {
    store.dispatch(getFaucetByCreator(state.defaultAddress))

    return Object.assign({}, state, {
      addresses: state.addresses.concat(action.payload.logs[0].address)
    })
  }

  if (action.type === FAUCET_UPDATED) {
    console.log('state.selected:', state.selected.balance)
    return Object.assign({}, state, {
      selected: {
        ...state.selected,
        balance: state.selected.balance - 1
      }
    })
  }

  return state
}
