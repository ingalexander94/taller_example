import {
  Component,
  Model,
  Operation,
  SystemFilter,
  Team,
  TemporaryState,
} from "src/interfaces";

type TemporaryAction =
  | { type: "setTeams"; payload: Team[] }
  | { type: "setSystems"; payload: SystemFilter[] }
  | { type: "setOperations"; payload: Operation[] }
  | { type: "setComponents"; payload: Component[] }
  | { type: "setTeamActive"; payload: Team | null }
  | { type: "setModelActive"; payload: Model | null }
  | { type: "setTeamSave"; payload: Team | null }
  | { type: "addTeam"; payload: Team }
  | { type: "updateTeam"; payload: Team }
  | { type: "removeOperation"; payload: number }
  | { type: "setTotalPagesOperation"; payload: number }
  | { type: "setTeamSave"; payload: Team | null }
  | { type: "setOrderBy"; payload: string }
  | { type: "setSearch"; payload: string }
  | { type: "setComponentActive"; payload: Component }
  | { type: "activeSystem"; payload: number }
  | { type: "activeAllSystem"; payload: boolean }
  | { type: "setShowEmpty"; payload: boolean }
  | { type: "setStep"; payload: number };

export const temporaryReducer = (
  state: TemporaryState,
  action: TemporaryAction
): TemporaryState => {
  switch (action.type) {
    case "setTeams":
      return {
        ...state,
        teams: [...action.payload],
      };
    case "setSystems":
      return {
        ...state,
        systems: [...action.payload],
      };
    case "setTeamActive":
      return {
        ...state,
        teamActive: action.payload,
        modelActive: null,
        componentActive: null,
      };
    case "setModelActive":
      return {
        ...state,
        modelActive: action.payload,
      };
    case "setTeamSave":
      return {
        ...state,
        teamSave: action.payload,
      };
    case "addTeam":
      return {
        ...state,
        teams: [...state.teams, action.payload],
      };
    case "setOperations":
      return {
        ...state,
        operations: [...action.payload],
      };
    case "setComponents":
      return {
        ...state,
        components: [...action.payload],
      };
    case "removeOperation":
      return {
        ...state,
        operations: state.operations.filter(
          (operation) => operation.id_operation !== action.payload
        ),
      };
    case "setComponentActive":
      return {
        ...state,
        componentActive: action.payload,
      };
    case "setTotalPagesOperation":
      return {
        ...state,
        totalPagesOperations: action.payload,
      };
    case "setOrderBy":
      return {
        ...state,
        orderBy: action.payload,
      };
    case "setSearch":
      return {
        ...state,
        search: action.payload,
      };
    case "activeSystem":
      return {
        ...state,
        systems: state.systems.map((system) =>
          system.id_system === action.payload
            ? { ...system, isActive: !system.isActive }
            : system
        ),
      };
    case "activeAllSystem":
      return {
        ...state,
        systems: state.systems.map((system) => ({
          ...system,
          isActive: action.payload,
        })),
      };
    case "setShowEmpty":
      return {
        ...state,
        showEmpty: action.payload,
      };
    case "setStep":
      return {
        ...state,
        step: action.payload,
      };
    default:
      return state;
  }
};
