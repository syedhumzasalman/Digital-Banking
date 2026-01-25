import express from "express";
import { customerAuth } from "../Middleware/customerAuth.js";
import { GenerateComplaint, MyComplaints } from "../controllers/complaint.js";
import { upload } from "../Middleware/multer.js";
const complaintRoute = express.Router();

complaintRoute.post("/create", [customerAuth, upload.any("files"),], GenerateComplaint);
complaintRoute.get("/my-complaint", customerAuth, MyComplaints);

export default complaintRoute;