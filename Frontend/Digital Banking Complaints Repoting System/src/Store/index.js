import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/auth.slice.js";
import { bankReducer } from "./features/bank/bank.slice.js";
import { otpReducer } from "./features/auth/otp.slice.js";
import { complaintReducer } from "./features/complaints/complaint.Slice.js";

const store = configureStore({
    reducer: {
        authReducer,
        bankReducer,
        otpReducer,
        complaint: complaintReducer,
    },

});

export default store;