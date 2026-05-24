import { useEditorStore } from "../../store/editorStore";
import { socket } from "../../lib/socket";

import { useParams } from "react-router-dom";

import { useEffect } from "react";

const languages = ["javascript", "python", "java", "cpp"];

const LanguageSelector = () => {
  const { roomId } = useParams();

  const { language, setLanguage } = useEditorStore();

  useEffect(() => {
    socket.on("receive-language", (incomingLanguage) => {
      setLanguage(incomingLanguage);
    });

    return () => {
      socket.off("receive-language");
    };
  }, []);

  return (
    <select
      value={language}
      onChange={(e) => {
        const newLanguage = e.target.value;

        setLanguage(newLanguage);

        socket.emit("language-change", {
          roomId,
          language: newLanguage,
        });
      }}
      className="
        px-4
        py-2
        rounded-xl
        bg-zinc-900
        border
        border-zinc-800
        text-white
        outline-none
        cursor-pointer
      "
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
