import { createSlice } from "@reduxjs/toolkit";
import { bankThunk } from "./bank.thunk.js";

const bankSlice = createSlice({
    name: "bank",
    initialState: {
        banks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(bankThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(bankThunk.fulfilled, (state, action) => {
                // console.log(action.payload);

                state.loading = false;
                state.banks = action?.payload?.data
            })
            .addCase(bankThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


const { reducer, actions } = bankSlice;

const bankReducer = reducer;

const { } = actions;

export { bankReducer };