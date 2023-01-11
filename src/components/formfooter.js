import React from "react";

import { Grid, Button } from "@mui/material";

const FormFooter = () => {
  return (
    <Grid item sm={12} style={{ marginTop: 16 }}>
      <Button type="submit">Create</Button>
    </Grid>
  );
};

export default FormFooter;
