import { createSlice } from "@reduxjs/toolkit";
import { complaintThunk } from "./complaint.thunk";

const complaintSlice = createSlice({
    name: "complaint",
    initialState: {
        loading: false,
        error: null,
        complaint: null,
        success: false,
    },
    reducers: {
        resetComplaintState: (state) => {
            state.loading = false;
            state.error = null;
            state.complaint = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        // Complaint Thunk
        builder.addCase(complaintThunk.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(complaintThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.complaint = payload.data;
            state.success = true;
        });
        builder.addCase(complaintThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        });
    },
});

const { reducer, actions } = complaintSlice;

const complaintReducer = reducer;

const { resetComplaintState } = actions;

export { complaintReducer, resetComplaintState };