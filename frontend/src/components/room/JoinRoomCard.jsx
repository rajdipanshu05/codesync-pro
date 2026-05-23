import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import { useRoomStore }
from "../../store/roomStore";

const JoinRoomCard = () => {

  const navigate = useNavigate();

  const {
    createRoom,
    joinRoom,
    isCreatingRoom,
    isJoiningRoom,
  } = useRoomStore();

  const [roomName, setRoomName] =
    useState("");

  const [roomId, setRoomId] =
    useState("");


  // ================= CREATE ROOM =================

  const handleCreateRoom =
    async () => {

      if (!roomName.trim()) return;

      await createRoom(
        { roomName },
        navigate
      );
    };


  // ================= JOIN ROOM =================

  const handleJoinRoom =
    async () => {

      if (!roomId.trim()) return;

      await joinRoom(
        roomId,
        navigate
      );
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

          <p className="text-zinc-400">
            Start coding collaboratively
          </p>

        </div>


        <input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e)=>
            setRoomName(e.target.value)
          }
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
          disabled={isCreatingRoom}
          className="
            w-full
            py-3
            rounded-xl
            bg-blue-500
            hover:bg-blue-600
            transition-all
            text-white
            font-semibold
            disabled:opacity-50
            cursor-pointer
          "
        >

          {
            isCreatingRoom
              ? "Creating..."
              : "Create Room"
          }

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

          <p className="text-zinc-400">
            Enter existing room ID
          </p>

        </div>


        <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e)=>
            setRoomId(e.target.value)
          }
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
          disabled={isJoiningRoom}
          className="
            w-full
            py-3
            rounded-xl
            bg-emerald-500
            hover:bg-emerald-600
            transition-all
            text-white
            font-semibold
            disabled:opacity-50
            cursor-pointer
          "
        >

          {
            isJoiningRoom
              ? "Joining..."
              : "Join Room"
          }

        </button>

      </div>

    </div>
  );
};

export default JoinRoomCard;