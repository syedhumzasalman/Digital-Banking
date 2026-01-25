import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { otpThunk, resendOTPThunk } from "../../Store/features/auth/otp.thunk";

const OTPVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userEmail = location?.state?.email;

  // console.log(userEmail);


  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setFocus("otp");
  }, [setFocus]);

  // VERIFY OTP
  const onSubmit = async (data) => {
    try {
      const payload = {
        email: userEmail,
        otp: data.otp,
      };

      const response = await dispatch(otpThunk(payload)).unwrap();

      if (response.message === "OTP Verify Successfully") {
        Swal.fire({
          icon: "success",
          title: "OTP Verified ✅",
          text: "Your account has been successfully verified",
          confirmButtonColor: "#22c55e",
        }).then(() => {
          reset();
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: response.message,
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: error?.message || "Invalid or expired OTP",
        confirmButtonColor: "#ef4444",
      });
    }
  };


  // RESEND OTP
  const resendOTP = async () => {
    try {
      const response = await dispatch(
        resendOTPThunk({ email: userEmail })
      ).unwrap();

      if (response.message === "OTP Resent Successfully") {
        Swal.fire({
          icon: "success",
          title: "OTP Sent 📩",
          text: response.message || "Please check your email",
          confirmButtonColor: "#22c55e",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: response.message,
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to resend OTP",
        text: error?.message || "Please try again later",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-700 via-purple-700 to-pink-600 flex items-center justify-center p-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 text-center"
      >
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-20 h-20 mx-auto rounded-full bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-4xl text-white mb-6"
        >
          🔐
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Verify Your Account
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Enter the 6-digit OTP sent to your registered email
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* OTP INPUT */}
          <input
            type="text"
            maxLength="6"
            placeholder="000000"
            {...register("otp", {
              required: "OTP is required",
              minLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
            })}
            className={`
              w-full text-center text-2xl tracking-[12px]
              rounded-2xl px-4 py-4 border
              transition-all duration-300

              ${errors.otp
                ? "border-red-500 ring-4 ring-red-500/20"
                : "border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
              }

              focus:outline-none
            `}
          />

          {errors.otp && (
            <p className="text-red-500 text-sm animate-bounce">
              {errors.otp.message}
            </p>
          )}

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl font-semibold text-white
                       bg-linear-to-r from-indigo-600 to-purple-600
                       shadow-lg"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </motion.button>
        </form>

        {/* RESEND */}
        <p className="mt-6 text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <button
            onClick={resendOTP}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
