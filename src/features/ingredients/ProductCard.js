import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { colors, SERVER_URL } from "../../context/globals";

const ProductCard = ({ product, onRemove }) => {
  return (
    <Card sx={{ backgroundColor: "white", boxShadow: 3, borderRadius: 2 }}>
      {/* Set fixed size for image and use objectFit: "contain" */}
      <CardMedia
        component="img"
        sx={{
          width: "100%",      // Ensure it takes up the full width of the card
          height: 200,        // Set a fixed height
          objectFit: "contain", // Ensure the image is fully visible without distortion or cropping
        }}
        image={`${SERVER_URL}/${product.image_url}`}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Category: {product.category}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Unit: {product.unit} ({product.measure_by_unit})
        </Typography>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => onRemove(product.id)}
          >
            Remove
          </Button>
          <Button variant="contained" sx={{ backgroundColor: colors.secondary, "&:hover": { backgroundColor: "#e68a00" } }}>
            Update
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
