import { create }
from "zustand";

export const useChatStore =
  create((set) => ({

    messages: [],

    typingUser: null,


    // ================= SET ALL MESSAGES =================

    setMessages:
      (messages) =>

        set({
          messages,
        }),


    // ================= ADD MESSAGE =================

    addMessage:
      (message) =>

        set((state) => ({

          messages: [
            ...state.messages,
            message,
          ],
        })),


    // ================= SET TYPING USER =================

    setTypingUser:
      (username) =>

        set({
          typingUser:
            username,
        }),


    // ================= CLEAR =================

    clearMessages:
      () =>

        set({
          messages: [],
        }),

}));