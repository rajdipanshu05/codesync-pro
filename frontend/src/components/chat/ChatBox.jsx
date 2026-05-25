import MessageList from "./MessageList";

import MessageInput from "./MessageInput";

import { useChatStore } from "../../store/chatStore";

const ChatBox = () => {

  const {
    typingUser,
  } = useChatStore();

  return (
    <div
      className="
        h-full
        flex
        flex-col
      "
    >

      {/* MESSAGES */}
      <MessageList />

      {/* TYPING */}
      {
        typingUser && (
          <div
            className="
              px-4
              pb-2
              text-xs
              text-zinc-400
            "
          >
            {typingUser}
            {" "}
            is typing...
          </div>
        )
      }

      {/* INPUT */}
      <MessageInput />

    </div>
  );
};

export default ChatBox;