import { useReducer } from "react";
import { PersonContext } from "./person.context";
import { Person, PersonState } from "src/interfaces/person.interface";
import { personReducer } from "./person.reducer";

const INITIAL_STATE: PersonState = {
  list_persons: [],
  person: {
    id_user: 0,
    user_photo: "",
    user_names: "",
    user_surnames: "",
    user_salary: 0,
    user_position: "",
    user_document: "",
    user_phone: "",
  },
  search: "",
  totalPagesPerson: 0,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PersonProvider = ({ children }: Props) => {
  const [personState, dispatch] = useReducer(personReducer, INITIAL_STATE);

  const setPersons = (list_persons: Person[]) => {
    dispatch({ type: "setPersons", payload: list_persons });
  };

  const setSearch = (search: string) => {
    dispatch({ type: "setSearch", payload: search });
  };

  const setCreatePersons = (person: Person[]) => {
    dispatch({ type: "setPersons", payload: person });
  };

  return (
    <PersonContext.Provider
      value={{
        personState,
        setPersons,
        setSearch,
        setCreatePersons,
      }}
    >
      {children}
    </PersonContext.Provider>
  );
};

export default PersonProvider;
