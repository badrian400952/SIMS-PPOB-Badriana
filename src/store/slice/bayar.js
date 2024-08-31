import { ApiData } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const handleBayar = createAsyncThunk(
  "bayar/handleBayar",
  async (data) => {
    try {
      const ress = await ApiData.post(`/transaction`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      return ress.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const bayarSlice = createSlice({
  name: "bayar",
  initialState: {
    bayar: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // handle Bayar
    builder.addCase(handleBayar.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(handleBayar.fulfilled, (state, action) => {
      state.loading = false;
      state.bayar = action.payload;
    });

    builder.addCase(handleBayar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default bayarSlice.reducer;
