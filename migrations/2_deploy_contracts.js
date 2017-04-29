var Ownable = artifacts.require('./zeppelin/ownership/Ownable.sol')
var Killable = artifacts.require('./zeppelin/lifecycle/Killable.sol')
var Authentication = artifacts.require('./Authentication.sol')
var ArrayUtils = artifacts.require('./ArrayUtils.sol')

var FaucetManager = artifacts.require('./FaucetManager.sol')
var Faucet = artifacts.require('./Faucet.sol')

module.exports = function (deployer) {
  deployer.deploy(Ownable)
  deployer.link(Ownable, Killable)
  deployer.deploy(Killable)
  deployer.link(Killable, Authentication)
  deployer.deploy(Authentication)

  deployer.deploy(ArrayUtils)
  deployer.link(ArrayUtils, FaucetManager)
  deployer.link(ArrayUtils, Faucet)

  deployer.deploy(FaucetManager, {value: 5000000000000000000})
  deployer.link(FaucetManager, Faucet)
  deployer.deploy(Faucet)
}
