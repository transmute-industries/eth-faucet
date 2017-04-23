export const RECEIVE_FAUCET = 'RECEIVE_FAUCET';
export const RECEIVE_FAUCETS = 'RECEIVE_FAUCETS';
export const FAUCET_CREATED = 'FAUCET_CREATED';
export const FAUCET_UPDATED = 'FAUCET_UPDATED';
export const SEND_WEI = 'SEND_WEI';

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

export const getFaucetByCreator = () => {
    return (dispatch) => {
        faucetManagerContract.deployed().then((_instance) => {
            _instance.faucetByCreator
                .call({ from: fromAddress })
                .catch((error) => {
                    console.error(error);
                })
                .then(async (_address) => {
                    dispatch({
                        type: RECEIVE_FAUCET,
                        payload: _address == 0 ? null : await getFaucetByAddress(_address)
                    });
                })
        })
    }
}

export const getFaucetByName = (_name) => {
    return (dispatch) => {
        faucetManagerContract.deployed().then((_instance) => {
            _instance.faucetByName
                .call(_name)
                .catch((error) => {
                    console.error(error);
                })
                .then(async (_address) => {
                    dispatch({
                        type: RECEIVE_FAUCET,
                        payload: _address == 0 ? null : await getFaucetByAddress(_address)
                    })
                })
        })
    }
}

export const getAllFaucets = () => {
    return (dispatch) => {
        faucetManagerContract.deployed().then((_instance) => {
            _instance.getFaucets
                .call()
                .catch((error) => {
                    console.error(error);
                })
                .then((faucets) => {
                    dispatch({
                        type: RECEIVE_FAUCETS,
                        payload: faucets
                    });
                })
        })
    }
}

export const createFaucet = (_name) => {
    return (dispatch) => {
        faucetManagerContract.deployed().then((_instance) => {
            _instance
                .createFaucet(_name, { from: fromAddress, gas: 2000000, value: web3.toWei(10) })
                .catch((error) => {
                    console.error(error);
                })
                .then((_tx) => {
                    dispatch({
                        type: FAUCET_CREATED,
                        payload: _tx
                    });
                })
        })
    }
}

export const sendWei = (_faucetAddress, _recipientAddress) => {
    return (dispatch) => {
        faucetContract.at(_faucetAddress).then((_faucet) => {
            _faucet.sendWei(_recipientAddress, {from : fromAddress })
            .catch((error) => {
                console.error(error);
            })
            .then((_tx) => {
                console.log("_tx:", _tx);
                dispatch({
                    type: FAUCET_UPDATED,
                    payload: _tx
                });
            })
        })
    }
}

// HELPER METHODS

export const getFaucetByAddress = (_address) => {
    return faucetContract.at(_address).then(async (_faucet) => {
        return {
          address: _faucet.address,
          timeCreated: await _faucet.timeCreated.call(),
          creator: await _faucet.creator.call(),
          name: await _faucet.name.call(),
          balance: await web3.fromWei(web3.eth.getBalance(_address), "ether").toNumber()
        }
    })
}
