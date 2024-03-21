import { createContext } from "react";
import {
  Component,
  Model,
  Operation,
  SystemFilter,
  Team,
  TemporaryState,
} from "src/interfaces";

export type TemporaryContextProps = {
  temporaryState: TemporaryState;
  setTeams: (teams: Team[]) => void;
  setSystems: (systems: SystemFilter[]) => void;
  setTeamActive: (team: Team | null) => void;
  setModelActive: (model: Model | null) => void;
  setTeamSave: (team: Team | null) => void;
  addTeam: (team: Team) => void;
  setOperations: (operations: Operation[]) => void;
  setComponents: (components: Component[]) => void;
  removeOperation: (id_operation: number) => void;
  setTotalPagesOperation: (total_pages: number) => void;
  setComponentActive: (component: Component) => void;
  setOrderBy: (orderBy: string) => void;
  setSearch: (code: string) => void;
  activeSystem: (id_system: number) => void;
  activeAllSystem: (active: boolean) => void;
  setShowEmpty: (isEmpty: boolean) => void;
  setStep: (step: number) => void;
};

export const TemporaryContext = createContext<TemporaryContextProps>(
  {} as TemporaryContextProps
);
