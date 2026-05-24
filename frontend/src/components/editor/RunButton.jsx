import { Play } from "lucide-react";

const RunButton = () => {
  return (
    <button
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
      "
    >
      <Play size={18} />
      Run Code
    </button>
  );
};

export default RunButton;
