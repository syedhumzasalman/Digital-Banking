import express from "express"
import dotenv from "dotenv"
import MongooseConfig from "./Config/MongooseConfig.js"
import authRoute from "./routes/auth.js"
import bankRoute from "./routes/bank.js"
import cors from "cors";
import complaintRoute from "./routes/complaint.js"
import docRoute from "./routes/doc.js"
import { cloudinaryConfig } from "./config/cloudinary.js"
import session from "express-session";
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

MongooseConfig()
cloudinaryConfig()

app.use("/api/auth", authRoute)
app.use("/api/bank", bankRoute)
app.use("/api/complaint", complaintRoute);
app.use("/api/doc", docRoute);



app.listen(PORT, () => console.log(`server Running on ${PORT}`))