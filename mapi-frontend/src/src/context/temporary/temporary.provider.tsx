import { useReducer } from "react";
import { TemporaryContext, temporaryReducer } from ".";
import {
  Component,
  Model,
  Operation,
  SystemFilter,
  Team,
  TemporaryState,
} from "src/interfaces";

const INITIAL_STATE: TemporaryState = {
  teams: [],
  operations: [],
  components: [],
  systems: [],
  showEmpty: false,
  orderBy: "ASC",
  search: "",
  teamActive: null,
  modelActive: null,
  teamSave: null,
  componentActive: null,
  totalPagesOperations: 1,
  step: 1,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const TemporaryProvider = ({ children }: Props) => {
  const [temporaryState, dispatch] = useReducer(
    temporaryReducer,
    INITIAL_STATE
  );

  const setTeams = (teams: Team[]) => {
    dispatch({ type: "setTeams", payload: teams });
  };

  const setTeamActive = (team: Team | null) => {
    dispatch({ type: "setTeamActive", payload: team });
  };

  const setComponentActive = (component: Component) => {
    dispatch({ type: "setComponentActive", payload: component });
  };

  const setModelActive = (model: Model | null) => {
    dispatch({ type: "setModelActive", payload: model });
  };

  const setTeamSave = (team: Team | null) => {
    dispatch({ type: "setTeamSave", payload: team });
  };

  const addTeam = (team: Team) => {
    dispatch({ type: "addTeam", payload: team });
  };

  const setOperations = (operations: Operation[]) => {
    dispatch({ type: "setOperations", payload: operations });
  };

  const setComponents = (components: Component[]) => {
    dispatch({ type: "setComponents", payload: components });
  };

  const addComponent = (component: Component) => {
    dispatch({ type: "addComponent", payload: component });
  };

  const setSystems = (systems: SystemFilter[]) => {
    dispatch({ type: "setSystems", payload: systems });
  };

  const removeOperation = (id_operation: number) => {
    dispatch({ type: "removeOperation", payload: id_operation });
  };

  const setTotalPagesOperation = (total_pages: number) => {
    dispatch({ type: "setTotalPagesOperation", payload: total_pages });
  };

  const setOrderBy = (orderBy: string) => {
    dispatch({ type: "setOrderBy", payload: orderBy });
  };

  const setSearch = (code: string) => {
    dispatch({ type: "setSearch", payload: code });
  };

  const activeSystem = (id_system: number) => {
    dispatch({ type: "activeSystem", payload: id_system });
  };

  const activeAllSystem = (active: boolean) => {
    dispatch({ type: "activeAllSystem", payload: active });
  };

  const setShowEmpty = (isEmpty: boolean) => {
    dispatch({ type: "setShowEmpty", payload: isEmpty });
  };

  const setStep = (step: number) => {
    dispatch({ type: "setStep", payload: step });
  };

  return (
    <TemporaryContext.Provider
      value={{
        temporaryState,
        setTeams,
        setTeamActive,
        setModelActive,
        setTeamSave,
        addTeam,
        setOperations,
        removeOperation,
        setTotalPagesOperation,
        setComponentActive,
        setOrderBy,
        setSearch,
        setSystems,
        activeSystem,
        activeAllSystem,
        setShowEmpty,
        setComponents,
        setStep,
        addComponent
      }}
    >
      {children}
    </TemporaryContext.Provider>
  );
};
