import { UNIT_API_END_POINT } from "@/utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for deleting a unit
export const deleteUnitById = createAsyncThunk(
    "unit/deleteUnitById",
    async (id, { rejectWithValue }) => {
        try {
            const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`${UNIT_API_END_POINT}/delete/${id}`, config);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data || "Something went wrong");
        }
    }
);


const unitSlice = createSlice({
    name: "unit",
    initialState: {
        singleUnit: null,
        units: [],
        searchUnitByText: "",
    },
    reducers: {
        setSingleUnit: (state, action) => {
            state.singleUnit = action.payload;
        },
        setUnits: (state, action) => {
            state.units = action.payload;
        },
        setSearchUnitByText: (state, action) => {
            state.searchUnitByText = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUnitById.fulfilled, (state, action) => {
                state.units = state.units.filter((unit) => unit._id !== action.payload);
            })
            .addCase(deleteUnitById.rejected, (state, action) => {
                console.error("Failed to delete unit:", action.payload);
            });
    },
});

export const { setSingleUnit, setUnits, setSearchUnitByText } = unitSlice.actions;
export default unitSlice.reducer;
