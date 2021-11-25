import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import web3 from "web3"
import { useSelector } from 'react-redux';
import RealEstate from '../contracts/RealEstate.json';
function MyAssetDetailMarket(props) {
    const [assetId, setAssetId] = useState(undefined)
    const [apprOwner, setApprOwner] = useState(undefined)
    const RealEstateAddress = useSelector(({ blockchainReducer }) => blockchainReducer.realContract);
    const [enableSale, setEnableSale] = useState(false);
    
    
    const buyAsset = async () => {
        setAssetId(props.assetID)
        if (!props.assetPrice) return
        if (typeof window.ethereum !== 'undefined') {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)

            console.log(props.assetPrice, props.assetID)

            const transaction = await contract.buy(props.owner, props.assetID, {value: Number(web3.utils.toBN(props.assetPrice))})
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
                    <span>Price: {ethers.utils.formatEther(props.assetPrice).toString()} ETH</span>
                    <button className="btn btn-primary m-1" onClick={buyAsset}>Buy</button>
                </div>


            </div>
        </div>
    </div>);
}
export default MyAssetDetailMarket;