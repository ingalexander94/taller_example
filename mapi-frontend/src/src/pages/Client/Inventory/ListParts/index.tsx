import { InventoryProvider } from "src/context/inventory";
import ListPartsSearch from "./components/ListPartsSearchs";

export const ListParts = () => {
  return (
    <>
      <InventoryProvider>
        <ListPartsSearch />
      </InventoryProvider>
    </>
  );
};
