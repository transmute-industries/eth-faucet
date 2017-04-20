var Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var Authentication = artifacts.require("./Authentication.sol");

var FaucetManager = artifacts.require("./FaucetManager.sol");
var Faucet = artifacts.require("./Faucet.sol");

module.exports = function (deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);

  deployer.deploy(FaucetManager);
  deployer.link(FaucetManager, Faucet);
  deployer.deploy(Faucet);
};
