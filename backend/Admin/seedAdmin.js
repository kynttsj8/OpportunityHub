import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

dotenv.config();

const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ email: process.env.GMAIL_USER });

        if (adminExists) {
            console.log("Admin account already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = new User({
            fullname: "System Admin",
            email: process.env.GMAIL_USER,
            password: hashedPassword,
            phoneNumber: "0909718665",
            role: "admin",
        });

        await admin.save();
        console.log("Admin account created successfully.");
    } catch (error) {
        console.error("Error seeding admin account:", error);
    } finally {
        mongoose.connection.close();
    }
};

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        seedAdmin();
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    }
);