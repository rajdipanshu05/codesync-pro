import { v4 as uuidv4 } from "uuid";
import Room from "../models/room.model.js";


// ================= CREATE ROOM =================

export const createRoom = async (req, res) => {
  try {

    const { roomName } = req.body;

    if (!roomName || !roomName.trim()) {
      return res.status(400).json({
        message: "Room name is required",
      });
    }

    const roomId = uuidv4();

    const room = await Room.create({
      roomId,

      roomName: roomName.trim(),

      createdBy: req.user._id,

      members: [
        {
          userId: req.user._id,
          username: req.user.username,
        },
      ],
    });

    return res.status(201).json({
      message: "Room created successfully",
      room,
    });

  } catch (error) {

    console.error("Create Room Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const joinRoom = async (req, res) => {
  try {

    const { roomId } = req.body;

    if (!roomId) {
      return res.status(400).json({
        message: "Room ID is required",
      });
    }

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // already joined check
    const alreadyMember = room.members.some(
      (member) =>
        member.userId.toString() ===
        req.user._id.toString()
    );

    if (!alreadyMember) {

      room.members.push({
        userId: req.user._id,
        username: req.user.username,
      });

      await room.save();
    }

    return res.status(200).json({
      message: "Joined room successfully",
      room,
    });

  } catch (error) {

    console.error("Join Room Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getRoom = async (req, res) => {
  try {

    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    return res.status(200).json(room);

  } catch (error) {

    console.error("Get Room Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};