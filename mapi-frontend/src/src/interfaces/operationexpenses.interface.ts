export interface OperationExpensesState {
  list_equipment: Equipment[];
  list_equipment_plates: EquipmentPlates[];
  list_operation: Operation[];
  list_expenses: Expenses[];
  equipment_id: string;
  equipment_plate: string;
  operation_detail: OperationDetail;
  last_page: number;
}

export interface Equipment {
  is_user_team: boolean;
  ut_team: number;
  team_name: string;
}

export interface EquipmentPlates {
  id_user_team: boolean;
  ut_car_plate: number;
}

export interface OperationList {
  totalPages: number;
  listOperation: Operation[];
}

export interface Operation {
  id_operating_expenses: number;
  personal_names: string;
  personal_surnames: string;
  ope_departure_location: string;
  ope_arrival_place: string;
  ope_km_driven: string;
  ope_company: string;
  ope_product: string;
  ope_total_expenses: number;
  ope_travel_utility: number;
}

export interface ExpensesList{
  expenses: Expenses[];
}

export interface Expenses{
  ed_concept: string;
  ed_price: number;
  id_operating_expenses: number;
}

export interface OperationDetail{
  team_name: string,
  ut_car_plate: string,
  id_personal: number,
  personal_names: string,
  personal_surnames: string,
  id_operating_expenses: number,
  ope_departure_location: string,
  ope_departure_date: string,
  ope_arrival_place: string,
  ope_arrival_date: string,
  ope_km_driven: string,
  ope_company: string,
  ope_name_manager: string,
  ope_phone_manager: string,
  ope_product: string
}
  