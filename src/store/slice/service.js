import { ApiData } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getService = createAsyncThunk("service/getService", async () => {
  try {
    const ress = await ApiData.get(`/services`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return ress.data.data;
  } catch (error) {
    throw error;
  }
});

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    service: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // service
    builder.addCase(getService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getService.fulfilled, (state, action) => {
      state.loading = false;
      state.service = action.payload;
    });

    builder.addCase(getService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default serviceSlice.reducer;
