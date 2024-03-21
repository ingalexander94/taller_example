import { useReducer } from "react";
import { OperationExpensesContext } from "./operationexpenses.context";
import { Equipment, EquipmentPlates,  OperationExpensesState } from "src/interfaces/operationexpenses.interface";
import { operationExpensesReducer } from "./operationexpenses.reducer";

const INITIAL_STATE: OperationExpensesState = {
  list_equipment: [],
  list_equipment_plates: [],
  list_operation: [],
  list_expenses: [],
  equipment_id: "",
  equipment_plate: "",
  last_page: 1,
  operation_detail: {
    team_name: "",
    ut_car_plate: "",
    id_personal: 0,
    personal_names: "",
    personal_surnames: "",
    id_operating_expenses: 0,
    ope_departure_location: "",
    ope_departure_date: "",
    ope_arrival_place: "",
    ope_arrival_date: "",
    ope_km_driven: "",
    ope_company: "",
    ope_product: "",
    ope_name_manager: "",
    ope_phone_manager: ""
  },
};


interface Props {
  children: JSX.Element | JSX.Element[];
}

export const OperationExpensesProvider = ({ children }: Props) => {
  const [operationExpensesState, dispatch] = useReducer(operationExpensesReducer, INITIAL_STATE);

  const setEquipment = (list_equipment: Equipment[]) => {
    dispatch({ type: "setEquipment", payload: list_equipment });
  };
 
  const setEquipmentId = (equipment_id: string) => {
    dispatch({ type: "setEquipmentId", payload: equipment_id });
  };
  
  const setEquipmentPlates = (list_equipment_plates: EquipmentPlates[]) => {
    dispatch({ type: "setEquipmentPlates", payload: list_equipment_plates });
  };

  const setEquipmentPlatesId = (equipment_plate: string) => {
    dispatch({ type: "setEquipmentPlatesId", payload: equipment_plate });
  };

  const setLastPage = (last_page: number) => {
    dispatch({ type: "setLastPage", payload: last_page });
  };

  return (
    <OperationExpensesContext.Provider
      value={{
        operationExpensesState,
        setEquipment,
        setEquipmentId,
        setEquipmentPlates,
        setEquipmentPlatesId,
        setLastPage,
        // setCreatePersons,
      }}
    >
      {children}
    </OperationExpensesContext.Provider>
  );
};

export default OperationExpensesProvider;
