import * as Yup from "yup";

interface InitialStateFormForgot {
  new_password: string;
  confirm_password: string;
}

export class ForgotValidatorForm {
  static initialState: InitialStateFormForgot = {
    new_password: "",
    confirm_password: "",
  };

  static validatorSchemaForgot = Yup.object({
    new_password: Yup.string()
      .required("La nueva contraseña es necesaria")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{10,}$/,
        "No es una contraseña válida"
      ),
    confirm_password: Yup.string()
      .required("Por favor confirma la contraseña")
      .oneOf([Yup.ref("new_password")], "Las contraseñas no coinciden"),
  });
}
