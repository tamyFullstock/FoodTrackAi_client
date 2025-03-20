import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

const SelectField = ({ label, name, value, onChange, options, required = false }) => (
  <Grid item xs={12} sm={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required} 
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
);

export default SelectField;
