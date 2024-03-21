import { Component } from "src/interfaces";
import * as Yup from "yup";

export class AddComponentValidatorForm {
  static initialState: Component = {
    id_component: 0,
    component_team: 0,
    component_systems: [],
    component_code: "",
    component_name: "",
  };

  static validatorSchemacomponent = Yup.object({
    component_code: Yup.string()
      .trim()
      .required("El código del componente es necesario"),
    component_name: Yup.string()
      .trim()
      .required("El nombre del componente es necesario"),
  });
}
