import React from 'react';
import { useState } from 'react';
import { ethers } from 'ethers'
import RealEstate from '../contracts/RealEstate.json'
function MayorPage() {
    const [assetOwner, setAssetOwner] = useState(undefined)
    const [assetType, setAssetType] = useState(undefined)
    const [assetId, setAssetId] = useState(undefined)
    const [assetPrice, setAssetPrice] = useState(undefined)
    const [newAssetId, setnewAssetId] = useState(null);
    const RealEstateAddress = "0x5500A05a87d5D2d63a98b3B3b86dC853bbfc49DD"
    const registerAsset = async () => {
        if (!assetOwner && !assetType) return
        if (typeof window.ethereum !== 'undefined') {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
            const transaction = await contract.registerAsset(assetOwner, assetType)
            await transaction.wait()
            contract.on("assetRegistered",(address,assetId)=>{setnewAssetId(assetId)})
           
        }
        else {
            console.log("Refresh Page to Connect to MetaMAsk Wallet")
        }

    };
    const Appreciate = async () => {
        if (!assetOwner && !assetPrice) return
        if (typeof window.ethereum !== 'undefined') {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
            const transaction = await contract.appreciate(assetId, assetPrice)
            await transaction.wait()
            //contract.on("assetRegistered",(address,assetId)=>{setnewAssetId(assetId)})
           
        }
        else {
            console.log("Refresh Page to Connect to MetaMAsk Wallet")
        }
    }
    const DeAppreciate = async () => {
        if (!assetOwner && !assetPrice) return
        if (typeof window.ethereum !== 'undefined') {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
            const transaction = await contract.depreciate(assetId, assetPrice)
            await transaction.wait()
            //contract.on("assetRegistered",(address,assetId)=>{setnewAssetId(assetId)})
           
        }
        else {
            console.log("Refresh Page to Connect to MetaMAsk Wallet")
        }
    }
    return (
        <div className="d-flex flex-row flex-fill">
            <div className="box-register ">
                <h5>Register Asset </h5>

                <div>

                    <div className="form-group">
                        <label >Asset Owner</label>
                        <input type="text" className="form-control" id="inputAddress" onChange={e => setAssetOwner(e.target.value)} placeholder="Asset Owner" />
                    </div>
                    <div className="form-group">
                        <label>Asset Type</label>
                        <input type="text" className="form-control" id="inputAssetType" onChange={e => setAssetType(e.target.value)} placeholder="Asset Type" />
                    </div>
                    <button className="btn btn-primary mt-3" onClick={registerAsset}>Save </button>
                    {newAssetId && <div className="mt-3 alert alert-primary" role="alert">
            Asset Registered successfully, with  AssetId: {newAssetId.toString('hex')}
        </div>}
     
                </div>

            </div>
            
            <div className="box-register">
                <h5>Appreciation </h5>

                <div>

                    <div className="form-group">
                        <label >AssetId</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="AssetId" onChange={e => setAssetId(e.target.value) }/>
                    </div>
                    <div className="form-group">
                        <label>New price</label>
                        <input type="text" className="form-control" id="inputAssetDescription" placeholder="Appreciate Value" onChange={e => setAssetPrice(e.target.value) } />
                    </div>
                    <button className="btn btn-primary mt-3" onClick={Appreciate}>Appreciate </button>
                </div>
            </div>
            <div className="box-register" style={{ borderRight: "" }}>
                <h5>Depreciation </h5>
                <div>

                    <div className="form-group">
                        <label >AssetId</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="AssetId"  onChange={e => setAssetId(e.target.value) }  />
                    </div>
                    <div className="form-group">
                        <label>New price</label>
                        <input type="text" className="form-control" id="inputAssetDescription" placeholder="Deappreciate Value" onChange={e => setAssetPrice(e.target.value) } />
                    </div>
                    <button className="btn btn-primary mt-3" onClick={DeAppreciate}>DeAppreciate </button>
                </div>
            </div>

        </div >
    );
}

export default MayorPage;