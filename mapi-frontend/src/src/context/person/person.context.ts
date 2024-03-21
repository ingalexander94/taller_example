import { createContext } from "react";
import { Person, PersonState } from "src/interfaces/person.interface";

export type PersonContextProps = {
  personState: PersonState;
  setPersons: (list_persons: Person[]) => void;
  setSearch: (search: string) => void;
  setCreatePersons: (person: Person[]) => void;
};

export const PersonContext = createContext<PersonContextProps>(
  {} as PersonContextProps
);
