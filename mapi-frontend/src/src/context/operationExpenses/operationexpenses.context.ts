import { createContext } from "react";
import { Equipment, EquipmentPlates, OperationExpensesState } from "src/interfaces/operationexpenses.interface";

export type OperationExpensesContextProps = {
  operationExpensesState: OperationExpensesState;
  setEquipment: (list_equipiment: Equipment[]) => void;
  setEquipmentId: (equipment_id: string) => void;
  setEquipmentPlates: (list_equipiment_plates: EquipmentPlates[]) => void;
  setEquipmentPlatesId: (equipment_Plate: string) => void;
  setLastPage: (last_page: number) => void;
};

export const OperationExpensesContext = createContext<OperationExpensesContextProps>(
  {} as OperationExpensesContextProps
);
