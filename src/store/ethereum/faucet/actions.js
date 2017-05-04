export const RECEIVE_FAUCET = 'RECEIVE_FAUCET'
export const RECEIVE_FAUCET_ADDRESSES = 'RECEIVE_FAUCET_ADDRESSES'
export const RECEIVE_FAUCET_OBJECTS = 'RECEIVE_FAUCET_OBJECTS'
export const FAUCET_CREATED = 'FAUCET_CREATED'
export const FAUCET_UPDATED = 'FAUCET_UPDATED'

export const FAUCET_AUTHORIZATION_REQUESTED = 'FAUCET_AUTHORIZATION_REQUESTED'
export const FAUCET_AUTHORIZATION_GRANTED = 'FAUCET_AUTHORIZATION_GRANTED'
export const FAUCET_AUTHORIZATION_REVOKED = 'FAUCET_AUTHORIZATION_REVOKED'

export const RECEIVE_FAUCET_EVENT_STORE = 'RECEIVE_FAUCET_EVENT_STORE'

export const SEND_WEI = 'SEND_WEI'

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

  getEventStoreEvents
} from 'middleware/ethereum/faucet'


import { eventsFromTransaction } from './event-store';


export const getEventStore = (_address) => {
  console.log('getEventStore...', _address)
  return (dispatch) => {
    getEventStoreEvents(_address, (events) => {
      
      console.log('getEventStore...', events)
      dispatch({
        type: RECEIVE_FAUCET_EVENT_STORE,
        payload: events
      })
    })
  }
}

export const getFaucetByCreator = (_fromAddress) => {
  return (dispatch) => {
    faucetManagerContractGetFaucetByCreator(_fromAddress, (faucet) => {
      dispatch({
        type: RECEIVE_FAUCET,
        payload: faucet
      })
    })
  }
}

export const getFaucetByName = (_name) => {
  return (dispatch) => {
    faucetManagerContractGetFaucetByName(_name, (faucet) => {
      dispatch({
        type: RECEIVE_FAUCET,
        payload: faucet
      })
    })
  }
}

export const getAllFaucetAddresses = () => {
  return (dispatch) => {
    faucetManagerContractGetAllFaucetAddresses(addresses => {
      dispatch({
        type: RECEIVE_FAUCET_ADDRESSES,
        payload: addresses
      })
    })
  }
}

export const getAllFaucetObjects = () => {
  return (dispatch) => {
    faucetManagerContractGetAllFaucetObjects(faucets => {
      dispatch({
        type: RECEIVE_FAUCET_OBJECTS,
        payload: faucets
      })
    })
  }
}

export const requestFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    faucetManagerContractRequestFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx);


       if (events.length){
        dispatch({
          type: "FAUCET_READ_MODEL_EVENTS_RECEIVED",
          payload: events
        })
      }


      dispatch({
        type: FAUCET_AUTHORIZATION_REQUESTED,
        payload: _tx
      })
    })
  }
}

export const authorizeFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    faucetManagerContractAuthorizeFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx);

       if (events.length){
        dispatch({
          type: "FAUCET_READ_MODEL_EVENTS_RECEIVED",
          payload: events
        })
      }


      dispatch({
        type: FAUCET_AUTHORIZATION_GRANTED,
        payload: _tx
      })
    })
  }
}

export const revokeFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress) => {
  return (dispatch) => {
    console.log('revokeFaucetAccess: ', _faucetAddress, _requestorAddress, _fromAddress)
    faucetManagerContractRevokeFaucetAccess(_faucetAddress, _requestorAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx);


       if (events.length){
        dispatch({
          type: "FAUCET_READ_MODEL_EVENTS_RECEIVED",
          payload: events
        })
      }

      dispatch({
        type: FAUCET_AUTHORIZATION_REVOKED,
        payload: _tx
      })
    })
  }
}

export const createFaucet = (_name, _fromAddress) => {
  return (dispatch) => {
    faucetManagerContractCreateFaucet(_name, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx);


       if (events.length){
        dispatch({
          type: "FAUCET_READ_MODEL_EVENTS_RECEIVED",
          payload: events
        })
      }

      dispatch({
        type: FAUCET_CREATED,
        payload: _tx
      })
    })
  }
}

export const sendWei = (_faucetAddress, _recipientAddress, _fromAddress) => {
  return (dispatch) => {
    faucetContractSendWei(_faucetAddress, _recipientAddress, _fromAddress, (_tx) => {

      let events = eventsFromTransaction(_tx);


      if (events.length){
        dispatch({
          type: "FAUCET_READ_MODEL_EVENTS_RECEIVED",
          payload: events
        })
      }
     
      dispatch({
        type: SEND_WEI,
        payload: _tx
      })
    })
  }
}
