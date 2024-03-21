import * as Yup from "yup";

export class FormExpensesOperation {

  static initialState = {
    ope_car_plate: '',
    ope_phone_manager: '',
    ope_company: '',
    ope_advance_company: '',
    ope_id_driver: '',
    ope_name_manager: '',
    ope_departure_date: '',
    ope_departure_location: '',
    ope_arrival_date: '',
    ope_arrival_place: '',
    ope_km_driven: '',
    expenses: [{
        ed_concept: '',
        ed_price: 0
    }]
  };

static validatorSchemaExpensesOperation = Yup.object({
    ope_id_driver: Yup.string()
        .trim() 
        .required("El conductor es necesario"),
    ope_car_plate: Yup.string()
        .trim() 
        .notOneOf([""], "La placa no puede estar vacía")
        .required("La placa es necesearia"),
    expenses: Yup.array().of(
        Yup.object({
            ed_concept: Yup.string()
                .trim()
                .required("El concepto es necesario"),
            ed_price: Yup.number()
                .min(1, "El valor es necesario")
                .required("El valor es necesario")
        })
    ),

    });
}
