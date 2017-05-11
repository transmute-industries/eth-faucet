import { getRandomAddress } from 'env'
import { without, find } from 'lodash'

import { Constants } from './constants'

import {
  getFaucetByCreator,
  getAllFaucetObjects,
  getEventStore
} from './actions'

export const initialState = {
  addresses: [],
  objects: null,
  selected: null,
  defaultAddress: null,
  defaultFaucet: null,
  authorizedAddressReadModel: null
}

import { authorizedAddressReadModel } from './generators'
import { store } from 'app'

const handlers = {
  [Constants.FAUCET_READ_MODEL_EVENTS_RECEIVED]: (state, action) => {
    let readModel = authorizedAddressReadModel(state.authorizedAddressReadModel, action.payload)
    return Object.assign({}, state, {
      authorizedAddressReadModel: readModel
    })
  },
  [Constants.RECEIVE_FAUCET_EVENT_STORE]: (state, action) => {
    let _authorizedAddressReadModel = authorizedAddressReadModel(state.authorizedAddressReadModel, action.payload)
    return Object.assign({}, state, {
      authorizedAddressReadModel: _authorizedAddressReadModel
    })
  },
  [Constants.RECEIVE_WEB3_ACCOUNTS]: (state, action) => {
    let defaultAddress = getRandomAddress(action.payload)
    store.dispatch(getAllFaucetObjects())
    return Object.assign({}, state, {
      defaultAddress: defaultAddress
    })
  },
  [Constants.RECEIVE_FAUCET]: (state, action) => {
    let faucet = action.payload
    let defaultFaucet

    if (faucet && faucet.creator === state.defaultAddress) {
      defaultFaucet = faucet
    }

    store.dispatch(getEventStore(faucet.address))

    let objects = state.objects
    if (objects) {
      objects = objects.concat(faucet)
    }

    return Object.assign({}, state, {
      selected: faucet,
      isOwner: faucet && faucet.creator === state.defaultAddress,
      defaultFaucet: defaultFaucet,
      objects: objects
    })
  },
  [Constants.RECEIVE_FAUCET_ADDRESSES]: (state, action) => {
    return Object.assign({}, state, {
      addresses: without(action.payload, 0)
    })
  },
  [Constants.RECEIVE_FAUCET_OBJECTS]: (state, action) => {
    let ownerFaucet = find(action.payload, (f) => {
      return f.creator === state.defaultAddress
    })
    return Object.assign({}, state, {
      objects: action.payload,
      defaultFaucet: ownerFaucet
    })
  },
  [Constants.FAUCET_CREATED]: (state, action) => {
    store.dispatch(getFaucetByCreator(state.defaultAddress))
    return Object.assign({}, state, {
      addresses: state.addresses.concat(action.payload.logs[0].address)
    })
  },
  [Constants.SEND_WEI]: (state, action) => {
    return Object.assign({}, state, {
      selected: {
        ...state.selected,
        balance: state.selected.balance - 1
      }
    })
  }
}

export const faucetReducer = (state = initialState, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action)
  }
  return state
}
