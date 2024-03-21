import axios from "axios";
import { CustomStorage } from "src/lib";
import { OperationExpensesEndpoints } from "src/models";
import { loadAbort } from "src/utilities";

export class OperationExpensesService {
  private static API_URL = `${import.meta.env.VITE_API_URL}/operatingExpenses`;

  private constructor() {}

  static getEquipment() {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${OperationExpensesEndpoints.get_equipment_data}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getPlatesByEquipment(id: string) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${OperationExpensesEndpoints.get_plates_by_equipment}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getOperationExpensesList(plate: string, page: string) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${OperationExpensesEndpoints.get_operations_expenses}/${plate}?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static getOperationExpensesDetail(id: string) {
    const controller = loadAbort();
    return {
      call: axios.get(
        `${this.API_URL}/${OperationExpensesEndpoints.get_operations_expenses_detail}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${CustomStorage.token}`,
          },
        }
      ),
      controller,
    };
  }

  static createOperationExpenses(data: {}) {
    const controller = loadAbort();
    return {
      call: axios.post(
        `${this.API_URL}/${OperationExpensesEndpoints.create_operation_expenses}`, data,
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
