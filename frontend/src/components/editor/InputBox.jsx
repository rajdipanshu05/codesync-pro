import { useEditorStore } from "../../store/editorStore";
const InputBox = () => {
  const { input, setInput } = useEditorStore();
  return (
    <div
      className="
        flex-1
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-4
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
        Input
      </h3>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Custom input..."
        className="
    w-full
    h-[120px]
    resize-none
    bg-transparent
    outline-none
    text-white
    placeholder:text-zinc-500
  "
      />
    </div>
  );
};

export default InputBox;
