import { LogOut, Code2 } from "lucide-react";

import { useAuthStore } from "../../store/authStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav
      className="
        w-full
        border-b
        border-zinc-800
        bg-zinc-950/80
        backdrop-blur
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div
            className="
              p-2
              rounded-xl
              bg-blue-500/10
              border
              border-blue-500/20
            "
          >
            <Code2 className="text-blue-500" />
          </div>

          <h1
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            CodeSync
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* USER */}
          <div
            className="
              size-10
              rounded-full
              bg-blue-500
              flex
              items-center
              justify-center
              font-bold
              text-white
            "
          >
            {user?.username?.[0]?.toUpperCase()}
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-zinc-900
              border
              border-zinc-800
              hover:bg-zinc-800
              transition-all
              cursor-pointer
              text-white
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
