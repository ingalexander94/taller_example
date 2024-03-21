import { createContext } from "react";
import { Personal, PersonalState } from "src/interfaces";

export type PersonalContextProps = {
  personalState: PersonalState;
  setSearch: (search: string) => void;
  setPersonal: (personal: Personal[]) => void;
  setTotalPages: (totalPages: number) => void;
};

export const PersonalContext = createContext<PersonalContextProps>(
  {} as PersonalContextProps
);
