import { Personal } from "src/interfaces";
import * as Yup from "yup";

export class FormCreatePersonValidator {
  static initialState: Personal = {
    id_personal: 0,
    personal_document: "",
    personal_names: "",
    personal_surnames: "",
    personal_phone: "",
    personal_photo: "",
    personal_salary: 0,
    technician_name: "",
    personal_technician: 0,
  };

  static validatorSchemaAddPerson = Yup.object({
    personal_technician: Yup.number()
      .min(1, "El cargo es necesario")
      .required("El cargo es necesario"),
    personal_document: Yup.number()
      .min(0, "El documento es necesario")
      .required("El documento es necesario"),
    personal_photo: Yup.string().trim().required("La foto es necesaria"),
    personal_phone: Yup.number()
      .required("El teléfono es necesario")
      .typeError("El teléfono debe ser un número")
      .positive("El teléfono debe ser un número positivo")
      .integer("El teléfono debe ser un número entero"),
    personal_surnames: Yup.string()
      .trim()
      .required("Los apellidos son necesarios"),
    personal_names: Yup.string().trim().required("Los nombres son necesarios"),
    personal_salary: Yup.number()
      .min(1, "El salario es necesario")
      .max(999999999, "El salario supera el máximo permitido")
      .required("El salario es necesario"),
  });
}
