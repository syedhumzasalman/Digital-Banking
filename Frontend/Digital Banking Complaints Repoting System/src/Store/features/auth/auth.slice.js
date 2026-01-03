import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, signupThunk } from "./auth.thunk.js";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        error: null,
        user: null,
        token: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        // Login Thunk
        builder.addCase(signupThunk.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(signupThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.data;
            state.token = payload.token;
        });
        builder.addCase(signupThunk.rejected, (state, { payload }) => {
            state.loading = false;
        });


        // Login Thunk
        builder.addCase(loginThunk.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.data;
            state.token = payload.token;
        });
        builder.addCase(loginThunk.rejected, (state, { payload }) => {
            state.loading = false;
        });
    },
});

const { reducer, actions } = authSlice;

const authReducer = reducer;

const { } = actions;

export { authReducer };