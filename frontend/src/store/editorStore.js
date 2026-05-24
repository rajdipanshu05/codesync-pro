import { create } from "zustand";

import {
  LANGUAGE_SNIPPETS,
} from "../utils/constants";

export const useEditorStore =
  create((set) => ({

    language:
      "javascript",

    theme:
      "vs-dark",

    code:
      LANGUAGE_SNIPPETS
        .javascript,


    // ================= SET LANGUAGE =================

    setLanguage:
      (
        language,
        preserveCode = true
      ) =>

        set((state) => ({

          language,

          code:
            preserveCode
              ? state.code
              : LANGUAGE_SNIPPETS[
                  language
                ],
        })),



    // ================= SET THEME =================

    setTheme:
      (theme) =>

        set({
          theme,
        }),



    // ================= SET CODE =================

    setCode:
      (code) =>

        set({
          code,
        }),

}));