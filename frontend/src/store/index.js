import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import cartReducer from "./cartSlice.js";
import productReducer from "./productSlice.js";
import { apiSlice } from "./apiSlice.js";

export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware)
});
