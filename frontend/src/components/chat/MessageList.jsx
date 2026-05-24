import {
  useEffect,
  useRef,
} from "react";

import ChatMessage
from "./ChatMessage";

import {
  useChatStore,
} from "../../store/chatStore";

const MessageList = () => {

  const {
    messages,
  } = useChatStore();


  // ================= AUTO SCROLL =================

  const bottomRef =
    useRef(null);


  useEffect(() => {

    bottomRef.current?.
      scrollIntoView({
        behavior: "smooth",
      });

  }, [messages]);


  return (

    <div
      className="
        flex-1
        overflow-y-auto
        p-4
        space-y-2
      "
    >

      {
        messages.map(
          (
            message,
            index
          ) => {

            const prevMessage =
              messages[index - 1];

            const showSender =
              prevMessage?.sender !==
              message.sender;

            return (

              <ChatMessage
                key={index}
                message={message}
                showSender={showSender}
              />
            );
          }
        )
      }

      {/* AUTO SCROLL TARGET */}
      <div ref={bottomRef} />

    </div>
  );
};

export default MessageList;