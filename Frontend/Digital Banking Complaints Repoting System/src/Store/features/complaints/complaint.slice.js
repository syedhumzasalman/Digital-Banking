import { createSlice } from "@reduxjs/toolkit";
import { complaintThunk, fetchComplaintThunk } from "./complaint.thunk";

const complaintSlice = createSlice({
    name: "complaint",
    initialState: {
        loading: false,
        error: null,
        data: null,
        createSuccess: false,
        fetchSuccess: false,
    },
    reducers: {
        resetComplaintState: (state) => {
            state.loading = false;
            state.error = null;
            state.data = null;
            state.createSuccess = false;
        },
    },
    extraReducers: (builder) => {
        // Complaint Thunk
        builder.addCase(complaintThunk.pending, (state, { payload }) => {
            state.loading = true;
            state.error = null;
            state.createSuccess = false;
        });
        builder.addCase(complaintThunk.fulfilled, (state, { payload }) => {
            // console.log("Slice", payload);

            state.loading = false;
            state.createSuccess = true;
            state.error = null;
            state.data = payload?.data;

        });
        builder.addCase(complaintThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.createSuccess = false;
        });



        // Complaint fetched Thunk
        builder.addCase(fetchComplaintThunk.pending, (state, { payload }) => {
            state.loading = true;
            state.error = null;
            state.fetchSuccess = false;
        });
        builder.addCase(fetchComplaintThunk.fulfilled, (state, { payload }) => {
            // console.log("Slice", payload);

            state.loading = false;
            state.fetchSuccess = true;
            state.error = null;
            state.data = payload?.data;

        });
        builder.addCase(fetchComplaintThunk.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.fetchSuccess = false;
        });
    },
});

const { reducer, actions } = complaintSlice;

const complaintReducer = reducer;

const { resetComplaintState } = actions;

export { complaintReducer, resetComplaintState };