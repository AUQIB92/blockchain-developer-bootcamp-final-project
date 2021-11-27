# REAL ESTATE TOKENIZATION DAPP
## Problem Definition
Recording and Tracking of Asset ownership  including Land, Housing and Real Estate has been challenging and cumbersome task since the distant past. As part of this project we design and develop non fungible real esate token DApp to represent various aspects and happenenings in the city pertainingg to Real Estate (Land, Building rtc.) with some sought of Regulation to comply local laws.

* The contract is deployed and verified on Ropsten testnet at [0xB52762D80f808737708c06d7dDE3c9D914A21FaC](https://ropsten.etherscan.io/address/0xB52762D80f808737708c06d7dDE3c9D914A21FaC)

* Access the RealEstate DApp at [**RealEstate Website**](https://blockchain-developer-bootcamp-final-project-nine.vercel.app/)


## Project Workflow

 1. City Mayor will deploy Smart contract (variant of ERC721)  on Ehereum Network (Main/Testnet) .
 2. City Mayor will  mint tokens in order to register assets to the real  Owners (It is pertinent to mention that, only Mayor(Smart Contract Deployer ) will be able to mint Tokens. Since this is Regulated, in order to test functionalties users are advised to deployed smart  contract first).
 3. Owners have the option to put thier assets for sale by setting price and approving buyers to be able to buy specific assets.
 3. Approved Buyers will only be able to buy assets which then can sell to other buyers by first approving them.   
 3. We also incorporated an assessment phase that allows city Mayor to appreciate or deppreciate the asset by either increasing or decreasing the asset price.
 4. As part of the future work, we also plan to include  auction mechanism and other governance realted stuff.
### Installation Instructions for running  RealEstateDApp Locally
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
- Fund your wallet with Eth or test Eth   to make transactions on the DApp. You can grab test eths from any faucet.



## Directory Structure
Key files and folders structures are as below:

'''
   .gitattributes
│   .gitignore
│   avoiding_common_attacks.md
│   deployed_address.txt
│   design_pattern_decisions.md
│   LICENSE
│   package-lock.json
│   package.json
│   README.md
│   truffle-config.js
│
├───.vscode
│       settings.json
│
├───contracts
│       Migrations.sol
│       RealEstate.sol
│
├───migrations
│       1_initial_migration.js
│       2-initial_migration.js
│
├───public
│       favicon.ico
│       index.html
│       logo192.png
│       logo512.png
│       manifest.json
│       robots.txt
│
├───src
│   │   App.css
│   │   App.js
│   │   App.test.js
│   │   index.css
│   │   index.js
│   │   logo.svg
│   │   serviceWorker.js
│   │   web3Helper.js
│   │
│   ├───blockchainReducer
│   │       blockchainReducer.js
│   │
│   ├───contracts
│   │       Address.json
│   │       Context.json
│   │       Counters.json
│   │       ERC165.json
│   │       ERC721.json
│   │       IERC165.json
│   │       IERC721.json
│   │       IERC721Metadata.json
│   │       IERC721Receiver.json
│   │       Migrations.json
│   │       RealEstate.json
│   │       ReentrancyGuard.json
│   │       Strings.json
│   │
│   ├───Images
│   │       Home.png
│   │       metamask.png
│   │
│   └───My-Components
│           Footer.js
│           Header.js
│           MarketPlace.js
│           MayorPage.js
│           MyAssetDetail.js
│           MyAssetDetailMarket.js
│           OwnerPage.js
│
└───test
        exceptionsHelpers.js
        RealEstate.js
'''
## Screencast

[![Watch the video]](https://youtu.be/k4KD9x16hZY)

## Ethereum account (for NFT certification)
```
0xdb634749715fB7b5B9aD6dF27A2060FE3fF7bd3e
```
#
## Supporting Documents
* [Design Pattern Decisions](./design_pattern_decisions.md)
* [Avoiding Common Attacks](./avoiding_common_attacks.md)
* [Ropsten Contract Addresses](./deployed_address.txt)