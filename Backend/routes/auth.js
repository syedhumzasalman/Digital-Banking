import express from "express"
import { LoginController, resetOtpController, SignupController, verifyOtpController } from "../controllers/auth.js"

const authRoute = express.Router()

authRoute.post("/signup", SignupController)
authRoute.post("/login", LoginController)
authRoute.post("/verify-otp", verifyOtpController)
authRoute.post("/reset-otp", resetOtpController)

export default authRoute