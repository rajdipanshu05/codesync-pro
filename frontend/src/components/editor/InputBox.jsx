import {
  TerminalSquare,
  Trash2,
} from "lucide-react";

import { useEditorStore } from "../../store/editorStore";

const InputBox = () => {

  const {
    input,
    setInput,
  } = useEditorStore();


  // ================= CLEAR INPUT =================

  const handleClearInput =
    () => {

      setInput("");
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
        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <TerminalSquare
            size={18}
            className="
              text-blue-400
            "
          />

          <h3
            className="
              text-sm
              font-semibold
              text-zinc-300
            "
          >
            Input
          </h3>

        </div>


        {/* RIGHT */}
        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <span
            className="
              text-xs
              text-zinc-500
            "
          >
            stdin
          </span>

          <button
            onClick={
              handleClearInput
            }
            className="
              p-1.5

              rounded-lg

              hover:bg-zinc-800

              transition-all
              cursor-pointer
            "
          >

            <Trash2
              size={15}
              className="
                text-zinc-500
              "
            />

          </button>

        </div>

      </div>


      {/* TEXTAREA */}
      <textarea
        value={input}

        onChange={(e) =>
          setInput(
            e.target.value
          )
        }

        placeholder="
Enter custom input...

Example:
5
1 2 3 4 5
"

        className="
          flex-1

          resize-none

          bg-zinc-950/80

          border
          border-zinc-800

          rounded-2xl

          p-4

          outline-none

          text-sm
          text-white

          placeholder:text-zinc-600

          focus:border-blue-500

          transition-all
        "
      />

    </div>
  );
};

export default InputBox;