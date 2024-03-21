import { Inventory, InventoryState } from "src/interfaces/inventory.interface";

type InventoryAction =
  | { type: "setInventory"; payload: Inventory[] }
  | { type: "setSearch"; payload: string }
  | { type: "setRefresh" }
  | { type: "setTotalPages"; payload: number };

export const inventoryReducer = (
  state: InventoryState,
  action: InventoryAction
): InventoryState => {
  switch (action.type) {
    case "setInventory":
      return {
        ...state,
        list_inventory: [...action.payload],
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
    case "setRefresh":
      return {
        ...state,
        refresh: !state.refresh,
      };
    default:
      return state;
  }
};
