//SPDX-License-Identifier: Unlicense

pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title Real Estate Tokenisation and Markrtplace
/// @author Auqib Hamid Lone
/// @dev This contract allows Mayor to register Users property by minting  NFT and  a marketplace for users to sell and buy registered RealEsatet as NFTS.
/// @dev Inherits ReentrancyGuard which is deployed on buy() function.
/// @dev Uses Counters library for tracking asset IDs for the NFTS .

contract RealEstate is ERC721, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _assetId;

    struct Asset {
        uint256 assetID;
        string _type;
        bool avlToBuy;
        address owner;
        uint256 price;
    }

    // Mappings
    mapping(uint256 => Asset) public assets;
    // mapping(uint256=>address) private assetOwner;
    mapping(uint256 => address) public assetApprovedToSellTo;
    mapping(address => uint256) private totalAssetsOwned;

    event assetRegistered(address onwer, uint256 assetID);

    address public cityMayor;

    constructor()   ERC721("Real Estate Tokensiation", "PEST")  {
        cityMayor = msg.sender;
    }

    modifier onlyMayor() {
        require(msg.sender == cityMayor);
        _;
    }

    /// @notice Registers Real Estate and  Mints a new PEST NFT token corresponding to Regstered Real Estate.
    /// @dev Triggers an event with Asset Id and Owner of NFT

    function registerAsset(address owner, string memory _type)
        public
        onlyMayor
    {
        uint256 assetCount = _assetId.current();
        assets[assetCount].assetID = assetCount;
        assets[assetCount]._type = _type;
        assets[assetCount].avlToBuy = false;
        assets[assetCount].price = 0;

        assets[assetCount].owner = owner;
        emit assetRegistered(owner, assetCount);
        emit Transfer(address(0), owner, assetCount);
        _mint(owner, assetCount);
        totalAssetsOwned[owner]++;
        _assetId.increment();
    }
///    @param id AssetID of Asset.
///    @return owner Owner of Address.
///    @return canBuy Available for buying.
///    @return _type Asset Type.
///    
    function getAssetDetails(uint256 id) public  view
        returns (
            address owner,
            bool canBuy,
            string memory _type
        )
    {
        owner = ownerOf(id);
        canBuy = assets[id].avlToBuy;
        _type = assets[id]._type;
    }

    /// @dev Fetch details of all Assets owned by Address (Owner)
    /// @return  All  details of the Assets  as Asset[] owned by address
    function fetchMyAssets() public view returns (Asset[] memory) {
        uint256 currentIndex = 0;
        uint256 assetCount = _assetId.current();
        Asset[] memory items = new Asset[](assetCount);
        for (uint256 i = 0; i < assetCount; i++) {
            if (ownerOf(i) == msg.sender) {
                Asset storage currentItem = assets[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @dev Fetch details of all Assets avialable for sale
    /// @return  All  details of the  Assets avialable for sale
    function fetchAllAssetsForSale() public view returns (Asset[] memory) {
        uint256 currentIndex = 0;
        uint256 assetCount = _assetId.current();
        Asset[] memory items = new Asset[](assetCount);
        for (uint256 i = 0; i < assetCount; i++) {
            if (assets[i].avlToBuy == true) {
                Asset storage currentItem = assets[i];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @dev Sets price of the Assets and lists them for sale

    function setForSale(uint256 assetID, uint128 price) public {
        require(ownerOf(assetID) == msg.sender, "Not owner of Asset");
        require(assets[assetID].avlToBuy == false, "Already Listed For Sale");
        assets[assetID].avlToBuy = true;
        assets[assetID].price = price;
    }

    /// @dev Allows Owners to increase price  of owned  Assets

    function renuvate(uint256 assetId, uint256 value) public {
        require(msg.sender == ownerOf(assetId), "NotaMayor");
        assets[assetId].price = assets[assetId].price + value;
    }

    /// @dev Allows Mayor  to increase price  of   Assets as part of Appreciation
    function appreciate(uint256 assetId, uint128 value) public onlyMayor {
        require( assets[assetId].avlToBuy==true);
        assets[assetId].price = assets[assetId].price + value;
    }

    /// @dev Allows Mayor  to decraese price  of   Assets as part of Depreciation
    function depreciate(uint256 assetId, uint128 value) public onlyMayor {
        assets[assetId].price = assets[assetId].price - value;
    }

    /// @dev Approves Buyer to buy asset
    function approveBuyer(uint256 assetId, address buyer) public {
        require(msg.sender == ownerOf(assetId));
        approve(buyer, assetId);
        assetApprovedToSellTo[assetId] = buyer;
    }

    /// @dev Clears the Approval of Buyer on  asset
    function clearBuyerApproval(uint256 assetId, address approved) public {
        if (assetApprovedToSellTo[assetId] == approved) {
            assetApprovedToSellTo[assetId] = address(0);
        }
    }

    /// @dev Allows approved buyers to buy assets from Market Place
    function buy(address payable from, uint256 assetId)
        public
        payable
        nonReentrant
    {
        require(_exists(assetId), " Asset not Available");
        require(ownerOf(assetId) != msg.sender, " Asset already owned");
        require(assets[assetId].avlToBuy == true, "Not avialbele for Sale");
        require(msg.value == (assets[assetId].price), "Value less than price");
        require(isApproved(msg.sender, assetId), "Not Approved Buyer");
        require(ownerOf(assetId) == from, "NotTheassetOwner");
        clearBuyerApproval(assetId, getApproved(assetId));
        totalAssetsOwned[from]--;
        totalAssetsOwned[msg.sender]++;
        from.transfer(assets[assetId].price);
        assets[assetId].avlToBuy = false;
        assets[assetId].price = 0;
        transferFrom(from, msg.sender, assetId);
        assets[assetId].owner = msg.sender;
        emit Transfer(from, msg.sender, assetId);
    }

    /// @dev Checks whether Buyer is approved
    function isApproved(address spender, uint256 assetId)
        internal
        view
        returns (bool)
    {
        require(_exists(assetId), "NO Such token Exists");

        return (assetApprovedToSellTo[assetId] == spender);
    }

    /// @dev receive() and fallback() functions to allow the contract to receive ETH and data
    receive() external payable {}

    fallback() external payable {}
}
