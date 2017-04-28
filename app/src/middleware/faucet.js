export const RECEIVE_FAUCET = 'RECEIVE_FAUCET';
export const RECEIVE_FAUCETS = 'RECEIVE_FAUCETS';
export const FAUCET_CREATED = 'FAUCET_CREATED';
export const FAUCET_UPDATED = 'FAUCET_UPDATED';
export const SEND_WEI = 'SEND_WEI';

import Web3 from 'web3'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
import { browserHistory } from 'react-router';

const contract = require('truffle-contract')

import Faucet from '../../build/contracts/Faucet.json'
import FaucetManager from '../../build/contracts/FaucetManager.json'

const faucetContract = contract(Faucet)
faucetContract.setProvider(provider);

const faucetManagerContract = contract(FaucetManager);
faucetManagerContract.setProvider(provider);

// CALL BACKIFY ALL THIS

// HELPER METHODS

export const faucetContractGetFaucetByAddress = (_address) => {
    return faucetContract.at(_address).then(async (_faucet) => {
        return {
            address: _faucet.address,
            timeCreated: await _faucet.timeCreated.call(),
            creator: await _faucet.creator.call(),
            name: await _faucet.name.call().then((_name) => _name.replace(/-/g, ' ')),
            balance: await web3.fromWei(web3.eth.getBalance(_address), "ether").toNumber()
        }
    })
}

export const faucetManagerContractGetFaucetByCreator = (fromAddress, _callback) => {
    faucetManagerContract.deployed()
        .then((_instance) => {
            _instance.faucetByCreator
                .call({ from: fromAddress })
                .then(async (_address) => {
                    let addr = _address == 0 ? null : await faucetContractGetFaucetByAddress(_address)
                    _callback(addr);
                })
                .catch((error) => {
                    console.error(error);
                })
        })
}

export const faucetManagerContractGetFaucetByName = (_name, _callback) => {
    faucetManagerContract.deployed()
        .then((_instance) => {
            _instance.faucetByName
                .call(_name)
                .then(async (_address) => {
                    let addr = _address == 0 ? null : await faucetContractGetFaucetByAddress(_address)
                    _callback(addr);
                })
                .catch((error) => {
                    console.error(error);
                })
        })
}

export const faucetManagerContractGetAllFaucets = (_callback) => {
    faucetManagerContract.deployed()
        .then((_instance) => {
            _instance.getFaucets
                .call()
                .then((data) => {
                    console.log('what data: ', data)
                    _callback(data);
                })
                .catch((error) => {
                    console.error(error);
                })
        })
}

export const faucetManagerContractCreateFaucet = (_name, fromAddress, _callback) => {
    faucetManagerContract.deployed()
        .then((_instance) => {
            _instance
                .createFaucet(_name, { from: fromAddress, gas: 2000000, value: web3.toWei(10) })
                .then((_tx) => {
                    // browserHistory.push("/faucets/" + _name)
                    console.log(_tx)
                    _callback(_tx);
                })
                .catch((error) => {
                    console.error(error);
                })
        })
}

export const faucetContractSendWei = (_faucetAddress, _recipientAddress, fromAddress, _callback) => {
    faucetContract.at(_faucetAddress)
        .then((_faucet) => {
            _faucet.sendWei(_recipientAddress, { from: fromAddress })
                .then((_tx) => {
                    console.log("_tx:", _tx);
                    _callback(_tx);
                })
                .catch((error) => {
                    console.error(error);
                })
        })
}

