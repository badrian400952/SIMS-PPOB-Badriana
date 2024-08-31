import { ApiData } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBanner = createAsyncThunk("banner/getBanner", async () => {
  try {
    const ress = await ApiData.get(`/banner`, {
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

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    banner: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getBanner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.banner = action.payload;
    });

    builder.addCase(getBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default bannerSlice.reducer;
