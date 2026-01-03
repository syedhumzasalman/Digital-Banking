import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const complaintThunk = createAsyncThunk(
    "/complaint/create",
    async (payload, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            // console.log(token);

            const url = import.meta.env.VITE_BASE_URL + "/complaint/create";
            const res = await axios.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);
