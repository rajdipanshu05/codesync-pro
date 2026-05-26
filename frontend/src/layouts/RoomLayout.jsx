import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Video,
  X,
  Code2,
  Menu,
  Code,
} from "lucide-react";

import { useState } from "react";

import RoomSidebar from "../components/room/RoomSidebar";

const RoomLayout = ({ editor, chat }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const [activeTab, setActiveTab] = useState("chat");

  // Mobile: which main panel is visible — "editor" or "chat"
  const [mobileView, setMobileView] = useState("editor");

  // Mobile: drawer open state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div
      className="
        h-screen
        bg-zinc-950
        text-white
        flex
        overflow-hidden
        relative
      "
    >
      {/* ===================== MOBILE DRAWER OVERLAY ===================== */}
      {isDrawerOpen && (
        <div
          className="
            fixed inset-0 z-40
            bg-black/60
            md:hidden
          "
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* ===================== LEFT SIDEBAR ===================== */}
      {/* Desktop: collapsible aside | Mobile: slide-over drawer */}
      <aside
        className={`
          h-full
          bg-zinc-900
          border-r
          border-zinc-800
          flex
          flex-col
          overflow-hidden
          shrink-0
          transition-all
          duration-300

          /* ---- desktop ---- */
          hidden md:flex
          ${isSidebarOpen ? "md:w-[260px]" : "md:w-[72px]"}

          /* ---- mobile drawer ---- */
          md:static
          fixed top-0 left-0 z-50
          ${isDrawerOpen ? "flex w-[260px]" : "w-0"}
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
              isSidebarOpen || isDrawerOpen
                ? "justify-between"
                : "justify-center"
            }
          `}
        >
          {/* LEFT SIDE — shown when open */}
          {(isSidebarOpen || isDrawerOpen) && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div
                className="
                  size-10 rounded-xl
                  bg-blue-500/10
                  border border-blue-500/20
                  flex items-center justify-center
                  shrink-0
                "
              >
                <Code2 size={22} className="text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold whitespace-nowrap">
                  CodeSync
                </h1>
                <p className="text-xs text-zinc-500 whitespace-nowrap">
                  Collaborative Editor
                </p>
              </div>
            </div>
          )}

          {/* TOGGLE — desktop collapses, mobile closes drawer */}
          <button
            onClick={() => {
              if (isDrawerOpen) {
                setIsDrawerOpen(false);
              } else {
                setIsSidebarOpen(!isSidebarOpen);
              }
            }}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-all shrink-0"
          >
            {isSidebarOpen || isDrawerOpen ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        </div>

        {/* SIDEBAR CONTENT */}
        <div className="flex-1 overflow-hidden">
          <RoomSidebar isSidebarOpen={isSidebarOpen || isDrawerOpen} />
        </div>
      </aside>

      {/* ===================== MAIN ===================== */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* ---- MOBILE TOPBAR ---- */}
        <div
          className="
            md:hidden
            h-14
            border-b border-zinc-800
            bg-zinc-900
            flex items-center justify-between
            px-4
            shrink-0
          "
        >
          {/* Hamburger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-all"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Code2 size={18} className="text-blue-500" />
            <span className="font-bold text-lg">CodeSync</span>
          </div>

          {/* Placeholder to centre logo */}
          <div className="w-9" />
        </div>

        {/* ---- CONTENT ROW (editor + right panel) ---- */}
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* EDITOR */}
          <section
            className={`
              flex-1 min-w-0 overflow-hidden flex flex-col

              /* mobile: show/hide based on mobileView */
              ${mobileView === "editor" ? "flex" : "hidden"}
              md:flex
            `}
          >
            {editor}
          </section>

          {/* RIGHT PANEL — desktop */}
          {isRightPanelOpen && (
            <aside
              className={`
                border-l border-zinc-800
                bg-zinc-900
                flex flex-col
                overflow-hidden
                shrink-0

                /* mobile: full width, only visible when mobileView === chat */
                w-full
                ${mobileView === "chat" ? "flex" : "hidden"}
                md:flex md:w-[340px]
              `}
            >
              {/* TOPBAR */}
              <div
                className="
                  h-16
                  border-b border-zinc-800
                  px-4
                  flex items-center justify-between
                "
              >
                {/* TABS */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab("chat")}
                    className={`
                      px-4 py-2 rounded-xl
                      flex items-center gap-2
                      transition-all
                      ${
                        activeTab === "chat"
                          ? "bg-blue-500 text-white"
                          : "bg-zinc-800 text-zinc-400"
                      }
                    `}
                  >
                    <MessageSquare size={16} />
                    Chat
                  </button>

                  <button
                    onClick={() => setActiveTab("video")}
                    className={`
                      px-4 py-2 rounded-xl
                      flex items-center gap-2
                      transition-all
                      ${
                        activeTab === "video"
                          ? "bg-blue-500 text-white"
                          : "bg-zinc-800 text-zinc-400"
                      }
                    `}
                  >
                    <Video size={16} />
                    Video
                  </button>
                </div>

                {/* CLOSE — desktop only */}
                <button
                  onClick={() => setIsRightPanelOpen(false)}
                  className="
                    p-2 rounded-lg
                    hover:bg-zinc-800
                    transition-all
                    hidden md:block
                  "
                >
                  <X size={18} />
                </button>
              </div>

              {/* PANEL CONTENT */}
              <div className="flex-1 overflow-hidden">
                {activeTab === "chat" ? (
                  chat
                ) : (
                  <div
                    className="
                      h-full
                      flex items-center justify-center
                      text-zinc-500
                    "
                  >
                    Video call coming soon 🚀
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>

        {/* ---- MOBILE BOTTOM TAB BAR ---- */}
        <nav
          className="
            md:hidden
            h-14
            border-t border-zinc-800
            bg-zinc-900
            flex items-center
            shrink-0
          "
        >
          <button
            onClick={() => setMobileView("editor")}
            className={`
              flex-1 h-full
              flex flex-col items-center justify-center gap-1
              text-xs transition-all
              ${mobileView === "editor" ? "text-blue-400" : "text-zinc-500"}
            `}
          >
            <Code size={18} />
            Editor
          </button>

          <button
            onClick={() => {
              setMobileView("chat");
              setIsRightPanelOpen(true);
            }}
            className={`
              flex-1 h-full
              flex flex-col items-center justify-center gap-1
              text-xs transition-all
              ${mobileView === "chat" ? "text-blue-400" : "text-zinc-500"}
            `}
          >
            <MessageSquare size={18} />
            Chat
          </button>
        </nav>
      </main>

      {/* ===================== OPEN CHAT BUTTON (desktop only) ===================== */}
      {!isRightPanelOpen && (
        <button
          onClick={() => setIsRightPanelOpen(true)}
          className="
            absolute right-5 bottom-5 z-50
            size-14 rounded-full
            bg-blue-500 hover:bg-blue-600
            flex items-center justify-center
            shadow-lg transition-all
            hidden md:flex
          "
        >
          <MessageSquare size={22} />
        </button>
      )}
    </div>
  );
};

export default RoomLayout;
