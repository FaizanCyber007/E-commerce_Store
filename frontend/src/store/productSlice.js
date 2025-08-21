import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";

// Helper to clean & normalize query params for the API
const normalizeParams = (params = {}) => {
  const q = { ...params };

  // Map `search` used by UI -> `keyword` expected by backend
  if (q.search != null && q.search !== "") {
    q.keyword = q.search;
  }
  delete q.search;

  // Remove empty values so we don't send `category=&rating=`
  Object.keys(q).forEach((k) => {
    if (q[k] === "" || q[k] == null) delete q[k];
  });

  // Default page size
  if (!("limit" in q)) q.limit = 12;

  return q;
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(normalizeParams(params)).toString();
      const { data } = await api.get(`/products?${query}`);
      return data;
    } catch (err) {
      // Bubble a clean message to the UI
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch products";
      return rejectWithValue(message);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/get",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${slug}`);
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch product";
      return rejectWithValue(message);
    }
  }
);

const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
    page: 1,
    pages: 1,
    total: 0,
    current: null,
    loading: false,
    error: null,
    lastParams: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.lastParams = action.meta?.arg || {};
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload.products || [];
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 1;
        state.total = action.payload.total || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load products";
        state.list = [];
      })

      // fetchProduct
      .addCase(fetchProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.payload || "Failed to load product";
      });
  },
});

export default slice.reducer;
