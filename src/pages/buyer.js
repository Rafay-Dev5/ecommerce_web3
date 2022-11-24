import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import Product from "../components/product";
import DUMMY_DATA from "../data/dummy";
import Web3 from "web3";

export const Buyer = () => {
  let [account, setAccount] = useState();
  let [contract, setContract] = useState();
  let [contractAccount, setContractAccount] = useState();
  let [result, setResult] = useState();
  let [open, setOpen] = useState(false);
  let [snackbar, setSnackbar] = useState(null);
  let [accountBalance, setAccountBalance] = useState();

  useEffect(() => {
    setUpAndLoadData();
  }, []);

  const handleCloseSnackbar = () => setSnackbar(null);

  const setUpAndLoadData = async () => {
    let ABI = [
      {
        inputs: [],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address payable",
            name: "_reciever",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getAddress",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];
    const address = "0xc89217B6ccdeeaa1dD3cBd10AE003de01a31B2dA";
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    console.log("Connected to Metamask");
    const contract = new web3.eth.Contract(ABI, address);
    setContract(contract);
    console.log("Connected to contract");
    console.log(contract);
    const contractAddress = await contract.methods.getAddress().call();
    console.log(contractAddress);
    setContractAccount(contractAccount);
    const balance = await contract.methods.getBalance().call();
    console.log("Money in the contract: ", balance);
    setAccountBalance(balance);
    //for
  };

  const depositBalanceWeb3 = async (price) => {
    try {
      await contract.methods.deposit().send({ from: account, value: price });
      console.log("Money Sent");
    } catch (error) {
      console.log(error.message);
      setSnackbar({ children: error.message, severity: "error" });
      throw error;
    }
  };

  const sendMoneyToSellerWeb3 = async (sellerID, price) => {
    try {
      await contract.methods.withdraw(sellerID, price).send({ from: account });
      console.log("Withdrew money");
      setSnackbar({
        children: "Item successfully bought",
        severity: "success",
      });
    } catch (error) {
      console.log(error.message);
      setSnackbar({ children: error.message, severity: "error" });
      throw error;
    }
  };

  return (
    <React.Fragment>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      {DUMMY_DATA.map((prod) => {
        return (
          <Product
            key={prod.id}
            description={prod.description}
            image={prod.image}
            price={prod.price}
            title={prod.title}
            sellerID={prod.sellerID}
            buy={true}
            deposit={depositBalanceWeb3}
            withdraw={sendMoneyToSellerWeb3}
          />
        );
      })}
    </React.Fragment>
  );
};
