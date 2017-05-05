import { getRandomAddress } from 'env'
import { without, find } from 'lodash'

import {
  RECEIVE_WEB3_ACCOUNTS
} from 'store/ethereum/web3'

import {
  LOCATION_CHANGE,
  getFaucetNameFromPath
} from 'store/location'

import {
  RECEIVE_FAUCET,
  RECEIVE_FAUCET_ADDRESSES,
  RECEIVE_FAUCET_OBJECTS,
  FAUCET_CREATED,
  RECEIVE_FAUCET_EVENT_STORE,
  SEND_WEI,
  getFaucetByCreator,
  getFaucetByName,
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

import { store } from 'main'

export const faucetReducer = (state = initialState, action) => {
  if (action.type === 'FAUCET_READ_MODEL_EVENTS_RECEIVED') {
    let readModel = authorizedAddressReadModel(state.authorizedAddressReadModel, action.payload)
    console.log('readModel: ', readModel)
    // let readModel = state.authorizedAddressReadModel
    return Object.assign({}, state, {
      authorizedAddressReadModel: readModel
    })
  }

  if (action.type === LOCATION_CHANGE) {
    let faucetName = getFaucetNameFromPath(action.payload.pathname)
    if (faucetName && (state.selected === null || state.selected.name !== faucetName)) {
      store.dispatch(getFaucetByName(faucetName))
    }
  }

  if (action.type === RECEIVE_FAUCET_EVENT_STORE) {
    let _authorizedAddressReadModel = authorizedAddressReadModel(state.authorizedAddressReadModel, action.payload)
    return Object.assign({}, state, {
      authorizedAddressReadModel: _authorizedAddressReadModel
    })
  }

  if (action.type === RECEIVE_WEB3_ACCOUNTS) {
    let defaultAddress = getRandomAddress(action.payload)
    store.dispatch(getAllFaucetObjects())
    return Object.assign({}, state, {
      defaultAddress: defaultAddress
    })
  }

  if (action.type === RECEIVE_FAUCET) {
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
  }

  if (action.type === RECEIVE_FAUCET_ADDRESSES) {
    return Object.assign({}, state, {
      addresses: without(action.payload, 0)
    })
  }

  if (action.type === RECEIVE_FAUCET_OBJECTS) {
    let ownerFaucet = find(action.payload, (f) => {
      return f.creator === state.defaultAddress
    })
    return Object.assign({}, state, {
      objects: action.payload,
      defaultFaucet: ownerFaucet
    })
  }

  if (action.type === FAUCET_CREATED) {
    store.dispatch(getFaucetByCreator(state.defaultAddress))
    return Object.assign({}, state, {
      addresses: state.addresses.concat(action.payload.logs[0].address)
    })
  }

  if (action.type === SEND_WEI) {
    return Object.assign({}, state, {
      selected: {
        ...state.selected,
        balance: state.selected.balance - 1 //eventually inconsistent...
      }
    })
  }

  return state
}
