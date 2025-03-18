import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, Grid, Typography, CircularProgress, Modal } from "@mui/material";
import { colors, SERVER_URL } from "../../context/globals";
import axios from "axios";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProductForm"; // Import the new form component

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); //current page
  const [totalPages, setTotalPages] = useState(1); // max pages exist in server according to the limit
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const limit = 9; // fetch 9 products any time

  // fetch all products by pagination
  const fetchProducts = useCallback(async () => {
    if (loading || page > totalPages) return;
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/products?page=${page}&limit=${limit}`);
      setProducts((prev) => [...prev, ...response.data.products]);
      setPage((prev) => prev + 1);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  }, [loading, page, totalPages]);

  //event to fetch more products from server
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchProducts();
        }
      },
      { rootMargin: "100px" }
    );

    const target = document.getElementById("load-more-trigger");
    if (target) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [fetchProducts]);

  //remove a product
  const handleRemove = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  //add a product in client side 
  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]); // Add new product to the list
  };

  return (
    <Box sx={{ p: 4, backgroundColor: colors.background, minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 3, color: colors.primary, fontWeight: "bold" }}>
        Products
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 3, backgroundColor: colors.primary, color: "white", "&:hover": { backgroundColor: colors.secondary } }}
        onClick={() => setOpenModal(true)} // Open modal on button click
      >
        Add Product
      </Button>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} onRemove={handleRemove} />
          </Grid>
        ))}
      </Grid>

      <div id="load-more-trigger" style={{ height: "50px", width: "100%" }}></div>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      )}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <AddProductForm onClose={() => setOpenModal(false)} onProductAdded={handleProductAdded} />
      </Modal>
    </Box>
  );
};

export default Products;
