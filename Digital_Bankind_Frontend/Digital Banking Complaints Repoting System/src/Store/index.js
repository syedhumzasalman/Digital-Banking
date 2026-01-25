import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/auth.slice.js";
import { bankReducer } from "./features/bank/bank.slice.js";
import { otpReducer } from "./features/auth/otp.slice.js";
import { complaintReducer } from "./features/complaints/complaint.Slice.js";

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist config for auth slice
const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "token"],
};


// Wrap the auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);


const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        bankReducer,
        otpReducer,
        complaint: complaintReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export const persistor = persistStore(store);

export default store;