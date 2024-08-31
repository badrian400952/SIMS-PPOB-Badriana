
import { ApiData } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const addDataUser = createAsyncThunk("user/registrasi", async (newData) => {
    try {
        const ress = await ApiData.post(`/registration`, newData,);
        return ress.data.data
    } catch (error) {
        throw error;
    }
})

export const LoginUser = createAsyncThunk("user/LoginUser", async (login) => {
    try {
       const response = await ApiData.post(`/login`, login, );
       localStorage.setItem("token", response.data.data.token);
       return response.data
    } catch (error) {
       throw error;
    }
 })

const userSlice = createSlice({
    name: "data",
    initialState: {
        dataUser: [],
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.token = null;
            state.user = null;
         }
    },
    extraReducers: (builder) => {

        // add data user
        builder.addCase(addDataUser.pending, (state) => {
            state.loading = true
            state.error = null
        });

        builder.addCase(addDataUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        });

        builder.addCase(addDataUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        });
        // login user
        builder.addCase(LoginUser.pending, (state) => {
            state.loading = true
            state.error = null
        });

        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        });

        builder.addCase(LoginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        });

    }
})
export const { logout} = userSlice.actions;
export default userSlice.reducer 
