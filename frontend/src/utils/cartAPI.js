import axios from "axios";

const API_BASE_URL = "/api"; // Use relative path to work with Vite proxy

// Get auth token from localStorage
const getAuthToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

// Create axios instance with cookie-based authentication
const createAuthAxios = () => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
  };

  // Add Bearer token as fallback if available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: API_BASE_URL,
    headers,
    withCredentials: true, // Enable cookies for authentication
  });
};

export const cartAPI = {
  // Get user's cart
  getCart: async () => {
    try {
      const api = createAuthAxios();
      const response = await api.get("/cart");
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw new Error(
        error.response?.data?.message || error.message || "Failed to fetch cart"
      );
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1, variant = {}) => {
    try {
      const api = createAuthAxios();
      const response = await api.post("/cart", {
        productId,
        quantity,
        variant,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw new Error(error.response?.data?.message || "Failed to add to cart");
    }
  },

  // Update cart item quantity
  updateCartItem: async (productId, quantity, variant = {}) => {
    try {
      const api = createAuthAxios();
      const response = await api.put("/cart", {
        productId,
        quantity,
        variant,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw new Error(
        error.response?.data?.message || "Failed to update cart item"
      );
    }
  },

  // Remove item from cart
  removeFromCart: async (productId, variant = {}) => {
    try {
      const api = createAuthAxios();
      const response = await api.delete("/cart", {
        data: { productId, variant },
      });
      return response.data;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw new Error(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const api = createAuthAxios();
      const response = await api.delete("/cart/clear");
      return response.data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw new Error(error.response?.data?.message || "Failed to clear cart");
    }
  },
};
