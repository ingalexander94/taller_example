import { UIState } from "src/interfaces";

type UIAction =
  | { type: "toggleChecking" }
  | { type: "setStep"; payload: number }
  | { type: "setEmail"; payload: string }
  | { type: "setRefreshTechnicians" }
  | { type: "setCode"; payload: string };

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case "toggleChecking":
      return {
        ...state,
        checking: !state.checking,
      };
    case "setStep":
      return {
        ...state,
        step: action.payload,
      };
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setCode":
      return {
        ...state,
        code: action.payload,
      };
    case "setRefreshTechnicians":
      return {
        ...state,
        refreshTechnicians: !state.refreshTechnicians,
      };
    default:
      return state;
  }
};
