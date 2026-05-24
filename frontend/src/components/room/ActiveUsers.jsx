import { useRoomStore } from "../../store/roomStore";

const ActiveUsers = () => {
  const { activeUsers } = useRoomStore();

  return (
    <div className="space-y-3">
      {activeUsers.map((user) => (
        <div
          key={user.socketId}
          className="
              flex
              items-center
              gap-3
              p-3
              rounded-2xl
              bg-zinc-950
              border
              border-zinc-800
            "
        >
          {/* AVATAR */}
          <div
            className="
                size-10
                rounded-full
                bg-blue-500
                flex
                items-center
                justify-center
                font-bold
              "
          >
            {user.username[0]}
          </div>

          {/* INFO */}
          <div>
            <p className="font-medium">{user.username}</p>

            <p
              className="
                  text-xs
                  text-emerald-400
                "
            >
              Online
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveUsers;
