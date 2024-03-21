import axios from "axios";
import { CustomStorage } from "src/lib";
import { TechnicianEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class TechnicianService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/technician`;

  private constructor() {}

  static getAll(page: string) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${TechnicianEndpoints.all}/${page}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static save(technician: object) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${TechnicianEndpoints.save}`, technician, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static delete(id_technician: number) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${TechnicianEndpoints.delete}/${id_technician}`,{
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
      call: axios.post(`${this.API_URL}/${TechnicianEndpoints.search}`, data, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getDetail(id_technician: number) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${TechnicianEndpoints.detail}/${id_technician}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static verifyName(technician_name: string) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${TechnicianEndpoints.verifyName}/${technician_name}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static verifyCode(technician_code: string) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${TechnicianEndpoints.verifyCode}/${technician_code}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }
}
