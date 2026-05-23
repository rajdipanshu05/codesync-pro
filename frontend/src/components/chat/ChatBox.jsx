import MessageList
from "./MessageList";

import MessageInput
from "./MessageInput";

const ChatBox = () => {

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

        <h2 className="font-semibold">
          Room Chat
        </h2>

      </div>


      {/* MESSAGES */}
      <MessageList />


      {/* INPUT */}
      <MessageInput />

    </div>
  );
};

export default ChatBox;