import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const complaintThunk = createAsyncThunk(
    "/complaint/create",
    async (payload, { rejectWithValue }) => {
        // console.log("Payload", payload);


        try {
            const persistAuth = localStorage.getItem("persist:auth");
            let token = null;

            if (persistAuth) {
                try {
                    const authObj = JSON.parse(persistAuth);
                    if (authObj.token) {
                        token = JSON.parse(authObj.token);
                    }
                } catch (err) {
                    console.error("Token parse error", err);
                }
            }

            const url = import.meta.env.VITE_BASE_URL + "/complaint/create";
            const res = await axios.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);


export const fetchComplaintThunk = createAsyncThunk(
    "/complaint/Fetch",
    async (payload, { rejectWithValue }) => {
        // console.log("Payload", payload);


        try {
            const persistAuth = localStorage.getItem("persist:auth");
            let token = null;

            if (persistAuth) {
                try {
                    const authObj = JSON.parse(persistAuth);
                    if (authObj.token) {
                        token = JSON.parse(authObj.token);
                    }
                } catch (err) {
                    console.error("Token parse error", err);
                }
            }

            const url = import.meta.env.VITE_BASE_URL + "/complaint/my-complaint";
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(res.data.data);

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);