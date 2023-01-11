import { Buyer } from "./pages/buyer";
import { Seller } from "./pages/seller";
import Home from "./pages/home";
import Template from "./template";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Web3 from "web3";

import transactionABI from "./ABIs/TransactionABI";
import ManageSeller from "./pages/manageSeller";
import Convert from "./pages/convert";

function App() {
  let [account, setAccount] = useState();
  let [contract, setContract] = useState();

  useEffect(() => {
    setUpAndLoadData();
  }, []);

  const setUpAndLoadData = async () => {
    let ABI = transactionABI;
    const address = "0xeD2559aE269F965c4C3b2191eCdFcbE66B4468A8";
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    console.log("Connected to Metamask");
    const contract = new web3.eth.Contract(ABI, address);
    setContract(contract);
    console.log("Connected to contract");
    console.log(contract.methods);
    //const contractAddress = await contract.methods.getAddress().call();
    //console.log(contractAddress);
    //setContractAccount(contractAccount);
    //const balance = await contract.methods.getBalance().call();
    //console.log("Money in the contract: ", balance);
    //setAccountBalance(balance);
    //for
  };

  return (
    <Router>
      <Routes>
        {/* <Route element={<Template />}> */}
        <Route
          exact
          path="/"
          element={
            <>
              <Template />
              <Home />
            </>
          }
        />
        <Route
          path="/seller"
          element={
            <>
              <Template />
              <Seller />
            </>
          }
        />
        <Route
          path="/buyer"
          element={
            <>
              <Template />
              <Buyer />
            </>
          }
        />
        <Route
          path="/convert"
          element={
            <>
              <Template />
              <Convert />
            </>
          }
        />
        <Route
          path="/manageseller"
          element={
            <>
              <ManageSeller />
            </>
          }
        />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
