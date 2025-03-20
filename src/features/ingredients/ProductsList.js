import React from "react";
import ProductCard from "../../components/cards/ProductCard" // Import your ProductCard component
import AddUpdateProductForm from "./AddUpdateProductForm"; // Import the Add/Update form for products
import { SERVER_URL } from "../../context/globals"; // Your server URL context
import Items from "./ItemsList"

const ProductsList = () => {
  // Define the necessary parameters for the generic Items component
  const object = {
    type: "Products", // Type will be displayed as the title (i.e., Products)
    url_entry: "products", // The API endpoint for products
    name: "product"
  };

  return (
    <Items
      CardType={ProductCard} // Pass in the ProductCard as CardType
      AddUpdateForm={AddUpdateProductForm} // Pass in the Add/Update Product Form as AddUpdateForm
      object={object} // Pass the object with URL entry and type as props
    />
  );
};

export default ProductsList;

