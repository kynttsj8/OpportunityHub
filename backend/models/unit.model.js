import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
    },
    website:{
        type: String,
    },
    location:{
        type: String,
    },
    logo:{
        type: String, // URL to unit logo
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true});
export const Unit = mongoose.model("Unit", unitSchema);