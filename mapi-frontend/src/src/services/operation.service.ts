import axios from "axios";
import { Operation } from "src/interfaces";
import { CustomStorage } from "src/lib";
import { OperationEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class OperationService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/operations`;

  private constructor() {}

  static getOperationsByPage(page: number = 1, orderBy: string = "ASC") {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${OperationEndpoints.all}?page=${page}&orderBy=${orderBy}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static searchByCode(code: string = "", id_team: number = 0) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${OperationEndpoints.search_code}?code=${code}&id_team=${id_team}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getOperationFilterByPage(
    id_model: number = 0,
    id_component: number = 0,
    page: number,
    querySystem: string
  ) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${OperationEndpoints.filter}?page=${page}&id_model=${id_model}&id_component=${id_component}&systems=${querySystem}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getModalData() {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${OperationEndpoints.get_modal_data}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getComponentsByIdTeam(id_team: string) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${OperationEndpoints.get_components}/${id_team}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getModelsByIdTeam(id_team: string, model_code: string) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${OperationEndpoints.get_models}?id_team=${id_team}&model_code=${model_code}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static saveOperation(operation: Operation) {
    const controller = loadAbort();
    operation.operation_measure = parseInt(
      operation.operation_measure.toString()
    );
    operation.operation_team = parseInt(operation.operation_team.toString());
    operation.operation_technician =
      !operation.operation_technician ||
      operation.operation_technician.toString() === "0"
        ? null
        : operation.operation_technician;
    operation.operation_total =
      !operation.operation_total || operation.operation_total.toString() === "0"
        ? null
        : parseInt(operation.operation_total.toString().replace("$", ""));
    operation.operation_kilometres =
      !operation.operation_kilometres ||
      operation.operation_kilometres.toString() === "0"
        ? null
        : parseInt(operation.operation_kilometres.toString());
    operation.operation_hours =
      !operation.operation_hours || operation.operation_hours.toString() === "0"
        ? null
        : parseInt(operation.operation_hours.toString());
    operation.operation_maintenance_type =
      !operation.operation_maintenance_type ||
      operation.operation_maintenance_type.toString() === "0"
        ? null
        : operation.operation_maintenance_type;
    return {
      call: axios.post(
        `${this.API_URL}/${OperationEndpoints.save}`,
        operation,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static removeOperation(id_operation: number) {
    const controller = loadAbort();
    return {
      call: axios.delete(
        `${this.API_URL}/${OperationEndpoints.remove}/${id_operation}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static searchOperation(data: object) {
    const controller = loadAbort();
    return {
      call: axios.post(`${this.API_URL}/${OperationEndpoints.search}`, data, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }

  static getAllOperations() {
    const controller = loadAbort();
    return {
      call: axios.get(`${this.API_URL}/${OperationEndpoints.allData}`, {
        headers: {
          Authorization: `Bearer ${CustomStorage.token}`,
        },
      }),
      controller,
    };
  }
}
