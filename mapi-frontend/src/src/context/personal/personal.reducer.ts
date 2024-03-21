import { Personal, PersonalState } from "src/interfaces";

type PersonAction =
  | { type: "setPersonal"; payload: Personal[] }
  | { type: "setSearch"; payload: string }
  | { type: "setTotalPages"; payload: number };

export const personalReducer = (
  state: PersonalState,
  action: PersonAction
): PersonalState => {
  switch (action.type) {
    case "setPersonal":
      return {
        ...state,
        personal: [...action.payload],
      };
    case "setSearch":
      return {
        ...state,
        search: action.payload,
      };
    case "setTotalPages":
      return {
        ...state,
        totalPages: action.payload,
      };

    default:
      return state;
  }
};
