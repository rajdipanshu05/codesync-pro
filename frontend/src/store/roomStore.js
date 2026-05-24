import { create }
from "zustand";

export const useRoomStore =
  create((set) => ({

    activeUsers: [],

    roomName:
      "CodeSync Room",


    // ================= ACTIVE USERS =================

    setActiveUsers:
      (users) =>

        set({
          activeUsers: users,
        }),


    // ================= ROOM NAME =================

    setRoomName:
      (roomName) =>

        set({
          roomName,
        }),

}));