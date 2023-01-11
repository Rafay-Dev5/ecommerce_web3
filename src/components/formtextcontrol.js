import React from "react";
import Grid from "@mui/material/Grid";
import { TextValidator } from "react-material-ui-form-validator";
import { InputLabel } from "@mui/material";

const FormTextControl = (props) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        marginTop: 16,
        marginBottom: 16,
      }}
    >
      <Grid
        item
        xs={4}
        md={3}
        style={{ display: "flex", alignItems: "center" }}
      >
        <InputLabel htmlFor={props?.label}>{props?.label}</InputLabel>
      </Grid>
      <Grid item xs={8} md={6}>
        <TextValidator
          style={{ width: "80%" }}
          id={props?.label}
          placeholder={props?.placeholder}
          onChange={props?.onchange}
          name={props?.name}
          value={props?.value}
          validators={props?.validators}
          errorMessages={props?.errormessages}
          multiline={props?.multiline}
          rows={props?.rows}
          disabled={props?.disabled}
        />
      </Grid>
    </div>
  );
};

export default FormTextControl;
