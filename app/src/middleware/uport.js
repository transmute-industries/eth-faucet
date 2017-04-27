import { currentEnv, uport, web3 } from 'env'

export const requestCredentials = (_callback) => {
    web3.eth.getCoinbase((err, address) => {
        if (err) { throw err }
        web3.eth.defaultAccount = address
        uport.requestCredentials()
            .then((userPersona) => {
                _callback(userPersona);
            })
    })
}


