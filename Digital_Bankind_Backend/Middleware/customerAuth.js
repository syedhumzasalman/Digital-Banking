import jwt from "jsonwebtoken";
import UserModel from "../Models/userSchema.js";


export const customerAuth = async (req, res, next) => {
    // console.log("token", req.headers);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isVerify = jwt.verify(token, process.env.JWT_KEY);
        // console.log("isVerify", isVerify);
        if (!isVerify) {
            return res.status(401).json({
                message: "UnAuth user",
                status: false,
            });
        }

        const user = await UserModel.findById({ _id: isVerify._id }).select("role");
        if (!user) {
            return res.status(401).json({
                message: "UnAuth user",
                status: false,
            });
        }

        if (user.role === "customer") {
            req.user = user
            next();
        } else {
            return res.status(401).json({
                message: "Only For Autherized users",
                status: false,
            });
        }

        // console.log("isVerify", user);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: false,
        });
    }
};