import { createContext } from "react";
import { SettingsState } from "src/interfaces";

export type SettingsContextProps = {
  settingsState: SettingsState;
  setLanguage: (payload: string) => void;
  setCurrency: (payload: string) => void;
  setTheme: (payload: string) => void;
};

export const SettingsContext = createContext<SettingsContextProps>(
  {} as SettingsContextProps
);
