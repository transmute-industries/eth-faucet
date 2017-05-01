var Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
var ArrayUtils = artifacts.require('./ArrayUtils.sol')
var _ = require('lodash')

contract('ArrayUtils', function (accounts) {

  var arrayUtilsInstance = null
  var array = []

  it('ArrayUtils Instance Exists', () => {
    return ArrayUtils.deployed().then((_instance) => {
      arrayUtilsInstance = _instance
    })
  })

  it('ArrayUtils can insert into an array', () => {
    return ArrayUtils.deployed().then((_instance) => {
      arrayUtilsInstance = _instance
    })
  })
})
