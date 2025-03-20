import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { colors } from "../../context/globals";
import { renderProductAttribute, CardMediaComponent } from "./utils";

const ProductCard = ({ item, onRemove, onUpdate }) => {
  return (
    <Card sx={{ backgroundColor: "white", boxShadow: 3, borderRadius: 2 }}>
      <CardMediaComponent alt={item.name} img_url={item.image_url} />

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {item.name}
        </Typography>

        {/* Render product attributes using utility function */}
        {renderProductAttribute("SKU", item.sku)}
        {renderProductAttribute("Category", item.category)}
        {renderProductAttribute("Dosage", item.dosage && `${item.dosage} mg`)}
        {renderProductAttribute(
          "Unit",
          `${item.unit} ${item.weight_per_unit ? `(${item.weight_per_unit}g)` : ''}${item.calories_per_unit ? `, ${item.calories_per_unit} kcal` : ''}`
        )}
        {renderProductAttribute("Serving Style", item.serving_style)}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="error" onClick={() => onRemove(item.id)}>
            Remove
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: colors.secondary, "&:hover": { backgroundColor: "#e68a00" } }}
            onClick={() => onUpdate(item)}
          >
            Update
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
