import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyOpportunity, getApplicants, getAppliedOpportunities, updateStatus, getAllApplications } from "../conrtollers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyOpportunity);
router.route("/get").get(isAuthenticated, getAppliedOpportunities);
router.route("/getAllApplications").get(isAuthenticated, getAllApplications);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;