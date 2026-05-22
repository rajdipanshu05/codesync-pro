import express from "express";

import { createRoom, joinRoom, getRoom } from "../controllers/room.controller.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protectRoute);

router.post("/create", createRoom);

router.post("/join", joinRoom);

router.get("/:roomId", getRoom);

export default router;
