import { web3 } from '../env'

export const RECEIVE_WEB3_ACCOUNTS = 'RECEIVE_WEB3_ACCOUNTS'

export const getWeb3Accounts = () => dispatch => {
  web3.eth.getAccounts((error, addresses) => {
    dispatch({
      type: RECEIVE_WEB3_ACCOUNTS,
      payload: addresses
    })
  })
}
