import sendMail from "../mail_sender/mail_sender.js";
import { Opportunity } from "../models/opportunity.model.js";
import { User } from "../models/user.model.js";

export const postOpportunity = async (req, res) => {
    try {
        const {title, description, requirements, location, type, position, unitId} = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !location || !type || !position || !unitId) {
            return res.status(400).json({ 
                message: 'Please fill in all fields',
                success: false
            });
        }

        const opportunity = await Opportunity.create({
            title,
            description,
            requirements: requirements.split(", "),
            location,
            type,
            position,
            unit: unitId,
            created_by: userId
        });

        // Send email notification to the user upon successful creation of the opportunity
        const user = await User.findById(userId);
        if (user) {
            await sendMail({
                email: user.email,
                subject: 'Opportunity Posted Successfully',
                html: `
                    <h1 style="color:red>Your program has been posted!</h1>
                    <p style="font-family: Arial, sans-serif;">Hi ${user.fullname},</p>
                    <p style="font-family: Arial, sans-serif;">Your new program titled <strong>${opportunity.title}</strong> has been successfully posted.</p>
                    <p style="font-family: Arial, sans-serif;">Location: ${opportunity.location}</p>
                    <p style="font-family: Arial, sans-serif;">Type: ${opportunity.type}</p>
                    <p style="font-family: Arial, sans-serif;">Position: ${opportunity.position}</p>
                    <p style="font-family: Arial, sans-serif;">Requirements: ${opportunity.requirements.join(", ")}</p>
                    <p style="font-family: Arial, sans-serif;">Thank you for sharing this opportunity!</p>
                `
            });
        }

        return res.status(201).json({
            message: 'Post created successfully',
            opportunity,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getAllOpportunities = async (req, res) =>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        };

        const opportunities = await Opportunity.find(query).populate({
            path: "unit"
        }).sort({ createdAt: -1 });
        if (!opportunities) {
            return res.status(404).json({
                message :"Opportunities not found",
                success: false
            });
        };
        return res.status(200).json({
            opportunities,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getOpportunityById = async (req, res) =>{
    try {
        const opportunityId = req.params.id;
        const opportunity = await Opportunity.findById(opportunityId).populate({
            path:"applications"
        });

        if (!opportunity) {
            return res.status(404).json({
                message :"Post not found",
                success: false
            });
        };
        return res.status(200).json({
            opportunity,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getAdminOpportunities = async (req, res) => {
    try {
        const adminId = req.id;
        const opportunities = await Opportunity.find({created_by: adminId}).populate({
            path: "unit",
            createdAt: -1
        });

        if (!opportunities){
            return res.status(404).json({
                message: "No posts created by this user.",
                success: false
            });
        };
        return res.status(200).json({
            opportunities,
            success: true
        });
    } catch (error) {
        console.log(error); 
    }
};

export const updateOpportunity = async (req, res) => {
    try {
        const {title, description, requirements, location, type, position} = req.body;

        const updateData = { title, description, requirements, location, type, position };
        const opportunity = await Opportunity.findByIdAndUpdate(req.params.id, updateData, {new: true});

        if (!opportunity) {
            return res.status(404).json({
                message: "Program not found",
                success: false
            })
        }

        return res.status(200).json({
            message:"Program updated successfully.",
            opportunity,
            success:true 
        })
    } catch (error) {
        console.log(error);
    }
};

export const deleteOpportunity = async (req, res) => {
    try {
        const opportunityId = req.params.id;
        const deleteOpportunity = await Opportunity.findByIdAndDelete(opportunityId);

        if (!deleteOpportunity) {
            return res.status(404).json({
                message: "Program not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Program deleted successfully.",
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while deleting the program.",
            success: false,
        });
    }
};

