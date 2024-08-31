import { ApiData } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTransaction = createAsyncThunk(
  "transaction/getTransaction",
  async (param) => {
    try {
      const ress = await ApiData.get(
        `/transaction/history?limit=${param.limit}&offset=${param.offset}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      return ress.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transaction: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get transaction
    builder.addCase(getTransaction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.transaction = action.payload;
    });

    builder.addCase(getTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default transactionSlice.reducer;
