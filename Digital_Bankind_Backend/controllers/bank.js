import express from "express"
import BankModel from "../Models/bankSchema.js";


export const AddBankController = async (req, res) => {
    try {
        const { bankName, bankCode } = req.body;

        if (!bankName || !bankCode) {
            return res.status(400).json({
                message: "required field are missing",
                status: false,
            });
        }
        const obj = {
            bankName,
            bankCode,
        };
        const data = await BankModel.create(obj);

        res.status(201).json({
            message: "Bank created!",
            status: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
            data: null,
        });
    }
};


export const GetBankController = async (req, res) => {
    try {
        const data = await BankModel.find({});

        res.status(200).json({
            message: "bank fetch",
            status: true,
            data,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false,
            data: null,
        });
    }
};