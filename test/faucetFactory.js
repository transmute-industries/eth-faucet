var Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
var Faucet = artifacts.require("./Faucet.sol");
var FaucetFactory = artifacts.require("./FaucetFactory.sol");

contract('FaucetFactory', function (accounts) {

    var faucetFactoryInstance = null;
    var faucetAddress = null;
    var faucetCreator = accounts[0];
    var faucetCustomer = accounts[2];
    var creatorFaucets = [];
    var faucetSeedEther = 5000000000000000000;

    it("Factory Instance Exists", () => {
        return FaucetFactory.deployed().then((_instance) => {
            faucetFactoryInstance = _instance;
        });
    })

    it("Verify Faucet Factory Addresses", (done) => {
        faucetFactoryInstance.getAllFaucets
            .call({ from: faucetCreator })
            .then((_faucetAddresses) => {
                creatorFaucets = _faucetAddresses;
                done();
            });
    })

    it("Create Faucet address", (done) => {
        faucetFactoryInstance.createFaucet
            .call({ from: faucetCreator, value: faucetSeedEther })
            .then((_address) => {
                faucetAddress = _address;
                done();
            });
    })

    it("Create Faucet", () => {
        return faucetFactoryInstance.createFaucet({ from: faucetCreator, gas: 2000000, value: faucetSeedEther });
    });

    it("Verify Faucet owner", (done) => {
        Faucet.at(faucetAddress).then((_faucet) => {
            return _faucet.owner.call().then((_owner) => {
                assert.equal(faucetFactoryInstance.address, _owner, "faucetFactoryInstance is not faucet owner")
                done();
            });
        })
    })

    it("Verify Faucet Factory Addresses Increased", (done) => {
        faucetFactoryInstance.getAllFaucets
            .call({ from: faucetCreator })
            .then((_faucetAddresses) => {
                assert.equal(_faucetAddresses.length, creatorFaucets.length + 1, "faucetFactoryInstance addresses did not increase")
                done();
            });
    })

    it("Verify Faucet Balance", (done) => {
        assert.equal(faucetSeedEther, web3.eth.getBalance(faucetAddress).toNumber(), "1000000000000000000 wasn't the faucet balance");
        done();
    })

    it("Verify Get Send Amount", (done) => {
        Faucet.at(faucetAddress)
            .then((_faucet) => {
                return _faucet.getSendAmount.call({ from: faucetCustomer })
            })
            .then((_sendAmount) => {
                assert.equal(1000000000000000000, _sendAmount.toNumber(), "sendAmount wasn't 1000000000000000000")
                done();
            });
    })

    it("Verify Customer Can Get Wei", (done) => {
        return Faucet.at(faucetAddress).then((_faucet) => {
            var events = _faucet.EtherRequested();

            events.watch((error, result) => {
                if (error == null) {
                    assert.equal(1000000000000000000, result.args.sentAmount.toNumber(), "Amount sent was not equalt to 1000000000000000000")
                    events.stopWatching()
                    done();
                }
            });

            _faucet.getWei({ from: faucetCustomer, gas: 2000000 });
        });
    })
});
