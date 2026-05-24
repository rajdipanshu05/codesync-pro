const RoomLayout = ({ sidebar, editor, chat }) => {
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
      {/* SIDEBAR */}
      <aside
        className="
          w-[260px]
          border-r
          border-zinc-800
          bg-zinc-900
          flex
          flex-col
        "
      >
        {sidebar}
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
            flex
            flex-col
          "
        >
          {editor}
        </section>

        {/* CHAT */}
        <section
          className="
            w-[280px]
            border-l
            border-zinc-800
            bg-zinc-900
          "
        >
          {chat}
        </section>
      </main>
    </div>
  );
};

export default RoomLayout;
