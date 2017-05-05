const LightWalletProvider = require('@digix/truffle-lightwallet-provider');

module.exports = {
  networks: {
    'development': {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      before_timeout: 300,
      test_timeout: 300
    },
    'ropsten': {
      provider: new LightWalletProvider({
        keystore: './sigmate-v3-austin-eth-faucet.json',
        password: global.lightWalletPassword,
        rpcUrl: 'https://ropsten.infura.io',
        debug: true,
        pollingInterval: 2000
      }),
      network_id: '*'
    },
    'parity': {
      network_id: '*',
      host: 'localhost',
      port: 8545
    }
  }
};
