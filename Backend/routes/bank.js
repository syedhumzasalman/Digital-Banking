import express from "express"
import { AddBankController, GetBankController } from "../controllers/bank.js"

const bankRoute = express.Router()


bankRoute.post("/create" , AddBankController)
bankRoute.post("/getBanks" , GetBankController)

export default bankRoute