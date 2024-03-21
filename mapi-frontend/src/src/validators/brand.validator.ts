import * as Yup from "yup";

export class BrandValidatorForm {
  static currentYear = new Date().getFullYear() + 1;

  static validationSchemaBrand = Yup.object().shape({
    brands: Yup.array().of(
      Yup.object().shape({
        brand_name: Yup.string()
          .trim()
          .required("El nombre de la marca es necesario"),
        brand_models: Yup.array().of(
          Yup.object().shape({
            model_name: Yup.string()
              .trim()
              .required("El nombre del modelo es necesario"),
            model_init_year: Yup.number()
              .min(1900)
              .max(this.currentYear)
              .required("El año inicial es necesario"),
            model_final_year: Yup.number()
              .min(1900)
              .max(this.currentYear)
              .required("El año final es necesario")
              .min(
                Yup.ref("model_init_year"),
                "El año final debe ser mayor que el año inicial"
              ),
            model_engine: Yup.string()
              .trim()
              .required("El nombre del motor es necesario"),
            model_transmission: Yup.string()
              .trim()
              .required("La transmisión es necesaria"),
            model_application: Yup.string()
              .trim()
              .required("La aplicación es necesaria"),
            model_suspension: Yup.string()
              .trim()
              .required("La suspensión es necesaria"),
            model_rear_bridge: Yup.string()
              .trim()
              .required("El puente trasero es necesario"),
          })
        ),
      })
    ),
  });
}
