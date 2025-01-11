import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants:[],
        opportunityTitle: "",
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
            state.opportunityTitle = action.payload.title;
        }
    }
});
export const {setAllApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;