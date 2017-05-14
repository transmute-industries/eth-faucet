import { getRandomAddress } from 'env'
import { some, without, find } from 'lodash'

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
  defaultFaucet: null
}

import { selectedFaucetReadModel } from './generators'
import { store } from 'app'

const handlers = {
  [Constants.FAUCET_READ_MODEL_EVENTS_RECEIVED]: (state, action) => {
    let _readModel = selectedFaucetReadModel(state.selected, action.payload)
    // if (some(action.payload, {Type: Constants.FAUCET_CREATED})) {
    //   store.dispatch(getFaucetByCreator(state.defaultAddress))
    //   return Object.assign({}, state, {
    //     addresses: state.addresses.concat(action.payload.logs[0].address)
    //   })
    // }
    return Object.assign({}, state, {
      selected: _readModel
    })
    // return Object.assign({}, _newState)
  },
  [Constants.RECEIVE_FAUCET_EVENT_STORE]: (state, action) => {
    let _readModel = selectedFaucetReadModel(state.selected, action.payload)
    // return Object.assign({}, _newState)
    return Object.assign({}, state, {
      selected: _readModel
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
    console.log('RECEIVE_FAUCET', action)
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
    console.log('timbo')
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
