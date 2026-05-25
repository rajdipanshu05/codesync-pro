import {
  Copy,
  Code2,
  Users,
} from "lucide-react";

import { useParams } from "react-router-dom";

import ActiveUsers from "./ActiveUsers";

import toast from "react-hot-toast";

const RoomSidebar = ({
  isSidebarOpen,
}) => {

  const { roomId } =
    useParams();


  // ================= COPY =================

  const handleCopy =
    async () => {

      await navigator
        .clipboard
        .writeText(roomId);

      toast.success(
        "Room ID copied"
      );
    };


  return (

    <div
      className="
        h-full
        overflow-y-auto
        p-5
      "
    >

  
      {/* HIDDEN CONTENT */}
      {
        isSidebarOpen && (

          <>
            {/* ROOM CARD */}
            <div
              className="
                bg-zinc-950

                border
                border-zinc-800

                rounded-3xl

                p-5

                mb-7
              "
            >

              <p
                className="
                  text-sm
                  text-zinc-400
                  mb-2
                "
              >
                Room ID
              </p>

              <p
                className="
                  text-sm
                  text-zinc-200
                  break-all
                  leading-6
                  mb-4
                "
              >
                {roomId}
              </p>

              <button
                onClick={handleCopy}

                className="
                  w-full

                  py-3

                  rounded-2xl

                  bg-zinc-900

                  border
                  border-zinc-800

                  hover:bg-zinc-800

                  transition-all

                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                <Copy size={16} />

                Copy Room ID

              </button>

            </div>


            {/* USERS */}
            <div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-4
                "
              >

                <Users
                  size={18}
                  className="
                    text-blue-400
                  "
                />

                <h2
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  Active Users
                </h2>

              </div>

              <ActiveUsers />

            </div>
          </>
        )
      }

    </div>
  );
};

export default RoomSidebar;