import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart([]);
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.get("/cart");
      setCart(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Returns true if it needs the caller to redirect to login
  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return { requiresLogin: true };
    }
    try {
      const { data } = await api.post("/cart", { productId, quantity });
      setCart(data);
      toast.success("Added to cart");
      return { requiresLogin: false };
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add to cart");
      return { requiresLogin: false };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const { data } = await api.put(`/cart/${productId}`, { quantity });
      setCart(data);
    } catch (error) {
      toast.error("Could not update cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setCart(data);
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Could not remove item");
    }
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
