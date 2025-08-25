import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api", // Use relative path to work with Vite proxy
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Blog API functions
export const blogAPI = {
  // Get all blogs
  getBlogs: (params) => api.get("/blogs", { params }),

  // Get single blog by slug
  getBlogBySlug: (slug) => api.get(`/blogs/${slug}`),

  // Get blog categories
  getCategories: () => api.get("/blogs/categories"),

  // Get popular tags
  getTags: () => api.get("/blogs/tags"),

  // Get featured blogs
  getFeaturedBlogs: (limit = 5) => api.get(`/blogs/featured?limit=${limit}`),

  // Get related blogs
  getRelatedBlogs: (id, limit = 3) =>
    api.get(`/blogs/${id}/related?limit=${limit}`),

  // Create blog (admin only)
  createBlog: (blogData) => api.post("/blogs", blogData),

  // Update blog (admin only)
  updateBlog: (id, blogData) => api.put(`/blogs/${id}`, blogData),

  // Delete blog (admin only)
  deleteBlog: (id) => api.delete(`/blogs/${id}`),

  // Add comment
  addComment: (id, content) => api.post(`/blogs/${id}/comments`, { content }),

  // Add reply to comment
  addReply: (id, commentId, content) =>
    api.post(`/blogs/${id}/comments/${commentId}/replies`, { content }),

  // Toggle like
  toggleLike: (id) => api.post(`/blogs/${id}/like`),
};

// Product API functions
export const productAPI = {
  getProducts: (params) => api.get("/products", { params }),
  getProductBySlug: (slug) => api.get(`/products/${slug}`),
  createProduct: (productData) => api.post("/products", productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getCategories: () => api.get("/categories"), // Fixed: use /categories instead of /products/categories
  getFeaturedProducts: (limit = 8) =>
    api.get(`/products/featured?limit=${limit}`),
};

// Auth API functions
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (userData) => api.put("/auth/profile", userData),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post(`/auth/reset-password/${token}`, { password }),
};

// Cart API functions
export const cartAPI = {
  getCart: () => api.get("/cart"),
  addToCart: (productId, quantity) =>
    api.post("/cart/add", { productId, quantity }),
  updateCartItem: (productId, quantity) =>
    api.put("/cart/update", { productId, quantity }),
  removeFromCart: (productId) => api.delete(`/cart/remove/${productId}`),
  clearCart: () => api.delete("/cart/clear"),
};

// Order API functions
export const orderAPI = {
  getOrders: () => api.get("/orders"),
  getOrderById: (id) => api.get(`/orders/${id}`),
  createOrder: (orderData) => api.post("/orders", orderData),
  updateOrderStatus: (id, status) =>
    api.put(`/orders/${id}/status`, { status }),
};

// Wishlist API functions
export const wishlistAPI = {
  getWishlist: () => api.get("/wishlist"),
  addToWishlist: (productId) => api.post("/wishlist/add", { productId }),
  removeFromWishlist: (productId) =>
    api.delete(`/wishlist/remove/${productId}`),
  clearWishlist: () => api.delete("/wishlist/clear"),
};

export default api;
