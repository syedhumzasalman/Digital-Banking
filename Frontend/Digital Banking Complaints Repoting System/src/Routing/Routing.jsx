import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthRoutes from './AuthRoutes'
import PrivateRoutes from './PrivateRoutes'
import Signup from '../Pages/Signup/Signup'
import Login from '../Pages/Login/Login'
import Dashboard from '../Pages/Dashboard/Dashboard'
import NotFound from '../Pages/NotFound/NotFound'
import OTPVerification from '../Pages/OTPVerification/OTPVerification'
import MyComplaints from '../Pages/MyComplaints/MyComplaints'
import NewComplaint from '../Pages/NewComplaint/NewComplaint'
import UserProfile from '../Pages/Profile/userProfile'

const Routing = () => {
    return (
        <Routes>

            <Route element={<AuthRoutes />}>
                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verifiOTP" element={<OTPVerification />} />
            </Route>


            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/my-complaints" element={<MyComplaints />} />
                <Route path="/new-complaint" element={<NewComplaint />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Routing