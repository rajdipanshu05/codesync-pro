import { Terminal, Trash2, Clock3, MemoryStick } from "lucide-react";
import { useEditorStore } from "../../store/editorStore";

const OutputBox = () => {
  const { output, executionInfo, setOutput } = useEditorStore();

  // ================= ERROR CHECK =================
  const isError = output?.toLowerCase().includes("error");

  // ================= CLEAR OUTPUT =================
  const handleClearOutput = () => {
    setOutput("");
  };

  return (
    <div
      className="
        h-full
        bg-zinc-900/80
        border
        border-zinc-800
        rounded-3xl
        p-5
        flex
        flex-col
        backdrop-blur
        shadow-lg
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-4
        "
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-emerald-400" />
          <h3 className="text-sm font-semibold text-zinc-300">Output</h3>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* EXECUTION INFO */}
          {executionInfo && (
            <div className="hidden sm:flex items-center gap-3 text-xs text-zinc-500">
              <div className="flex items-center gap-1">
                <Clock3 size={13} />
                <span>{executionInfo.time}s</span>
              </div>
              <div className="flex items-center gap-1">
                <MemoryStick size={13} />
                <span>{executionInfo.memory} KB</span>
              </div>
            </div>
          )}

          {/* CLEAR BUTTON */}
          <button
            onClick={handleClearOutput}
            className="
              p-1.5
              rounded-lg
              hover:bg-zinc-800
              transition-all
              cursor-pointer
            "
          >
            <Trash2 size={15} className="text-zinc-500" />
          </button>
        </div>
      </div>

      {/* OUTPUT AREA */}
      <textarea
        readOnly
        value={
          output ||
          `Run code to see output...

Tip:
Press Ctrl + Enter to run`
        }
        className={`
          flex-1
          resize-none
          rounded-2xl
          border
          p-4
          outline-none
          text-sm
          font-mono
          transition-all

          ${
            isError
              ? `
                border-red-500/20
                bg-red-500/5
                text-red-400
              `
              : `
                border-zinc-800
                bg-zinc-950/80
                text-emerald-400
              `
          }
        `}
      />
    </div>
  );
};

export default OutputBox;