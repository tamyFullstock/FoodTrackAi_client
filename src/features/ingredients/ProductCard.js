import React, { useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { colors, SERVER_URL } from "../../context/globals";

const ProductCard = ({ product, onRemove, onUpdate }) => {
  
  const renderProductAttribute = (label, value) => {
    return value ? (
      <Typography variant="body2" color="textSecondary">
        {label}: {value}
      </Typography>
    ) : null;
  };

  return (
    <Card sx={{ backgroundColor: "white", boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: "100%", height: 200, objectFit: "contain" }}
        image={`${SERVER_URL}/${product.image_url}`} // This will reflect the updated image URL
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        {/*  render item fields */}
        {renderProductAttribute("SKU", product.sku)}
        {renderProductAttribute("Category", product.category)}
        {renderProductAttribute("Dosage", product.dosage && `${product.dosage} mg`)}
        {renderProductAttribute("Unit", `${product.unit} ${product.weight_per_unit ? `(${product.weight_per_unit}g)` : ''}${product.calories_per_unit ? `, ${product.calories_per_unit} kcal` : ''}`)}
        {renderProductAttribute("Serving Style", product.serving_style)}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="error" onClick={() => onRemove(product.id)}>
            Remove
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: colors.secondary, "&:hover": { backgroundColor: "#e68a00" } }}
            onClick={() => onUpdate(product)}
          >
            Update
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
