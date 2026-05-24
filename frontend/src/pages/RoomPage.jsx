import { useEffect } from "react";

import { useParams } from "react-router-dom";

import RoomLayout from "../layouts/RoomLayout";

import RoomSidebar from "../components/room/RoomSidebar";

import CodeEditor from "../components/editor/CodeEditor";

import ChatBox from "../components/chat/ChatBox";

import useSocket from "../hooks/useSocket";

import { socket } from "../lib/socket";

import { useRoomStore } from "../store/roomStore";

import { useChatStore } from "../store/chatStore";

const RoomPage = () => {
  useSocket();

  const { roomId } = useParams();

  const { setActiveUsers } = useRoomStore();

  const { addMessage, setTypingUser } = useChatStore();

  // ================= JOIN ROOM =================

  useEffect(() => {
    const handleConnect = () => {
      console.log("SOCKET CONNECTED");

      socket.emit("join-room", { roomId });
    };

    socket.on("connect", handleConnect);

    // already connected case
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [roomId]);

  // ================= ACTIVE USERS =================

  useEffect(() => {
    socket.on("active-users", (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.off("active-users");
    };
  }, []);

  // ================= RECEIVE MESSAGE =================

  useEffect(() => {
    socket.on("receive-message", (message) => {
      console.log("MESSAGE RECEIVED:", message);

      addMessage(message);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  // ================= USER TYPING =================

  useEffect(() => {
    socket.on("user-typing", (username) => {
      setTypingUser(username);

      setTimeout(() => {
        setTypingUser(null);
      }, 1500);
    });

    return () => {
      socket.off("user-typing");
    };
  }, []);

  return (
    <RoomLayout
      sidebar={<RoomSidebar />}
      editor={<CodeEditor />}
      chat={<ChatBox />}
    />
  );
};

export default RoomPage;
