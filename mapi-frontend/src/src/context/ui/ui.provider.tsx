import { useReducer } from "react";
import { UIState } from "src/interfaces";
import { uiReducer } from "./ui.reducer";
import { UIContext } from "./ui.context";

const INITIAL_STATE: UIState = {
  checking: false,
  step: 1,
  email: "",
  refreshTechnicians: false,
  code: "",
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const UIProvider = ({ children }: Props) => {
  const [uiState, dispatch] = useReducer(uiReducer, INITIAL_STATE);

  const toggleCheking = () => {
    dispatch({ type: "toggleChecking" });
  };

  const setStep = (step: number) => {
    dispatch({ type: "setStep", payload: step });
  };

  const setEmail = (email: string) => {
    dispatch({ type: "setEmail", payload: email });
  };

  const setCode = (code: string) => {
    dispatch({ type: "setCode", payload: code });
  };

  const setRefreshTechnicians = () => {
    dispatch({ type: "setRefreshTechnicians" });
  };

  return (
    <UIContext.Provider
      value={{
        uiState,
        toggleCheking,
        setStep,
        setEmail,
        setCode,
        setRefreshTechnicians,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
