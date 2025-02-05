import { USER_API_END_POINT } from "@/utils/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteUserById = createAsyncThunk(
    "auth/deleteUserById",
    async (id, { rejectWithValue }) => {
        try {
            const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`${USER_API_END_POINT}/delete/${id}`, config); // Update the API endpoint as per your backend route
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data || "Something went wrong");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState:{
        loading: false,
        user: null,
        users:[]
    },
    reducers:{
        //action
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        },
        setUsers:(state, action) => {
            state.users = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
                window.location.reload();
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                console.error("Failed to delete user account:", action.payload);
            });
    },
});

export const {setLoading, setUser, setUsers} = authSlice.actions;
export default authSlice.reducer;