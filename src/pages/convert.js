import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import FormTextControl from "../components/formtextcontrol";
import { ValidatorForm } from "react-material-ui-form-validator";
import NFT_ABI from "../ABIs/NFT_ABI";
import FT_ABI from "../ABIs/FT_ABI";

import Web3 from "web3";

import FormFooter from "../components/formfooter";

import { setUpAndLoadData } from "../services/blnservice";

const Convert = () => {
  const defaultValues = {
    ether1: "",
  };

  //const location = useLocation();
  const navigator = useNavigate();

  let [account, setAccount] = useState();
  let [contract, setContract] = useState();
  let [NFTcontract, setNFTContract] = useState();
  let [FTcontract, setFTContract] = useState();
  const [formValues1, setFormValues1] = useState(defaultValues);
  const [formValues2, setFormValues2] = useState(defaultValues);
  useEffect(() => {
    //console.log(location);
    setUpAndLoadData().then(([acc, cont]) => {
      console.log(acc);
      console.log(cont);
      console.log(cont.methods);
      setAccount(acc);
      setContract(cont);
      setUpAndLoadNFTData().then(() => {
        console.log("NFT CONTRACT RECEIVED");
      });
    });

    ValidatorForm.addValidationRule("isRequired", (value) => {
      if (value.length > 0) {
        return true;
      }
      return false;
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

  const setUpAndLoadFTData = async () => {
    let ABI = FT_ABI;
    const address = "0xbA36698ed38302F3e3e24C9D4aC2d7A567978bdD";
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts();
    //setAccount(accounts[0]);
    console.log("Connected to Metamask");
    const contract = new web3.eth.Contract(ABI, address);
    //setContract(contract);
    console.log("Connected to contract");
    console.log(contract.methods);
    setFTContract(contract);
  };

  const handleChange1 = (event) => {
    const { name, value } = event.target;
    console.log(formValues1);
    setFormValues1({
      ...formValues1,
      [name]: value,
    });
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    console.log(formValues2);
    setFormValues2({
      ...formValues2,
      [name]: value,
    });
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();

    const tokens = formValues1.ether1 * 4;
    const ether1 = Web3.utils.toWei(formValues1.ether1.toString(), "Ether");

    //const price = Web3.utils.toWei(formValues1.price.toString(), "Ether");
    //const price = parseInt(formValues.price);

    console.log(formValues1);
    console.log(account);
    console.log(contract);

    mint1(tokens)
      .then(() => {
        console.log("Successfully Converted");
        dep(ether1).then(() => {
          console.log("Deposited Ether");
        });
        navigator("/seller");
      })
      .catch(() => console.log("Error Occured"));

    // create(name, price, image)
    //   .then(() => {
    //     console.log("Successfully Converted");
    //     navigator("/seller");
    //   })
    //   .catch(() => console.log("Error Occured"));
  };

  const mint1 = async (ether1) => {
    try {
      let created = await FTcontract.methods
        .transfer(account, ether1)
        .send({ from: account });
      console.log("Created: " + created);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();

    const tokens = formValues2.ether1 * 2;
    const ether1 = Web3.utils.toWei(formValues2.ether1.toString(), "Ether");

    //const price = Web3.utils.toWei(formValues2.price.toString(), "Ether");
    //const price = parseInt(formValues.price);

    console.log(formValues2);
    console.log(account);
    console.log(contract);

    mint2(tokens)
      .then(() => {
        console.log("Successfully Converted");
        dep(ether1).then(() => {
          console.log("Deposited Ether");
        });
        navigator("/seller");
      })
      .catch(() => console.log("Error Occured"));
  };

  const dep = async (ether1) => {
    try {
      let created = await contract.methods
        .dep()
        .send({ from: account, value: ether1 });
      console.log("Created: " + created);
    } catch (error) {
      console.log(error.message);
    }
  };

  const mint2 = async (ether1) => {
    try {
      let created = await NFTcontract.methods
        .mint(account, ether1)
        .send({ from: account });
      console.log("Created: " + created);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Grid container alignItems="center" justify="center">
      {/* <LoadingIndicatorDX loading={isLoading} /> */}
      <ValidatorForm
        onSubmit={handleSubmit1}
        onError={(errors) => {
          console.log(errors);
        }}
        style={{ width: "100%" }}
      >
        <FormTextControl
          label="Ether Amount"
          placeholder="Enter the amount of ethers to be converted"
          onchange={handleChange1}
          name={"ether1"}
          value={formValues1.ether1}
          validators={["isRequired"]}
          errormessages={["Value is required!"]}
        />
        <Grid item sm={12} style={{ marginTop: 16 }}>
          <Button type="submit">Convert it to FT</Button>
        </Grid>
      </ValidatorForm>
      <ValidatorForm
        onSubmit={handleSubmit2}
        onError={(errors) => {
          console.log(errors);
        }}
        style={{ width: "100%" }}
      >
        <FormTextControl
          label="Ether Amount"
          placeholder="Enter the amount of ethers to be converted"
          onchange={handleChange2}
          name={"ether1"}
          value={formValues2.ether1}
          validators={["isRequired"]}
          errormessages={["Value is required!"]}
        />
        <Grid item sm={12} style={{ marginTop: 16 }}>
          <Button type="submit">Convert it to NFT</Button>
        </Grid>
      </ValidatorForm>
    </Grid>
  );
};

export default Convert;
