import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()


const MongooseConfig = () => {
    const URI = process.env.MONGODB_KEY


    mongoose.connect(URI)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log("MongoDB error", err.message))

}

export default MongooseConfig