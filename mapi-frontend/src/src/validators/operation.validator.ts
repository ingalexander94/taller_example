import * as Yup from "yup";
import { Operation } from "src/interfaces";

export class OperationValidatorForm {
  static initialState: Operation = {
    id_operation: 0,
    system: null,
    code: null,
    operation_team: 0,
    operation_component: "",
    operation_measure: 0,
    operation_description: "",
    operation_technician: null,
    technician_code: "",
    operation_duration_hours: null,
    operation_duration_minutes: null,
    operation_maintenance_type: null,
    maintenance_type_name: "",
    operation_kilometres: null,
    operation_hours: null,
    operation_total: null,
    operation_models: [],
  };

  static validatorSchemaOperation = Yup.object({
    operation_team: Yup.number().min(1, "El equipo es necesario"),
    operation_component: Yup.string()
      .trim()
      .required("El componente es necesario"),
    operation_measure: Yup.number().min(1, "El tipo de medición es necesaria"),
    operation_description: Yup.string()
      .trim()
      .max(200, "Se permiten máximo 200 caracteres")
      .required("La descripción es necesaria"),
  });
}
