import { useReducer } from "react";
import { PersonalContext } from "./personal.context";
import { personalReducer } from "./personal.reducer";
import { Personal, PersonalState } from "src/interfaces";

const INITIAL_STATE: PersonalState = {
  personal: [],
  search: "",
  totalPages: 1,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PersonalProvider = ({ children }: Props) => {
  const [personalState, dispatch] = useReducer(personalReducer, INITIAL_STATE);

  const setPersonal = (personal: Personal[]) => {
    dispatch({ type: "setPersonal", payload: personal });
  };

  const setSearch = (search: string) => {
    dispatch({ type: "setSearch", payload: search });
  };

  const setTotalPages = (totalPages: number) => {
    dispatch({ type: "setTotalPages", payload: totalPages });
  };

  return (
    <PersonalContext.Provider
      value={{
        personalState,
        setPersonal,
        setSearch,
        setTotalPages,
      }}
    >
      {children}
    </PersonalContext.Provider>
  );
};

export default PersonalProvider;
