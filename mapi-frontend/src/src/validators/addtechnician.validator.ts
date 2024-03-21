import * as Yup from "yup";

interface InitialStateFormAddTechnician {
    technician_name: string;
    technician_code: string;
    technician_education: string;
    technician_salary: string;
    technician_description: string;
    technician_icon: string;
}

export class AddTechnicianValidatorForm {
  static initialState: InitialStateFormAddTechnician = {
    technician_name: "",
    technician_code: "",
    technician_education: "",
    technician_salary: "",
    technician_description: "",
    technician_icon: ""
  };

  static validatorSchemaAddTechnician = Yup.object({
    technician_name: Yup.string()
      .trim() 
      .required("El nombre del técnico es necesario"),
    technician_code: Yup.string()
      .trim() 
      .required("El nombre del técnico es necesario"),
  });
}
