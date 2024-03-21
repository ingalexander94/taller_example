import {
  Technician,
  TechnicianState,
} from "src/interfaces/technician.interface";

type TechnicianAction =
  | { type: "setTechnicians"; payload: Technician[] }
  | { type: "setSearch"; payload: string }
  | { type: "setShowEmpty"; payload: boolean }
  | { type: "setLastPage"; payload: number };

export const technicianReducer = (
  state: TechnicianState,
  action: TechnicianAction
): TechnicianState => {
  switch (action.type) {
    case "setTechnicians":
      return {
        ...state,
        list_technician: [...action.payload],
      };
    case "setSearch":
      return {
        ...state,
        search: action.payload,
      };
    case "setShowEmpty":
      return {
        ...state,
        showEmpty: action.payload,
      };
    case "setLastPage":
      return {
        ...state,
        last_page: action.payload,
      };
    default:
      return state;
  }
};
