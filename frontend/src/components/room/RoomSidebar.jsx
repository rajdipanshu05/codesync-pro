import {
  Copy,
} from "lucide-react";

import {
  useParams,
} from "react-router-dom";

import ActiveUsers
from "./ActiveUsers";

const RoomSidebar = () => {

  const { roomId } =
    useParams();


  // ================= COPY ROOM ID =================

  const handleCopy =
    async () => {

      await navigator
        .clipboard
        .writeText(roomId);

      alert("Room ID copied");
    };


  return (
    <div
      className="
        flex-1
        p-5
        overflow-y-auto
      "
    >

      {/* LOGO */}
      <div className="mb-8">

        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
          "
        >
          CodeSync
        </h1>

      </div>


      {/* ROOM INFO */}
      <div
        className="
          bg-zinc-950
          border
          border-zinc-800
          rounded-2xl
          p-4
          mb-8
        "
      >

        <p
          className="
            text-zinc-400
            text-sm
            mb-2
          "
        >
          Room ID
        </p>

        <p
          className="
            text-sm
            break-all
            leading-6
            text-zinc-200
            mb-4
          "
        >
          {roomId}
        </p>


        {/* COPY BUTTON */}
        <button
          onClick={handleCopy}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-2.5
            rounded-xl
            bg-zinc-900
            border
            border-zinc-800
            hover:bg-zinc-800
            transition-all
            duration-200
            cursor-pointer
            text-sm
            font-medium
          "
        >

          <Copy size={16} />

          Copy Room ID

        </button>

      </div>


      {/* ACTIVE USERS */}
      <div>

        <h2
          className="
            text-lg
            font-semibold
            mb-4
          "
        >
          Active Users
        </h2>

        <ActiveUsers />

      </div>

    </div>
  );
};

export default RoomSidebar;