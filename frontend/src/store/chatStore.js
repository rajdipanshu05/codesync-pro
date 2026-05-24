import { create }
from "zustand";

export const useChatStore =
  create((set) => ({

    messages:
      JSON.parse(
        localStorage.getItem(
          "chat-messages"
        )
      ) || [],

    typingUser: null,


    // ================= ADD MESSAGE =================

    addMessage: (message) =>

      set((state) => {

        const updatedMessages = [
          ...state.messages,
          message,
        ];

        localStorage.setItem(
          "chat-messages",
          JSON.stringify(
            updatedMessages
          )
        );

        return {
          messages:
            updatedMessages,
        };
      }),


    // ================= SET TYPING USER =================

    setTypingUser:
      (username) =>

        set({
          typingUser: username,
        }),


    // ================= CLEAR =================

    clearMessages: () => {

      localStorage.removeItem(
        "chat-messages"
      );

      set({
        messages: [],
      });
    },

}));