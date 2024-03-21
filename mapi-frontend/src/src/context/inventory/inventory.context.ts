import { createContext } from "react";
import { Inventory, InventoryState } from "src/interfaces/inventory.interface";

export type InventoryContextProps = {
  inventoryState: InventoryState;
  setInventory: (list_inventory: Inventory[]) => void;
  setTotalPages: (totalPages: number) => void;
  setSearch: (search: string) => void;
  setCreateInventory: (i: Inventory[]) => void;
  setRefresh: () => void;
};

export const InventoryContext = createContext<InventoryContextProps>(
  {} as InventoryContextProps
);
