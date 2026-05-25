import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Video,
  X,
  Code2,
} from "lucide-react";

import { useState } from "react";

import RoomSidebar from "../components/room/RoomSidebar";

const RoomLayout = ({ editor, chat }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div
      className="
        h-screen
        bg-zinc-950
        text-white
        flex
        overflow-hidden
      "
    >
      {/* LEFT SIDEBAR */}
      <aside
        className={`
          h-full
          bg-zinc-900
          border-r
          border-zinc-800

          transition-all
          duration-300

          flex
          flex-col

          overflow-hidden
          shrink-0

          ${
            isSidebarOpen
              ? "w-[260px]"
              : "w-[72px]"
          }
        `}
      >
        {/* TOPBAR */}
        <div
          className={`
            h-16
            border-b
            border-zinc-800

            flex
            items-center

            px-4

            shrink-0

            ${
              isSidebarOpen
                ? "justify-between"
                : "justify-center"
            }
          `}
        >
          {/* LEFT SIDE */}
          {isSidebarOpen && (
            <div
              className="
                flex
                items-center
                gap-3
                overflow-hidden
              "
            >
              {/* LOGO */}
              <div
                className="
                  size-10

                  rounded-xl

                  bg-blue-500/10

                  border
                  border-blue-500/20

                  flex
                  items-center
                  justify-center

                  shrink-0
                "
              >
                <Code2
                  size={22}
                  className="
                    text-blue-500
                  "
                />
              </div>

              {/* TEXT */}
              <div>
                <h1
                  className="
                    text-2xl
                    font-bold
                    whitespace-nowrap
                  "
                >
                  CodeSync
                </h1>

                <p
                  className="
                    text-xs
                    text-zinc-500
                    whitespace-nowrap
                  "
                >
                  Collaborative Editor
                </p>
              </div>
            </div>
          )}

          {/* TOGGLE BUTTON */}
          <button
            onClick={() =>
              setIsSidebarOpen(
                !isSidebarOpen
              )
            }
            className="
              p-2

              rounded-lg

              hover:bg-zinc-800

              transition-all

              shrink-0
            "
          >
            {isSidebarOpen ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        </div>

        {/* SIDEBAR CONTENT */}
        <div
          className="
            flex-1
            overflow-hidden
          "
        >
          <RoomSidebar
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </aside>

      {/* MAIN */}
      <main
        className="
          flex-1
          flex
          overflow-hidden
        "
      >
        {/* EDITOR */}
        <section
          className="
            flex-1
            min-w-0

            overflow-hidden

            flex
            flex-col
          "
        >
          {editor}
        </section>

        {/* RIGHT PANEL */}
        {isRightPanelOpen && (
          <aside
            className="
              w-[340px]

              border-l
              border-zinc-800

              bg-zinc-900

              flex
              flex-col

              overflow-hidden

              shrink-0
            "
          >
            {/* TOPBAR */}
            <div
              className="
                h-16

                border-b
                border-zinc-800

                px-4

                flex
                items-center
                justify-between
              "
            >
              {/* TABS */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                {/* CHAT */}
                <button
                  onClick={() =>
                    setActiveTab("chat")
                  }
                  className={`
                    px-4
                    py-2

                    rounded-xl

                    flex
                    items-center
                    gap-2

                    transition-all

                    ${
                      activeTab === "chat"
                        ? `
                          bg-blue-500
                          text-white
                        `
                        : `
                          bg-zinc-800
                          text-zinc-400
                        `
                    }
                  `}
                >
                  <MessageSquare size={16} />
                  Chat
                </button>

                {/* VIDEO */}
                <button
                  onClick={() =>
                    setActiveTab("video")
                  }
                  className={`
                    px-4
                    py-2

                    rounded-xl

                    flex
                    items-center
                    gap-2

                    transition-all

                    ${
                      activeTab === "video"
                        ? `
                          bg-blue-500
                          text-white
                        `
                        : `
                          bg-zinc-800
                          text-zinc-400
                        `
                    }
                  `}
                >
                  <Video size={16} />
                  Video
                </button>
              </div>

              {/* CLOSE */}
              <button
                onClick={() =>
                  setIsRightPanelOpen(false)
                }
                className="
                  p-2

                  rounded-lg

                  hover:bg-zinc-800

                  transition-all
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div
              className="
                flex-1
                overflow-hidden
              "
            >
              {activeTab === "chat" ? (
                chat
              ) : (
                <div
                  className="
                    h-full

                    flex
                    items-center
                    justify-center

                    text-zinc-500
                  "
                >
                  Video call coming soon 🚀
                </div>
              )}
            </div>
          </aside>
        )}
      </main>

      {/* OPEN CHAT BUTTON */}
      {!isRightPanelOpen && (
        <button
          onClick={() =>
            setIsRightPanelOpen(true)
          }
          className="
            absolute

            right-5
            bottom-5

            z-50

            size-14

            rounded-full

            bg-blue-500
            hover:bg-blue-600

            flex
            items-center
            justify-center

            shadow-lg

            transition-all
          "
        >
          <MessageSquare size={22} />
        </button>
      )}
    </div>
  );
};

export default RoomLayout;