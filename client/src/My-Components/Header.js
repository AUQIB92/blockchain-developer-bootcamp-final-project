import React, { useState, useCallback, useEffect } from "react";
import PropTypes from 'prop-types'
import logo from '../Images/Home.png';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers'
import { login, getRealContract } from "../web3Helper";
import metamask from '../Images/metamask.png';
import RealEstate from '../contracts/RealEstate.json'
export default function Header(props) {
  const dispatch = useDispatch();
  const address = useSelector(({ blockchainReducer }) => blockchainReducer.address);
  const balance = useSelector(({ blockchainReducer }) => blockchainReducer.balance);
  const mayor = useSelector(({ blockchainReducer }) => blockchainReducer.mayor);
  const chainId = useSelector(({ blockchainReducer }) => blockchainReducer.chainId);
  const [showBalanceMenu, setshowBalanceMenu] = useState(false);
  const RealEstateAddress = useSelector(({ blockchainReducer }) => blockchainReducer.realContract);














  const doLogin = async () => {
    const web3 = await login();

    // // Use web3 to get the user's accounts.
    const address = await web3.eth.getAccounts()
    if (address.length > 0) {
      const balance = await web3.eth.getBalance(address[0]);
      // // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      dispatch({ type: 'change_address', payload: address[0] });
      dispatch({ type: 'change_balance', payload: balance });
      dispatch({ type: 'change_chanId', payload: networkId });
    }

  }

  useEffect(() => {
   doLogin()
    
  }, [doLogin]);

  const getMayor = useCallback(() => {
    (async function () {
      if (!mayor) {
        console.log(getRealContract(RealEstateAddress))
        const mayorContract = await getRealContract(RealEstateAddress).cityMayor.call();
        dispatch({ type: "set_mayor", payload: mayorContract });
      }
    })();
  }, [RealEstateAddress, dispatch, mayor]);

  useEffect(() => {
    getMayor()
    
  }, [getMayor]);






  return (
    <nav className="navbar navbar-expand-lg">

      <div className="container-fluid d-flex justify-content-center">
        <Link to="/" className="navbar-brand"><img src={logo} height="30" width="40" alt="logo" /></Link>
        
        <ul className="navbar-nav">
          {mayor === address && <li className="nav-item">
            <Link to="/mayorPage" className="nav-link" aria-current="page">Mayor Functionalities </Link>
          </li>
          }
          <li className="nav-item">
            <Link to="/ownerPage" className="nav-link ">My Assets</Link>

          </li>
          <li className="nav-item">
            <Link to="/marketplace" className="nav-link">MarketPlace</Link>
          </li>

        </ul>


        <div>
          <button type="button" className="btn-metamask btn btn-secondary d-flex" onClick={() => {
            if (address) setshowBalanceMenu(!showBalanceMenu)
            else {
              doLogin();
            }
          }}>
            <img src={metamask} alt="metamask"></img>
            {address ? <span>{address}</span> : <span>Login</span>}
          </button>
          {showBalanceMenu &&
            <div className="d-flex flex-column dropdown-menu">
              <span className="p-1">Balance: {Number(ethers.utils.formatEther(ethers.utils.parseUnits(balance.toString(), "wei"))).toPrecision(6)}</span>
              <span className="p-1">Chain ID: {chainId}</span>
            </div>
          }

        </div>
      </div>
    </nav>



  )
}
