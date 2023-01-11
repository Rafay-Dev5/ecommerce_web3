import React, { useEffect, useState } from "react";
import { Snackbar, Alert, unstable_composeClasses } from "@mui/material";
import Product from "../components/product";
import transactionABI from "../ABIs/TransactionABI";
import NFT_ABI from "../ABIs/NFT_ABI";
import DUMMY_DATA from "../data/dummy";
import Web3 from "web3";
import { setUpAndLoadData } from "../services/blnservice";

export const Buyer = () => {
  let [account, setAccount] = useState();
  let [contract, setContract] = useState();
  let [contractAccount, setContractAccount] = useState();
  let [result, setResult] = useState();
  let [open, setOpen] = useState(false);
  let [snackbar, setSnackbar] = useState(null);
  let [accountBalance, setAccountBalance] = useState();
  let [products, setProducts] = useState();
  let [NFTcontract, setNFTContract] = useState();

  useEffect(() => {
    setUpAndLoadData().then(([acc, cont]) => {
      console.log(acc);
      console.log(cont);
      console.log(cont.methods);
      setAccount(acc);
      setContract(cont);
      setUpProducts(cont).then(() => {
        console.log("Products Set");
      });
      setUpAndLoadData().then(() => {
        console.log("NFT Contract Made");
      });
    });
  }, []);

  const setUpAndLoadNFTData = async () => {
    let ABI = NFT_ABI;
    const address = "0x2571732CbE97d13526871B5D2aA7B9ab686AA2b8";
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    //setAccount(accounts[0]);
    console.log("Connected to Metamask");
    const contract = new web3.eth.Contract(ABI, address);
    //setContract(contract);
    console.log("Connected to contract");
    console.log(contract.methods);
    setNFTContract(contract);
    //const contractAddress = await contract.methods.getAddress().call();
    //console.log(contractAddress);
    //setContractAccount(contractAccount);
    //const balance = await contract.methods.getBalance().call();
    //console.log("Money in the contract: ", balance);
    //setAccountBalance(balance);
    //for
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  const setUpProducts = async (cont) => {
    const productCount = await cont.methods.productCount().call();
    let prods = [];
    // Load products
    for (var i = 1; i <= productCount; i++) {
      const product = await cont.methods.products(i).call();
      console.log(product);
      prods.push(product);
    }
    console.log(prods);
    prods = prods.filter((prod) => prod.purchased === false);
    setProducts(prods);
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  const buyWithCrypto = async (id) => {
    console.log(id);
    try {
      let purchased = await contract.methods.purchaseProduct(id).call();
      console.log("Purchased: " + purchased);
      console.log("Money Sent");
    } catch (error) {
      console.log(error.message);
      setSnackbar({ children: error.message, severity: "error" });
      throw error;
    }
  };

  const depositBalanceWeb3 = async (ID, price) => {
    try {
      await contract.methods.deposit(ID).send({ from: account, value: price });
      //.call();
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

  const buyWithFT = () => {};

  const buywithNFT = async (sellerID, price) => {
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
      {products ? (
        products.map((prod) => {
          return (
            <Product
              key={prod.id}
              ID={prod.id}
              //description={prod.description}
              image={prod.image}
              price={prod.price}
              title={prod.name}
              sellerID={prod.owner}
              buy={!prod.purchased}
              deposit={depositBalanceWeb3}
              withdraw={sendMoneyToSellerWeb3}
              nftBuy={buywithNFT}
            />
          );
        })
      ) : (
        <h2>No Products for Sale</h2>
      )}
    </React.Fragment>
  );
};
