import express from "express";

import { getAllProblems, getProblemById} from "../controllers/problem.controller.js";
import { run, submit } from "../controllers/problem.controller.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);
router.get("/", getAllProblems);
router.get("/:problemId", getProblemById);
router.post("/run", run);
router.post("/submit", submit);


export default router;
