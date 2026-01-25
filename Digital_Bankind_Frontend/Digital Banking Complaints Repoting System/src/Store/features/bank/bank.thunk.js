import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const bankThunk = createAsyncThunk("bank/getBanks",
    async (payload, { rejectWithValue }) => {
        try {
            // console.log("payload", payload);
            const url = import.meta.env.VITE_BASE_URL + "/bank/getBanks";
            const res = await axios.post(url, payload);
            // console.log("response", res.data);

            return res.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);