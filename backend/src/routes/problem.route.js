import express from "express";

import { getAllProblems } from "../controllers/problem.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);
router.get("/", getAllProblems);


export default router;
