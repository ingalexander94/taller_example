import axios from "axios";
import { Brand } from "src/interfaces";
import { CustomStorage } from "src/lib";
import { BrandEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class BrandService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/brands`;

  private constructor() {}

  static save(brands: Brand[]) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${BrandEndpoints.save}`, brands, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static create(brand: Brand) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${BrandEndpoints.create}`, brand, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static removeModel(id_model: number) {
    const controller = loadAbort();
    return {
      call: axios.delete(
        `${this.API_URL}/${BrandEndpoints.remove_model}/${id_model}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static removeBrand(id_brand: number) {
    const controller = loadAbort();
    return {
      call: axios.delete(
        `${this.API_URL}/${BrandEndpoints.remove_brand}/${id_brand}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getCode(brand_name: string, brand_code: string, brand_team: number) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${BrandEndpoints.code}?brand_name=${brand_name}&brand_code=${brand_code}&brand_team=${brand_team}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getByTeam(id_team: number) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${BrandEndpoints.models}/${id_team}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }
}
