import React from 'react';
import { useState,useEffect} from 'react';
import { ethers } from 'ethers'
import { useSelector } from 'react-redux';
import RealEstate from '../contracts/RealEstate.json'
function MayorPage() {
    const [assetOwner, setAssetOwner] = useState(undefined)
    const [assetType, setAssetType] = useState(undefined)
    const [assetId, setAssetId] = useState(0)
    const [assetPrice, setAssetPrice] = useState(undefined)
    const [newAssetId, setnewAssetId] = useState(null);
    const [errorTxn, setErrorTxn] = useState(null);
    const [msg, setMsg] = useState(false)
    const mayor = useSelector(({ blockchainReducer }) => blockchainReducer.mayor);
    const address = useSelector(({ blockchainReducer }) => blockchainReducer.address);
    const RealEstateAddress = useSelector(({ blockchainReducer }) => blockchainReducer.realContract);
    const registerAsset = async () => {
        console.log(RealEstateAddress)
        if (!mayor || !assetOwner || !assetType) return
        if (typeof window.ethereum !== 'undefined') {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
            const transaction = await contract.registerAsset(assetOwner, assetType)
            await transaction.wait()
            // setMsg(true);
            contract.on("assetRegistered", (address, assetId) => { setnewAssetId(assetId.toString()) })

        }
        else {
            console.log("Refresh Page to Connect to MetaMAsk Wallet")
        }

    };
    const Appreciate = async () => {
        if (!assetOwner && !assetPrice) return
        if (typeof window.ethereum !== 'undefined') {
            try {

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                console.log({ provider })
                const signer = provider.getSigner()
                const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
                const transaction = await contract.appreciate(assetId, ethers.utils.parseUnits(assetPrice, 'ether'))
                await transaction.wait()
                setErrorTxn(null)
                setMsg(true)
                //contract.on("assetRegistered",(address,assetId)=>{setnewAssetId(assetId)})
            }
            catch (error) {
                setErrorTxn(error)
            }
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
            setErrorTxn(null)
            setMsg(true)
            //contract.on("assetRegistered",(address,assetId)=>{setnewAssetId(assetId)})

        }
        else {
            console.log("Refresh Page to Connect to MetaMAsk Wallet")
        }
    }
    useEffect(() => {
        setMsg(false)
        setErrorTxn(null)

    },[msg,errorTxn])

    return (
        mayor == address && <div className="d-flex flex-row flex-fill">
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
                    <button className="btn btn-primary mt-3" onClick={registerAsset}>Register </button>
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
                        <input type="text" className="form-control" id="inputAddress" placeholder="AssetId" onChange={e => setAssetId(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Appreciation Value in ETH</label>
                        <input type="string" className="form-control" id="inputAssetDescription" placeholder="Appreciate Value" onChange={e => setAssetPrice(e.target.value)} />
                    </div>
                    <button className="btn btn-primary mt-3" onClick={Appreciate}>Appreciate </button>
                    {msg && !errorTxn && <div className="mt-3 alert alert-success" role="alert">
                        Asset Value Appreciated  by {assetPrice} ETH
                    </div>}
                    {errorTxn && <div className="mt-3 alert alert-danger" role="alert">
                        Error on Txn, Asset not on Sale

                    </div>}

                </div>
            </div>
            <div className="box-register" style={{ borderRight: "" }}>
                <h5>Depreciation </h5>
                <div>

                    <div className="form-group">
                        <label >AssetId</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="AssetId" onChange={e => setAssetId(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Depreciation Value in ETH</label>
                        <input type="string" className="form-control" id="inputAssetDescription" placeholder="Deappreciate Value" onChange={e => setAssetPrice(e.target.value)} />
                    </div>
                    <button className="btn btn-primary mt-3" onClick={DeAppreciate}>Depreciate </button>
                    {msg && !errorTxn && <div className="mt-3 alert alert-success" role="alert">
                        Asset Value Depreciated  by {assetPrice} ETH
                    </div>}
                    {errorTxn && <div className="mt-3 alert alert-danger" role="alert">
                        Error on Txn, Asset not on Sale

                    </div>}
                </div>
            </div>

        </div >

    );
}

export default MayorPage;