import { SE, EN } from "./languages/LanguageInterface";
import React, { Children, createContext, ReactNode, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const getData = async () => {
    try {
      const getDefault = await AsyncStorage.getItem("defaultLanguage");
      if (getDefault === "EN") {
        defaultLanguage = languages.EN;
      }
    } catch (e) {
      console.log("shit");
    }
  };

  const setLang = async (langCode: string) => {
    let chosen = languages.SE;

    if (langCode === "EN") {
      await AsyncStorage.setItem("defaultLanguage", "EN");
      chosen = languages.EN;
    } else {
      await AsyncStorage.setItem("defaultLanguage", "SE");
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
