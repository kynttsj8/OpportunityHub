import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminOpportunities,  getAllOpportunities, postOpportunity, getOpportunityById, updateOpportunity, deleteOpportunity } from "../conrtollers/opportunity.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postOpportunity);
router.route("/get").get(isAuthenticated, getAllOpportunities);
router.route("/getadminopportunity").get(isAuthenticated, getAdminOpportunities);
router.route("/get/:id").get(isAuthenticated, getOpportunityById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateOpportunity);
router.route("/delete/:id").delete(isAuthenticated, deleteOpportunity);


export default router;