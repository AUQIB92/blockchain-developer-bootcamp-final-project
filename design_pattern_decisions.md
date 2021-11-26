## 💡 Design Pattern Decisions
A short summary of design pattern decisions and smart contract best practices taken into account for the RealEstate smart contract.


### Modularity and inheritance

This contract inherits the  [ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol), [Counters](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol) from OpenZeppelin  to  mint the tokens and a correctly cretae a mapping from token id to position in the assets array. Contract also inherits [ReentrancyGuard.sol] (https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol) to safegaurd against any possible Reentrancy attack



### Access Restriction

State variables used were `public` which allowed methods and variables to be accessed from the contract. The use of `modifiers` discussed below, which used to provide a kind of access control to the public functions.

```Solidity 
 function registerAsset(address owner, string memory _type)
        public
        onlyMayor
    {
        
    }

```
### Require Modifier

The contract uses `require()` modifier,  "should be used to ensure valid conditions, such as inputs, or contract state variables [..], or to validate return values from calls to external contracts" evaluating the parameters passed to it as a boolean and throw an exception if it evaluates to false. 

```Solidity
function setForSale(uint256 assetID, uint128 price) public {
        require(ownerOf(assetID) == msg.sender, "Not owner of Asset");
        require(assets[assetID].avlToBuy == false, "Already Listed For Sale");
        assets[assetID].avlToBuy = true;
        assets[assetID].price = price;
    }

 function appreciate(uint256 assetId, uint128 value) public onlyMayor {
        require( assets[assetId].avlToBuy==true);
        assets[assetId].price = assets[assetId].price + value;
    }

```
