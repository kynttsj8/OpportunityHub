import express from "express";
import { register, login, logout, updateProfile, updateProfileInstitution } from "../conrtollers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/institution/profile/update").post(isAuthenticated, singleUpload, updateProfileInstitution);
// router.route("/admin/dashboard").get(isAuthenticated, isAdmin, (req, res) => {
//     res.json({
//         message: "Welcome to the Admin Dashboard.",
//         success: true
//     });
// });

export default router;