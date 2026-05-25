import express from "express";

import { rooms } from "../socket/socket.js";

const router = express.Router();

router.get("/:roomId", (req, res) => {

  const { roomId } = req.params;

  const roomExists =
    rooms.has(roomId);

  res.status(200).json({
    exists: roomExists,
  });
});

export default router;