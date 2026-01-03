import express from "express";
import { upload } from "../Middleware/multer.js";
import { cloudinaryUploader } from "../config/cloudinary.js";
import { customerAuth } from "../Middleware/customerAuth.js";
import fs from "fs/promises";

const docRoute = express.Router();

docRoute.post(
    "/upload",
    customerAuth,
    upload.any("files"),
    async (req, res) => {
        try {
            const files = req.files;

            if (!files || files.length === 0) {
                return res.status(400).json({
                    message: "No files uploaded",
                    data: null,
                });
            }

            // if (!req.session.uploadedEvidence) req.session.uploadedEvidence = [];

            const uploadedFiles = [];

            for (const file of files) {
                const uploaded = await cloudinaryUploader.upload(file.path);
                uploadedFiles.push(uploaded);

                // req.session.uploadedEvidence.push(uploaded);
            }

            // delete uploads folder
            await fs.rm("./uploads", { recursive: true, force: true });

            return res.status(201).json({
                message: "Uploaded successfully",
                data: uploadedFiles,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: error.message,
                data: null,
            });
        }
    }
);

export default docRoute;
