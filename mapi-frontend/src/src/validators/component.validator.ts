import { Component, System } from "src/interfaces";
import * as Yup from "yup";

export class ComponentValidatorForm {
  static validationSchemaComponent = Yup.object().shape({
    components: Yup.array().of(
      Yup.object().shape({
        component_code: Yup.string()
          .trim()
          .required("El código del componente es necesario")
          .test(
            "unique",
            "El código del componente debe ser único",
            function (value) {
              if (this.options.context && this.options.context?.components) {
                return (
                  this.options.context?.components.filter(
                    (component: Component) =>
                      component.component_code.toLowerCase() ===
                      value.toLowerCase()
                  ).length < 2
                );
              }
              return false;
            }
          ),
        component_name: Yup.string()
          .trim()
          .required("El nombre del componente es necesario"),
        component_systems: Yup.array().of(
          Yup.object().shape({
            system_code: Yup.string()
              .trim()
              .required("El código del sistema es necesario")
              .test(
                "unique",
                "El código del sistema debe ser único",
                function (value) {
                  if (
                    this.options.context &&
                    this.options.context?.components
                  ) {
                    const options: any = this.options;
                    const index = parseInt(options["index"]);

                    if (this.options.context?.components[index]) {
                      return (
                        this.options.context?.components[
                          index
                        ].component_systems.filter(
                          (system: System) =>
                            system.system_code.toLowerCase() ===
                            value.toLowerCase()
                        ).length < 2
                      );
                    } else {
                      return true;
                    }
                  }
                  return false;
                }
              ),
            system_name: Yup.string()
              .trim()
              .required("El nombre del sistema es necesario"),
          })
        ),
      })
    ),
  });
}
