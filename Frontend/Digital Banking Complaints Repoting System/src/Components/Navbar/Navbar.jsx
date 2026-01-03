import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Profile", path: "/profile" },
        { name: "New Complaint", path: "/new-complaint" },
        { name: "My Complaints", path: "/my-complaints" },
    ];

    const isActive = (path) =>
        location.pathname === path
            ? "bg-indigo-600 text-white"
            : "text-gray-600 hover:bg-indigo-100";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login"); 
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link
                        to="/dashboard"
                        className="text-sm md:text-2xl font-extrabold text-indigo-600 tracking-wide"
                    >
                        🔐 SecureBank Complaint System
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive(
                                    link.path
                                )}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300"
                        >
                            🚪 Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? "✖" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg border-t">
                    <div className="flex flex-col p-4 gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${isActive(
                                    link.path
                                )}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Mobile Logout */}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300"
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
