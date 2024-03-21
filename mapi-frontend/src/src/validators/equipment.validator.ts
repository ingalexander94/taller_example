import * as Yup from "yup";
import { EquipmentData } from "src/interfaces";

export class EquipmentValidatorForm {
  static initialState: EquipmentData = {
    id_user_team: 0,
    ut_team: 0,
    ut_brand: 0,
    ut_model: 0,
    ut_year: 0,
    ut_car_plate: "",
    ut_application: "",
    ut_date_purchased: null,
    ut_measure: null,
    ut_driver: null,
    ut_state: null,
    ut_wheels_number: null,
    ut_front_tires_number: null,
    ut_rear_tires_number: null,
    engine: {
      id_engine: 0,
      engine_brand: null,
      engine_model: null,
      engine_cylinder_capacity: null,
      engine_serial: null,
      engine_power: null,
      engine_torque: null,
      engine_rpm_power: null,
      engine_governed_speed: null,
      engine_ecm_name: null,
      engine_ecm_code: null,
      engine_part_ecm: null,
      engine_serial_ecm: null,
      engine_cpl: null,
    },
    transmission: {
      id_transmission: 0,
      transmission_brand: null,
      transmission_model: null,
      transmission_oil_cooler: null,
      transmission_serial: null,
    },
    bridge: {
      id_bridge: 0,
      bridge_front_brand: null,
      bridge_front_model: null,
      bridge_serial: null,
      bridge_front_suspension: null,
      bridge_rear_suspension: null,
      bridge_rear_brand: null,
      bridge_rear_model: null,
      bridge_intermediate_differential: null,
      bridge_rear_differential: null,
    },
    photos: [],
    files: [],
    placeholder: "",
  };

  static validatorSchemaOperation = Yup.object({
    ut_team: Yup.number().min(1, "El equipo es necesario"),
    ut_brand: Yup.number().min(1, "La marca es necesaria"),
    ut_model: Yup.number().min(1, "El modelo es necesario"),
    ut_year: Yup.number().min(1, "El año es necesario"),
    ut_car_plate: Yup.string().trim().required("La placa es necesaria"),
  });
}
