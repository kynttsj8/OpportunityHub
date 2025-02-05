import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants:[],
        opportunityTitle: "",
        applications:[]
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
            state.opportunityTitle = action.payload.title;
        },
        setApplications:(state,action) => {
            state.applications = action.payload;
        }
    }
});
export const { setAllApplicants, setApplications } = applicationSlice.actions;
export default applicationSlice.reducer;