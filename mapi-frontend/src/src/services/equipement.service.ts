import axios from "axios";
import { EquipmentData } from "src/interfaces";
import { CustomStorage } from "src/lib";
import { EquipmentEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class EquipmentService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/usersTeam`;

  private constructor() {}

  static getTeams(id: string) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${EquipmentEndpoints.teams}/${id}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getBrandsByTeam(id_team: number = 0) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${EquipmentEndpoints.brands}/${id_team}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getDrivers() {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${EquipmentEndpoints.listDriverUserTeam}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getMyTeams() {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${EquipmentEndpoints.my_teams}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getByPage(page: number, search: string = "", team: number = 0) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${EquipmentEndpoints.listUserTeams}?page=${page}&search=${search}&team=${team}`,
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
      call: axios.get(`${this.API_URL}/${EquipmentEndpoints.download}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getDetail(id_user_team: string) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${EquipmentEndpoints.detailUserTeam}/${id_user_team}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getSaveData(id_user_team: string) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${EquipmentEndpoints.getSaveData}/${id_user_team}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static save(data: EquipmentData) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${EquipmentEndpoints.save}`, data, {
        headers: {
          Authorization: "Bearer " + CustomStorage.token,
        },
      }),
      controller,
    };
  }

  static uploadPhotos(id: number, formData: FormData) {
    const controller = loadAbort();
    return {
      call: axios.post(
        `${this.API_URL}/${EquipmentEndpoints.uploadPhotos}/${id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: "Bearer " + CustomStorage.token,
          },
        }
      ),
      controller,
    };
  }

  static deletePhoto(id: number) {
    const controller = loadAbort();
    return {
      call: axios.delete(
        `${this.API_URL}/${EquipmentEndpoints.deletePhoto}/${id}`,
        {
          headers: {
            Authorization: "Bearer " + CustomStorage.token,
          },
        }
      ),
      controller,
    };
  }

  static deleteAllPhoto(id: number) {
    const controller = loadAbort();
    return {
      call: axios.delete(
        `${this.API_URL}/${EquipmentEndpoints.deleteAllPhoto}/${id}`,
        {
          headers: {
            Authorization: "Bearer " + CustomStorage.token,
          },
        }
      ),
      controller,
    };
  }
}
