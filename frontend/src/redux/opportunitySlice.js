import { OPPORTUNITY_API_END_POINT } from "@/utils/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const deleteOpportunityById = createAsyncThunk(
    "opportunity/deleteOpportunityById",
    async (id, { rejectWithValue }) => {
        try {
            const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.delete(`${OPPORTUNITY_API_END_POINT}/delete/${id}`, config);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data || "Something went wrong");
        }
    }
);

const opportunitySlice = createSlice({
    name: "opportunity",
    initialState: {
        allOpportunities: [],
        allInstiOpportunities: [],
        singleOpportunity: null,
        searchOpportunityByText: "",
        allAppliedOpportunities: [],
        searchedQuery:"",
    },
    reducers: {
        setAllOpportunities: (state, action) => {
            state.allOpportunities = action.payload;
        },
        setSingleOpportunity: (state, action) => {
            state.singleOpportunity = action.payload;
        },
        setAllInstiOpportunities: (state, action) => {
            state.allInstiOpportunities = action.payload;
        },
        setSearchOpportunityByText: (state, action) => {
            state.searchOpportunityByText = action.payload;
        },
        setAllAppliedOpportunities: (state, action) => {
            state.allAppliedOpportunities = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
            builder
                .addCase(deleteOpportunityById.fulfilled, (state, action) => {
                    state.allOpportunities = state.allOpportunities.filter((opportunity) => opportunity._id !== action.payload);
                })
                .addCase(deleteOpportunityById.rejected, (state, action) => {
                    console.error("Failed to delete program:", action.payload);
                });
        },
});

export const { 
    setAllOpportunities, 
    setSingleOpportunity, 
    setAllInstiOpportunities, 
    setSearchOpportunityByText, 
    setAllAppliedOpportunities,
    setSearchedQuery,
} = opportunitySlice.actions;

    export default opportunitySlice.reducer;