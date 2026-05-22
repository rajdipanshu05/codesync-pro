
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    username: {
      type: String,
      required: true,
    },

    socketId: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },

    roomName: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    language: {
      type: String,
      default: "javascript",
    },

    theme: {
      type: String,
      default: "vs-dark",
    },

    currentCode: {
      type: String,
      default: "",
    },

    members: [memberSchema],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;