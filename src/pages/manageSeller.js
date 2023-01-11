import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import FormTextControl from "../components/formtextcontrol";
import { ValidatorForm } from "react-material-ui-form-validator";

import Web3 from "web3";

import FormFooter from "../components/formfooter";

import { setUpAndLoadData } from "../services/blnservice";

const ManageSeller = () => {
  const defaultValues = {
    name: "",
    price: "",
    image: "",
  };

  //const location = useLocation();
  const navigator = useNavigate();

  let [account, setAccount] = useState();
  let [contract, setContract] = useState();
  const [formValues, setFormValues] = useState(defaultValues);

  useEffect(() => {
    //console.log(location);
    setUpAndLoadData().then(([acc, cont]) => {
      console.log(acc);
      console.log(cont);
      console.log(cont.methods);
      setAccount(acc);
      setContract(cont);
    });

    ValidatorForm.addValidationRule("isRequired", (value) => {
      if (value.length > 0) {
        return true;
      }
      return false;
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(formValues);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formValues.name;
    const image = formValues.image;

    const price = Web3.utils.toWei(formValues.price.toString(), "Ether");
    //const price = parseInt(formValues.price);

    console.log(name);
    console.log(price);
    console.log(image);
    console.log(account);
    console.log(contract);

    create(name, price, image)
      .then(() => {
        console.log("Product Successfully Created");
        navigator("/seller");
      })
      .catch(() => console.log("Error Occured"));
  };

  const create = async (name, price, image) => {
    try {
      let created = await contract.methods
        .createProduct(name, price, image)
        .send({ from: account })
        .call();
      console.log("Created: " + created);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Grid container alignItems="center" justify="center">
      {/* <LoadingIndicatorDX loading={isLoading} /> */}
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => {
          console.log(errors);
        }}
        style={{ width: "100%" }}
      >
        <FormTextControl
          label="Product Name"
          placeholder="Enter Product Name"
          onchange={handleChange}
          name={"name"}
          value={formValues.name}
          validators={["isRequired"]}
          errormessages={["Product Name is required!"]}
        />

        <FormTextControl
          label="Product Price"
          placeholder="Enter Product Price"
          onchange={handleChange}
          name={"price"}
          value={formValues.price}
          validators={["isRequired"]}
          errormessages={["Product price is required!"]}
        />

        <FormTextControl
          label="Product Image URL"
          placeholder="Enter Product Image URL"
          onchange={handleChange}
          name={"image"}
          value={formValues.image}
          validators={["isRequired"]}
          errormessages={["Product Image URL is required!"]}
        />
        <FormFooter />
      </ValidatorForm>
    </Grid>
  );
};

export default ManageSeller;
