//SPDX-License-Identifier: Unlicense

pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RealEstate is ERC721 {
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

    constructor() public ERC721("Real Estate Tokensiation", "PEST") {
       
        cityMayor = msg.sender;
    }
    modifier onlyMayor()
    {
        require(msg.sender==cityMayor);
        _;

    }

    // Registartion  Only by City Mayor
    function registerAsset(address owner, string memory _type) public onlyMayor  {
        
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

    function getAssetDetails(uint256 id)
        public
        view
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

    function setForSale(uint256 assetID, uint128 price) public {
        require(ownerOf(assetID) == msg.sender, "Not owner of Asset");
        require(assets[assetID].avlToBuy == false, "Already Listed For Sale");
        assets[assetID].avlToBuy = true;
        assets[assetID].price = price;
    }

    function renuvate(uint256 assetId, uint128 value) public {
        require(msg.sender == ownerOf(assetId), "NotaMayor");
        assets[assetId].price = assets[assetId].price + value;
    }

    function appreciate(uint256 assetId, uint128 value) public  onlyMayor {
        
        assets[assetId].price = assets[assetId].price + value;
    }

    function depreciate(uint256 assetId, uint128 value) public onlyMayor  {
        
        assets[assetId].price = assets[assetId].price - value;
    }

    function approveBuyer(uint256 assetId, address buyer) public {
        require(msg.sender == ownerOf(assetId));
        approve(buyer, assetId);
        assetApprovedToSellTo[assetId] = buyer;
    }

    function clearBuyerApproval(uint256 assetId, address approved) public {
        if (assetApprovedToSellTo[assetId] == approved) {
            assetApprovedToSellTo[assetId] = address(0);
        }
    }

    function buy(address payable from, uint256 assetId) public payable {
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

    function isApproved(address spender, uint256 assetId)
        internal
        view
        returns (bool)
    {
        require(_exists(assetId), "NO Such token Exists");

        return (assetApprovedToSellTo[assetId] == spender);
    }
}
