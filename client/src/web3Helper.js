import Web3 from "web3";

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
export async function login() {

  try {
    web3 = new Web3(getMetamask())
    // Request account access if needed
     await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
    return web3;
  } catch (error) {
    console.log(error);
  }

}
export function getRealContract(realStateAddress) {
  const provider = new ethers.providers.Web3Provider(getMetamask())
  const realContract = new ethers.Contract(realStateAddress, RealEstate.abi, provider)

  return realContract;
}
