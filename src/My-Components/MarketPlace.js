import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import { useSelector } from 'react-redux';
import MyAssetDetailMarket from './MyAssetDetailMarket';
import RealEstate from '../contracts/RealEstate.json'
function MarketPalce() {
    
    const [myAssets, setMyAssets] = useState(0)
    const address = useSelector(({ blockchainReducer }) => blockchainReducer.address);
    const RealEstateAddress = useSelector(({ blockchainReducer }) => blockchainReducer.realContract);
    
    const onSale = (assetId) => {
        ( () => {
            
             AllAssetsForSale();
       })();
       
   }
    useEffect(() => {
        onSale();

    },[myAssets,onSale,setMyAssets])

         
        const AllAssetsForSale = async () => {
            try{
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                console.log({ provider })
                const signer = provider.getSigner()
                const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
                
                    var transaction = await contract.fetchAllAssetsForSale()
                    console.log(transaction)
                    if (transaction !== null) {
                        transaction = transaction.filter(asset => asset._type != ""&&asset.owner!==address).map(c => {

                            return {
                                assetID: c.assetID.toString(),
                                _type: c._type,
                                price: c.price,
                                avlToBuy: c.avlToBuy,
                                owner: c.owner
                            }
                        })
                        setMyAssets(transaction)
                        

                    
                   
                }

                else {
                    console.log("No contract")
                }
            }
            else {
                console.log("Refresh Page to Connect to MetaMAsk Wallet")
            }
        }
        catch(error)

{
    console.log(error)
}




        };

        

    //     const onSale = (assetId) => {
    //         (async () => {
    //            await MyOwnedAssets();
    //        })();
    //        console.log(assetId)
    //    }


    return (

       address&& <div className="box-register" style={{ borderRight: "" }}>
            <h5>Assets on Sale </h5>
            <div>


                <div className="d-flex p-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">

                        </ol>
                    </nav>
                    <div className="d-flex flex-row mt-3">
                        {myAssets.length > 0 &&
                            myAssets.map(asset => <MyAssetDetailMarket key={asset.assetID} assetPrice={asset.price} avlToBuy={asset.avlToBuy} assetID={asset.assetID} type={asset._type} owner={asset.owner} onSale={onSale} ></MyAssetDetailMarket>)}
                    </div>
                </div>



            </div>
        </div>

    );
}

export default MarketPalce;