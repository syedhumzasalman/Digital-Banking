import express from "express";
import { upload } from "../Middleware/multer.js";
import { cloudinaryUploader } from "../config/cloudinary.js";
import { customerAuth } from "../Middleware/customerAuth.js";
import { docController } from "../controllers/doc.js";

const docRoute = express.Router();

docRoute.post("/upload", [customerAuth, upload.any("files")], docController);

export default docRoute;
