var Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

var Faucet = artifacts.require("./Faucet.sol");
var FaucetFactory = artifacts.require("./FaucetFactory.sol");

contract('FaucetFactory', function (accounts) {

    var faucetFactoryInstance = null;
    var faucetAddress = null;
    var faucetOwner = accounts[0];
    var faucetCustomer = accounts[2];

    it("Factory Instance Exists", () => {
        return FaucetFactory.deployed().then((instance) => {
            return faucetFactoryInstance = instance;
        });
    })

    it("Create Faucet address", () => {
        return faucetFactoryInstance.createFaucet
            .call({ from: faucetOwner, gas: 2000000, value: web3.toWei(10) })
            .then((address) => {
                return faucetAddress = address;
            });
    })

    it("Create Faucet", () => {
        return faucetFactoryInstance
            .createFaucet({ from: faucetOwner, gas: 2000000, value: web3.toWei(10) })
            .then((tx) =>{
                console.log(tx)
            })
    });

    it("Verify Faucet Factory Addresses", (done) => {
        faucetFactoryInstance.getAllFaucets
            .call({ from: faucetOwner })
            .then((faucetAddresses) => {
                console.log(faucetAddresses)
                done();
            });
    })

    // it("Verify Faucet owner", () => {
    //     return Faucet.at(faucetAddress).then((Faucet) => {
    //         return Faucet.faucetOwner.call().then((_faucetOwner) => {
    //             assert.equal(faucetOwner, _faucetOwner, "faucetOwner is not _faucetOwner")
    //         });
    //     })
    // })

    // it("Verify Faucet Factory Addresses Increased", (done) => {
    //     faucetFactoryInstance.getAllFaucets
    //         .call({ from: faucetOwner })
    //         .then((faucetAddresses) => {
    //             console.log(faucetAddresses)
    //             done();
    //         });
    // })

    // it("Verify Faucet Balance", () => {
    //     return Faucet.at(faucetAddress).then((Faucet) => {
    //         return Faucet.faucetBalance.call().then((faucetBalance) => {
    //             // console.log(faucetBalance.toNumber())
    //             assert.equal(10000000000000000000, faucetBalance.toNumber(), "10000000000000000000 wasn't the faucetBalance")
    //         });
    //     })
    // })

    // it("Verify Faucet Balance", () => {
    //     return Faucet.at(faucetAddress).then((Faucet) => {
    //         return Faucet.getBalance.call().then((faucetBalance) => {
    //             // console.log(faucetBalance.toNumber())
    //             assert.equal(10000000000000000000, faucetBalance.toNumber(), "10000000000000000000 wasn't the faucetBalance")
    //         });
    //     })
    // })

    // it("Verify Get Send Amount", (done) => {
    //     Faucet.at(faucetAddress)
    //         .then((Faucet) => {
    //             return Faucet.getSendAmount
    //                 .call({ from: faucetCustomer })
    //         })
    //         .then((sendAmount) => {
    //             assert.equal(1000000000000000000, sendAmount.toNumber(), "sendAmount wasn't 1000000000000000000")
    //             done();
    //         })
    // })


    // it("Verify Customer Can Get Wei", (done) => {
    //     Faucet.at(faucetAddress)
    //         .then((Faucet) => {
    //             return Faucet.getWei({ from: faucetCustomer, gas: 2000000 })
    //         })
    //         .then((tx) => {
    //             console.log(tx)
    //         })
    // })

    // it("Verify Thief Account Balance After Steal", (done) => {
    //     Faucet.at(faucetAddress).then((Faucet) => {
    //         var events = Faucet.EtherRequested();

    //         events.watch((error, result) => {
    //             if (error == null) {
    //                 console.log(result)
    //                 // assert.equal(1000000000000000000, result.args._amount.toNumber(), "Amount was not set to 1000000000000000000")
    //                 events.stopWatching()
    //                 done()
    //             }
    //             console.log(error, result)
    //         });

    //         Faucet.getWei
    //             .call({ from: faucetCustomer })
    //     })
    // })
});