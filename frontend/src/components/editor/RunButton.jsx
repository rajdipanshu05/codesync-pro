import axios from "axios";

import { Play, Loader2 } from "lucide-react";

import { useEditorStore } from "../../store/editorStore";

const RunButton = () => {
  const {
    code,

    language,

    input,

    setOutput,

    isRunning,

    setIsRunning,

    setExecutionInfo,
  } = useEditorStore();

  // ================= RUN CODE =================

  const handleRunCode = async () => {
    try {
      setIsRunning(true);

      setOutput("Running...");

      const response = await axios.post(
        "http://localhost:8000/api/code/run",

        {
          language,

          source_code: code,

          stdin: input,
        },

        {
          withCredentials: true,
        },
      );

      const data = response.data;

      // ================= SUCCESS =================

      if (data.stdout) {
        setOutput(data.stdout);
      }

      // ================= RUNTIME ERROR =================
      else if (data.stderr) {
        setOutput(data.stderr);
      }

      // ================= COMPILE ERROR =================
      else if (data.compile_output) {
        setOutput(data.compile_output);
      }

      // ================= OTHER =================
      else {
        setOutput(data.status?.description || "Execution failed");
      }

      // ================= EXECUTION INFO =================

      setExecutionInfo({
        time: data.time,

        memory: data.memory,
      });
    } catch (error) {
      console.log(error);

      setOutput("Failed to run code");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <button
    id="run-code-btn"
      onClick={handleRunCode}
      disabled={isRunning}
      className="
        flex
        items-center
        gap-2
        px-5
        py-2
        rounded-xl
        bg-emerald-500
        hover:bg-emerald-600
        transition-all
        cursor-pointer
        font-medium
        text-white
        disabled:opacity-50
      "
    >
      {isRunning ? (
        <Loader2
          size={18}
          className="
              animate-spin
            "
        />
      ) : (
        <Play size={18} />
      )}

      {isRunning ? "Running..." : "Run Code"}
    </button>
  );
};

export default RunButton;
