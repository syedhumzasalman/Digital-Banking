import express from "express"
import bcryptjs from "bcryptjs"
import UserModel from "../Models/userSchema.js"
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import OTPModel from "../Models/otpSchema.js";
import { sentEmail } from "../Utilities/nodemailer.js";

export const SignupController = async (request, response) => {
  try {
    // Extract body form request ****
    const body = request.body
    // Generate OPT from UUID ****
    const otp = uuidv4().slice(0, 6)

    // Checking if email email already Exist ****
    const emailExist = await UserModel.findOne({ email: body.email })

    // if email already Exist Return **** 
    if (emailExist) {
      return response.status(409).json({
        message: "Email Address Already Exist",
        status: false,
        data: null
      })
    }

    // Extract password from body ****
    const userPassword = body.password

    // if password length is less than 6 word Return ****
    if (userPassword.length < 6) {
      return response.status(400).json({
        message: "Password must be at least 6 characters long",
        status: false,
        data: null
      })
    }

    // Hashpassword using bcrypt ****
    const hashPassword = await bcryptjs.hash(userPassword, 10)
    // putting the hashed password into my object ****
    const obj = { ...body, password: hashPassword }

    // creating a user collection in MongoDB ****
    const userResponse = await UserModel.create(obj)
    // console.log('userResponse', userResponse);


    // sent verification email ****
    sentEmail({ email: body.email, name: body.fullname, otp: otp })
    // console.log(otp);


    // create otpObj to store in database ****
    const otpObj = {
      otp,
      email: body.email
    }

    // creating a otp collection in MongoDB ****
    await OTPModel.create(otpObj)

    // if all good user created Successfully ****
    response.status(201).json({
      message: "User Created Successfully",
      status: true,
    })

  } catch (error) {
    // console.log(error.message);
    const firstError = error?.errors ? Object.values(error.errors)[0].message : error.message;
    response.status(500).json({
      message: firstError || "Some thing went Wrong",
      status: false,
      data: null
    })
  }
}


export const LoginController = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "required field are missing",
        status: false,
      });
    }

    const userExist = await UserModel.findOne({ email }).lean();
    if (!userExist) {
      return response.status(400).json({
        message: "invalid email or password!",
        status: false,
      });
    }

    const comparePass = await bcryptjs.compare(password, userExist.password);
    // console.log("hashPassword", comparePass);

    if (!comparePass) {
      return response.status(400).json({
        message: "Invalid email or password!",
        status: false,
      });
    }
    // console.log("userExist", userExist);

    delete userExist["password"];
    const token = jwt.sign({ _id: userExist._id }, process.env.JWT_KEY);

    return response.status(201).json({
      message: "user successfully login!",
      status: true,
      data: userExist,
      token,
    });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
}

export const verifyOtpController = async (request, response) => {
  try {

    const { email, otp } = request.body

    if (!email || !otp) {
      return response.json({
        message: "Required Field are missing",
        status: false,
        data: null
      })
    }

    const isExist = await OTPModel.findOne({ email, isUsed: false }).sort({ createdAt: -1 })

    // console.log("isExist", isExist);


    if (!isExist) {
      return response.json({
        message: "Invalid OTP",
        status: false,
        data: null
      })
    }

    if (isExist.otp !== otp) {
      return response.json({
        message: "Invalid OTP",
        status: false,
        data: null
      })
    }

    await OTPModel.findByIdAndUpdate(isExist._id, { isUsed: true })
    await UserModel.findOneAndUpdate({ email }, { isVerify: true })


    response.status(201).json({
      message: "OTP Verify Successfully",
      status: true,
      data: null
    })


  } catch (error) {
    const firstError = error?.errors ? Object.values(error.errors)[0].message : error.message;
    response.json({
      message: firstError || "Some thing went Wrong",
      status: false,
      data: null
    })
  }
}

export const resetOtpController = async (request, response) => {
  try {

    const { email } = request.body

    if (!email) {
      return response.json({
        message: "Required Field are missing",
        status: false,
        data: null
      })
    }

    const findUser = await UserModel.findOne({ email })
    // console.log('findUser', findUser);
    if (!findUser) {
      response.json({
        message: "User Not Found",
        status: false,
        data: null
      })
    }
    // console.log("findUser", findUser);


    // Generate OPT from UUID ****
    const otp = uuidv4().slice(0, 6)
    // console.log(otp);


    // sent verification email ****
    sentEmail({ email: findUser.email, name: findUser.firstName, otp: otp })

    // create otpObj to store in database ****
    const otpObj = {
      otp,
      email: findUser.email
    }

    // creating a otp collection in MongoDB ****
    await OTPModel.create(otpObj)



    response.json({
      message: "OTP Resent Successfully",
      status: true,
      data: null
    })


  } catch (error) {
    const firstError = error?.errors ? Object.values(error.errors)[0].message : error.message;
    response.json({
      message: firstError || "Some thing went Wrong",
      status: false,
      data: null
    })
  }
}