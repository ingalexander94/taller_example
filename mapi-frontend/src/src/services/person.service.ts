import axios from "axios";
import { CustomStorage } from "src/lib";
import { UserEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class PersonService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/users`;

  private constructor() {}

  static getAll(page: number) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${UserEndpoints.listPersonPage}/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static search(data: object) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${UserEndpoints.search}`, data, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getAllPerson() {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${UserEndpoints.search}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  // static getCreateAll() {
  //   const controller = loadAbort();
  //   return {
  //     call: axios.get(`${this.API_URL}/${UserEndpoints.detailsUserTeam}`, {
  //       headers: {
  //         Authorization: `Bearer ${CustomStorage.token}`,
  //       },
  //     }),
  //     controller,
  //   };
  // }

  // static getPerson(id = "") {
  //   const controller = loadAbort();
  //   return {
  //     call: axios.get(`${this.API_URL}${UserEndpoints.detailsUserTeam}/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${CustomStorage.token}`,
  //       },
  //     }),
  //     controller,
  //   };
  // }
}
