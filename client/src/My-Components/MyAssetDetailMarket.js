import React, { useState } from 'react';
import { ethers } from 'ethers'
import RealEstate from '../contracts/RealEstate.json';
function MyAssetDetailMarket(props) {
    const [assetId, setAssetId] = useState(undefined)
    const [apprOwner, setApprOwner] = useState(undefined)
    const [assetPrice, setAssetPrice] = useState(undefined)
    const RealEstateAddress = "0x5500A05a87d5D2d63a98b3B3b86dC853bbfc49DD";
    const [enableSale, setEnableSale] = useState(false);
   
    const buyAsset = async () => {
        setAssetId(props.assetID)
        if ( !props.assetPrice)  return
        if (typeof window.ethereum !== 'undefined') {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
            let overrides = {
                // To convert Ether to Wei:
                value: ethers.utils.parseEther((props.assetPrice).toString('hex'))     // ether in this case MUST be a string
            
                // Or you can use Wei directly if you have that:
                // value: someBigNumber
                // value: 1234   // Note that using JavaScript numbers requires they are less than Number.MAX_SAFE_INTEGER
                // value: "1234567890"
                // value: "0x1234"
            
                // Or, promises are also supported:
                // value: provider.getBalance(addr)
            };
            console.log(props.owner,props.assetID)
            const transaction = await contract.buy(props.owner,props.assetID,overrides)
            await transaction.wait();
            console.log("Successfully listed in Markrtplace for sale")
        }
        else {
            console.log("Refreseh Page to Connect to MetaMAsk Wallet")
        }
    }

    
    return (<div>
        <div className="card m-4" style={{ maxWidth: "30rem" }}>
            <div className="card-body">
                <h5 className="card-title">AssetId: {props.assetID}</h5>
                <div className="card-text d-flex flex-column m-1 mb-3">
                    <span>Type: {props.type}</span>
                    <span>Owner: {props.owner}</span>
                    <span>Price: {props.assetPrice.toString('hex')} ETH</span>
                    <button className="btn btn-primary m-1" onClick={buyAsset}>Buy</button>
                </div>
               
                
            </div>
        </div>
    </div>);
}
export default MyAssetDetailMarket;