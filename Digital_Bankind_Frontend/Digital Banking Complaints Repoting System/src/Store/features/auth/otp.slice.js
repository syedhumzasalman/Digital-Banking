import { createSlice } from "@reduxjs/toolkit";
import { otpThunk, resendOTPThunk } from "./otp.thunk";

const otpSlice = createSlice({
    name: "OTP",
    initialState: {
        loading: false,
        error: null,
        user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Verify OTP
        builder.addCase(otpThunk.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(otpThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.data;
        });
        builder.addCase(otpThunk.rejected, (state, { payload }) => {
            state.loading = false;
        });

        // Resend OTP
        builder.addCase(resendOTPThunk.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(resendOTPThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.data;
        });
        builder.addCase(resendOTPThunk.rejected, (state, { payload }) => {
            state.loading = false;
        });
    },
});

const { reducer, actions } = otpSlice;

const otpReducer = reducer;

const { } = actions;

export { otpReducer };