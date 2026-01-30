import { createContext, useContext, useState } from "react";
import productApi from "../api/ProductAPI";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  /* ===================== CART ===================== */
  const [cart, setCart] = useState([]);

  // ✅ ADD TO CART (by _id + quantity)
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ UPDATE QUANTITY
  const updateQuantity = (_id, qty) => {
    if (qty < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, quantity: qty } : item
      )
    );
  };

  // ✅ REMOVE FROM CART
  const removeFromCart = (_id) => {
    setCart((prev) => prev.filter((item) => item._id !== _id));
  };

  /* ===================== GENERIC FETCH ===================== */
  const fetchProducts = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await productApi.getProducts(filters);
      return data || [];
    } catch (err) {
      console.error("Failed to load products", err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  /* ===================== FETCH BY ID ===================== */
  const fetchProductById = async (id) => {
    if (!id) return null;
    try {
      setLoading(true);
      return await productApi.getProductById(id);
    } catch (err) {
      console.error("Failed to load product", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        /* products */
        fetchProducts,
        fetchProductById,
        loading,

        /* cart */
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/* ===================== CUSTOM HOOK ===================== */
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }
  return context;
};
