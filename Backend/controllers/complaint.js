import { deleteFromCloudinary } from "../config/cloudinary.js";
import ComplaintModel from "../Models/complaintSchema.js";

export const GenerateComplaint = async (req, res) => {

    // const uploadedEvidence = req.session.uploadedEvidence || [];


    try {
        const user = req.user;
        const { complaintType, category, description, priority, uploadedEvidence } = req.body;

        console.log(complaintType, category, description, priority, uploadedEvidence);


        if (!complaintType || !category || !description || !priority) {
            return res.status(400).json({
                message: "All required fields must be filled",
                status: false,
            });
        }

        await ComplaintModel.create({
            complaintType,
            category,
            description,
            priority,
            uploadedEvidence,
            createdBy: user._id
        });

        // req.session.uploadedEvidence = [];

        res.status(201).json({
            message: "Complaint Generated Successfully!",
            status: true,
        });

    } catch (error) {

        if (uploadedEvidence.length > 0) {
            await Promise.all(
                uploadedEvidence.map(file =>
                    deleteFromCloudinary(file.public_id)
                )
            );
        }


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