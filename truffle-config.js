const path = require("path");
require('dotenv').config()

var HDWalletProvider = require("truffle-hdwallet-provider");
console.log(process.env.MNEMONIC);
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  
     
    networks: {
      // Useful for testing. The `development` name is special - truffle uses it by default
      // if it's defined here and no other network is specified at the command line.
      // You should run a client (like ganache-cli, geth or parity) in a separate terminal
      // tab if you use this network and you must also set the `host`, `port` and `network_id`
      // options below to some value.
      //
  
          develop: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
          },
          ropsten: {
            networkCheckTimeout: 10000,
            // must be a thunk, otherwise truffle commands may hang in CI
            provider: () =>
              new HDWalletProvider(process.env.MNEMONIC, process.env.RPC_URL),
            network_id: '3',
          }
        },

    
    compilers: {
      solc: {
        version: "0.8.3", // Fetch exact version from solc-bin (default: truffle's version)
      }
    
    },
    plugins: [
      'truffle-plugin-verify'
    ]

  };
  