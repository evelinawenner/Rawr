import { SE, EN } from "./languages/LanguageInterface";
import React, { Children, createContext, ReactNode, useState } from "react";

export const languages = {
  SE: {
    language: SE,
    name: "Svenska",
  },
  EN: {
    language: EN,
    name: "English",
  },
};

export const LanguageContext = createContext({
  language: languages.SE,
  setLang: (langCode: string) => {},
});

interface Iprops {
  children: ReactNode;
}

export const LanguageContextProvider = (props: Iprops) => {
  let defaultLanguage = languages.SE;
  let getDefault = localStorage.getItem("defaultLanguage");

  if (getDefault === "EN") {
    defaultLanguage = languages.EN;
  }
  const setLang = (langCode: string) => {
    let chosen = languages.SE;

    if (langCode === "EN") {
      localStorage.setItem("defaultLanguage", "EN");
      chosen = languages.EN;
    } else {
      localStorage.setItem("defaultLanguage", "SE");
      chosen = languages.SE;
    }
    setState({ ...state, language: chosen });
  };

  const initalValue = {
    language: defaultLanguage,
    setLang: setLang,
  };
  const [state, setState] = useState(initalValue);

  return (
    <LanguageContext.Provider value={state}>
      {props.children}
    </LanguageContext.Provider>
  );
};
