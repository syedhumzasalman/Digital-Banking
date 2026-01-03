import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import { complaintThunk } from "../../Store/features/complaints/complaint.thunk";

const NewComplaint = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.complaint);

    // console.log(loading);
    

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.append("complaintType", data.complaintType);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("priority", data.priority);

        if (data.uploadedEvidence?.length > 0) {
            Array.from(data.uploadedEvidence).forEach((file) => {
                formData.append("uploadedEvidence", file);
            });
        }

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
                                Complaint Type
                            </label>
                            <select
                                {...register("complaintType", { required: true })}
                                className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select</option>
                                <option value="Complaint">Complaint</option>
                                <option value="Fraud">Fraud</option>
                            </select>
                            {errors.complaintType && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                {...register("category", { required: true })}
                                className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select</option>
                                <option value="ATM">ATM</option>
                                <option value="Card">Card</option>
                                <option value="Online Banking">Online Banking</option>
                                <option value="Branch Banking">Branch Banking</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.category && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Priority
                            </label>
                            <select
                                {...register("priority", { required: true })}
                                className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {errors.priority && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                rows="4"
                                {...register("description", { required: true })}
                                className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder="Explain your issue briefly..."
                            />
                            {errors.description && (
                                <span className="text-red-500 text-xs">Required</span>
                            )}
                        </div>

                        {/* Evidence Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Upload Evidence (optional)
                            </label>
                            <input
                                type="file"
                                multiple
                                {...register("uploadedEvidence")}
                                className="w-full text-sm text-gray-600"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
                        >
                            {loading ? "Submitting..." : "Submit Complaint"}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default NewComplaint;
