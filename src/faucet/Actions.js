

import Web3 from 'web3'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
// const web3 = new Web3(provider)

const contract = require('truffle-contract')

import Faucet from '../../build/contracts/Faucet.json'
import FaucetFactory from '../../build/contracts/FaucetFactory.json'

const faucetContract = contract(Faucet)
faucetContract.setProvider(provider);

const faucetFactoryContract = contract(FaucetFactory);
faucetFactoryContract.setProvider(provider);

export const RECEIVE_FAUCETS = 'RECEIVE_FAUCETS';

export const getAllFaucets = (fromAddress) => {
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
                .then((data) => {
                    console.log('data: ', data);

                    dispatch({
                        type: RECEIVE_FAUCETS,
                        payload: ['0x0...']
                    });

                    // dispatch({
                    //     type: RECEIVE_FAUCETS,
                    //     payload: [balanceObject.toNumber()]
                    // });
                })
        })
    }
}


export const createFaucet = (fromAddress) => {
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
                .then((data) => {
                    console.log('data: ', data);

                    dispatch({
                        type: RECEIVE_FAUCETS,
                        payload: ['0x0...']
                    });

                    // dispatch({
                    //     type: RECEIVE_FAUCETS,
                    //     payload: [balanceObject.toNumber()]
                    // });
                })
        })
    }
}
