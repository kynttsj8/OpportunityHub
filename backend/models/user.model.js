import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phoneNumber: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type:String,
        enum:['student', 'institution', 'admin'],
        required:true
    },
    isAdmin: { type: Boolean, default: false },
    profile: {
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        unit:{type:mongoose.Schema.Types.ObjectId},
        profilePhoto:{
            type:String,
            default:""
        }
    }
    
}, {timestamps:true});
export const User = mongoose.model('User', userSchema);