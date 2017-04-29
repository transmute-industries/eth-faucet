import {
  getAccounts,
  sendTransaction
} from 'middleware/ethereum/web3'

export const RECEIVE_WEB3_ACCOUNTS = 'RECEIVE_WEB3_ACCOUNTS'
export const ETHER_TRANSFERED = 'ETHER_TRANSFERED'
export const DEBUG_SETTINGS_UPDATED = 'DEBUG_SETTINGS_UPDATED'

export const getWeb3Accounts = () => dispatch => {
  getAccounts((addresses) => {
    dispatch({
      type: RECEIVE_WEB3_ACCOUNTS,
      payload: addresses
    })
  })
}

export const sendEther = (transactionData) => dispatch => {
  sendTransaction(transactionData, (address) => {
    dispatch({
      type: ETHER_TRANSFERED,
      payload: address
    })
  })
}

export const updateDebugSettings = (formModel) => dispatch => {

  dispatch({
    type: DEBUG_SETTINGS_UPDATED,
    payload: formModel
  })

}
