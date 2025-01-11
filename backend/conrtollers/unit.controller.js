import {Unit} from "../models/unit.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerUnit = async (req, res) => {
    try {
        const {unitName} = req.body;
        if (!unitName){
            return res.status(400).json({
                message: "Unit name is required.",
                success: false
            });
        }

        let unit = await Unit.findOne({name: unitName});

        if (unit){
            return res.status(400).json({
                message: "You cannot register same unit.",
                success: false
            });
        }

        unit = await Unit.create({
            name: unitName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Unit registered successfully.",
            unit,
            success: true
        });

    } catch (error){
        console.log(error);
    }
}

export const getUnit = async (req, res) => {
    try {
        const userId = req.id;
        const units = await Unit.find({userId});

        if (!units){
            return res.status(404).json({
                message: "No units found.",
                success: false
            });
        }

        return res.status(200).json({
            units,
            success: true
        });
    } catch (error) { 
        console.log(error); 
    }
}

export const getUnitById = async (req, res) => {
    try {
        const unitId = req.params.id;
        const unit = await Unit.findById(unitId);

        if (!unit){
            return res.status(404).json({
                message: "No units found.",
                success: false
            });
        }
        return res.status(200).json({
            unit,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateUnit = async (req, res) => {
    try {
        const {name, description, website, location} = req.body;
        console.log(name, description, website, location);
        
        const file = req.file;
        //cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };
        const unit = await Unit.findByIdAndUpdate(req.params.id, updateData, {new: true});

        if (!unit){
            return res.status(404).json({
                message: "No units found.",
                success: fasle
            });
        }

        return res.status(200).json({
            message: "Unit information updated.",
            unit,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

export const deleteUnit = async (req, res) => {
    try {
        const unitId = req.params.id;
        const deletedUnit = await Unit.findByIdAndDelete(unitId);

        if (!deletedUnit) {
            return res.status(404).json({
                message: "Unit not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Unit deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while deleting the unit.",
            success: false,
        });
    }
};
