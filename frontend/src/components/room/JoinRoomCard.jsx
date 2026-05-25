import { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useRoomStore } from "../../store/roomStore";

import { socket } from "../../lib/socket";

import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const JoinRoomCard = () => {
  const navigate = useNavigate();

  const { setRoomName } = useRoomStore();

  const [roomName, setRoomNameInput] = useState("");

  const [roomId, setRoomId] = useState("");

  // ================= CREATE ROOM =================

  const handleCreateRoom = () => {
    if (!roomName.trim()) return;

    const newRoomId = uuidv4();

    setRoomName(roomName);

    // create actual room
    socket.emit("create-room", {
      roomId: newRoomId,
      roomName,
    });

    navigate(`/room/${newRoomId}`);
  };

  // ================= JOIN ROOM =================

  const handleJoinRoom = async () => {
    if (!roomId.trim()) return;

    try {
      const response = await fetch(`http://localhost:8000/api/rooms/${roomId}`);

      const data = await response.json();

      if (!data.exists) {
        toast.error("Room does not exist");

        return;
      }

      navigate(`/room/${roomId}`);
    } catch (error) {
      toast.error("Failed to join room");
    }
  };



  return (
    <div
      className="
        grid
        md:grid-cols-2
        gap-8
      "
    >
      {/* CREATE ROOM */}
      <div
        className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          space-y-5
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-white
              mb-2
            "
          >
            Create Room
          </h2>

          <p className="text-zinc-400">Start coding collaboratively</p>
        </div>

        <input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomNameInput(e.target.value)}
          className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-zinc-950
            border
            border-zinc-800
            outline-none
            text-white
            placeholder:text-zinc-500
            focus:border-blue-500
          "
        />

        <button
          onClick={handleCreateRoom}
          className="
            w-full
            py-3
            rounded-xl
            bg-blue-500
            hover:bg-blue-600
            transition-all
            text-white
            font-semibold
            cursor-pointer
          "
        >
          Create Room
        </button>
      </div>

      {/* JOIN ROOM */}
      <div
        className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          space-y-5
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-white
              mb-2
            "
          >
            Join Room
          </h2>

          <p className="text-zinc-400">Enter existing room ID</p>
        </div>

        <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-zinc-950
            border
            border-zinc-800
            outline-none
            text-white
            placeholder:text-zinc-500
            focus:border-emerald-500
          "
        />

        <button
          onClick={handleJoinRoom}
          className="
            w-full
            py-3
            rounded-xl
            bg-emerald-500
            hover:bg-emerald-600
            transition-all
            text-white
            font-semibold
            cursor-pointer
          "
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoomCard;
