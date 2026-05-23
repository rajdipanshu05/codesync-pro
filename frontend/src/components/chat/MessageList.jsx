import ChatMessage
from "./ChatMessage";

const dummyMessages = [
  {
    id: 1,
    sender: "Dipanshu",
    text: "Hello everyone 👋",
  },
  {
    id: 2,
    sender: "Alex",
    text: "Let's start coding 🚀",
  },
];

const MessageList = () => {

  return (
    <div
      className="
        flex-1
        overflow-y-auto
        p-5
        space-y-4
      "
    >

      {
        dummyMessages.map(
          (message) => (

          <ChatMessage
            key={message.id}
            message={message}
          />
        ))
      }

    </div>
  );
};

export default MessageList;