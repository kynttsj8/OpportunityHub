// twilio code
// M7WGN6UPC641CDXDZXBZ7LGV

import sendMail from "../mail_sender/mail_sender.js";
import { Application } from "../models/application.model.js";
import { Opportunity } from "../models/opportunity.model.js";
import { User } from "../models/user.model.js";

export const applyOpportunity = async (req, res) => {
    try {
        const userId = req.id;
        const opportunityId = req.params.id;

        if (!opportunityId) {
            return res.status(400).json({
                message: 'Invalid opportunity id',
                success: fasle
            })
        };

        // check if user has already applied for the opportunity
        const existingApplication = await Application.findOne({
            opportunity: opportunityId, 
            applicant: userId
        });
        
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this opportunity.",
                success: false
            });
        };

        // check if opportunity exists
        const opportunity = await Opportunity.findById(opportunityId);

        if (!opportunity){
            return res.status(404).json({
                message: "Opportunity not found",
                success: fasle
            });
        };

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // create new application
        const newApplication = await Application.create({
            opportunity: opportunityId,
            applicant: userId

        });

        opportunity.applications.push(newApplication._id);
        await opportunity.save();

        // Send email to the student when they successfully apply to a program
        const applicationDate = new Date(newApplication.createdAt).toLocaleDateString(); // Format date
        await sendMail({
            email: user.email,
            subject: "Application Confirmation - OpportunityHUB",
            html: `
                <h1 style="color:red ">Thank you for your application!</h1>
                <p style="font-family: Arial, sans-serif;">Dear ${user.fullname},</p>
                <p style="font-family: Arial, sans-serif;">You have successfully applied for the program <strong>${opportunity.title}</strong>.</p>
                <ul>
                    <li><strong>Email:</strong> ${user.email}</li>
                    <li><strong>Program Name:</strong> ${opportunity.title}</li>
                    <li><strong>Application Date:</strong> ${applicationDate}</li>
                </ul>
                <p style="font-family: Arial, sans-serif;">We wish you the best of luck!</p>
                <p style="font-family: Arial, sans-serif;">OpportunityHUB Team</p>
            `,
        });

        // send an email to institution when a student apply to their program
        const institutionId = opportunity.created_by;
        const institution = await User.findById(institutionId);
        await sendMail({
            email: institution.email,
            subject: "New Application Received - OpportunityHUB",
            html: `
                <h1 style="color:red ">New application received!</h1>
                <p style="font-family: Arial, sans-serif;">Dear Institution Actor,</p>
                <p style="font-family: Arial, sans-serif;">A new application has been submitted for the opportunity <strong>${opportunity.title}</strong>.</p>
                <p style="font-family: Arial, sans-serif;">Applicant: ${user.fullname}</p>
                <p style="font-family: Arial, sans-serif;">Application Date: ${applicationDate}</p>
                <p style="font-family: Arial, sans-serif;">Regards, OpportunityHUB</p>
            `
        });
   
        return res.status(201).json({
            message: "Application created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred while processing the application",
            success: false
        });
    }
};

export const getAppliedOpportunities = async (req, res) =>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant: userId}).sort({createdAt: -1}).populate({
            path: 'opportunity',
            options: {sort:{createdAt: -1}},
            populate: {
                path: 'unit',
                options: {sort:{createdAt: -1}}
            }
        });

        if (!application) {
            return res.status(404).json({
                message: "No applications found",
                success: fasle
            });
        }

        return res.status(200).json({
            application,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const  opportunityId = req.params.id;
        const opportunity = await Opportunity.findById(opportunityId).populate({
            path: 'applications',
            options: {sort:{createdAt: -1}},
            populate: {
                path: 'applicant'

            }
        });

        if (!opportunity){
            return res.status(404).json({
                message: "No opportunity found",
                success: false
            })
        };
        return res.status(200).json({
            opportunity,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required.",
                success: false
            });
        };

        // find the application by applicant id
        const application = await Application.findOne({_id: applicationId});
        if (!application){
            return res.status(404).json({
                message: "Application not found.",
                success: false
            }) 
        }

        // Store the previous status for the email notification
        const previousStatus = application.status; 

        // update status
        application.status = status.toLowerCase();
        await application.save();

        // Send an email notification to the user's email address
        const user = await User.findById(application.applicant); // Assuming applicantId is the user's ID

        await sendMail({
            email: user?.email,
            subject: "Application Status Update",
            html: `
                <h1>Your application status has been updated!</h1>
                <p>Previous Status: ${previousStatus}</p>
                <p>New Status: ${status}</p>
            `
        });

        return res.status(200).json({
            message: "Status is updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().populate('applicant opportunity'); // Assuming 'applicant' and 'opportunity' are referencing fields

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred while fetching applications",
            success: false
        });
    }
};