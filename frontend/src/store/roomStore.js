import { create } from "zustand";

import toast from "react-hot-toast";

import { axiosInstance }
from "../api/axios";

export const useRoomStore =
  create((set) => ({

    isCreatingRoom: false,

    isJoiningRoom: false,

    activeUsers: [],

setActiveUsers: (users) =>
  set({
    activeUsers: users,
  }),


    // ================= CREATE ROOM =================

    createRoom: async (
      formData,
      navigate
    ) => {

      try {

        set({
          isCreatingRoom: true,
        });

        const response =
          await axiosInstance.post(
            "/rooms/create",
            formData
          );

        toast.success(
          "Room created successfully"
        );

        navigate(
          `/room/${response.data.room.roomId}`
        );

      } catch (error) {

        toast.error(
          error.response?.data?.message
          || "Failed to create room"
        );

      } finally {

        set({
          isCreatingRoom: false,
        });
      }
    },


    // ================= JOIN ROOM =================

    joinRoom: async (
      roomId,
      navigate
    ) => {

      try {

        set({
          isJoiningRoom: true,
        });

        await axiosInstance.post(
          "/rooms/join",
          { roomId }
        );

        toast.success(
          "Joined room successfully"
        );

        navigate(`/room/${roomId}`);

      } catch (error) {

        toast.error(
          error.response?.data?.message
          || "Failed to join room"
        );

      } finally {

        set({
          isJoiningRoom: false,
        });
      }
    },

}));