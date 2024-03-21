import { useReducer } from "react";
import { SettingsState } from "src/interfaces";
import { settingsReducer } from "./settings.reducer";
import { SettingsContext } from "./settings.context";
import { CustomStorage } from "src/lib/Storage";
import * as tranlations_en from "src/data/lang/en.json";
import * as tranlations_es from "src/data/lang/es.json";

const INITIAL_STATE: SettingsState = {
  translated_text:
    CustomStorage.language === "en" ? tranlations_en : tranlations_es,
  currency: "COP",
  theme: "1",
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SettingsProvider = ({ children }: Props) => {
  const [settingsState, dispatch] = useReducer(settingsReducer, INITIAL_STATE);

  const setLanguage = async (language: string) => {
    const traductions: { [key: string]: string } =
      language === "es" ? tranlations_es : tranlations_en;
    CustomStorage.language = language;
    dispatch({ type: "setLanguage", payload: traductions });
  };

  const setCurrency = (currency: string) => {
    dispatch({ type: "setCurrency", payload: currency });
  };

  const setTheme = (theme: string) => {
    dispatch({ type: "setTheme", payload: theme });
  };

  return (
    <SettingsContext.Provider
      value={{ settingsState, setLanguage, setCurrency, setTheme }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
