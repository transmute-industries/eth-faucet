export const RECEIVE_FAUCETS = 'RECEIVE_FAUCETS';
export const FAUCET_CREATED = 'FAUCET_CREATED';

import Web3 from 'web3'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)

const contract = require('truffle-contract')

import Faucet from '../../build/contracts/Faucet.json'
import FaucetManager from '../../build/contracts/FaucetManager.json'

const faucetContract = contract(Faucet)
faucetContract.setProvider(provider);

const faucetManagerContract = contract(FaucetManager);
faucetManagerContract.setProvider(provider);

let fromAddress = web3.eth.accounts[0];

export const getAllFaucets = () => {
    return (dispatch) => {
        faucetManagerContract.deployed().then((_instance) => {
            _instance.getFaucets
                .call()
                .catch((error) => {
                    console.error(error);
                })
                .then((faucet) => {
                    dispatch({
                        type: RECEIVE_FAUCETS,
                        payload: faucet
                    });
                })
        })
    }
}

export const getFaucetByCreator = () => {
    return (dispatch) => {
        faucetManagerContract.deployed().then((_instance) => {
            _instance.faucetByCreator
                .call({ from: fromAddress })
                .catch((error) => {
                    console.error(error);
                })
                .then((faucet) => {
                    dispatch({
                        type: RECEIVE_FAUCETS,
                        payload: faucet
                    });
                })
        })
    }
}

export const createFaucet = (name) => {
    return (dispatch) => {
        faucetManagerContract.deployed().then((_instance) => {
            _instance
                .createFaucet(name, { from: fromAddress, gas: 2000000, value: web3.toWei(10) })
                .catch((error) => {
                    console.error(error);
                })
                .then((tx) => {
                    dispatch({
                        type: FAUCET_CREATED,
                        payload: tx
                    });
                })
        })
    }
}
