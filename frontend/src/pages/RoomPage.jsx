import RoomLayout from "../layouts/RoomLayout";

import RoomSidebar from "../components/room/RoomSidebar";

import CodeEditor from "../components/editor/CodeEditor";

import ChatBox from "../components/chat/ChatBox";

import useSocket from "../hooks/useSocket";

import { useEffect } from "react";

import { socket } from "../lib/socket";

import { useParams } from "react-router-dom";

import { useRoomStore } from "../store/roomStore";


const RoomPage = () => {
  useSocket();
  const { roomId } = useParams();
  const { setActiveUsers } = useRoomStore();

  useEffect(() => {
    socket.emit("join-room", { roomId });
  }, [roomId]);

  useEffect(() => {
    socket.on("active-users", (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.off("active-users");
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
