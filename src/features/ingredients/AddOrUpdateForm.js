import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Snackbar, Alert, Grid } from "@mui/material";
import axios from "axios";
import { colors, SERVER_URL } from "../../context/globals";
import InputField from "../../components/input_fields/InputField";
import SelectField from "../../components/input_fields/SelectField";
import ImageUpload from "../../components/input_fields/ImageUpload";

// Form component for adding and updating products
const AddProductForm = ({ onClose, onProductAdded, product }) => {
  const [productData, setProductData] = useState({
    sku: "", name: "", category: "", unit: "", dosage: "",
    weight_per_unit: "", calories_per_unit: "", serving_style: "Regular", image_url: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, unitsResponse] = await Promise.all([
          axios.get(`${SERVER_URL}/products/categories`),
          axios.get(`${SERVER_URL}/products/units`),
        ]);
        setCategories(categoriesResponse.data);
        setUnits(unitsResponse.data);
      } catch (error) {
        console.error("Error fetching categories/units:", error);
      }
    };
    fetchData();
  }, []);

  // Pre-fill form with existing product data if it's an update
  useEffect(() => {
    if (product) {
      setProductData({
        sku: product.sku || "",
        name: product.name || "",
        category: product.category || "",
        unit: product.unit || "",
        dosage: product.dosage || "",
        weight_per_unit: product.weight_per_unit || "",
        calories_per_unit: product.calories_per_unit || "",
        serving_style: product.serving_style || "Regular",
        image_url: null, // Reset image for update
      });
      setImagePreview(product.image_url ? `${SERVER_URL}/${product.image_url}` : null);
    }
  }, [product]);

  const handleChange = (event) => setProductData({ ...productData, [event.target.name]: event.target.value });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProductData({ ...productData, image_url: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => formData.append(key, value));
    try {
      let response;
      if (product?.id) {
        // Update product
        response = await axios.put(`${SERVER_URL}/products/${product.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        // Add product
        response = await axios.post(`${SERVER_URL}/products`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      }
      onProductAdded(response.data); // Update the product list
      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
      setErrorMessage("Failed to submit the product.");
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ p: 4, maxWidth: 500, bgcolor: "white", borderRadius: 2, textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{product ? "Update Product" : "Add New Product"}</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <InputField label="SKU" name="sku" value={productData.sku} onChange={handleChange} required={true} />
            <InputField label="Name" name="name" value={productData.name} onChange={handleChange} required={true} />
            <SelectField label="Category" name="category" value={productData.category} onChange={handleChange} options={categories} required={false} />
            <SelectField label="Unit" name="unit" value={productData.unit} onChange={handleChange} options={units} required={true} />
            <InputField label="Dosage" name="dosage" type="number" value={productData.dosage} onChange={handleChange} required={false} />
            <InputField label="Weight per Unit" name="weight_per_unit" type="number" value={productData.weight_per_unit} onChange={handleChange} required={false} />
            <InputField label="Calories per Unit" name="calories_per_unit" type="number" value={productData.calories_per_unit} onChange={handleChange} required={false} />
            <SelectField label="Serving Style" name="serving_style" value={productData.serving_style} onChange={handleChange} options={["Regular", "Ground"]} required={true} />
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
              <ImageUpload imagePreview={imagePreview} handleImageChange={handleImageChange} required={true} />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Button onClick={onClose} sx={{ color: colors.secondary }}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? "Uploading..." : product ? "Update Product" : "Add Product"}</Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="error">{errorMessage}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AddProductForm;
