import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
        type:String
    }],
    location:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    position:{ //vacancies
        type:Number,
        required:true
    },
    unit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Unit',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }]
}, {timestamps:true} );
export const Opportunity = mongoose.model("Opportunity", opportunitySchema);