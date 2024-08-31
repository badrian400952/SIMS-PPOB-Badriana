import { ApiData } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProfil = createAsyncThunk("profil/getProfil", async () => {
  try {
    const ress = await ApiData.get(`/profile`, {
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

// // edit
export const getUsersEdit = createAsyncThunk(
  "profil/getUsersEdit",
  async (newdata) => {
    try {
      const ress = await ApiData.put(`/profile/update`, newdata, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      return ress.data.data;
    } catch (error) {
      console.error("Error edit :", error.message);
      throw error;
    }
  }
);
export const putUserImage = createAsyncThunk(
  "profil/putUserImage",
  async (imageFile, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await ApiData.put("/profile/image", imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profilSlice = createSlice({
  name: "profil",
  initialState: {
    profil: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // get
    builder.addCase(getProfil.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getProfil.fulfilled, (state, action) => {
      state.loading = false;
      state.profil = action.payload;
    });

    builder.addCase(getProfil.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // edit profil
    builder.addCase(getUsersEdit.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUsersEdit.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(getUsersEdit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //edit image
    builder.addCase(putUserImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(putUserImage.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(putUserImage.rejected, (state, action) => {
      state.loading = false;
      console.error("Error editing image:", action.error.message);
      state.error = action.error.message;
    });
  },
});

export default profilSlice.reducer;
