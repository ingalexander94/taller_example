import axios from "axios";
import { CustomStorage } from "src/lib";
import { UserTeamsEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class UserTeamsService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/usersTeam`;

  private constructor() {}

  static getUserTeamsPlates() {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${UserTeamsEndpoints.list_plates}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getUserTeamsDrivers() {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${UserTeamsEndpoints.list_drivers}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }


}
