import express from "express";

import { runCode } from "../controllers/code.controller.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ================= RUN CODE =================

router.post("/run", protectRoute, runCode);

export default router;
