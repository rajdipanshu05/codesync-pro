import { Server } from "socket.io";
import http from "http";
import express from "express";

import { ENV } from "../config/env.js";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

export const app = express();

export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// ================= SOCKET AUTH =================

io.use(socketAuthMiddleware);

// ================= ONLINE USERS =================

// userId -> socketId
const userSocketMap = new Map();

// roomId -> active users
const roomUsersMap = new Map();

// helper function
export const getReceiverSocketId = (userId) => {
  return userSocketMap.get(userId);
};

// ================= SOCKET CONNECTION =================

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.user.username}`);

  // store online user
  userSocketMap.set(socket.userId, socket.id);

  // ================= JOIN ROOM =================

  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);

    // create room if not exists
    if (!roomUsersMap.has(roomId)) {
      roomUsersMap.set(roomId, []);
    }

    const users = roomUsersMap.get(roomId);

    // avoid duplicate users
    const alreadyExists = users.some((u) => u.userId === socket.userId);

    if (!alreadyExists) {
      users.push({
        userId: socket.userId,
        username: socket.user.username,
        socketId: socket.id,
      });
    }

    // emit active users
    io.to(roomId).emit("active-users", users);

    console.log(
      `${socket.user.username}
       joined room ${roomId}`,
    );
  });

  // ================= CODE CHANGE =================

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("receive-code", code);
  });

  // ================= LANGUAGE CHANGE =================

  socket.on("language-change", ({ roomId, language }) => {
    socket.to(roomId).emit("receive-language", language);
  });

  // ================= CHAT =================

  socket.on("send-message", ({ roomId, message, sender }) => {
    console.log("MESSAGE EVENT HIT");
    io.to(roomId).emit("receive-message", {
      sender,
      message,

      timestamp: new Date(),
    });
  });

  // ================= TYPING =================

  socket.on("typing", ({ roomId, username }) => {
    socket.to(roomId).emit("user-typing", username);
  });

  // ================= DISCONNECT =================

  socket.on("disconnect", () => {
    console.log(`${socket.user.username} disconnected`);

    userSocketMap.delete(socket.userId);

    // remove from all rooms
    for (const [roomId, users] of roomUsersMap.entries()) {
      const filteredUsers = users.filter((u) => u.socketId !== socket.id);

      roomUsersMap.set(roomId, filteredUsers);

      io.to(roomId).emit("active-users", filteredUsers);
    }
  });
});
