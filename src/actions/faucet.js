

export const RECEIVE_FAUCETS = 'RECEIVE_FAUCETS';
export const FAUCET_CREATED = 'FAUCET_CREATED';

import Web3 from 'web3'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)

const contract = require('truffle-contract')

import Faucet from '../../build/contracts/Faucet.json'
import FaucetFactory from '../../build/contracts/FaucetFactory.json'

const faucetContract = contract(Faucet)
faucetContract.setProvider(provider);

const faucetFactoryContract = contract(FaucetFactory);
faucetFactoryContract.setProvider(provider);

let fromAddress = web3.eth.accounts[0];

export const getAllFaucets = () => {
    return (dispatch) => {
        let faucetFactoryInstance;

        faucetFactoryContract.deployed().then((instance) => {
            faucetFactoryInstance = instance;
            console.log('faucetFactoryInstance: ', faucetFactoryInstance);
            faucetFactoryInstance.getAllFaucets
                .call({ from: fromAddress })
                .catch((error) => {
                    console.error(error);
                })
                .then((faucets) => {
                    // console.log('faucets: ', faucets);
                    dispatch({
                        type: RECEIVE_FAUCETS,
                        payload: faucets
                    });
                })
        })
    }
}


export const createFaucet = () => {
    return (dispatch) => {
        let faucetFactoryInstance;

        faucetFactoryContract.deployed().then((instance) => {
            faucetFactoryInstance = instance;
            console.log('faucetFactoryInstance: ', faucetFactoryInstance);

            faucetFactoryInstance
                .createFaucet({ from: fromAddress, gas: 2000000, value: web3.toWei(10) })
                .catch((error) => {
                    console.error(error);
                })
                .then((tx) => {
                    console.log('tx: ', tx);
                    dispatch({
                        type: FAUCET_CREATED,
                        payload: tx
                    });

                })
        })
    }
}
