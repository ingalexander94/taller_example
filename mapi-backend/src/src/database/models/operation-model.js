const { connectCommonDB } = require("../common");

class OperationModelModel {
  static create = async (om_id_operation = 0, om_id_model = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const [id_operation_model] = await db
        .insert(
          {
            om_id_operation,
            om_id_model,
          },
          ["id_operation_model"]
        )
        .into("mp_operation_model");
      return id_operation_model;
    } catch (error) {
      throw error;
    }
  };

  static findByIdOperation = async (om_id_operation = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const models = await db
        .select(
          "mp_operation_model.om_id_operation",
          "mp_models.id_model",
          "mp_models.model_code"
        )
        .from("mp_models")
        .innerJoin(
          "mp_operation_model",
          "mp_models.id_model",
          "=",
          "mp_operation_model.om_id_model"
        )
        .where("mp_operation_model.om_id_operation", om_id_operation);
      return models;
    } catch (error) {
      throw error;
    }
  };

  static findByIdModel = async (om_id_operation = 0, om_id_model = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const models = await db
        .select("id_operation_model")
        .from("mp_operation_model")
        .where({ om_id_operation, om_id_model })
        .first();
      return models;
    } catch (error) {
      throw error;
    }
  };

  static deleteById = async (om_id_operation = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_operation_model").where({ om_id_operation }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };

  static findByPage = async (
    id_model = 0,
    listComponents = [],
    limit = 0,
    offset = 0
  ) => {
    let db;
    try {
      db = await connectCommonDB();
      const operations = await db
        .select(
          "mp_operations.id_operation",
          "mp_operations.operation_team",
          "mp_operations.operation_component",
          "mp_operations.operation_measure",
          "mp_operations.operation_description",
          "mp_operations.operation_technician",
          "mp_operations.operation_duration_minutes",
          "mp_operations.operation_duration_hours",
          "mp_operations.operation_maintenance_type",
          "mp_operations.operation_kilometres",
          "mp_operations.operation_hours",
          "mp_operations.operation_total",
          "mp_maintenance_type.maintenance_type_name",
          "mp_technician.technician_code"
        )
        .from("mp_operations")
        .innerJoin(
          "mp_operation_model",
          "mp_operations.id_operation",
          "mp_operation_model.om_id_operation"
        )
        .leftJoin(
          "mp_maintenance_type",
          "mp_operations.operation_maintenance_type",
          "mp_maintenance_type.id_maintenance_type"
        )
        .leftJoin(
          "mp_technician",
          "mp_operations.operation_technician",
          "mp_technician.id_technician"
        )
        .where({
          om_id_model: id_model,
        })
        .whereIn("operation_component", listComponents)
        .limit(limit)
        .offset(offset);
      return operations;
    } catch (error) {
      throw error;
    }
  };

  static findByCode = async (code = "", id_team = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const [operations] = await db.raw(`SELECT temp_operations.id_operation,
      temp_operations.operation_team,
  temp_operations.operation_component,
  temp_operations.operation_measure,
  temp_operations.operation_description,
  temp_operations.operation_technician,
  temp_operations.operation_duration_minutes,
  temp_operations.operation_duration_hours,
  temp_operations.operation_maintenance_type,
  temp_operations.operation_kilometres,
  temp_operations.operation_hours,
  temp_operations.operation_total,
  temp_operations.maintenance_type_name,
  temp_operations.technician_code  FROM ( SELECT DISTINCT
      mp_operations.id_operation,
      mp_operations.operation_team,
      mp_operations.operation_component,
      mp_operations.operation_measure,
      mp_operations.operation_description,
      mp_operations.operation_technician,
      mp_operations.operation_duration_minutes,
      mp_operations.operation_duration_hours,
      mp_operations.operation_maintenance_type,
      mp_operations.operation_total,
      mp_operations.operation_kilometres,
      mp_operations.operation_hours,
      mp_maintenance_type.maintenance_type_name,
      mp_technician.technician_code,
      CASE 
        WHEN mp_operations.operation_component LIKE 'S-%' THEN CONCAT(mp_systems.system_code, mp_operations.id_operation)
        WHEN mp_operations.operation_component LIKE 'C-%' THEN CONCAT(mp_components.component_code, mp_operations.id_operation)
        ELSE NULL
      END AS code
    FROM mp_operations
    LEFT JOIN mp_operation_model ON mp_operations.id_operation = mp_operation_model.om_id_operation
    LEFT JOIN mp_maintenance_type ON mp_operations.operation_maintenance_type = mp_maintenance_type.id_maintenance_type
    LEFT JOIN mp_technician ON mp_operations.operation_technician = mp_technician.id_technician
    LEFT JOIN mp_systems ON mp_operations.operation_component LIKE 'S-%' AND mp_systems.id_system = SUBSTRING_INDEX(mp_operations.operation_component, '-', -1)
    LEFT JOIN mp_components ON mp_operations.operation_component LIKE 'C-%' AND mp_components.id_component = SUBSTRING_INDEX(mp_operations.operation_component, '-', -1)
    WHERE mp_operations.operation_team = ${id_team}) AS temp_operations
    WHERE temp_operations.code LIKE "${code}%";`);
      return operations;
    } catch (error) {
      throw error;
    }
  };

  static getTotalOperations = async (id_model = 0, listComponents = []) => {
    let db;
    try {
      db = await connectCommonDB();
      const total = await db
        .from("mp_operations")
        .count("mp_operations.id_operation as total")
        .innerJoin(
          "mp_operation_model",
          "mp_operations.id_operation",
          "mp_operation_model.om_id_operation"
        )
        .leftJoin(
          "mp_maintenance_type",
          "mp_operations.operation_maintenance_type",
          "mp_maintenance_type.id_maintenance_type"
        )
        .leftJoin(
          "mp_technician",
          "mp_operations.operation_technician",
          "mp_technician.id_technician"
        )
        .where({
          om_id_model: id_model,
        })
        .whereIn("operation_component", listComponents)
        .first();
      return total;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = OperationModelModel;
