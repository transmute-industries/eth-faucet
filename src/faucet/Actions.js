

import Web3 from 'web3'
import FaucetContract from '../../build/contracts/Faucet.json'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

const faucet = contract(FaucetContract)
faucet.setProvider(provider)

export const RECEIVE_FAUCETS = 'RECEIVE_FAUCETS';

export const getAllFaucets = () => {
    return (dispatch) => {
        let faucetInstance;
        let accountAddress = web3.eth.accounts[0];
        console.log('accountAddress: ', accountAddress);
        faucet.deployed().then((instance) => {
            faucetInstance = instance;
            console.log('faucetInstance: ', faucetInstance);
            faucetInstance.getBalance
                .call({ from: accountAddress.toString() })
                .catch((error) => {
                    console.error(error);
                })
                .then((balanceObject) => {
                    console.log('result: ', balanceObject);
                    dispatch({
                        type: RECEIVE_FAUCETS,
                        payload: [balanceObject.toNumber()]
                    });
                })
        })
    }
}
