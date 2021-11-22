import React, { useState } from 'react';
import { ethers } from 'ethers'
import web3 from "web3"
import { useSelector} from 'react-redux';
import RealEstate from '../contracts/RealEstate.json';
function MyAssetDetail(props) {
    const [assetId, setAssetId] = useState(undefined)
    const [apprOwner, setApprOwner] = useState(undefined)
    const [assetPrice, setAssetPrice] = useState(undefined)
    const RealEstateAddress = useSelector(({ blockchainReducer }) => blockchainReducer.realContract);
    const [enableSale, setEnableSale] = useState(false);
    let RealPrice;
    const setSale = async () => {
        setAssetId(props.assetID)
        if ( !assetPrice ) return
        if (typeof window.ethereum !== 'undefined') {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
            
            const transaction = await contract.setForSale(props.assetID,web3.utils.toWei(assetPrice))
            await transaction.wait();
            console.log("Successfully listed in Markrtplace for sale")
        }
        else {
            console.log("Refreseh Page to Connect to MetaMAsk Wallet")
        }
    }


    const ApproveBuyer = async () => {
        
        if (typeof window.ethereum !== 'undefined') {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
            
            const transaction = await contract.approveBuyer(props.assetID,apprOwner)
            await transaction.wait();
            console.log("Successfully Approved")
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
                    {!enableSale && props.avlToBuy && <span>Price: {(props.assetPrice).toString('hex')} ETH</span>}
                    {enableSale && <input type="string" className="form-control" id="Price" onChange={e => setAssetPrice((e.target.value))} step="any" placeholder="Price"  />}
                </div>
                {!enableSale && !props.avlToBuy && <button className="btn btn-primary m-1" onClick={() => { setEnableSale(true) }}>Set Price</button>}
                {enableSale && <button className="btn btn-primary m-1" onClick={setSale}>Sale</button>}
                {props.avlToBuy&&<input type="string" className="form-control" id="Address"  onChange={e => setApprOwner(e.target.value)} step="any" placeholder="Buyer Address"  />}
                {apprOwner&&props.avlToBuy&&<button className="btn btn-primary m-1" onClick={ApproveBuyer}>Approve Buyer</button>}
            </div>
        </div>
    </div>);
}
export default MyAssetDetail;