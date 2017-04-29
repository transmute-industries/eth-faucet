export const RECEIVE_FAUCET = 'RECEIVE_FAUCET'
export const RECEIVE_FAUCETS = 'RECEIVE_FAUCETS'
export const FAUCET_CREATED = 'FAUCET_CREATED'
export const FAUCET_UPDATED = 'FAUCET_UPDATED'
export const SEND_WEI = 'SEND_WEI'

import {
  faucetManagerContractGetFaucetByCreator,
  faucetManagerContractGetFaucetByName,
  faucetManagerContractGetAllFaucets,
  faucetManagerContractCreateFaucet,
  faucetManagerContractRequestFaucetAccess,
  faucetManagerContractAuthorizeFaucetAccess,
  faucetContractSendWei
} from 'middleware/faucet'

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

export const getAllFaucets = () => {
  return (dispatch) => {
    faucetManagerContractGetAllFaucets(faucets => {
      dispatch({
        type: RECEIVE_FAUCETS,
        payload: faucets
      })
    })
  }
}

export const requestFaucetAccess = (_requestorAddress, _faucetAddress) => {
  return (dispatch) => {
    faucetManagerContractRequestFaucetAccess(_requestorAddress, _faucetAddress, (_tx) => {
      dispatch({
        type: FAUCET_UPDATED,
        payload: _tx
      })
    })
  }
}

export const authorizeFaucetAccess = (_requestorAddress, _faucetAddress) => {
  return (dispatch) => {
    faucetManagerContractAuthorizeFaucetAccess(_requestorAddress, _faucetAddress, (_tx) => {
      dispatch({
        type: FAUCET_UPDATED,
        payload: _tx
      })
    })
  }
}

export const createFaucet = (_name, _fromAddress) => {
  return (dispatch) => {
    faucetManagerContractCreateFaucet(_name, _fromAddress, (_tx) => {
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
      dispatch({
        type: FAUCET_UPDATED,
        payload: _tx
      })
    })
  }
}
