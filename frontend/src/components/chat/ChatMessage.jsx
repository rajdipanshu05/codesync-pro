import { useAuthStore } from "../../store/authStore";

const ChatMessage = ({ message, showSender }) => {
  const { user } = useAuthStore();

  const isOwnMessage = user?.username === message.sender;

  // ================= FORMAT TIME =================

  const formattedTime = new Date(message.timestamp).toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    },
  );

  return (
    <div
      className={`
        flex
        ${isOwnMessage ? "justify-end" : "justify-start"}

        ${showSender ? "mt-4" : "mt-1"}
      `}
    >
      <div
        className={`
          max-w-[80%]
          rounded-2xl
          px-4
          py-2
          border

          ${
            isOwnMessage
              ? `
                bg-blue-500
                border-blue-400
                text-white
              `
              : `
                bg-zinc-950
                border-zinc-800
                text-white
              `
          }
        `}
      >
        {/* sender */}
        {!isOwnMessage && showSender && (
          <p
            className="
                text-sm
                text-blue-400
                mb-1
                font-medium
              "
          >
            {message.sender}
          </p>
        )}

        {/* text */}
        <p
          className="
            text-sm
            break-words
          "
        >
          {message.message}
        </p>

        {/* time */}
        <p
          className={`
            text-[11px]
            mt-1
            text-right

            ${isOwnMessage ? "text-blue-100" : "text-zinc-500"}
          `}
        >
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
