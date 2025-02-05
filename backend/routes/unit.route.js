import express from "express";
import { registerUnit, getUnit, getUnitById, updateUnit, deleteUnit, getAllUnits } from "../conrtollers/unit.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerUnit);
router.route("/get").get(isAuthenticated, getUnit);
router.route("/getAllUnits").get(isAuthenticated, getAllUnits);
router.route("/get/:id").get(isAuthenticated, getUnitById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateUnit);
router.route("/delete/:id").delete(isAuthenticated, deleteUnit);

export default router;