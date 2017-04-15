var Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
var TreasureChest = artifacts.require("./TreasureChest.sol");
var TreasureChestFactory = artifacts.require("./TreasureChestFactory.sol");

contract('TreasureChestFactory', function(accounts) {

    var treasureChestFactoryInstance = null;
    var treasureChestAddress = null;

    var originalChestOwner = accounts[0];

    var thiefAddress = accounts[2];
    var thiefBalanceBefore,
        thiefBalanceAfter;

    it("Factory Instance Exists", () => {
        return TreasureChestFactory.deployed().then((instance) => {
            return treasureChestFactoryInstance = instance;
        });
    })

    it("Create First Treasure Chest address", () => {
        return treasureChestFactoryInstance.createTreasureChest.call({from: originalChestOwner, gas: 2000000, value: web3.toWei(1)}).then((address) => {
            return treasureChestAddress = address;
        });
    })

    it("Create First Treasure Chest", () => {
        return treasureChestFactoryInstance.createTreasureChest({from: originalChestOwner, gas: 2000000, value: web3.toWei(1)})
    });

    it("Verify First Treasure Chest owner", () => {
        return TreasureChest.at(treasureChestAddress).then((treasureChest) => {
            return treasureChest.treasureOwner.call().then((treasureOwner) => {
                assert.equal(treasureOwner, originalChestOwner, "treasureOwner is not originalChestOwner")
            });
        })
    })

    it("Verify First Treasure Chest amount", () => {
        return TreasureChest.at(treasureChestAddress).then((treasureChest) => {
            return treasureChest.treasureAmount.call().then((treasureAmount) => {
                assert.equal(1000000000000000000, treasureAmount.toNumber(), "1000000000000000000 wasn't the treasureAmount")
            });
        })
    })

    it("Verify Thief Account Balance After Steal", (done) => {
        TreasureChest.at(treasureChestAddress).then((treasureChest) => {
            var steals = treasureChest.Steal();

            steals.watch((error, result) => {
                if (error == null) {
                    assert.equal(1000000000000000000, result.args._amount.toNumber(), "Amount was not set to 1000000000000000000")
                    steals.stopWatching()
                    done()
                }
            });

            treasureChest.stealCoins(thiefAddress);
        })
    })
});