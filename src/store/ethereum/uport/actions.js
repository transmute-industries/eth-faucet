import { Constants } from './constants'

import { requestCredentials } from 'middleware/ethereum/uport'

export const loginUser = () => dispatch => {
  requestCredentials((profile) => {
    dispatch({
      type: Constants.UPORT_LOGGED_IN,
      payload: profile
    })
  })
}

export const logoutUser = () => dispatch => {
  return function (dispatch) {
    dispatch({
      type: Constants.UPORT_LOGGED_OUT,
      payload: null
    })
  }
}
