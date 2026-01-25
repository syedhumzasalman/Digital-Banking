import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupThunk } from "../../Store/features/auth/auth.thunk";
import { bankThunk } from "../../Store/features/bank/bank.thunk";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux State
  const { banks, loading: loadingBanks } = useSelector(
    (store) => store.bankReducer
  );
  // console.log(banks.data[0]);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Signup Submit
  const onSubmit = async (data) => {
    try {
      const response = await dispatch(signupThunk(data)).unwrap();

      // console.log(response);

      if (response.message === "User Created Successfully") {
        Swal.fire({
          icon: "success",
          title: "Account Created 🎉",
          text: `Welcome ${data.fullname}. Please verify your email to continue.`,
          confirmButtonColor: "#22c55e",
        }).then(() => {
          reset();
          navigate("/verifiOTP", {
            state: { email: data.email },
          });
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
        title: "Signup Failed",
        text: error?.message || "Something went wrong. Please try again!",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // Fetch Banks
  useEffect(() => {
    dispatch(bankThunk());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT FORM */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">
            Open Digital Account
          </h2>
          <p className="text-gray-500 mb-8">
            Secure. Fast. Seamless Banking Experience 💳
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Full Name */}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullname", { required: "Full name is required" })}
                className={`w-full rounded-2xl px-4 py-3 border ${errors.fullname ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* Bank Dropdown */}
            <div>
              <select
                {...register("bankId", { required: "Please select your bank" })}
                disabled={loadingBanks}
                className={`w-full rounded-2xl px-4 py-3 border ${errors.bank ? "border-red-500" : "border-gray-300"
                  } ${loadingBanks ? "bg-gray-100 cursor-not-allowed" : ""}`}
              >
                <option value="">
                  {loadingBanks ? "Loading banks..." : "Select Your Bank"}
                </option>

                {banks?.data && banks?.data?.length > 0 ? (
                  banks?.data.map((bank) => (
                    <option key={bank?._id} value={bank?._id}>
                  {bank?.bankName}
                </option>
                ))
                ) : (
                !loadingBanks && <option disabled>No banks available</option>
                )}
              </select>

              {errors.bank && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bank.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
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
                className={`w-full rounded-2xl px-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Create Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className={`w-full rounded-2xl px-4 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold"
            >
              {isSubmitting ? "Creating Account..." : "Create Secure Account"}
            </button>

            <p className="text-center text-gray-500 text-sm">
              Already have an account?
              <Link to="/login" className="text-indigo-600 ml-1 font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-linear-to-br from-indigo-700 to-purple-700 text-white p-12">
          <div className="text-7xl mb-6">🏦</div>
          <h3 className="text-2xl font-bold mb-4">
            One Platform. All Complaints.
          </h3>
          <ul className="space-y-3 text-indigo-100">
            <li>✔ Submit Banking Complaints Online</li>
            <li>✔ Track Status in Real-Time</li>
            <li>✔ OTP Secured Verification</li>
            <li>✔ 24/7 Global Access</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Signup;
