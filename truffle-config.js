const path = require("path");
require('dotenv').config()

var HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  
     
    networks: {
      
  
          development: {
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
  