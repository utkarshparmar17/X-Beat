import axios from "axios";

const API_URL = "https://app-backend-ruby.vercel.app";

const getProducts = async (filters = {}) => {
  try {
    let query = "";
    if (Object.keys(filters).length > 0) {
      query = `?${new URLSearchParams(filters).toString()}`;
    }
    const res = await axios.get(`${API_URL}/xbeat/products${query}`);
    return res.data.data;
  } catch (err) {
    console.warn("getProducts error:", err);
    return [];
  }
};

const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/xbeat/product/${id}`);
    return res.data.data;
  } catch (err) {
    console.warn("getProductById error:", err);
    return null;
  }
};

export default {
  getProducts,
  getProductById,
};
