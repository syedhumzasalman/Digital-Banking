import { cloudinaryUploader } from "../config/cloudinary.js";
import ComplaintModel from "../Models/complaintSchema.js";
import UserModel from "../Models/userSchema.js";
import fs from "fs/promises";

// import { deleteFromCloudinary } from "../config/cloudinary.js";

export const GenerateComplaint = async (req, res) => {
    let uploadedFiles = [];

    try {

        // console.log("BODY:", req.body);
        // console.log("FILES:", req.files)
        const user = req.user;
        const files = req.files;
        const { complaintType, category, description, priority, uploadedEvidence } = req.body;


        // Validation
        if (!complaintType || !category || !description || !priority) {
            return res.status(400).json({
                message: "All required fields must be filled",
                status: false,
            });
        }

        // if (!files || files.length === 0) {
        //     return res.status(400).json({
        //         message: "No files uploaded",
        //         data: null,
        //     });
        // }


        for (const file of files) {
            const uploaded = await cloudinaryUploader.upload(file.path);
            uploadedFiles.push({
                url: uploaded.secure_url,
                public_id: uploaded.public_id
            });

        }

        // delete uploads folder
        await fs.rm("./uploads", { recursive: true, force: true });

        const userBankId = await UserModel.findById(user._id).select("bankId").lean();
        // console.log("User Bank ID:", userBankId.bankId);

        if (!userBankId || !userBankId.bankId) {
            return res.status(400).json({
                message: "User bankId not found",
                status: false
            });
        }

        // Create complaint
        const complaint = await ComplaintModel.create({
            complaintType,
            category,
            description,
            priority,
            uploadedEvidence: uploadedFiles,
            createdBy: user._id,
            bankId: userBankId.bankId
        });

        res.status(201).json({
            message: "Complaint Generated Successfully!",
            status: true,
            data: complaint
        });

    } catch (error) {

        // CLEANUP: delete uploaded images from Cloudinary
        if (uploadedFiles?.length) {
            for (const file of uploadedFiles) {
                try {
                    await cloudinaryUploader.destroy(file.public_id);
                } catch (err) {
                    console.error("Failed to delete from cloudinary:", err);
                }
            }
        }

        // console.error("Error creating complaint:", error);
        res.status(500).json({
            message: error.message,
            status: false,
            data: null,
        });
    }
};




export const MyComplaints = async (req, res) => {
    try {
        const user = req.user;

        const data = await ComplaintModel.find({ createdBy: user._id });
        res.status(201).json({
            message: "Complaint fetched!",
            status: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
            data: null,
        });
    }
};