import { useEditorStore } from "../../store/editorStore";

const OutputBox = () => {

  const {
    output,
    executionInfo,
  } = useEditorStore();

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

      <div
        className="
          flex
          items-center
          justify-between
          mb-3
        "
      >

        <h3
          className="
            text-sm
            font-semibold
            text-zinc-400
          "
        >
          Output
        </h3>

        {
          executionInfo && (

            <div
              className="
                text-xs
                text-zinc-500
                flex
                gap-4
              "
            >
              <span>
                Time:
                {executionInfo.time}s
              </span>

              <span>
                Memory:
                {executionInfo.memory} KB
              </span>
            </div>
          )
        }

      </div>

      <pre
        className="
          text-sm
          whitespace-pre-wrap
          text-zinc-300
        "
      >
        {output || "Run code to see output"}
      </pre>

    </div>
  );
};

export default OutputBox;