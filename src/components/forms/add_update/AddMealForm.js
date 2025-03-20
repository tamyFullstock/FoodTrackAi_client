import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Snackbar, Alert, Grid } from "@mui/material";
import axios from "axios";
import { colors, SERVER_URL } from "../../../context/globals";
import InputField from "../../input_fields/InputField";
import SelectField from "../../input_fields/SelectField";
import ImageUpload from "../../input_fields/ImageUpload";

// Form component for adding meals
const AddMealForm = ({ onClose, onItemAdded }) => {
  const [mealData, setMealData] = useState({
    description: "",
    picture_before: null,
    picture_after: null,
    weight_before: "",
    weight_after: "",
    products: [], // Assuming the products are inputted as strings (could be a multi-select field if necessary)
  });
  const [imagePreviewBefore, setImagePreviewBefore] = useState(null);
  const [imagePreviewAfter, setImagePreviewAfter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productOptions, setProductOptions] = useState([]); // Products to choose from

  useEffect(() => {
    const fetchProductOptions = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/products`);
        // Assuming the response data contains an array of products in `items`
        const productItems = response.data.items;
  
        // Map through the product items to extract the names (or any other properties you want)
        const productNames = productItems.map(p => p.name);
  
        // Set the product names to state (if that's what you're trying to do)
        setProductOptions(productNames);
      } catch (error) {
        console.error("Error fetching product options:", error);
      }
    };
  
    fetchProductOptions();
  }, []);
  
  // Check all fields user enters are valid
  const validateForm = () => {
    const { description, weight_before, weight_after } = mealData;
    if (!weight_before || !weight_after) {
      setErrorMessage("Please fill in all required fields.");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  // Update mealData when any field changes
  const handleChange = (event) => setMealData({ ...mealData, [event.target.name]: event.target.value });

  // Handle image changes (Before and After images)
  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (type === "before") {
        setMealData({ ...mealData, picture_before: file });
        setImagePreviewBefore(URL.createObjectURL(file));
      } else {
        setMealData({ ...mealData, picture_after: file });
        setImagePreviewAfter(URL.createObjectURL(file));
      }
    }
  };

  // Handle product selection
  const handleProductChange = (event) => {
    const selectedProducts = event.target.value;
    setMealData({ ...mealData, products: selectedProducts });
  };

  // Submit the form (Add new meal)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.entries(mealData).forEach(([key, value]) => {
      if (key !== "picture_before" && key !== "picture_after") {
        formData.append(key, value);
      }
    });

    // Append images if they are changed
    if (mealData.picture_before) {
      formData.append("meal_pictures", mealData.picture_before);
    }
    if (mealData.picture_after) {
      formData.append("meal_pictures", mealData.picture_after);
    }
    formData.delete('products')

    try {
      // Add new meal
      const response = await axios.post(`${SERVER_URL}/meals`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      onItemAdded(response.data); // Update the meal list
      onClose();
    } catch (error) {
      console.error("Error submitting meal:", error);
      setErrorMessage("Failed to submit the meal.");
      setOpenSnackbar(true);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ p: 4, maxWidth: 500, bgcolor: "white", borderRadius: 2, textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Add New Meal</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <InputField label="Description" name="description" value={mealData.description} onChange={handleChange}  />
            <InputField label="Weight Before (g)" name="weight_before" type="number" value={mealData.weight_before} onChange={handleChange} required = "true"/>
            <InputField label="Weight After (g)" name="weight_after" type="number" value={mealData.weight_after} onChange={handleChange} required = "true" />
            <SelectField
              label="Products"
              name="products"
              value={mealData.products}
              onChange={handleProductChange}
              options={productOptions}
              multiple
              required
            />
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
              <ImageUpload imagePreview={imagePreviewBefore} handleImageChange={(event) => handleImageChange(event, "before")} required = "true" label="Before Image" />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
              <ImageUpload imagePreview={imagePreviewAfter} handleImageChange={(event) => handleImageChange(event, "after")} required = "true" label="After Image" />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Button onClick={onClose} sx={{ color: colors.secondary }}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? "Uploading..." : "Add Meal"}</Button>
            </Grid>
          </Grid>
        </form>
        {/* show error message if error */}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="error">{errorMessage}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AddMealForm;

/*
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Snackbar, Alert, Grid, MenuItem } from "@mui/material";
import axios from "axios";
import { colors, SERVER_URL } from "../../../context/globals";
import InputField from "../../input_fields/InputField";
import SelectField from "../../input_fields/SelectField";
import ImageUpload from "../../input_fields/ImageUpload";

const AddMealForm = ({ onClose, onItemAdded }) => {
  const [mealData, setMealData] = useState({
    description: "",
    picture_before: null,
    picture_after: null,
    weight_before: "",
    weight_after: "",
    products: [],
  });
  const [imagePreviewBefore, setImagePreviewBefore] = useState(null);
  const [imagePreviewAfter, setImagePreviewAfter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    const fetchProductOptions = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/products`);
        const productItems = Array.isArray(response.data?.items) ? response.data.items : [];
        setProductOptions(productItems);
      } catch (error) {
        console.error("Error fetching product options:", error);
        setProductOptions([]);
      }
    };
    fetchProductOptions();
  }, []);

  const validateForm = () => {
    const { description, weight_before, weight_after } = mealData;
    if (!weight_before || !weight_after) {
      setErrorMessage("Please fill in all required fields.");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  const handleChange = (event) => setMealData({ ...mealData, [event.target.name]: event.target.value });

  const handleImageChange = (event, type) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "before") {
        setMealData({ ...mealData, picture_before: file });
        setImagePreviewBefore(URL.createObjectURL(file));
      } else {
        setMealData({ ...mealData, picture_after: file });
        setImagePreviewAfter(URL.createObjectURL(file));
      }
    }
  };

  const handleProductChange = (event) => {
    const selectedProductSkus = event.target.value;
    const selectedProducts = selectedProductSkus.map(sku => productOptions.find(product => product.sku === sku)).filter(Boolean);
    setMealData({ ...mealData, products: selectedProducts });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();

    Object.entries(mealData).forEach(([key, value]) => {
      if (key !== "picture_before" && key !== "picture_after") {
        formData.append(key, value);
      }
    });

    if (mealData.picture_before) formData.append("meal_pictures", mealData.picture_before);
    if (mealData.picture_after) formData.append("meal_pictures", mealData.picture_after);

    try {
      const response = await axios.post(`${SERVER_URL}/meals`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      onItemAdded(response.data);
      onClose();
    } catch (error) {
      console.error("Error submitting meal:", error);
      setErrorMessage("Failed to submit the meal.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ p: 4, maxWidth: 500, bgcolor: "white", borderRadius: 2, textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Add New Meal</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <InputField label="Description" name="description" value={mealData.description} onChange={handleChange} />
            <InputField label="Weight Before (g)" name="weight_before" type="number" value={mealData.weight_before} onChange={handleChange} required />
            <InputField label="Weight After (g)" name="weight_after" type="number" value={mealData.weight_after} onChange={handleChange} required />
            <SelectField
              label="Products"
              name="products"
              value={mealData.products.map(product => product.sku)}
              onChange={handleProductChange}
              multiple
              required
            >
              {(productOptions || []).map((product) => (
                <MenuItem key={product.sku} value={product.sku}>
                  {`${product.name} (SKU: ${product.sku})`}
                </MenuItem>
              ))}
            </SelectField>
            <ImageUpload imagePreview={imagePreviewBefore} handleImageChange={(e) => handleImageChange(e, "before")} required label="Before Image" />
            <ImageUpload imagePreview={imagePreviewAfter} handleImageChange={(e) => handleImageChange(e, "after")} required label="After Image" />
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Button onClick={onClose} sx={{ color: colors.secondary }}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? "Uploading..." : "Add Meal"}</Button>
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

export default AddMealForm;*/