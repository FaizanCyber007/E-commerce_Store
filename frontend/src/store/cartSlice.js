import { createSlice } from "@reduxjs/toolkit";

const persisted = JSON.parse(localStorage.getItem("cart") || "[]");

const slice = createSlice({
  name: "cart",
  initialState: { items: persisted },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.product === item.product && i.variant === item.variant);
      if (existing) existing.qty += item.qty;
      else state.items.push(item);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.product !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQty: (state, action) => {
      const { product, qty } = action.payload;
      const existing = state.items.find(i => i.product === product);
      if (existing) existing.qty = qty;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  }
});

export const { addToCart, removeFromCart, updateQty, clearCart } = slice.actions;
export default slice.reducer;
