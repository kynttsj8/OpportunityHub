import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import sendmail from "../mail_sender/mail_sender.js"

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        console.log(fullname, email, phoneNumber, password, role);
        
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Please fill in all fields",
                success:false
            });
        };
        
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "Email already exists",
                success:false
            });
        }

        // Prevent user register account as an admin
        if (role === "admin") {
            return res.status(403).json({
                message: "Cannot register as admin",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            fullname, 
            email, 
            phoneNumber, 
            password: hashedPassword, 
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        });

        await sendmail({
            email: email,
            subject: "[OpportunityHUB] ACCOUNT REGISTRATION",
            html: ` 
                <h1 style="color:red ">CONGRATULATIONS! YOUR ACCOUNT HAS BEEN REGISTERED SUCCESSFULLY</h1>
                <h1 style="color: #2c3e50; font-family: Arial, sans-serif;">Welcome to our OpportunityHUB</h1>
                <p style="font-family: Arial, sans-serif;">Dear ${fullname},</p>
                <p style="font-family: Arial, sans-serif;">We are thrilled to welcome you to OpportunityHUB, your gateway to endless opportunities.</p>
                <h2 style="color: #2980b9; font-family: Arial, sans-serif;">Your Account Information:</h2>
                <ul>
                    <li><strong>Email (Username):</strong> ${email}</li>
                    <li><strong>Password:</strong> ${password}</li>
                    <li><strong>Role:</strong> ${role}</li>
                </ul>
                <p style="font-family: Arial, sans-serif;">Please ensure to keep your account information secure and do not share it with anyone.</p>
                <p style="font-family: Arial, sans-serif;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
                <p style="font-family: Arial, sans-serif;">Thank you for choosing OpportunityHUB!</p>
                <p style="font-family: Arial, sans-serif;">Best Regards,<br>OpportunityHUB Team</p>
            `
        });

        return res.status(201).json({
            message:"Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(req.file);
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if( !email || !password || !role ){
            return res.status(400).json({
                message: "Please fill in all fields",
                success:false
            });
        };

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Email does not exist.",
                success:false
            })
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            return res.status(400).json({
                message: "Password is incorrect.",
                success:false
            })
        };

        //check role is correct or not
        if(role !== user.role){
            return res.status(400).json({
                message:"Account does not exist with current role.",
                success:false
            })
        };

        const tokenData = {
            userId: user._id,
            role: user.role
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        let skillsArray;
        if (skills){
            skillsArray = skills.split(", ");
        }
        const userId = req.id; // middle authentication
        let user = await User.findById(userId);

        if (!user){
            return res.status(404).json({
                message:"User not found.",
            success:false
            })
        }

        // update data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // resume come later here
        if (cloudResponse){
            user.profile.resume = cloudResponse.secure_url //save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // save the original file name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        await sendmail({
            email: user.email,
            subject: "Profile Update Confirmation",
            html: `
                <h1 style="color:red ">Your profile has been updated successfully</h1>
                <p style="font-family: Arial, sans-serif;">Dear ${fullname},</p>
                <p style="font-family: Arial, sans-serif;">Your profile on OpportunityHUB has been successfully updated.</p>
                <p style="font-family: Arial, sans-serif;">If it was you who updated your profile, then you can ignore this email.</p>
                <p style="font-family: Arial, sans-serif;">If you have any questions or need assistance, feel free to contact us.</p>
                <p style="font-family: Arial, sans-serif;">Thank you for using OpportunityHUB!</p>
            `
        });

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

export const updateProfileInstitution = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio} = req.body;

        const userId = req.id; // middle authentication
        let user = await User.findById(userId);

        if (!user){
            return res.status(404).json({
                message:"User not found.",
            success:false
            })
        }

        // update data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile 
        }

        await sendmail({
            email: user.email,
            subject: "Profile Update Confirmation",
            html: `
                <h1 style="color:red ">Your profile has been updated successfully</h1>
                <p style="font-family: Arial, sans-serif;">Dear ${fullname},</p>
                <p style="font-family: Arial, sans-serif;">Your profile on OpportunityHUB has been successfully updated.</p>
                <p style="font-family: Arial, sans-serif;">If it was you who updated your profile, then you can ignore this email.</p>
                <p style="font-family: Arial, sans-serif;">If you have any questions or need assistance, feel free to contact us.</p>
                <p style="font-family: Arial, sans-serif;">Thank you for using OpportunityHUB!</p>
            `
        });

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};

// getAllUsers for admin role
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        
        return res.status(200).json({
            users,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch users",
            success: false
        });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "User deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while deleting the user.",
            success: false,
        });
    }
};