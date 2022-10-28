import React from "react";
import { Link } from "@mui/material";
import { Button } from "@mui/material";

const Template = () => {
  return (
    <div>
      <span>
        <Link href="/">
          <Button variant="outlined">Home</Button>
        </Link>
      </span>
      <span>
        <Link href="/buyer">
          <Button variant="outlined">Buyer</Button>
        </Link>
      </span>
      <span>
        <Link href="/seller">
          <Button variant="outlined">Seller</Button>
        </Link>
      </span>
    </div>
  );
};

export default Template;
