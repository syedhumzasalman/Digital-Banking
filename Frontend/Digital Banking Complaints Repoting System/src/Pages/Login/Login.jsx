import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../Store/features/auth/auth.thunk";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(loginThunk(data)).unwrap();
      // console.log(response);

      if (response.message === "user successfully login!") {
        
        if (response.data.isVerify === false) {
          navigate("/verifiOTP", {
            state: { email: data.email },
          });
          return;
        }
        
        if (response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("role", response.data.role);
        }

        
        Swal.fire({
          icon: "success",
          title: "Login Successful 🎉",
          text: `Welcome back! ${response.data.fullname}`,
          confirmButtonColor: "#22c55e",
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: response.message,
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.log(error.message);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials or something went wrong. Please try again!",
        confirmButtonColor: "#ef4444",
      });
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-4 animate-fadeIn">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden transform transition-all duration-500 hover:scale-105">


        {/* LEFT – DIGITAL BANKING UI */}
        <div className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-indigo-700 to-purple-700 text-white p-12 animate-slideInRight">
          <div className="text-7xl mb-6 animate-bounce">🏦</div>
          <h3 className="text-2xl font-bold mb-4 animate-fadeInUp">
            One Platform. All Complaints.
          </h3>
          <ul className="space-y-3 text-indigo-100 animate-fadeInUp delay-200">
            <li className="flex items-center"><span className="mr-2">✔</span> Submit Banking Complaints Online</li>
            <li className="flex items-center"><span className="mr-2">✔</span> Track Status in Real-Time</li>
            <li className="flex items-center"><span className="mr-2">✔</span> Faster Resolution Process</li>
            <li className="flex items-center"><span className="mr-2">✔</span> OTP Secured Verification</li>
            <li className="flex items-center"><span className="mr-2">✔</span> 24/7 Global Access</li>
          </ul>
        </div>

        {/* RIGHT – FORM */}
        <div className="p-8 md:p-12 animate-slideInLeft">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2 animate-pulse">
            Login to Your Account
          </h2>
          <p className="text-gray-500 mb-8">
            Secure. Fast. Seamless Banking Experience 💳
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div className="animate-fadeInUp delay-200">
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className={`w-full rounded-2xl px-4 py-3 transition-all duration-300 ${errors.email ? "border-red-500 ring-4 ring-red-500/20" : "border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"}`}
              />
              {errors.email && <p className="error animate-bounce">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="animate-fadeInUp delay-300">
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                })}
                className={`w-full rounded-2xl px-4 py-3 transition-all duration-300 ${errors.password ? "border-red-500 ring-4 ring-red-500/20" : "border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"}`}
              />
              {errors.password && (
                <p className="error animate-bounce">{errors.password.message}</p>
              )}
            </div>

            {/* Button */}
            <button
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 animate-pulse"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logging In...
                </div>
              ) : (
                "Login Securely"
              )}
            </button>

            {/* Signup Link */}
            <p className="text-center text-gray-500 text-sm animate-fadeInUp delay-400">
              Don't have an account?
              <Link to="/" className="text-indigo-600 ml-1 font-semibold hover:underline transition-all duration-300">
                Sign Up
              </Link>
            </p>

            {/* Forgot Password */}
            <p className="text-center text-gray-500 text-sm animate-fadeInUp delay-500">
              <Link to="/forgot-password" className="text-indigo-600 font-semibold hover:underline transition-all duration-300">
                Forgot Password?
              </Link>
            </p>
          </form>
        </div>


      </div>

      {/* Tailwind helpers and custom animations */}
      <style>
        {`
          .error {
            @apply text-red-500 text-sm mt-1;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes fadeInUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 1s ease-in-out; }
          .animate-slideInLeft { animation: slideInLeft 1s ease-out; }
          .animate-slideInRight { animation: slideInRight 1s ease-out; }
          .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-500 { animation-delay: 0.5s; }
        `}
      </style>
    </div>
  );
};

export default Login;