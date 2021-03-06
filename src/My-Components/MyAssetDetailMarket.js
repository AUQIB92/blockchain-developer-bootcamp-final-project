import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import web3 from "web3"
import { useSelector } from 'react-redux';
import RealEstate from '../contracts/RealEstate.json';
function MyAssetDetailMarket(props) {
    const [assetId, setAssetId] = useState(undefined)
    const [msg, setMsg] = useState(false)
    const RealEstateAddress = useSelector(({ blockchainReducer }) => blockchainReducer.realContract);
    const [enableSale, setEnableSale] = useState(false);
    const [errorTxn, setErrorTxn] = useState(null);
    const address = useSelector(({ blockchainReducer }) => blockchainReducer.address);
    const clickSale = (assetID) => {
        //call contract
        //
        props.onSale(assetID);
    }

    const buyAsset = async () => {
        setAssetId((props.assetID))
        if (!props.assetPrice) return
        if (typeof window.ethereum !== 'undefined') {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                console.log({ provider })
                const signer = provider.getSigner()
                const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)

                console.log(props.assetPrice, props.assetID)

                const transaction = await contract.buy(props.owner, (props.assetID), { value: props.assetPrice })
                //console.log("Successfully listed in Markrtplace for sale")
                setMsg(true)
                setErrorTxn(null)

            }
            catch (error) {
                setMsg(false)
                setErrorTxn(error)
            }
        }
        else {
            console.log("Refreseh Page to Connect to MetaMAsk Wallet")
        }
    }


    return (address&&<div>
        <div className="card m-4" style={{ maxWidth: "30rem" }}>
            <div className="card-body">
                <h5 className="card-title">AssetId: {props.assetID}</h5>
                <div className="card-text d-flex flex-column m-1 mb-3">
                    <span>Type: {props.type}</span>
                    <span>Owner: {props.owner}</span>
                    <span>Price: {ethers.utils.formatEther(props.assetPrice).toString()} ETH</span>
                    <button className="btn btn-primary m-1" onClick={() => { buyAsset(); clickSale(props.assetId)}}>Buy</button>
                    {msg && <div className="mt-3 alert alert-success" role="alert">
                        Asset Successfully Bought
                    </div>}
                    {errorTxn && <div className="mt-3 alert alert-danger" role="alert">
                        You are  Not approved to Buy, get Approval from Ower first
                    </div>}
                </div>


            </div>
        </div>
    </div>);
}
export default MyAssetDetailMarket;