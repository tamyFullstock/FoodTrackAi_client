import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Avatar, Snackbar, Alert, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { colors, SERVER_URL } from "../../context/globals";

const AddProductForm = ({ onClose, onProductAdded }) => {
  const [productData, setProductData] = useState({
    sku: "",
    name: "",
    category: "",
    unit: "",
    dosage: "",
    weightPerUnit: "",
    caloriesPerUnit: "",
    servingStyle: "Regular", // Default serving style
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility
  const [errorMessage, setErrorMessage] = useState(""); // Error message

  // Categories and units state
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  // Fetch categories and units from server on mount
  useEffect(() => {
    const fetchCategoriesAndUnits = async () => {
      try {
        const categoriesResponse = await axios.get(`${SERVER_URL}/products/categories`);
        const unitsResponse = await axios.get(`${SERVER_URL}/products/units`);
        setCategories(categoriesResponse.data); // Populate categories
        setUnits(unitsResponse.data); // Populate units
      } catch (error) {
        console.error("Error fetching categories/units:", error);
      }
    };
    fetchCategoriesAndUnits();
  }, []);

  // Handle changes in form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle image file change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProductData((prevData) => ({ ...prevData, image: file }));
      setImagePreview(URL.createObjectURL(file)); // Set image preview URL
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("sku", productData.sku); // Corresponds to 'sku' in SQL
    formData.append("name", productData.name); // Corresponds to 'name' in SQL
    formData.append("category", productData.category); // Corresponds to 'category' in SQL
    formData.append("image_url", productData.image); // Corresponds to 'image_url' in SQL
    formData.append("dosage", productData.dosage); // Corresponds to 'dosage' in SQL
    formData.append("unit", productData.unit); // Corresponds to 'unit' in SQL
    formData.append("weight_per_unit", productData.weightPerUnit); // Corresponds to 'weight_per_unit' in SQL
    formData.append("calories_per_unit", productData.caloriesPerUnit); // Corresponds to 'calories_per_unit' in SQL
    formData.append("serving_style", productData.servingStyle); // Corresponds to 'serving_style' in SQL

    try {
      const response = await axios.post(`${SERVER_URL}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onProductAdded(response.data); // Update list with new product
      onClose(); // Close modal
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage("Failed to add the product."); // Set error message
      setOpenSnackbar(true); // Show Snackbar
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%", // Makes the width responsive
        maxWidth: 500, // Maximum width for large screens
        bgcolor: "white",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        textAlign: "center",
        overflow: "hidden", // Prevents overflow
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Add New Product
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="SKU"
              variant="outlined"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Category Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Unit Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Unit</InputLabel>
              <Select
                label="Unit"
                name="unit"
                value={productData.unit}
                onChange={handleChange}
                required
              >
                {units.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Dosage, Weight, and Calories Inputs */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Dosage"
              variant="outlined"
              name="dosage"
              value={productData.dosage}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Weight per Unit"
              variant="outlined"
              name="weightPerUnit"
              value={productData.weightPerUnit}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Calories per Unit"
              variant="outlined"
              name="caloriesPerUnit"
              value={productData.caloriesPerUnit}
              onChange={handleChange}
            />
          </Grid>

          {/* Serving Style Dropdown (Fixed Options) */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Serving Style</InputLabel>
              <Select
                label="Serving Style"
                name="servingStyle"
                value={productData.servingStyle}
                onChange={handleChange}
                required
              >
                <MenuItem value="Regular">Regular</MenuItem>
                <MenuItem value="Ground">Ground</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* File Upload Section */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {imagePreview && (
                <Avatar
                  src={imagePreview}
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 1,
                    borderRadius: "8px", // Slightly rounded corners
                  }}
                />
              )}
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: colors.primary,
                  color: "white",
                  "&:hover": { bgcolor: colors.primaryDark },
                }}
              >
                Upload Image
                <input type="file" accept="image/*" hidden onChange={handleImageChange} required />
              </Button>
            </Box>
          </Grid>

          {/* Submit and Cancel Buttons */}
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button onClick={onClose} sx={{ color: colors.secondary }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? "Uploading..." : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for error */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProductForm;
