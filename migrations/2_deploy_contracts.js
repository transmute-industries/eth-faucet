var Ownable = artifacts.require('./zeppelin/ownership/Ownable.sol')
var Killable = artifacts.require('./zeppelin/lifecycle/Killable.sol')
var Authentication = artifacts.require('./Authentication.sol')
var IndexedEnumerableSetLib = artifacts.require('./IndexedEnumerableSetLib.sol')

var FaucetManager = artifacts.require('./FaucetManager.sol')
var Faucet = artifacts.require('./Faucet.sol')

var EventStore = artifacts.require('./EventStore.sol')

module.exports = function (deployer) {
  deployer.deploy(Ownable)
  deployer.link(Ownable, Killable)
  deployer.deploy(Killable)
  deployer.link(Killable, Authentication)
  deployer.deploy(Authentication)

  deployer.deploy(IndexedEnumerableSetLib)
  deployer.link(IndexedEnumerableSetLib, FaucetManager)
  deployer.link(IndexedEnumerableSetLib, Faucet)

  deployer.deploy(EventStore)

  deployer.deploy(FaucetManager, {value: 5000000000000000000})
  deployer.link(FaucetManager, Faucet)
  deployer.deploy(Faucet)
}
