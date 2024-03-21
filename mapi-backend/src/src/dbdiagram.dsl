Table mp_users {
  id_user INT [INCREMENT, PRIMARY KEY]
  user_names VARCHAR(100)
  user_surnames VARCHAR(100)
  user_email VARCHAR(100)
  user_password VARCHAR(64)
  user_phone VARCHAR(20)
  user_photo VARCHAR(100)
  user_state TINYINT [note: '0: inactivo, 1: activo']
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

Table mp_roles {
  id_role INT [INCREMENT, PRIMARY KEY]
  role_name VARCHAR(100)
  role_description VARCHAR(100)
  role_state TINYINT [note: '0: inactivo, 1: activo']
}

Table mp_user_roles {
  id_user_role INT [INCREMENT, PRIMARY KEY]
  ur_id_user INT
  ur_id_role INT
}

Table mp_teams {
  id_team INT [INCREMENT, PRIMARY KEY]
  team_name VARCHAR(100)
  team_state TINYINT [note: '0: inactivo, 1: activo']
  team_created_at TIMESTAMP
}

Table mp_brands {
  id_brand INT [INCREMENT, PRIMARY KEY]
  brand_code VARCHAR(100)
  brand_name VARCHAR(100)
  brand_team INT
  brand_state TINYINT [note: '0: inactivo, 1: activo']
  brand_created_at TIMESTAMP
}

Table mp_models {
  id_model INT [INCREMENT, PRIMARY KEY]
  model_code VARCHAR(100)
  model_name VARCHAR(100)
  model_init_year SMALLINT
  model_final_year SMALLINT
  model_engine VARCHAR(100)
  model_transmission VARCHAR(300)
  model_application VARCHAR(300)
  model_suspension VARCHAR(300)
  model_rear_bridge VARCHAR(300)
  model_brand INT
  model_state TINYINT [note: '0: inactivo, 1: activo']
  model_created_at TIMESTAMP
}

Table mp_components {
  id_component INT [INCREMENT, PRIMARY KEY]
  component_code VARCHAR(100)
  component_name VARCHAR(100)
  component_team INT
  component_state TINYINT [note: '0: inactivo, 1: activo']
  component_created_at TIMESTAMP
}

Table mp_systems {
  id_system INT [INCREMENT, PRIMARY KEY]
  system_code VARCHAR(100)
  system_name VARCHAR(100)
  system_component INT
  system_state TINYINT [note: '0: inactivo, 1: activo']
  system_created_at TIMESTAMP
}

Table mp_technician {
  id_technician INT [INCREMENT, PRIMARY KEY]
  technician_name VARCHAR(100)
  technician_code VARCHAR(100)
  technician_description VARCHAR(400)
  technician_education VARCHAR(100)
  technician_salary VARCHAR(20)
  technician_icon VARCHAR(20)
  technician_state TINYINT [note: '0: inactivo, 1: activo']
  created_at TIMESTAMP
  updated_at TIMESTAMP
}

Table mp_operations {
  id_operation INT [INCREMENT, PRIMARY KEY]
  operation_team INT
  operation_component VARCHAR(50)
  operation_measure TINYINT [note: '1: Horas, 2: Kilometros']
  operation_description VARCHAR(200)
  operation_technician INT
  operation_duration_minutes INT
  operation_duration_hours INT
  operation_maintenance_type INT
  operation_total INT
  operation_kilometres INT
  operation_hours INT
  operation_state TINYINT [note: '0: inactivo, 1: activo']
  operation_created_at TIMESTAMP
}

Table mp_maintenance_type {
  id_maintenance_type INT [INCREMENT, PRIMARY KEY]
  maintenance_type_name VARCHAR(100)
  maintenance_type_state TINYINT [note: '0: inactivo, 1: activo']
  maintenance_type_created_at TIMESTAMP
}

Table mp_operation_model {
  id_operation_model INT [INCREMENT, PRIMARY KEY]
  om_id_operation INT
  om_id_model INT
}

Table mp_clients {
  id_client INT [INCREMENT, PRIMARY KEY]
  client_nit VARCHAR(50)
  client_company VARCHAR(100)
  client_manager_fullname VARCHAR(100)
  client_manager_phone VARCHAR(50)
  client_responsible VARCHAR(100)
  client_status INT
  client_subdomain VARCHAR(100)
  client_db_port SMALLINT
  client_db_host VARCHAR(50)
  client_db_name VARCHAR(50)
  client_db_user VARCHAR(50)
  client_db_password VARCHAR(100)
  client_created_at TIMESTAMP
}


Table mp_user_team {
  id_user_team INT [INCREMENT, PRIMARY KEY]
  ut_team INT
  ut_brand INT
  ut_model INT
  ut_year SMALLINT
  ut_car_plate VARCHAR(50)
  ut_application VARCHAR(100)
  ut_date_purchased TIMESTAMP
  ut_measure INT
  ut_vin VARCHAR(50)
  ut_driver INT
  ut_engine INT
  ut_wheels_number TINYINT
  ut_rear_tires_number TINYINT
  ut_front_tires_number TINYINT
  ut_transmission INT
  ut_bridge INT
  ut_state INT
}

Table mp_engines {
  id_engine INT [INCREMENT, PRIMARY KEY]
  engine_brand VARCHAR(100)
  engine_model VARCHAR(100)
  engine_cylinder_capacity VARCHAR(100)
  engine_serial VARCHAR(100)
  engine_power VARCHAR(100)
  engine_rpm_power VARCHAR(100)
  engine_torque VARCHAR(100)
  engine_governed_speed VARCHAR(100)
  engine_ecm_name VARCHAR(100)
  engine_ecm_code VARCHAR(100)
  engine_part_ecm VARCHAR(100)
  engine_serial_ecm VARCHAR(100)
  engine_cpl VARCHAR(100)
}

Table mp_transmissions {
  id_transmission INT [INCREMENT, PRIMARY KEY]
  transmission_brand VARCHAR(100)
  transmission_model VARCHAR(100)
  transmission_oil_cooler SMALLINT
  transmission_serial VARCHAR(100)
}

TABLE mp_bridges {
  id_bridge INT [INCREMENT, PRIMARY KEY]
  bridge_front_brand VARCHAR(100)
  bridge_front_model VARCHAR(100)
  bridge_serial VARCHAR(100)
  bridge_front_suspension VARCHAR(100)
  bridge_rear_suspension VARCHAR(100)
  bridge_rear_brand VARCHAR(100)
  bridge_rear_model VARCHAR(100)
  bridge_intermediate_differential VARCHAR(100)
  bridge_rear_differential VARCHAR(100)
}

Table mp_team_photo {
  id_team_photo INT [INCREMENT, PRIMARY KEY]
  tp_user_team INT
  tp_photo VARCHAR(300)
}

Ref: mp_user_roles.ur_id_user > mp_users.id_user
Ref: mp_user_roles.ur_id_role > mp_roles.id_role
Ref: mp_brands.brand_team > mp_teams.id_team
Ref: mp_models.model_brand > mp_brands.id_brand
Ref: mp_components.component_team > mp_teams.id_team
Ref: mp_systems.system_component > mp_components.id_component
Ref: mp_operations.operation_maintenance_type > mp_maintenance_type.id_maintenance_type
Ref: mp_operations.operation_technician > mp_technician.id_technician
Ref: mp_operations.operation_team > mp_teams.id_team
Ref: mp_operation_model.om_id_operation > mp_operations.id_operation
Ref: mp_operation_model.om_id_model > mp_models.id_model


Ref: mp_user_team.ut_team > mp_teams.id_team
Ref: mp_user_team.ut_brand > mp_brands.id_brand
Ref: mp_user_team.ut_model > mp_models.id_model
Ref: mp_user_team.ut_driver > mp_users.id_user
Ref: mp_user_team.ut_engine > mp_engines.id_engine
Ref: mp_user_team.ut_transmission > mp_transmissions.id_transmission
Ref: mp_user_team.ut_bridge > mp_bridges.id_bridge
Ref: mp_team_photo.tp_user_team > mp_user_team.id_user_team









