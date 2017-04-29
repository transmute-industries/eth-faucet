import { web3 } from 'env'

export const getAccounts = (_callback) => {
    web3.eth.getAccounts((error, addresses) => {
        //    addresses
        _callback(addresses);
    })
}

export const sendTransaction = (transactionData, _callback) => {
    let amountInWei = web3.toWei(parseFloat(transactionData.amountInEther), "ether");
    web3.eth.sendTransaction({
        from: transactionData.fromAddress,
        to: transactionData.toAddress,
        value: amountInWei
    }, (error, address) => {
        // address
        _callback(address);
    })
}

