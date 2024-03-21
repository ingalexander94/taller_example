import * as Yup from "yup";

interface InitialStateFormAddItemInventory {
    id_inventory: string;
    inventory_reference: string;
    inventory_quantity: string;
    inventory_item_name: string;
    inventory_price_without_tax: string;
    inventory_price_with_tax: string;
    inventory_tax: string;
    inventory_units: string;
}

export class AddItemInventoryValidatorForm {
  static initialState: InitialStateFormAddItemInventory = {
    id_inventory: "",
    inventory_reference: "",
    inventory_quantity: "",
    inventory_item_name: "",
    inventory_price_without_tax: "",
    inventory_price_with_tax: "",
    inventory_tax: "",
    inventory_units: ""
  };

  static validatorSchemaAddItemInventory = Yup.object({
    inventory_reference: Yup.string()
      .trim() 
      .required("La referencia del item es necesaria"),
    inventory_item_name: Yup.string()
      .trim() 
      .required("El nombre del item es necesario"),
  });
}
