import {
  useEditorStore,
} from "../../store/editorStore";

const languages = [
  "javascript",
  "python",
  "java",
  "cpp",
];

const LanguageSelector = () => {

  const {
    language,
    setLanguage,
  } = useEditorStore();

  return (
    <select
      value={language}
      onChange={(e)=>
        setLanguage(e.target.value)
      }
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
        languages.map((lang) => (

          <option
            key={lang}
            value={lang}
          >
            {lang}
          </option>
        ))
      }

    </select>
  );
};

export default LanguageSelector;