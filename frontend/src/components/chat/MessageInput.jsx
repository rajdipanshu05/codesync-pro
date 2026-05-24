import { useState } from "react";

import { useParams } from "react-router-dom";

import { socket } from "../../lib/socket";

import { useAuthStore } from "../../store/authStore";

const MessageInput = () => {
  const { roomId } = useParams();

  const [message, setMessage] = useState("");

  const { user } = useAuthStore();

  // ================= SEND MESSAGE =================

  const handleSendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      roomId,

      message,

      sender: user?.username,
    });

    setMessage("");
  };

  return (
    <div
      className="
        p-4
        border-t
        border-zinc-800
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);

            socket.emit("typing", {
              roomId,

              username: user?.username,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          className="
            flex-1
            px-4
            py-3
            rounded-xl
            bg-zinc-950
            border
            border-zinc-800
            outline-none
            text-white
            placeholder:text-zinc-500
            focus:border-blue-500
          "
        />

        <button
          onClick={handleSendMessage}
          className="
            px-4
            py-3
            rounded-xl
            bg-blue-500
            hover:bg-blue-600
            transition-all
            text-white
            font-medium
            cursor-pointer
          "
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
