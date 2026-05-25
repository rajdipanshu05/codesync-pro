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

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const RoomPage = () => {
  useSocket();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const { setActiveUsers, roomName, setRoomName } = useRoomStore();

  const { addMessage, setMessages, setTypingUser } = useChatStore();

  const { setCode, setLanguage, setTheme } = useEditorStore();

  // ================= ROOM NOT FOUND =================

  useEffect(() => {
    socket.on("room-not-found", () => {
      toast.error("Room does not exist");

      navigate("/");
    });

    return () => {
      socket.off("room-not-found");
    };
  }, []);
  // ================= JOIN ROOM =================

  useEffect(() => {
    const handleConnect = () => {
      socket.emit("join-room", {
        roomId,
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
      console.log(room);
      setRoomName(room.roomName);

      setTheme(room.theme);

      // language first
      setLanguage(room.language, true);

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
