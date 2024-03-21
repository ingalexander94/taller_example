import { SettingsState } from "src/interfaces";

type SettingAction =
  | { type: "setLanguage"; payload: { [key: string]: string } }
  | { type: "setCurrency"; payload: string }
  | { type: "setTheme"; payload: string };

export const settingsReducer = (
  state: SettingsState,
  action: SettingAction
): SettingsState => {
  switch (action.type) {
    case "setLanguage":
      return {
        ...state,
        translated_text: action.payload,
      };
    case "setCurrency":
      return {
        ...state,
        currency: action.payload,
      };
    case "setTheme":
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
