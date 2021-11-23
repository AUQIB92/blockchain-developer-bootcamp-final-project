import React, { useState, useEffect } from "react";
import Header from "./My-Components/Header"
import Footer from "./My-Components/Footer"
import { Outlet } from "react-router-dom";


const App = () => {
  
  return (
    <div>



      <center> <h3>Real Estate Tokenisation  and  Marketpalce for Buying and Selling Real Estate as NFTs </h3></center>
      <div>
        
      
        <Header />


        
      </div>
      <div className="d-flex mt-3">
        <Outlet />
      </div>
      <Footer />
     
    </div>
  );
}


export default App;
