import { useReducer } from "react";
import { InventoryContext } from "./inventory.context";
import { Inventory, InventoryState } from "src/interfaces/inventory.interface";
import { inventoryReducer } from "./inventory.reducer";

const INITIAL_STATE: InventoryState = {
  list_inventory: [],
  inventory: {
    id_inventory: "" ,
    inventory_item_name: "",
    inventory_reference: "",
    inventory_quantity: "" ,
    inventory_units: "",
    inventory_price_without_tax: "",
    inventory_tax: "",
    inventory_price_with_tax: "",
  },
  search: "",
  totalPages: 0,
  refresh: false,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const InventoryProvider = ({ children }: Props) => {
  const [inventoryState, dispatch] = useReducer(inventoryReducer, INITIAL_STATE);

  const setInventory = (list_inventory: Inventory[]) => {
    dispatch({ type: "setInventory", payload: list_inventory });
  };
 
  const setTotalPages = (totalPages: number) => {
    dispatch({ type: "setTotalPages", payload: totalPages });
  };

  const setSearch = (search: string) => {
    dispatch({ type: "setSearch", payload: search });
  };

  const setCreateInventory = (inventory: Inventory[]) => {
    dispatch({ type: "setInventory", payload: inventory });
  };

  const setRefresh = () => {
    dispatch({ type: "setRefresh" });
  };

  return (
    <InventoryContext.Provider
      value={{
        inventoryState,
        setInventory,
        setSearch,
        setTotalPages,
        setCreateInventory,
        setRefresh,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryContext;
