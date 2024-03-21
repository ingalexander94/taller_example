import axios from "axios";
import { CustomStorage } from "src/lib";
import { InventoryEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class InventoryService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/inventory`;

  private constructor() {}

  static getAll(page: string) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${InventoryEndpoints.all}/${page}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static save(item_inventory: object) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${InventoryEndpoints.save}`, item_inventory, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static delete(id_item_inventory: number) {
    const controller = loadAbort();
    return {
      call: axios.delete(`${this.API_URL}/${InventoryEndpoints.delete}/${id_item_inventory}`,{
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static search(data: object) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${InventoryEndpoints.search}`, data, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getDetail(id_item_inventory: number) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${InventoryEndpoints.detail}/${id_item_inventory}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static verifyRef(item_ref: string) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${InventoryEndpoints.verifyRef}/${item_ref}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }
}
