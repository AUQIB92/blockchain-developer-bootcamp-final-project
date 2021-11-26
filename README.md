# REAL ESTATE TOKENIZATION DAPP
## Problem Definition
Recording and Tracking of Asset ownership  including Land, Housing and Real Estate has been challenging and cumbersome task since the distant past. As part of this project we design and develop non fungible real esate token DApp to represent various aspects and happenenings in the city pertainingg to Real Estate (Land, Building rtc.) with some sought of Regulation to comply local laws.

## Project Workflow

 1. City Mayor will deploy Smart contract (variant of ERC721)  on Ehereum Network (Main/Testnet) .
 2. City Mayor will  mint tokens in order to regiter assets to the real  Owners (It is Pertenent to mention that, only Mayor(Smart Contract Deployer ) will be able to mint Tokens. Sice this is Regulated, in order to test functionalties users are advised to deployed contract first).
 3. Owners have the option to put thier assets for sale by setting price and approving buyers to be able to buy specific assets.
 3. Approved Buyers will only be able to buy assets which then can sell to other buyers by first approving them.   
 3. We also incorporated an assessment phase that allows city Mayor to appreciate or deppreciate the asset by either increasing or decreasing the asset price.
 4. As part of the future work, we also plan to include  auction mechanism and other governance realted stuff.
'### Run the  RealEstateDApp Locally
#### Install truffle
```
npm install -g truffle
```
#### Install ganache-cli
```
npm i ganache-cli
```
#### Run ganache-cli
```
ganache-cli --port 8545
```
#### Open new terminal window and clone this repository
```
git clone https://github.com/auqib92/blockchain-developer-bootcamp-final-project.git
```
#### Install dependencies


```
 cd  blockchain-developer-bootcamp-final-project

 ```
```
npm install
```
#### Compile smart contract
```
truffle compile
```
#### Deploy smart contract to ganache
```
truffle migrate
```
#### Test smart contract
```
truffle test
```
#### Start DApp
```
npm start
```
- Open metamask browser wallet and connect network to Localhost 8545.
- Import accounts from ganache-cli into the metamask browser wallet to make transactions on the DApp.


#

### Run the DApp Etherum mainnet, testnets or other networks
#### Install truffle
```
npm install -g truffle
```

#### Open new terminal window and clone this repository
```
git clone https://github.com/auqib92/blockchain-developer-bootcamp-final-project.git
```
#### Install dependencies
```
cd  blockchain-developer-bootcamp-final-project

```
```
npm install
```
#### Create a .ENV new file
 - Create a new .env file in the project directory.
 - Put the lines below into the file 
```
RPC_URL = 'https://ropsten.infura.io/v3/YOUR_API_KEY'
MNEMONIC= 'YOUR HD WALLET MNEMONIC'

```

#### Truffle Configuration
  - Go to ``truffle-config.js``  
  * Add your chosen network anywhere below ``networks: {`` , use the code below as an example 
  ```
   ropsten: {
            networkCheckTimeout: 10000,
            // must be a thunk, otherwise truffle commands may hang in CI
            provider: () =>
              new HDWalletProvider(process.env.MNEMONIC, process.env.RPC_URL),
            network_id: '3',
          },
  ```

  - Make sure that you added your MNEMONIC and RPC URL of in the .env file.
#### Compile smart contract
```
truffle compile
```
#### Deploy smart contract to a chosen network
```
truffle migrate --network <network_name>
```
#### Test smart contract
```
truffle test
```
#### Start DApp
```
npm start
```
- Open metamask browser wallet and connect network to your chosen network
- Fund your wallet with Eth or test Eth   to make transactions on the DApp. You can grab test eths from any faucet
#
