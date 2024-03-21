import { Brand } from "src/interfaces";
import * as Yup from "yup";

export class AddBrandValidatorForm {
  static initialState: Brand = {
    brand_name: "",
    brand_code: "",
    brand_team: 0,
    id_brand: 0,
    brand_models: [],
  };

  static validatorSchemaBrand = Yup.object({
    brand_name: Yup.string()
      .trim()
      .required("El nombre de la marca es necesaria"),
  });
}
