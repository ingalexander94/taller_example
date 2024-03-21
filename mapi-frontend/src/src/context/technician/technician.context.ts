import { createContext } from "react";
import {
  Technician,
  TechnicianState,
} from "src/interfaces/technician.interface";

export type TechnicianContextProps = {
  technicianState: TechnicianState;
  setTechnicians: (list_technician: Technician[]) => void;
  setSearch: (search: string) => void;
  setShowEmpty: (showEmpty: boolean) => void;
  setCreateTechnician: (technician: Technician[]) => void;
  setLastPage: (last_page: number) => void;
};

export const TechnicianContext = createContext<TechnicianContextProps>(
  {} as TechnicianContextProps
);
