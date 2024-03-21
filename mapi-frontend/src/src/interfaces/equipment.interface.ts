export interface EquipmentState {
  equipments: Equipment[];
  search: string;
  team: number;
  totalPages: number;
}

export interface Equipment {
  id_user_team: number;
  mp_kilometers: number;
  ut_state: number;
  brand_name: string;
  model_name: string;
  team_name: string;
  ut_car_plate: string;
  ut_photo: string;
}

export interface EquipmentDetail {
  id_user_team: number;
  id_brand: number;
  brand_name: string;
  id_model: number;
  model_name: string;
  id_team: number;
  team_name: string;
  ut_date_purchased: string;
  ut_year: number;
  ut_application: string;
  ut_car_plate: string;
  ut_vin: string;
  ut_state: number;
  id_personal: number;
  personal_names: string;
  personal_surnames: string;
  personal_photo: string;
  personal_phone: string;
  id_engine: number | null;
  engine_model: string | null;
  engine_brand: string | null;
  engine_cylinder_capacity: string | null;
  engine_serial: string | null;
  engine_power: string | null;
  engine_rpm_power: string | null;
  engine_governed_speed: string | null;
  engine_ecm_name: string | null;
  engine_ecm_code: string | null;
  engine_torque: string | null;
  photos: EquipmentPhotos[];
}

export interface EquipmentData {
  id_user_team: number;
  ut_brand: number;
  ut_model: number;
  ut_team: number;
  ut_year: number;
  ut_car_plate: string;
  ut_application: string;
  ut_date_purchased: string | null;
  ut_measure: number | null;
  ut_driver: number | null;
  ut_state: number | null;
  engine: Engine | null;
  ut_wheels_number: number | null;
  ut_rear_tires_number: number | null;
  ut_front_tires_number: number | null;
  transmission: Transmission | null;
  bridge: Bridges | null;
  photos: PhotoEquipment[];
  files: File[];
  placeholder: string;
}

export interface EquipmentPhotos {
  id_team_photo: number;
  tp_photo: string;
  tp_photo_name: string;
}

export interface TeamFilter {
  id_team: number;
  team_name: string;
}

export interface Driver {
  id_personal: number;
  personal_names: string;
  personal_surnames: string;
}

export interface Engine {
  id_engine: number;
  engine_brand: string | null;
  engine_model: string | null;
  engine_cylinder_capacity: string | null;
  engine_serial: string | null;
  engine_power: string | null;
  engine_torque: string | null;
  engine_rpm_power: string | null;
  engine_governed_speed: string | null;
  engine_ecm_name: string | null;
  engine_ecm_code: string | null;
  engine_part_ecm: string | null;
  engine_serial_ecm: string | null;
  engine_cpl: string | null;
}
export interface Transmission {
  id_transmission: number;
  transmission_brand: string | null;
  transmission_model: string | null;
  transmission_oil_cooler: string | null;
  transmission_serial: string | null;
}

export interface Bridges {
  id_bridge: number;
  bridge_front_brand: string | null;
  bridge_front_model: string | null;
  bridge_serial: string | null;
  bridge_front_suspension: string | null;
  bridge_rear_suspension: string | null;
  bridge_rear_brand: string | null;
  bridge_rear_model: string | null;
  bridge_intermediate_differential: string | null;
  bridge_rear_differential: string | null;
}

export interface PhotoEquipment {
  id_team_photo: number;
  tp_photo: string;
}
