import Web3 from "web3";
import {
  createAsyncThunk
} from "@reduxjs/toolkit";
import RealEstate from './contracts/RealEstate.json'

import {
  ethers
} from 'ethers'

var web3;

function getMetamask() {
  if (window.ethereum) {
    console.log("Metamask installed")
    return window.ethereum;
  } else if (window.web3) {
    console.log("Injected web3 detected.")
    return window.web3;
  } else {
    const provider = new Web3.providers.HttpProvider(
      "http://127.0.0.1:8545"
    );
    return provider;
  }


}

const address_changed = async (dispatch) => {
  web3 = new Web3(getMetamask());
  // // Use web3 to get the user's accounts.
  const address = await web3.eth.getAccounts();
  if (address.length > 0) {
    const balance = await web3.eth.getBalance(address[0]);
    // // Get the contract instance.
    const networkId = await web3.eth.net.getId();

    dispatch({
      type: 'change_address',
      payload: address[0]
    });
    dispatch({
      type: 'change_balance',
      payload: balance
    });
    dispatch({
      type: 'change_chanId',
      payload: networkId
    });
  }else{
    dispatch({
      type: 'change_address',
      payload: ''
    });
    dispatch({
      type: 'change_balance',
      payload: 0
    });
    dispatch({
      type: 'change_chanId',
      payload: 0
    });
  }
}
export const loginChange = async (dispatch) => {
  const res = window.ethereum.on('accountsChanged', function (accounts) {
    console.log(accounts);

    address_changed(dispatch);
    // Time to reload your interface with accounts[0]!
  });
  return res;

}

export async function login(dispatch) {

  try {
    // Request account access if needed
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    address_changed(dispatch);
  } catch (error) {
    console.log(error);
  }

}
export function getRealContract(realStateAddress) {
  const provider = new ethers.providers.Web3Provider(getMetamask())
  const realContract = new ethers.Contract(realStateAddress, RealEstate.abi, provider)

  return realContract;
}


export async function registerAsset(assetOwner, assetType, RealEstateAddress) {
  if (!assetOwner && !assetType) return
  if (getMetamask()) {

    const provider = new ethers.providers.Web3Provider(getMetamask());
    const signer = provider.getSigner()
    const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)
    const transaction = await contract.registerAsset(assetOwner, assetType)
    return await transaction.wait()

  } else {
    console.log("Refreseh Page to Connect to MetaMAsk Wallet")
  }
}

export async function listAllAssetsFromOwner(RealEstateAddress) {
  const provider = new ethers.providers.Web3Provider(getMetamask());
  const signer = provider.getSigner()
  const contract = new ethers.Contract(RealEstateAddress, RealEstate.abi, signer)

  return await contract.fetchMyAssets();
}