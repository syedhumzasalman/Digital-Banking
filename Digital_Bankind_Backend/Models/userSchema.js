import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        role: {
            type: String,
            enum: ["customer", "bank_officer", "sbp_admin"],
            default: "customer",
        },
        bankId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "bank",
        },
        isVerify: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
