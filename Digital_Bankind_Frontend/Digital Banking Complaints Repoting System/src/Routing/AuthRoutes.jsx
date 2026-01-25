import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
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

    
    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default AuthRoutes;
