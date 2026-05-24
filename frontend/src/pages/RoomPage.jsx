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

import { useEditorStore } from "../store/editorStore";

const RoomPage = () => {
  useSocket();

  const { roomId } = useParams();

  const { setActiveUsers, roomName, setRoomName } = useRoomStore();

  const { addMessage, setMessages, setTypingUser } = useChatStore();

  const { setCode, setLanguage, setTheme } = useEditorStore();

  // ================= JOIN ROOM =================

  useEffect(() => {
    const handleConnect = () => {
      socket.emit("join-room", {
        roomId,
        roomName,
      });
    };

    socket.on("connect", handleConnect);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [roomId]);

  // ================= ROOM STATE =================

  useEffect(() => {
    socket.on("room-state", (room) => {
      setRoomName(room.roomName);

      setTheme(room.theme);

      // language first
      setLanguage(room.language,true);

      // then latest code
      setCode(room.code || "");

      setMessages(room.chats || []);

      setActiveUsers(room.users || []);
    });

    return () => {
      socket.off("room-state");
    };
  }, []);

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
