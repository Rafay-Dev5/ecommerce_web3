import React from "react";
import DUMMY_DATA from "../data/dummy";
import Product from "../components/product";
export const Seller = () => {
  console.log("Seller");
  return (
    <React.Fragment>
      {DUMMY_DATA.map((prod) => {
        return (
          <Product
            key={prod.id}
            description={prod.description}
            image={prod.image}
            price={prod.price}
            title={prod.title}
            buy={false}
          />
        );
      })}
    </React.Fragment>
  );
};
