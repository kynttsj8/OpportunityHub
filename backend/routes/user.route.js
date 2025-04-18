import express from "express";
import { register, login, logout, updateProfile, updateProfileInstitution, getAllUsers, deleteUserById} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/get").get(getAllUsers);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/institution/profile/update").post(isAuthenticated, singleUpload, updateProfileInstitution);
router.route("/delete/:id").delete(isAuthenticated, deleteUserById);

// router.route("/bookmark").post(isAuthenticated, bookmarkOpportunity);
// router.route("/bookmark/remove/:opportunityId").delete(isAuthenticated, removeBookmark);
// router.route("/bookmarks/:id").get(isAuthenticated, getBookmarks);
export default router;