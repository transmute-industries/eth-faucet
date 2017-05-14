import { Constants } from './constants'

import {
  faucetManagerContractGetFaucetByCreator,
  faucetManagerContractGetFaucetByName,
  faucetManagerContractGetAllFaucetAddresses,
  faucetManagerContractGetAllFaucetObjects,
  faucetManagerContractCreateFaucet,
  faucetManagerContractRequestFaucetAccess,
  faucetManagerContractAuthorizeFaucetAccess,
  faucetManagerContractRevokeFaucetAccess,
  faucetContractSendWei,
  faucetContractDonateWei,
  getEventStoreEvents
} from 'middleware/ethereum/faucet'

import { eventsFromTransaction } from './event-store'

export const getEventStore = (_address) => {
  return (dispatch) => {
    getEventStoreEvents(_address, (events) => {
      dispatch({
        type: Constants.RECEIVE_FAUCET_EVENT_STORE,
        payload: events
      })
    })
  }
}

export const getFaucetByCreator = (_fromAddress) => {
  return (dispatch) => {
    faucetManagerContractGetFaucetByCreator(_fromAddress, (faucet) => {
      dispatch({
        type: Constants.RECEIVE_FAUCET,
        payload: faucet
      })
    })
  }
}

export const getFaucetByName = (_name) => {
  return (dispatch) => {
    faucetManagerContractGetFaucetByName(_name, (faucet) => {
      dispatch({
        type: Constants.RECEIVE_FAUCET,
        payload: faucet
      })
    })
  }
}

export const getAllFaucetAddresses = () => {
  return (dispatch) => {
    faucetManagerContractGetAllFaucetAddresses(addresses => {
      dispatch({
        type: Constants.RECEIVE_FAUCET_ADDRESSES,
        payload: addresses
      })
    })
  }
}

export const getAllFaucetObjects = () => {
  return (dispatch) => {
    faucetManagerContractGetAllFaucetObjects(faucets => {
      dispatch({
        type: Constants.RECEIVE_FAUCET_OBJECTS,
        payload: faucets
      })
    })
  }
}

export const requestFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    faucetManagerContractRequestFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {
      let events = eventsFromTransaction(_tx)
      if (events.length) {
        dispatch({
          type: Constants.FAUCET_READ_MODEL_EVENTS_RECEIVED,
          payload: events
        })
      }
    })
  }
}

export const authorizeFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    faucetManagerContractAuthorizeFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {
      let events = eventsFromTransaction(_tx)
      if (events.length) {
        dispatch({
          type: Constants.FAUCET_READ_MODEL_EVENTS_RECEIVED,
          payload: events
        })
      }
    })
  }
}

export const revokeFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    faucetManagerContractRevokeFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {
      let events = eventsFromTransaction(_tx)
      if (events.length) {
        dispatch({
          type: Constants.FAUCET_READ_MODEL_EVENTS_RECEIVED,
          payload: events
        })
      }
    })
  }
}

export const createFaucet = (_name, _fromAddress) => {
  return (dispatch) => {
    faucetManagerContractCreateFaucet(_name, _fromAddress, (_tx) => {
      let events = eventsFromTransaction(_tx)

      if (events.length) {
        dispatch({
          type: Constants.FAUCET_READ_MODEL_EVENTS_RECEIVED,
          payload: events
        })
      }

      dispatch({
        type: Constants.FAUCET_CREATED,
        payload: _tx
      })
    })
  }
}

export const sendWei = (_faucetAddress, _recipientAddress, _fromAddress) => {
  return (dispatch) => {
    faucetContractSendWei(_faucetAddress, _recipientAddress, _fromAddress, (_tx) => {
      let events = eventsFromTransaction(_tx)

      if (events.length) {
        dispatch({
          type: Constants.FAUCET_READ_MODEL_EVENTS_RECEIVED,
          payload: events
        })
      }

      dispatch({
        type: Constants.SEND_WEI,
        payload: { transaction: _tx.tx }
      })
    })
  }
}

export const donateWei = (_faucetAddress, _fromAddress, _amountInEther) => {
  return (dispatch) => {
    faucetContractDonateWei(_faucetAddress, _fromAddress, _amountInEther, (_tx) => {
      dispatch({
        type: Constants.DONATE_WEI,
        payload: { transaction: _tx, amount: _amountInEther }
      })
    })
  }
}
