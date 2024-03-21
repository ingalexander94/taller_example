export interface InventoryState {
    list_inventory: Inventory[];
    inventory: Inventory;
    search: string;
    totalPages: number;
    refresh: boolean;
}

export interface InventoryResponse {
    total: number,
    current_page: number,
    last_page: number,
    inventory: Inventory[],
}

export interface Inventory {
    id_inventory: string,
    inventory_item_name: string,
    inventory_reference: string,
    inventory_quantity: string,
    inventory_units: string,
    inventory_price_without_tax: string,
    inventory_tax: string,
    inventory_price_with_tax: string,
}