import React from "react";
import { Box, Button, Avatar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { colors } from "../../context/globals";

/**
 * ImageUpload Component
 * 
 * This component renders an image upload button with a preview of the selected image.
 * It uses MUI (Material-UI) components for styling and functionality.
 * 
 * @param {string|null} imagePreview - URL of the image for preview (null if no image is selected).
 * @param {function} handleImageChange - Callback function to handle image selection and update state.
 */
const ImageUpload = ({ imagePreview, handleImageChange, required = false }) => (
  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    {/* Display the image preview using Avatar if an image is selected */}
    {imagePreview && (
      <Avatar
        src={imagePreview}
        sx={{ width: 80, height: 80, mb: 1, borderRadius: "8px" }}
      />
    )}

    {/* Upload button with a CloudUploadIcon */}
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
      {/* Hidden input for file upload (accepts only images) */}
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
        required = {required}
      />
    </Button>
  </Box>
);

export default ImageUpload;

