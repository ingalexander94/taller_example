import {  Equipment, EquipmentPlates, OperationExpensesState } from "src/interfaces/operationexpenses.interface";

type OperatinExpensesAction =
  | { type: "setEquipment"; payload: Equipment[] }
  | { type: "setEquipmentId"; payload: string }
  | { type: "setEquipmentPlates"; payload: EquipmentPlates[] }
  | { type: "setEquipmentPlatesId"; payload: string }
  | { type: "setLastPage"; payload: number };

export const operationExpensesReducer = (
  state: OperationExpensesState,
  action: OperatinExpensesAction
): OperationExpensesState => {
  switch (action.type) {
    case "setEquipment":
      return {
        ...state,
        list_equipment: [...action.payload],
      };
    case "setEquipmentId":
      return {
        ...state,
        equipment_id: action.payload,
      };
    case "setEquipmentPlates":
      return {
        ...state,
        list_equipment_plates: [...action.payload],
      };
    case "setEquipmentPlatesId":
      return {
        ...state,
        equipment_plate: action.payload,
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
