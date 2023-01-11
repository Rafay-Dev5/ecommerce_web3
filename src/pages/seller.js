import React, { useEffect, useState } from "react";
import DUMMY_DATA from "../data/dummy";
import Product from "../components/product";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { setUpAndLoadData } from "../services/blnservice";

export const Seller = () => {
  console.log("Seller");

  let [account, setAccount] = useState();
  let [contract, setContract] = useState();
  let [products, setProducts] = useState();

  useEffect(() => {
    setUpAndLoadData().then(([acc, cont]) => {
      console.log(acc);
      console.log(cont);
      console.log(cont.methods);
      setAccount(acc);
      setContract(cont);
      setUpProducts(acc, cont).then(() => {
        console.log("Products Set");
      });
    });
  }, []);

  const setUpProducts = async (acc, cont) => {
    const productCount = await cont.methods.productCount().call();
    let prods = [];
    // Load products
    for (var i = 1; i <= productCount; i++) {
      const product = await cont.methods.products(i).call();
      console.log(product);
      prods.push(product);
    }
    console.log(prods);
    prods = prods.filter(
      (prod) => prod.owner === acc && prod.purchased === false
    );
    setProducts(prods);
  };

  return (
    <React.Fragment>
      <h1>Your Products for Sale</h1>
      {products ? (
        products.map((prod) => {
          return (
            <Product
              key={prod.id}
              //description={prod.description}
              image={prod.image}
              price={prod.price}
              title={prod.name}
              sellerID={prod.owner}
              buy={false}
            />
          );
        })
      ) : (
        <h2>No Products</h2>
      )}
      <Link to="/manageseller">
        <Button variant="outlined" startIcon={<AddCircleIcon />}>
          Create Product
        </Button>
      </Link>
    </React.Fragment>
  );
};
