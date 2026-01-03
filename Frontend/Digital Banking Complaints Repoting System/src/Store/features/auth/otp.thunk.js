import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const otpThunk = createAsyncThunk("auth/verify-otp",
    async (payload, { rejectWithValue }) => {
        try {
            // console.log("payload", payload);
            const url = import.meta.env.VITE_BASE_URL + "/auth/verify-otp";
            const res = await axios.post(url, payload);
            // console.log("response", res);

            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const resendOTPThunk = createAsyncThunk("auth/reset-otp",
    async (payload, { rejectWithValue }) => {
        try {
            // console.log("payload", payload);
            const url = import.meta.env.VITE_BASE_URL + "/auth/reset-otp";
            const res = await axios.post(url, payload);
            // console.log("response", res);

            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);