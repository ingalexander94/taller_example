CREATE TABLE IF NOT EXISTS mp_teams (
    id_team INT AUTO_INCREMENT PRIMARY KEY,
    team_name VARCHAR(100) UNIQUE NOT NULL,
    team_state TINYINT DEFAULT 1,
    team_created_at TIMESTAMP DEFAULT NOW()
);

INSERT IGNORE INTO mp_teams (team_name) VALUES ("Tractocamión"), ("Moto"), ("Carro"), ("Trailer"), ("Modular");

CREATE TABLE IF NOT EXISTS mp_brands (
    id_brand INT AUTO_INCREMENT PRIMARY KEY,
    brand_code VARCHAR(100) NOT NULL,
    brand_name VARCHAR(100) NOT NULL,
    brand_team INT NOT NULL,
    brand_state TINYINT DEFAULT 1,
    brand_created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mp_models (
    id_model INT AUTO_INCREMENT PRIMARY KEY,
    model_code VARCHAR(100) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    model_init_year SMALLINT NOT NULL,
    model_final_year SMALLINT NOT NULL,
    model_engine VARCHAR(100) NOT NULL,
    model_transmission VARCHAR(300) NOT NULL,
    model_suspension VARCHAR(300) NOT NULL,
    model_rear_bridge VARCHAR(300) NOT NULL,
    model_application VARCHAR(300) NOT NULL,
    model_brand INT NOT NULL,
    model_state TINYINT DEFAULT 1,
    model_created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE mp_brands
ADD FOREIGN KEY (brand_team) REFERENCES mp_teams(id_team) ON DELETE CASCADE;

ALTER TABLE mp_models
ADD FOREIGN KEY (model_brand) REFERENCES mp_brands(id_brand) ON DELETE CASCADE;


CREATE TABLE IF NOT EXISTS mp_components (
    id_component INT AUTO_INCREMENT PRIMARY KEY,
    component_code VARCHAR(100) NOT NULL,
    component_name VARCHAR(100) NOT NULL,
    component_team INT NOT NULL,
    component_state TINYINT DEFAULT 1,
    component_created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mp_systems (
    id_system INT AUTO_INCREMENT PRIMARY KEY,
    system_code VARCHAR(100) NOT NULL,
    system_name VARCHAR(100) NOT NULL,
    system_component INT NOT NULL,
    system_state TINYINT DEFAULT 1,
    system_created_at TIMESTAMP DEFAULT NOW()
);


ALTER TABLE mp_systems
ADD FOREIGN KEY (system_component) REFERENCES mp_components(id_component) ON DELETE CASCADE;

ALTER TABLE mp_components
ADD FOREIGN KEY (component_team) REFERENCES mp_teams(id_team) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS mp_maintenance_type (
    id_maintenance_type INT AUTO_INCREMENT PRIMARY KEY,
    maintenance_type_name VARCHAR(100) NOT NULL,
    maintenance_type_state TINYINT DEFAULT 1,
    maintenance_type_created_at TIMESTAMP DEFAULT NOW()
);

INSERT IGNORE INTO mp_maintenance_type (maintenance_type_name) VALUES ("Mantenimiento preventivo"), ("Mantenimiento correctivo");


CREATE TABLE IF NOT EXISTS mp_operations (
    id_operation INT AUTO_INCREMENT PRIMARY KEY,
    operation_team INT,
    operation_component VARCHAR(50) NOT NULL,
    operation_measure TINYINT NOT NULL,
    operation_description VARCHAR(200) NOT NULL,
    operation_technician INT,
    operation_duration_minutes INT,
    operation_duration_hours INT,
    operation_maintenance_type INT,
    operation_kilometres INT,
    operation_hours INT,
    operation_total INT,
    operation_state TINYINT DEFAULT 1,
    operation_created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (operation_maintenance_type) REFERENCES mp_maintenance_type(id_maintenance_type),
    FOREIGN KEY (operation_team) REFERENCES mp_teams(id_team) ON DELETE SET NULL,
    FOREIGN KEY (operation_technician) REFERENCES mp_technician(id_technician) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS mp_operation_model (
    id_operation_model INT AUTO_INCREMENT PRIMARY KEY,
    om_id_operation INT NOT NULL,
    om_id_model INT NOT NULL,
    FOREIGN KEY (om_id_operation) REFERENCES mp_operations(id_operation) ON DELETE CASCADE,
    FOREIGN KEY (om_id_model) REFERENCES mp_models(id_model) ON DELETE CASCADE
);


ALTER TABLE mp_models
ADD COLUMN model_suspension VARCHAR(300) NOT NULL;

ALTER TABLE mp_models
ADD COLUMN model_rear_bridge VARCHAR(300) NOT NULL;

UPDATE mp_models SET model_suspension = "Suspensión";

UPDATE mp_models SET model_rear_bridge = "MERITOR RT46";

ALTER TABLE mp_operations
ADD COLUMN operation_kilometres INT;

ALTER TABLE mp_operations
ADD COLUMN operation_hours INT;

INSERT IGNORE INTO mp_maintenance_type (maintenance_type_name) VALUES ("Mantenimiento por condición"), ("Mantenimiento reactivo");

CREATE TABLE IF NOT EXISTS mp_user_team (
    id_user_team INT AUTO_INCREMENT PRIMARY KEY,
    ut_team INT,
    ut_brand INT,
    ut_model INT,
    ut_year SMALLINT,
    ut_car_plate VARCHAR(50),
    ut_application VARCHAR(100),
    ut_date_purchased TIMESTAMP,
    ut_measure INT,
    ut_vin VARCHAR(50),
    ut_driver INT,
    ut_engine INT,
    ut_wheels_number TINYINT,
    ut_rear_tires_number TINYINT,
    ut_front_tires_number TINYINT,
    ut_transmission INT,
    ut_bridge INT,
    ut_state TINYINT DEFAULT 1,
    ut_created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (ut_team) REFERENCES mp_teams(id_team),
    FOREIGN KEY (ut_brand) REFERENCES mp_brands(id_brand),
    FOREIGN KEY (ut_model) REFERENCES mp_models(id_model),
    FOREIGN KEY (ut_driver) REFERENCES mp_users(id_user),
    FOREIGN KEY (ut_engine) REFERENCES mp_engines(id_engine),
    FOREIGN KEY (ut_transmission) REFERENCES mp_transmissions(id_transmission),
    FOREIGN KEY (ut_bridge) REFERENCES mp_bridges(id_bridge)
);

CREATE TABLE IF NOT EXISTS mp_engines (
  id_engine INT AUTO_INCREMENT PRIMARY KEY,
  engine_brand VARCHAR(100),
  engine_model VARCHAR(100),
  engine_cylinder_capacity VARCHAR(100),
  engine_serial VARCHAR(100),
  engine_power VARCHAR(100),
  engine_rpm_power VARCHAR(100),
  engine_torque VARCHAR(100),
  engine_governed_speed VARCHAR(100),
  engine_ecm_name VARCHAR(100),
  engine_ecm_code VARCHAR(100),
  engine_part_ecm VARCHAR(100),
  engine_serial_ecm VARCHAR(100),
  engine_cpl VARCHAR(100),
  engine_created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mp_transmissions (
  id_transmission INT AUTO_INCREMENT PRIMARY KEY,
  transmission_brand VARCHAR(100),
  transmission_model VARCHAR(100),
  transmission_oil_cooler SMALLINT,
  transmission_serial VARCHAR(100),
  transmission_created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mp_bridges (
  id_bridge INT AUTO_INCREMENT PRIMARY KEY,
  bridge_front_brand VARCHAR(100),
  bridge_front_model VARCHAR(100),
  bridge_serial VARCHAR(100),
  bridge_front_suspension VARCHAR(100),
  bridge_rear_suspension VARCHAR(100),
  bridge_rear_brand VARCHAR(100),
  bridge_rear_model VARCHAR(100),
  bridge_intermediate_differential VARCHAR(100),
  bridge_rear_differential VARCHAR(100),
  bridge_created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mp_team_photo (
  id_team_photo INT AUTO_INCREMENT PRIMARY KEY,
  tp_user_team INT,
  tp_photo VARCHAR(300),
  tp_created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (tp_user_team) REFERENCES mp_user_team(id_user_team)
);

CREATE TABLE IF NOT EXISTS mp_clients (
    id_client INT AUTO_INCREMENT PRIMARY KEY,
    client_nit VARCHAR(50) NOT NULL,
    client_company VARCHAR(100) NOT NULL,
    client_manager_fullname VARCHAR(100) NOT NULL,
    client_manager_phone VARCHAR(50) NOT NULL,
    client_responsible VARCHAR(100),
    client_subdomain VARCHAR(100) UNIQUE NOT NULL,
    client_db_port SMALLINT,
    client_db_host VARCHAR(50),
    client_db_name VARCHAR(50),
    client_db_user VARCHAR(50),
    client_db_password VARCHAR(100),
    client_status TINYINT DEFAULT 1,
    client_created_at TIMESTAMP DEFAULT NOW()
);


INSERT IGNORE INTO mp_clients (client_nit, client_company, client_manager_fullname, client_manager_phone, client_responsible, client_subdomain, client_db_port, client_db_host, client_db_name, client_db_user, client_db_password) VALUES ("0.000.000", "Mapi", "Libardo Silva", "+570000000000", "Yorluis Vega", "mapi", "3310", "host.docker.internal", "mapi_db_client", "bengali", "PaSpyJZrRDXlclTXItIs");


ALTER TABLE mp_user_team
ADD COLUMN ut_user INT NOT NULL;

ALTER TABLE mp_user_team
ADD FOREIGN KEY (ut_user) REFERENCES mp_users(id_user) ON DELETE SET NULL;


CREATE TABLE IF NOT EXISTS mp_personal (
    id_personal INT AUTO_INCREMENT PRIMARY KEY,
    personal_names VARCHAR(100) NOT NULL,
    personal_surnames VARCHAR(100) NOT NULL,
    personal_phone VARCHAR(100) NOT NULL,
    personal_document VARCHAR(100) NOT NULL,
    personal_photo VARCHAR(100) DEFAULT "mapi/avatars/default.svg",
    personal_technician INT,
    personal_salary INT,
    personal_status TINYINT DEFAULT 1,
    personal_created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (personal_technician) REFERENCES mp_technician(id_technician)
);

INSERT IGNORE INTO mp_personal (personal_names, personal_surnames, personal_phone, personal_document, personal_technician, personal_salary) VALUES ("Alexander","Peñaloza", "+573213568479", "1090494143", 3, 1000000), ("Freymar","Sanchez", "+573213568479", "1090494143", 2, 1000000);