import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { colors, SERVER_URL } from "../../context/globals";

const ProductCard = ({ product, onRemove }) => {
  return (
    <Card sx={{ backgroundColor: "white", boxShadow: 3, borderRadius: 2 }}>
      {/* Image with objectFit: "contain" to maintain aspect ratio */}
      <CardMedia
        component="img"
        sx={{
          width: "100%",
          height: 200,
          objectFit: "contain",
        }}
        image={`${SERVER_URL}/${product.image_url}`}
        alt={product.name}
      />
      
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        {product.sku && (
          <Typography variant="body2" color="textSecondary">
            SKU: {product.sku}
          </Typography>
        )}
        {product.category && (
          <Typography variant="body2" color="textSecondary">
            Category: {product.category}
          </Typography>
        )}
        {product.dosage && (
          <Typography variant="body2" color="textSecondary">
            Dosage: {product.dosage} mg
          </Typography>
        )}
        {product.unit && (
          <Typography variant="body2" color="textSecondary">
            Unit: {product.unit} 
            {product.weight_per_unit && ` (${product.weight_per_unit})g`}
            {product.calories_per_unit && `, ${product.calories_per_unit} kcal)`}
          </Typography>
        )}
        {product.serving_style && (
          <Typography variant="body2" color="textSecondary">
            Serving style: {product.serving_style}
          </Typography>
        )}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => onRemove(product.id)}
          >
            Remove
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.secondary,
              "&:hover": { backgroundColor: "#e68a00" }
            }}
          >
            Update
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
