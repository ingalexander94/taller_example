import { Person, PersonState } from "src/interfaces/person.interface";

type PersonAction =
  | { type: "setPersons"; payload: Person[] }
  | { type: "setSearch"; payload: string };

export const personReducer = (
  state: PersonState,
  action: PersonAction
): PersonState => {
  switch (action.type) {
    case "setPersons":
      return {
        ...state,
        list_persons: [...action.payload],
      };
    case "setSearch":
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};
