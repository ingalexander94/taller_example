import axios from "axios";
import { CustomStorage } from "src/lib";
import { PersonalEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class PersonalService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/personal`;

  private constructor() {}

  static getAll(page: number, search: string = "") {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${PersonalEndpoints.all}/?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static download() {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${PersonalEndpoints.download}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getDetail(id = "") {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${PersonalEndpoints.detail}/${id}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static save(formData: FormData) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${PersonalEndpoints.save}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: "Bearer " + CustomStorage.token,
        },
      }),
      controller,
    };
  }

  static delete(id: number = 0) {
    const controller = loadAbort();
    return {
      call: axios.delete(`${this.API_URL}/${PersonalEndpoints.delete}/${id}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }
}
