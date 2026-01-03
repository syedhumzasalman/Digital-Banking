import express from "express";
import { customerAuth } from "../Middleware/customerAuth.js";
import { GenerateComplaint, MyComplaints } from "../controllers/complaint.js";
const complaintRoute = express.Router();

complaintRoute.post("/create", customerAuth, GenerateComplaint);
complaintRoute.get("/my-complaint", customerAuth, MyComplaints);

export default complaintRoute;