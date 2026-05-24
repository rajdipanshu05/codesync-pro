const OutputBox = () => {
  return (
    <div
      className="
        flex-1
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-4
        overflow-y-auto
      "
    >
      <h3
        className="
          text-sm
          font-semibold
          mb-3
          text-zinc-400
        "
      >
        Output
      </h3>

      <pre
        className="
          text-sm
          text-zinc-300
          whitespace-pre-wrap
        "
      >
        Output will appear here...
      </pre>
    </div>
  );
};

export default OutputBox;
