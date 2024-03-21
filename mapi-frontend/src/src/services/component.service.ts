import axios from "axios";
import { Component } from "src/interfaces";
import { CustomStorage } from "src/lib";
import { ComponentEndpoints } from "src/models/component.endpoints.model";
import { loadAbort } from "src/utilities";

export class ComponentService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/components`;

  private constructor() {}

  static all(id_team: number) {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${ComponentEndpoints.all}/${id_team}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static save(components: Component[]) {
    const controller = loadAbort();
    return {
      call: axios.post(
        `${this.API_URL}/${ComponentEndpoints.save}`,
        components,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static create(component: Component) {
    const controller = loadAbort();
    return {
      call: axios.post(
        `${this.API_URL}/${ComponentEndpoints.create}`,
        component,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static removeSystem(id_system: number) {
    const controller = loadAbort();
    return {
      call: axios.delete(
        `${this.API_URL}/${ComponentEndpoints.remove_system}/${id_system}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static removeComponent(id_component: number) {
    const controller = loadAbort();
    return {
      call: axios.delete(
        `${this.API_URL}/${ComponentEndpoints.remove_component}/${id_component}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }
}
