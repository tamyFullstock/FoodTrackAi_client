import React from "react";
import { TextField, Grid } from "@mui/material";

const InputField = ({ label, name, value, onChange, type = "text", min = 0, required = false }) => (
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      type={type}
      label={label}
      variant="outlined"
      name={name}
      value={value}
      onChange={onChange}
      inputProps={type === "number" ? { min } : {}}
      required={required}
    />
  </Grid>
);

export default InputField;
