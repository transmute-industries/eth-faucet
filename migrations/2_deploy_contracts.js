var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var Authentication = artifacts.require("./Authentication.sol");

var TreasureChestFactory = artifacts.require("./TreasureChestFactory.sol");
var TreasureChest = artifacts.require("./TreasureChest.sol");

module.exports = function (deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);
  
  deployer.deploy(TreasureChestFactory);
  deployer.link(TreasureChestFactory, TreasureChest);
  deployer.deploy(TreasureChest);
};
