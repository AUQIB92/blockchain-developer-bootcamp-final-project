import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import MyAssetDetail from './MyAssetDetail';
import { useSelector } from 'react-redux';
import RealEstate from '../contracts/RealEstate.json'
function OwnerPage() {
    const [assetId, setAssetId] = useState(undefined)
    const [assetPrice, setAssetPrice] = useState(undefined)
    const [myAssets, setMyAssets] = useState(0)
    const RealEstateAddress = useSelector(({ blockchainReducer }) => blockchainReducer.realContract);
    const address = useSelector(({ blockchainReducer }) => blockchainReducer.address);
    const onSale = (assetId) => {
        ( () => {
            MyOwnedAssets();
       })();
       
   }
    const MyOwnedAssets = async () => {
        if (!address) return
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            console.log(RealEstateAddress)
            const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
            var transaction = await contract.fetchMyAssets()
            if (transaction !== 'null') {
                transaction = transaction.filter(asset => asset._type != "").map(c => {
                    return {
                        assetID: c.assetID.toString(),
                        _type: c._type,
                        price: c.price,
                        avlToBuy: c.avlToBuy,
                        owner: c.owner
                    }
                })
                setMyAssets(transaction)
                console.log(myAssets)

            }
            else {
                console.log("error")
            }
        }
        else {
            console.log("Refresh Page to Connect to MetaMAsk Wallet")
        }
    };


    useEffect(() => {
        onSale()
       }, [myAssets,onSale,setMyAssets]);


    //     const onSale = (assetId) => {
    //         (async () => {
    //            await MyOwnedAssets();
    //        })();
    //        console.log(assetId)
    //    }


    return (

        address && <div className="box-register" style={{ borderRight: "" }}>
            <h5>My Assets </h5>
            <div>


                <div className="d-flex p-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">

                        </ol>
                    </nav>
                    <div className="d-flex flex-row mt-3">
                        {myAssets.length > 0 &&
                            myAssets.map(asset => <MyAssetDetail key={asset.assetID} assetPrice={asset.price} avlToBuy={asset.avlToBuy} assetID={asset.assetID} type={asset._type} owner={asset.owner} onSale={onSale} ></MyAssetDetail>)}
                    </div>
                </div>



            </div>
        </div>

    );
}

export default OwnerPage;