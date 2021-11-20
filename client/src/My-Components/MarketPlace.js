import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import MyAssetDetailMarket from './MyAssetDetailMarket';
import RealEstate from '../contracts/RealEstate.json'
function MarketPalce() {
    const [assetId, setAssetId] = useState(undefined)
    const [assetPrice, setAssetPrice] = useState(undefined)
    const [myAssets, setMyAssets] = useState(0)
    const RealEstateAddress = "0x5500A05a87d5D2d63a98b3B3b86dC853bbfc49DD"
    useEffect(() => {
        // const onSale = async (assetID) => {
        //     await MyOwnedAssets()
        // }
        const AllAssetsForSale = async () => {

            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                console.log({ provider })
                const signer = provider.getSigner()
                const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
                var transaction = await contract.fetchAllAssetsForSale()
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
                console.log("Refresh Page to Connect to MetaMAsk Wallet")
            }
        };

        AllAssetsForSale()

    }, [])


    //     const onSale = (assetId) => {
    //         (async () => {
    //            await MyOwnedAssets();
    //        })();
    //        console.log(assetId)
    //    }

    const setForSale = async () => {
        if (!assetId && !assetPrice) return
        if (typeof window.ethereum !== 'undefined') {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log({ provider })
            const signer = provider.getSigner()
            const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
            const transaction = await contract.setForSale(assetId, Number(assetPrice))
            await transaction.wait();
            console.log("Successfully listed in Markrtplace for sale")
        }
        else {
            console.log("Refreseh Page to Connect to MetaMAsk Wallet")
        }
    }
    return (

        <div className="box-register" style={{ borderRight: "" }}>
            <h5>My Assets </h5>
            <div>


                <div className="d-flex p-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">

                        </ol>
                    </nav>
                    <div className="d-flex flex-row mt-3">
                        {myAssets.length > 0 &&
                            myAssets.map(asset => <MyAssetDetailMarket key={asset.assetID} assetPrice={asset.price} avlToBuy={asset.avlToBuy} assetID={asset.assetID} type={asset._type} owner={asset.owner}  ></MyAssetDetailMarket>)}
                    </div>
                </div>



            </div>
        </div>

    );
}

export default MarketPalce;