import React, { useState } from "react";
import { Box, TextField, Button, Typography, Avatar, Snackbar, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { colors, SERVER_URL } from "../../context/globals";

const AddProductForm = ({ onClose, onProductAdded }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [measureByUnit, setMeasureByUnit] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility
  const [errorMessage, setErrorMessage] = useState(""); // Error message

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create preview URL
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("unit", unit);
    formData.append("measure_by_unit", measureByUnit);
    formData.append("image_url", image); // File upload

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
        width: 400,
        bgcolor: "white",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Add New Product
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} required />
        <TextField fullWidth label="Category" variant="outlined" value={category} onChange={(e) => setCategory(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth label="Unit" variant="outlined" value={unit} onChange={(e) => setUnit(e.target.value)} sx={{ mb: 2 }} />
        <TextField fullWidth type="number" label="Measure by Unit" variant="outlined" value={measureByUnit} onChange={(e) => setMeasureByUnit(e.target.value)} sx={{ mb: 2 }} />

        {/* File Upload Section */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          {imagePreview && 
          <Avatar
            src={imagePreview}
            sx={{
                width: 80,
                height: 80,
                mb: 1,
                borderRadius: "8px", // Slightly rounded corners
            }}
          />}
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ bgcolor: colors.primary, color: "white", "&:hover": { bgcolor: colors.primaryDark } }}
          >
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleImageChange} required />
          </Button>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button onClick={onClose} sx={{ color: colors.secondary }}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Uploading..." : "Add Product"}
          </Button>
        </Box>
      </form>

      {/* Snackbar for error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProductForm;
