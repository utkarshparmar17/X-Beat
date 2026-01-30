import axios from "axios";

const API_URL = "http://localhost:5000/api";

const ProductAPI = {
  getProducts: async ({ tag, category, id } = {}) => {
    try {
      console.log("Fetching products from:", `${API_URL}/products`);
      const { data: products } = await axios.get(`${API_URL}/products`);
      console.log("Products received:", products.length);

      if (id) {
        return products.find((p) => p._id === id);
      }

      let filtered = products;

      if (tag) {
        filtered = filtered.filter((p) => p.tag === tag);
      }

      if (category && category !== 'All') {
        const lowerCat = category.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.category.toLowerCase() === lowerCat ||
            p.category.toLowerCase().startsWith(lowerCat.slice(0, -1))
        );
      }

      return filtered;
    } catch (err) {
      console.error("API GET /products FAILED:", err.message);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      } else if (err.request) {
        console.error("No response received. Is Backend running?");
      }
      return [];
    }
  },

  getProductDetails: async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/products/${id}`);
      return data;
    } catch (err) {
      console.warn("getProductDetails error:", err);
      return null;
    }
  },

  createOrder: async (orderData) => {
    try {
      const { data } = await axios.post(`${API_URL}/orders`, orderData);
      return data;
    } catch (error) {
      console.error("createOrder error:", error);
      throw error;
    }
  }
};

export default ProductAPI;
