// utils/productUtils.js
const axios = require('axios');
const { SERVER_URL } = require('../../context/globals');

// Fetch products with pagination
const fetchProducts = async (page, limit, setLoading, setProducts, setPage, setTotalPages) => {
  if (setLoading(true) || page > setTotalPages) return;
  try {
    const response = await axios.get(`${SERVER_URL}/products?page=${page}&limit=${limit}`);
    setProducts((prev) => [...prev, ...response.data.products]);
    setPage((prev) => prev + 1);
    setTotalPages(response.data.totalPages);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  setLoading(false);
};

// Remove product by ID
const handleRemove = async (id, setProducts, products) => {
  try {
    await axios.delete(`${SERVER_URL}/products/${id}`);
    setProducts(products.filter((product) => product.id !== id));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};

// Handle adding or updating product
const handleProductAdded = (product, selectedProduct, setProducts, setOpenModal, setSelectedProduct) => {
  setOpenModal(false);
  if (selectedProduct) {
    setProducts((prev) => prev.map((p) => (parseInt(p.id) === parseInt(product.id) ? product : p)));
  } else {
    setProducts((prev) => [product, ...prev]);
  }
  setSelectedProduct(null);
};

module.exports = { fetchProducts, handleRemove, handleProductAdded };
