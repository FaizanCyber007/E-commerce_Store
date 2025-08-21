import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";

const initialState = {
  userInfo: null,
  status: "idle",
  error: null
};

export const loginUser = createAsyncThunk("user/login", async (payload) => {
  const { data } = await api.post("/auth/login", payload, { withCredentials: true });
  return data;
});

export const registerUser = createAsyncThunk("user/register", async (payload) => {
  const { data } = await api.post("/auth/register", payload, { withCredentials: true });
  return data;
});

export const fetchProfile = createAsyncThunk("user/profile", async () => {
  const { data } = await api.get("/auth/profile", { withCredentials: true });
  return data;
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await api.post("/auth/logout", {}, { withCredentials: true });
});

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => { state.userInfo = action.payload; })
      .addCase(registerUser.fulfilled, (state, action) => { state.userInfo = action.payload; })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.userInfo = action.payload; })
      .addCase(logoutUser.fulfilled, (state) => { state.userInfo = null; });
  }
});

export default slice.reducer;
