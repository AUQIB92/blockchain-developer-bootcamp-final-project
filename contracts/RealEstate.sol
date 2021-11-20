//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "../client/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
contract RealEstate is ERC721
{
    
    struct AssetDetails
    {
        
        string detail;
        
        
    }
    
    struct Asset
    {
        uint256 assetID;
        string _type;
        bool avlToBuy;
      address owner;
        uint128 price;
        
        
    }
    
    uint256 public assetCount;
    // Mappings 
    mapping(uint256=>Asset) public  assets;
   // mapping(uint256=>address) private assetOwner;
    mapping(uint256=>address) public assetApprovedToSellTo;
    mapping(address=>uint256) private totalAssetsOwned;
    
    event assetRegistered(address onwer, uint256 assetID);
    
    
    address public cityMayor;
    constructor()  ERC721("Real Estate Tokensiation","PEST") public{
        
        assetCount=0;
        cityMayor=msg.sender;
        
    }
    
    // Registartion  Only by City Mayor
    function registerAsset(address owner,string memory _type) public 
    {
      require(msg.sender==cityMayor,"Not Authorized to Register");
      
       assets[assetCount].assetID=assetCount;
       assets[assetCount]._type=_type;
       assets[assetCount].avlToBuy = false;
       assets[assetCount].price=0;

   assets[assetCount].owner=owner;
       emit assetRegistered(owner,assetCount);
       emit Transfer(address(0),owner,assetCount);
        _mint(owner,assetCount);
        totalAssetsOwned[owner]++;
       assetCount++;
        
    }
    
    function getAssetDetails(uint256 id) public view returns (address owner,bool canBuy,string memory _type){
      
      owner= ownerOf(id);
      canBuy=assets[id].avlToBuy;
      _type=assets[id]._type;

    }
      function fetchMyAssets() public view returns (Asset[] memory) {
    
   
    uint currentIndex = 0;

    Asset[] memory items = new Asset[](assetCount);
    for (uint i = 0; i < assetCount; i++) {
      if (ownerOf(i) == msg.sender ){
        
        Asset storage currentItem = assets[i];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    
    
    }
    return items;
    }
       function fetchAllAssetsForSale() public view returns (Asset[] memory) {
    
   
    uint currentIndex = 0;

    Asset[] memory items = new Asset[](assetCount);
    for (uint i = 0; i < assetCount; i++) {
      if (assets[i].avlToBuy == true ){
        
        Asset storage currentItem = assets[i];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    
    
    }
    return items;
    }
    function setForSale(uint256 assetID,uint128 price) public {
        require(ownerOf(assetID)==msg.sender,"Not owner of Asset");
        require(assets[assetID].avlToBuy==false,"Already Listed For Sale");
        assets[assetID].avlToBuy= true;
        assets[assetID].price=price;
        
    }
    
     function renuvate(uint256 assetId,uint128 value) public{
        require(msg.sender==ownerOf(assetId),"NotaMayor");
         assets[assetId].price = assets[assetId].price+value;
    }
    
    function appreciate(uint256 assetId,uint128 value) public{
        require(msg.sender==cityMayor,"NotaMayor");
         assets[assetId].price = assets[assetId].price+value;
    }
        function depreciate(uint256 assetId,uint128 value) public{
        require(msg.sender==cityMayor,"NotaMayor");
         assets[assetId].price = assets[assetId].price-value;
    }
    
    function approveBuyer(uint256 assetId,address buyer) public 

    {
        require(msg.sender==ownerOf(assetId));
        approve(buyer,assetId);
        assetApprovedToSellTo[assetId]=buyer;
        
        
    }






    function clearBuyerApproval(uint256 assetId,address approved) public {
        if (assetApprovedToSellTo[assetId]==approved){
            assetApprovedToSellTo[assetId] = address(0);
        }
    }
    
    function buy(address payable from, uint256 assetId) public payable {
        require(_exists(assetId)," Asset not Available");
        require(ownerOf(assetId)!=msg.sender," Asset already owned");
        require(assets[assetId].avlToBuy==true,"Not avialbele for Sale");
        require(msg.value>=assets[assetId].price,"Value less than price");
        require(isApproved(msg.sender, assetId), "Not Approved Buyer");
        require(ownerOf(assetId) == from, "NotTheassetOwner");
        clearBuyerApproval(assetId,getApproved(assetId));
        totalAssetsOwned[from]--;
        totalAssetsOwned[msg.sender]++;
        
        from.transfer(assets[assetId].price * 1000000000000000000);
        assets[assetId].avlToBuy = false;
        assets[assetId].price=0;
        transferFrom(from,msg.sender,assetId);
        assets[assetId].owner=msg.sender;
        emit Transfer(from, msg.sender, assetId);
    }
    
    function isApproved(address spender, uint256 assetId) internal view returns (bool) {
        require(_exists(assetId), "NO Such token Exists");
    
        return (assetApprovedToSellTo[assetId] == spender);
    }
    
    
    
}