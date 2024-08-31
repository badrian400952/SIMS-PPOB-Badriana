import { ApiData } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBalance = createAsyncThunk("balance/getBalance", async () => {
  try {
    const ress = await ApiData.get(`/balance`, {
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

export const topup = createAsyncThunk("balance/topup", async (newData) => {
  const payload = {
    top_up_amount: newData,
  };
  try {
    const ress = await ApiData.post(`/topup`, payload, {
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

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balance: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // // topup
    builder.addCase(topup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(topup.fulfilled, (state, action) => {
      state.loading = false;
      state.balance = action.payload;
    });

    builder.addCase(topup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // get
    builder.addCase(getBalance.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.balance = action.payload;
    });

    builder.addCase(getBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default balanceSlice.reducer;
