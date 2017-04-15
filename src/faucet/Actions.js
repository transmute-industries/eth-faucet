

import Web3 from 'web3'
// import AuthenticationContract from '../../../../build/contracts/Authentication.json'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)

export const RECEIVE_FAUCETS = 'RECEIVE_FAUCETS';

export const getAllFaucets = () => dispatch => {
    web3.eth.getAccounts((error, addresses) => {
        dispatch({
            type: RECEIVE_FAUCETS,
            faucets: addresses
        })
    })

}
