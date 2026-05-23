import {
  useEditorStore,
} from "../../store/editorStore";

const themes = [
  "vs-dark",
  "light",
  "hc-black",
];

const ThemeSelector = () => {

  const {
    theme,
    setTheme,
  } = useEditorStore();

  return (
    <select
      value={theme}
      onChange={(e)=>
        setTheme(e.target.value)
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
        themes.map((themeItem) => (

          <option
            key={themeItem}
            value={themeItem}
          >
            {themeItem}
          </option>
        ))
      }

    </select>
  );
};

export default ThemeSelector;