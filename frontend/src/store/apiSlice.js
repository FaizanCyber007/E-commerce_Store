import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    credentials: "include"
  }),
  tagTypes: ["Product","Order","User","Wishlist","Auth"],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({ query: (body) => ({ url: "/auth/login", method: "POST", body }), invalidatesTags: ["Auth"] }),
    register: builder.mutation({ query: (body) => ({ url: "/auth/register", method: "POST", body }), invalidatesTags: ["Auth"] }),
    logout: builder.mutation({ query: () => ({ url: "/auth/logout", method: "POST" }), invalidatesTags: ["Auth"] }),
    profile: builder.query({ query: () => "/auth/profile", providesTags: ["Auth"] }),
    // Products
    getProducts: builder.query({ query: (params) => ({ url: "/products", params }), providesTags: ["Product"] }),
    getProduct: builder.query({ query: (slug) => `/products/${slug}`, providesTags: (_r, _e, slug) => [{ type:"Product", id: slug }] }),
    // Reviews
    addReview: builder.mutation({ query: ({ slug, ...body }) => ({ url: `/reviews/${slug}`, method: "POST", body }), invalidatesTags: ["Product"] }),
    // Wishlist
    getWishlist: builder.query({ query: () => "/wishlist", providesTags: ["Wishlist"] }),
    toggleWishlist: builder.mutation({ query: (productId) => ({ url: `/wishlist/${productId}`, method: "POST" }), invalidatesTags: ["Wishlist"] }),
    // Orders
    createOrder: builder.mutation({ query: (body) => ({ url: "/orders", method: "POST", body }), invalidatesTags: ["Order"] }),
    myOrders: builder.query({ query: () => "/orders/mine", providesTags: ["Order"] }),
    // Admin
    adminUsers: builder.query({ query: () => "/admin/users", providesTags: ["User"] }),
    adminOrders: builder.query({ query: () => "/admin/orders", providesTags: ["Order"] }),
    markDelivered: builder.mutation({ query: (id) => ({ url: `/admin/orders/${id}/deliver`, method: "PUT" }), invalidatesTags: ["Order"] }),
    // Upload
    cloudinarySig: builder.query({ query: () => "/upload/cloudinary-signature" }),
    // Stripe
    stripeCheckout: builder.mutation({ query: (body) => ({ url: "/stripe/checkout", method: "POST", body }) })
  })
});

export const {
  useLoginMutation, useRegisterMutation, useLogoutMutation, useProfileQuery,
  useGetProductsQuery, useGetProductQuery,
  useAddReviewMutation,
  useGetWishlistQuery, useToggleWishlistMutation,
  useCreateOrderMutation, useMyOrdersQuery,
  useAdminUsersQuery, useAdminOrdersQuery, useMarkDeliveredMutation,
  useCloudinarySigQuery, useStripeCheckoutMutation
} = apiSlice;
