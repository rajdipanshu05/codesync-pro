import Editor
from "@monaco-editor/react";

import {
  LogOut,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useEditorStore,
} from "../../store/editorStore";

import LanguageSelector
from "./LanguageSelector";

import ThemeSelector
from "./ThemeSelector";

import RunButton
from "./RunButton";

import InputBox
from "./InputBox";

import OutputBox
from "./OutputBox";

const CodeEditor = () => {

  const navigate =
    useNavigate();


  const {
    code,
    setCode,
    language,
    theme,
  } = useEditorStore();


  // ================= LEAVE ROOM =================

  const handleLeaveRoom =
    () => {

      navigate("/");
    };


  return (
    <div
      className="
        flex-1
        flex
        flex-col
        overflow-hidden
      "
    >

      {/* TOPBAR */}
      <div
        className="
          h-16
          border-b
          border-zinc-800
          px-6
          flex
          items-center
          justify-between
          bg-zinc-950
        "
      >

        {/* LEFT */}
        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          {/* ROOM NAME */}
          <h2
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            CodeVerse Room
          </h2>

          {/* LANGUAGE */}
          <LanguageSelector />

          {/* THEME */}
          <ThemeSelector />

        </div>


        {/* RIGHT */}
        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          {/* RUN BUTTON */}
          <RunButton />


          {/* LEAVE BUTTON */}
          <button
            onClick={handleLeaveRoom}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-red-500/10
              border
              border-red-500/20
              text-red-400
              hover:bg-red-500/20
              transition-all
              cursor-pointer
            "
          >

            <LogOut size={18} />

            Leave

          </button>

        </div>

      </div>


      {/* EDITOR */}
      <div
        className="
          flex-1
          p-5
        "
      >

        <div
          className="
            h-full
            overflow-hidden
            rounded-2xl
            border
            border-zinc-800
          "
        >

          <Editor
            height="100%"
            language={language}
            theme={theme}
            value={code}
            onChange={(value)=>
              setCode(value || "")
            }
            options={{
              minimap: {
                enabled: false,
              },

              fontSize: 14,

              smoothScrolling: true,

              padding: {
                top: 16,
              },
            }}
          />

        </div>

      </div>


      {/* INPUT OUTPUT */}
      <div
        className="
          h-[260px]
          border-t
          border-zinc-800
          p-5
          grid
          grid-cols-2
          gap-5
        "
      >

        <InputBox />

        <OutputBox />

      </div>

    </div>
  );
};

export default CodeEditor;