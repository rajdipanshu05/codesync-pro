import { Server } from "socket.io";

import http from "http";

import express from "express";

import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";
import {connectToVideoMeetSocket} from './socketVideoCall.js'
import { ENV } from "../config/env.js";
export const app = express();

export const server = http.createServer(app);

const serverUrl = (ENV.MODE === "development") ? "http://localhost:5173" : "https://codesync-un48.onrender.com";
export const io = new Server(server, {
  cors: {
    origin: serverUrl,
    credentials: true,
  },
});

// ================= SOCKET AUTH =================
connectToVideoMeetSocket(io);

io.use(socketAuthMiddleware);

// ================= ONLINE USERS =================

// userId -> socketId
const userSocketMap = new Map();

// ================= ROOMS =================

export const rooms = new Map();

// helper function
export const getReceiverSocketId = (userId) => {
  return userSocketMap.get(userId);
};

const roomCleanupTimers = new Map();
// ================= SOCKET CONNECTION =================

io.on("connection", (socket) => {
  console.log(
    `User Connected:
       ${socket.user.username}`,
  );

  // store online user
  userSocketMap.set(socket.userId, socket.id);

  // ================= CREATE ROOM =================
  socket.on("create-room", ({ roomId, roomName }) => {
    if (rooms.has(roomId)) {
      return;
    }

    rooms.set(roomId, {
      roomId,

      roomName: roomName || "CodeSync Room",

      users: [],

      code: `console.log("Hello World");`,

      language: "javascript",

      theme: "vs-dark",

      chats: [],
    });
  });

  // ================= JOIN ROOM =================

  socket.on("join-room", ({ roomId, roomName }) => {
    if (!rooms.has(roomId)) {
      socket.emit("room-not-found");
      return;
    }

    // clear cleanup timer
    if (roomCleanupTimers.has(roomId)) {
      clearTimeout(roomCleanupTimers.get(roomId));

      roomCleanupTimers.delete(roomId);
    }

    // NOW join
    socket.join(roomId);

    const room = rooms.get(roomId);

    // remove old socket
    // of same user
    room.users = room.users.filter((u) => u.userId !== socket.userId);

    // add fresh user
    room.users.push({
      userId: socket.userId,

      username: socket.user.username,

      socketId: socket.id,
    });

    // send latest room state
    socket.emit("room-state", {
      ...room,

      code: room.code ?? "",
    });

    // emit active users
    io.to(roomId).emit("active-users", room.users);

    console.log(
      `${socket.user.username}
           joined room ${roomId}`,
    );
  });

  // ================= CODE CHANGE =================

  socket.on("code-change", ({ roomId, code }) => {
    const room = rooms.get(roomId);

    if (!room) return;

    // save latest code
    room.code = code;

    // sync code
    // socket.to(roomId).emit("receive-code", code);
    socket.to(roomId).emit("receive-code", code);
  });

  // ================= LANGUAGE CHANGE =================

  socket.on("language-change", ({ roomId, language, code }) => {
    const room = rooms.get(roomId);

    if (!room) return;

    // save latest language
    room.language = language;

    // IMPORTANT
    // save latest snippet/code too
    room.code = code;

    io.to(roomId).emit("receive-language", {
      language,
      code,
    });
  });

  // ================= THEME CHANGE =================

  socket.on("theme-change", ({ roomId, theme }) => {
    const room = rooms.get(roomId);

    if (!room) return;

    // save latest theme
    room.theme = theme;

    // sync theme
    io.to(roomId).emit("receive-theme", theme);
  });

  // ================= CHAT =================

  socket.on("send-message", ({ roomId, message, sender }) => {
    const room = rooms.get(roomId);

    if (!room) return;

    const newMessage = {
      sender,

      message,

      timestamp: new Date(),
    };

    // save chats
    room.chats.push(newMessage);

    // sync chats
    io.to(roomId).emit("receive-message", newMessage);
  });

  // ================= TYPING =================

  socket.on("typing", ({ roomId, username }) => {
    socket.to(roomId).emit("user-typing", username);
  });

  // ================= LEAVE ROOM =================

  socket.on("leave-room", ({ roomId }) => {
    socket.leave(roomId);

    const room = rooms.get(roomId);

    if (!room) return;

    room.users = room.users.filter((u) => u.socketId !== socket.id);

    io.to(roomId).emit("active-users", room.users);

    // console.log(
    //   `${socket.user.username}
    //    left room ${roomId}`,
    // );

    // delete empty room
    if (room.users.length === 0) {
      rooms.delete(roomId);
      // console.log(
      //   `Deleted Room:
      //    ${roomId}`,
      // );
    }
  });

  // ================= DISCONNECT =================

  socket.on("disconnect", () => {
    console.log(
      `${socket.user.username}
           disconnected`,
    );

    userSocketMap.delete(socket.userId);

    // remove user from rooms
    for (const [roomId, room] of rooms.entries()) {
      room.users = room.users.filter((u) => u.socketId !== socket.id);

      // emit updated users
      io.to(roomId).emit("active-users", room.users);

      // delete empty room
      if (room.users.length === 0) {
        console.log(
          `Room Empty:
     ${roomId}`,
        );

        // start cleanup timer
        const timer = setTimeout(() => {
          const existingRoom = rooms.get(roomId);

          // still empty
          if (existingRoom && existingRoom.users.length === 0) {
            rooms.delete(roomId);

            roomCleanupTimers.delete(roomId);

            console.log(
              `Deleted Room:
         ${roomId}`,
            );
          }
        }, 30000); // 30 sec

        roomCleanupTimers.set(roomId, timer);
      }
    }
  });
});
