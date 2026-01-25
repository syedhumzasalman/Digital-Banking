import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import { bankThunk } from "../../Store/features/bank/bank.thunk";

const UserProfile = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const { banks, loading } = useSelector((state) => state.bankReducer);


    // console.log(banks);
    const bank = banks.find(b => b._id === user?.bankId) || null;

    useEffect(() => {
        // Get user from localStorage
        const persistAuth = localStorage.getItem("persist:auth");
        if (persistAuth) {
            try {
                const authObj = JSON.parse(persistAuth);
                if (authObj.user) {
                    const userData = JSON.parse(authObj.user);
                    setUser(userData);

                    // Fetch bank details if bankId exists
                    if (userData.bankId) {
                        dispatch(bankThunk(userData.bankId));
                    }
                }
            } catch (err) {
                console.error("User parse error", err);
            }
        }
    }, [dispatch]);



    if (!user) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h3>
                        <p className="text-gray-600">Unable to load user data. Please try logging in again.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* Header Card */}
                    <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative flex flex-col md:flex-row items-center gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white ring-opacity-50">
                                    <span className="text-5xl font-bold text-blue-600">
                                        {user.fullname?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                    <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {user.fullname}
                                </h1>
                                <p className="text-blue-100 text-lg mb-4">{user.email}</p>
                                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                    <span className="px-4 py-1.5 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white border-opacity-30">
                                        {user.role?.toUpperCase()}
                                    </span>
                                    <span className="px-4 py-1.5 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white border-opacity-30">
                                        ✓ Verified Account
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Personal Information Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                            </div>

                            <div className="space-y-4">
                                <InfoItem
                                    icon={
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    }
                                    label="Full Name"
                                    value={user.fullname}
                                />
                                <InfoItem
                                    icon={
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    }
                                    label="Email Address"
                                    value={user.email}
                                />
                                <InfoItem
                                    icon={
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    }
                                    label="Role"
                                    value={user.role}
                                    badge
                                />
                                <InfoItem
                                    icon={
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                        </svg>
                                    }
                                    label="User ID"
                                    value={user._id.slice(-6)}
                                    mono
                                />
                            </div>
                        </div>

                        {/* Bank Information Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Bank Information</h2>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
                                </div>
                            ) : bank ? (
                                <div className="space-y-4">
                                    <InfoItem
                                        icon={
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                            </svg>
                                        }
                                        label="Bank Name"
                                        value={bank.name || bank.bankName}
                                        highlight
                                    />
                                    <InfoItem
                                        icon={
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        }
                                        label="Bank Code"
                                        value={bank.code || bank.bankCode || 'N/A'}
                                        mono
                                    />
                                    <InfoItem
                                        icon={
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        }
                                        label="Location"
                                        value={bank.location || bank.address || 'N/A'}
                                    />
                                    <InfoItem
                                        icon={
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                            </svg>
                                        }
                                        label="Bank ID"
                                        value={user.bankId}
                                        mono
                                    />
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500">Bank information not available</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <StatCard
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            }
                            title="Total Complaints"
                            value="--"
                            bgColor="bg-blue-500"
                        />
                        <StatCard
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            title="Pending"
                            value="--"
                            bgColor="bg-yellow-500"
                        />
                        <StatCard
                            icon={
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            title="Resolved"
                            value="--"
                            bgColor="bg-green-500"
                        />
                    </div> */}
                </div>
            </div>
        </>
    );
};

// Info Item Component
const InfoItem = ({ icon, label, value, badge, mono, highlight }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
            {badge ? (
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold bg-blue-100 text-blue-700 capitalize">
                    {value}
                </span>
            ) : highlight ? (
                <p className="text-lg font-bold text-blue-600 wrap-break-word">{value}</p>
            ) : (
                <p className={`text-gray-900 wrap-break-word ${mono ? 'font-mono text-sm' : 'font-medium'}`}>
                    {value}
                </p>
            )}
        </div>
    </div>
);

// Stat Card Component
const StatCard = ({ icon, title, value, bgColor }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center text-white`}>
                {icon}
            </div>
        </div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
);

export default UserProfile;