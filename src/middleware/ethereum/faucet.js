import Web3 from 'web3'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)
const contract = require('truffle-contract')

import Faucet from '../../../build/contracts/Faucet.json'
import FaucetManager from '../../../build/contracts/FaucetManager.json'

const faucetContract = contract(Faucet)
faucetContract.setProvider(provider)

const faucetManagerContract = contract(FaucetManager)
faucetManagerContract.setProvider(provider)

import {
  faucetStorePath,
  receiveEvents,
  readEvents,
  maybeSyncReadModel
} from '../../store/ethereum/faucet/event-store'
import { selectedFaucetReadModel } from '../../store/ethereum/faucet/generators'

// HELPER METHODS

export const getEventStoreEvents = (_address, _callback) => {
  console.log('_address:', _address)
  return faucetContract.at(_address)
  .then(async (_faucet) => {
    return readEvents(_faucet)
  })
  .then((events) => {
    _callback(events)
  })
}

const getFaucetViewModel = async (_contract) => {
  let cachedObject = await maybeSyncReadModel(faucetStorePath, _contract.address, selectedFaucetReadModel, _contract)
  if (!cachedObject) {
    let viewModel = await getFaucetViewModelFromWeb3Async(_contract)
    console.info('getFaucetViewModel cache miss...')
    maybeSyncReadModel(faucetStorePath, _contract.address, viewModel)
    return viewModel
  } else {
    console.info('getFaucetViewModel cache hit...')
    console.log(cachedObject)
    return cachedObject
  }
}

export const getFaucetViewModelFromWeb3Async = async (_faucet) => {
  return {
    address: _faucet.address,
    timeCreated: (await _faucet.timeCreated.call()).toNumber(),
    creator: await _faucet.creator.call(),
    name: await _faucet.name.call().then((_name) => _name.replace(/-/g, ' ')),
    balance: await web3.fromWei(web3.eth.getBalance(_faucet.address), 'ether').toNumber(),
    requestorAddresses: await _faucet.getRequestorAddresses(),
    events: await readEvents(_faucet)
  }
}

const getFaucetsFromWeb3Async = async (_addresses) => {
  return await Promise.all(
    _addresses
    .map(async (address) => {
      return await faucetContractGetFaucetByAddress(address)
    })
  )
}

export const faucetContractGetFaucetByAddress = async (_address) => {
  let _faucet = await faucetContract.at(_address)
  return await getFaucetViewModel(_faucet)
}

export const faucetManagerContractGetFaucetByCreator = (fromAddress, _callback) => {
  faucetManagerContract.deployed()
  .then((_instance) => {
    _instance.getFaucetByCreator
    .call({ from: fromAddress })
    .then(async (_address) => {
      let addr = _address === '0x0000000000000000000000000000000000000000' ? null : await faucetContractGetFaucetByAddress(_address)
      _callback(addr)
    })
    .catch((error) => {
      console.error(error)
    })
  })
}

export const faucetManagerContractGetFaucetByName = (_name, _callback) => {
  faucetManagerContract.deployed()
  .then((_instance) => {
    _instance.getFaucetByName
    .call(_name)
    .then(async (_address) => {
      let addr = _address === '0x0000000000000000000000000000000000000000' ? null : await faucetContractGetFaucetByAddress(_address)
      _callback(addr)
    })
    .catch((error) => {
      console.error(error)
    })
  })
}

export const faucetManagerContractGetAllFaucetObjects = (_callback) => {
  faucetManagerContract.deployed()
  .then((_instance) => {
    _instance.getFaucets
    .call()
    .then(async (addresses) => {
      let faucetContracts = await getFaucetsFromWeb3Async(addresses)
      _callback(faucetContracts)
    })
    .catch((error) => {
      console.error(error)
    })
  })
}

export const faucetManagerContractGetAllFaucetAddresses = (_callback) => {
  faucetManagerContract.deployed()
  .then((_instance) => {
    _instance.getFaucets
    .call()
    .then(async (addresses) => {
      _callback(addresses)
    })
    .catch((error) => {
      console.error(error)
    })
  })
}

export const faucetManagerContractCreateFaucet = (_name, fromAddress, _callback) => {
  faucetManagerContract.deployed()
  .then((_instance) => {
    _instance
    .createFaucet(_name, { from: fromAddress, gas: 2000000, value: web3.toWei(10) })
    .then((_tx) => {
      _callback(_tx)
    })
    .catch((error) => {
      console.error(error)
    })
  })
}

export const faucetManagerContractRequestFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress, _callback) => {
  faucetManagerContract.deployed()
  .then((_instance) => {
    _instance
    .requestAccess(_faucetAddress, _requestorAddress, {
      from: _fromAddress,
      gas: 2000000
    })
    .then((_tx) => {
      _callback(_tx)
    })
    .catch((error) => {
      console.error(error)
    })
  })
}

export const faucetManagerContractAuthorizeFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress, _callback) => {
  faucetManagerContract.deployed()
  .then((_instance) => {
    _instance
    .authorizeAccess(_faucetAddress, _requestorAddress, {
      from: _fromAddress,
      gas: 2000000
    })
    .then((_tx) => {
      _callback(_tx)
    })
    .catch((error) => {
      console.error(error)
    })
  })
}

export const faucetManagerContractRevokeFaucetAccess = (_faucetAddress, _requestorAddress, _fromAddress, _callback) => {
  faucetManagerContract.deployed()
  .then((_instance) => {
    _instance
    .revokeAccess(_faucetAddress, _requestorAddress, {
      from: _fromAddress,
      gas: 2000000
    })
    .then((_tx) => {
      _callback(_tx)
    })
    .catch((error) => {
      console.error(error)
    })
  })
}

export const faucetContractSendWei = (_faucetAddress, _recipientAddress, _fromAddress, _callback) => {
  faucetContract.at(_faucetAddress)
  .then((_faucet) => {
    _faucet.sendWei(_recipientAddress, { from: _fromAddress })
    .then((_tx) => {
      _callback(_tx)
    })
    .catch((error) => {
      console.error(error)
    })
  })
}

export const faucetContractDonateWei = (_faucetAddress, _fromAddress, _amountInEther, _callback) => {
  web3.eth.sendTransaction({from: _fromAddress, to: _faucetAddress, value: web3.toWei(_amountInEther, 'ether')})
  _callback(null)
}
