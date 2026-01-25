import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { complaintThunk } from "../../Store/features/complaints/complaint.thunk";
import Swal from "sweetalert2";
import { resetComplaintState } from "../../Store/features/complaints/complaint.Slice";

const NewComplaint = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, createSuccess, error } = useSelector((state) => state.complaint);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (createSuccess) {
            Swal.fire({
                icon: "success",
                title: "Complaint Submitted",
                text: "Your complaint has been submitted successfully!",
                confirmButtonColor: "#2563eb",
            }).then(() => {
                reset(); 
                dispatch(resetComplaintState());
            });
        }
    }, [createSuccess, dispatch, reset]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: error,
                confirmButtonColor: "#dc2626",
            }).then(() => {
                dispatch(resetComplaintState());
            });
        }
    }, [error, dispatch]);



    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append("complaintType", data.complaintType);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("priority", data.priority);

        // Append files if selected
        if (data.uploadedEvidence?.length > 0) {
            Array.from(data.uploadedEvidence).forEach(file => {
                formData.append("uploadedEvidence", file);
            });
        }

        // for (let pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        // console.log("Form Data:", formData);
        dispatch(complaintThunk(formData));
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">

                    {/* Header */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                        New Complaint
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Submit your complaint securely to your bank
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Complaint Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Complaint Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("complaintType", { required: "Complaint type is required" })}
                                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select</option>
                                <option value="Complaint">Complaint</option>
                                <option value="Fraud">Fraud</option>
                            </select>
                            {errors.complaintType && (
                                <span className="text-red-500 text-xs mt-1 block">
                                    {errors.complaintType.message}
                                </span>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("category", { required: "Category is required" })}
                                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select</option>
                                <option value="ATM">ATM</option>
                                <option value="Card">Card</option>
                                <option value="Online Banking">Online Banking</option>
                                <option value="Branch Banking">Branch Banking</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && (
                                <span className="text-red-500 text-xs mt-1 block">
                                    {errors.category.message}
                                </span>
                            )}
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Priority <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("priority", { required: "Priority is required" })}
                                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {errors.priority && (
                                <span className="text-red-500 text-xs mt-1 block">
                                    {errors.priority.message}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows="4"
                                {...register("description", {
                                    required: "Description is required",
                                    minLength: {
                                        value: 10,
                                        message: "Description must be at least 10 characters"
                                    }
                                })}
                                className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder="Explain your issue briefly..."
                            />
                            {errors.description && (
                                <span className="text-red-500 text-xs mt-1 block">
                                    {errors.description.message}
                                </span>
                            )}
                        </div>

                        {/* Evidence Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Evidence (Optional)
                            </label>
                            <input
                                type="file"
                                multiple
                                accept="image/*,.pdf"
                                {...register("uploadedEvidence")}
                                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Supported formats: Images
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-xl font-medium transition-colors ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                "Submit Complaint"
                            )}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default NewComplaint;