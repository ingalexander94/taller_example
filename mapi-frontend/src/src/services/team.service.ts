import axios from "axios";
import { Team } from "src/interfaces";
import { CustomStorage } from "src/lib";
import { TeamEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class TeamService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/teams`;

  private constructor() {}

  static getAll() {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${TeamEndpoints.all}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static save(team: Team) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${TeamEndpoints.save}`, team, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getDetail(id_team: string) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${TeamEndpoints.detail}/${id_team}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static delete(id_team: string) {
    const controller = loadAbort();
    return {
      call: axios.delete(`${this.API_URL}/${TeamEndpoints.delete}/${id_team}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }
}
