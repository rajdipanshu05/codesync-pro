import MessageList from "./MessageList";

import MessageInput from "./MessageInput";

import { useChatStore } from "../../store/chatStore";

const ChatBox = () => {
  const { typingUser } = useChatStore();
  return (
    <div
      className="
        h-full
        flex
        flex-col
      "
    >
      {/* HEADER */}
      <div
        className="
          h-16
          border-b
          border-zinc-800
          px-5
          flex
          items-center
        "
      >
        <h2 className="font-semibold">Room Chat</h2>
      </div>

      {/* MESSAGES */}
      <MessageList />

      {/* TYPING */}
      {typingUser && (
        <div
          className="
        px-4
        pb-2
        text-xs
        text-zinc-400
      "
        >
          {typingUser} is typing...
        </div>
      )}

      {/* INPUT */}
      <MessageInput />
    </div>
  );
};

export default ChatBox;
