import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { socket } from "../../lib/socket";

import { useEditorStore } from "../../store/editorStore";

import {
  LANGUAGE_SNIPPETS,
} from "../../utils/constants";

const languages = [
  "javascript",
  "python",
  "java",
  "cpp",
];

const LanguageSelector = () => {

  const { roomId } =
    useParams();

  const {
    language,
    setLanguage,
    setCode,
  } = useEditorStore();


  // ================= RECEIVE LANGUAGE =================

  useEffect(() => {

    socket.on(
      "receive-language",
      ({
        language,
        code,
      }) => {

        setLanguage(
          language,
          true
        );

        setCode(code);
      }
    );

    return () => {

      socket.off(
        "receive-language"
      );
    };

  }, []);


  return (
    <select

      value={language}

      onChange={(e) => {

        const newLanguage =
          e.target.value;

        // fresh snippet
        const newCode =
          LANGUAGE_SNIPPETS[
            newLanguage
          ];

        setLanguage(
          newLanguage,
          true
        );

        setCode(
          newCode
        );

        socket.emit(
          "language-change",
          {
            roomId,

            language:
              newLanguage,

            code:
              newCode,
          }
        );
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

      {
        languages.map(
          (lang) => (

            <option
              key={lang}
              value={lang}
            >
              {lang}
            </option>
          )
        )
      }

    </select>
  );
};

export default LanguageSelector;