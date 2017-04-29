
export const UPORT_LOGGED_IN = 'UPORT_LOGGED_IN'
export const UPORT_LOGGED_OUT = 'UPORT_LOGGED_OUT'

import {
  requestCredentials
} from 'middleware/ethereum/uport';

export const loginUser = () => dispatch => {
  requestCredentials((profile) => {
    dispatch({
      type: UPORT_LOGGED_IN,
      payload: profile
    })
  })
}

export const logoutUser = () => dispatch => {
  return function (dispatch) {
    dispatch({
      type: UPORT_LOGGED_OUT,
      payload: null
    })
  }
}
