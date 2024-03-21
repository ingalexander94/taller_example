const { connectCommonDB } = require("../common");

class OperationModel {
  static create = async (operation) => {
    let db;
    try {
      db = await connectCommonDB();
      const [id_operation] = await db
        .insert(
          {
            operation_team: operation.operation_team,
            operation_component: operation.operation_component,
            operation_measure: operation.operation_measure,
            operation_description: operation.operation_description,
            operation_technician: operation.operation_technician,
            operation_duration_minutes: parseFloat(
              operation.operation_duration_minutes
            ),
            operation_duration_hours: parseFloat(
              operation.operation_duration_hours
            ),
            operation_maintenance_type: operation.operation_maintenance_type,
            operation_total: operation.operation_total,
            operation_kilometres: operation.operation_kilometres,
            operation_hours: operation.operation_hours,
          },
          ["id_operation"]
        )
        .into("mp_operations");
      return id_operation;
    } catch (error) {
      throw error;
    }
  };

  static findById = async (id_operation = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const operation = await db
        .select(["id_operation"])
        .from("mp_operations")
        .where("id_operation", id_operation)
        .first();
      return operation ?? null;
    } catch (error) {
      throw error;
    }
  };

  static findByPage = async (limit = 0, offset = 0, orderBy = "ASC") => {
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
        .leftJoin(
          "mp_maintenance_type",
          "mp_operations.operation_maintenance_type",
          "=",
          "mp_maintenance_type.id_maintenance_type"
        )
        .leftJoin(
          "mp_technician",
          "mp_operations.operation_technician",
          "=",
          "mp_technician.id_technician"
        )
        .limit(limit)
        .offset(offset)
        .orderBy("mp_operations.operation_created_at", orderBy);
      return operations;
    } catch (error) {
      throw error;
    }
  };

  static findAll = async () => {
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
        .leftJoin(
          "mp_maintenance_type",
          "mp_operations.operation_maintenance_type",
          "=",
          "mp_maintenance_type.id_maintenance_type"
        )
        .leftJoin(
          "mp_technician",
          "mp_operations.operation_technician",
          "=",
          "mp_technician.id_technician"
        );
      return operations;
    } catch (error) {
      throw error;
    }
  };

  static getTotalOperations = async () => {
    let db;
    try {
      db = await connectCommonDB();
      const total = await db
        .from("mp_operations")
        .count("mp_operations.id_operation as total")
        .leftJoin(
          "mp_maintenance_type",
          "mp_operations.operation_maintenance_type",
          "=",
          "mp_maintenance_type.id_maintenance_type"
        )
        .leftJoin(
          "mp_technician",
          "mp_operations.operation_technician",
          "=",
          "mp_technician.id_technician"
        )
        .first();
      return total;
    } catch (error) {
      throw error;
    }
  };

  static deleteById = async (id_operation = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_operations").where({ id_operation }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };

  static update = async (operation) => {
    let db;
    try {
      db = await connectCommonDB();
      await db
        .from("mp_operations")
        .where({ id_operation: operation.id_operation })
        .update({
          operation_team: operation.operation_team,
          operation_component: operation.operation_component,
          operation_measure: operation.operation_measure,
          operation_description: operation.operation_description,
          operation_technician: operation.operation_technician,
          operation_duration_minutes: parseFloat(
            operation.operation_duration_minutes
          ),
          operation_duration_hours: parseFloat(
            operation.operation_duration_hours
          ),
          operation_maintenance_type: operation.operation_maintenance_type,
          operation_total: operation.operation_total,
          operation_kilometres: operation.operation_kilometres,
          operation_hours: operation.operation_hours,
        });
      return operation.id_operation;
    } catch (error) {
      throw error;
    }
  };

  static searchByCode = async (code = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const operations = await db
        .select(
          "temp_operations.id_operation",
          "temp_operations.operation_team",
          "temp_operations.operation_component",
          "temp_operations.operation_measure",
          "temp_operations.operation_description",
          "temp_operations.operation_technician",
          "temp_operations.operation_duration_minutes",
          "temp_operations.operation_duration_hours",
          "temp_operations.operation_maintenance_type",
          "temp_operations.operation_kilometres",
          "temp_operations.operation_hours",
          "temp_operations.operation_total",
          "temp_operations.maintenance_type_name",
          "temp_operations.technician_code"
        )
        .from(function () {
          this.distinct(
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
            .select(
              db.raw(
                'CASE WHEN mp_operations.operation_component LIKE "S-%" THEN CONCAT(mp_systems.system_code, mp_operations.id_operation) WHEN mp_operations.operation_component LIKE "C-%" THEN CONCAT(mp_components.component_code, mp_operations.id_operation) ELSE NULL END AS code'
              )
            )
            .from("mp_operations")
            .leftJoin(
              "mp_operation_model",
              "mp_operations.id_operation",
              "=",
              "mp_operation_model.om_id_operation"
            )
            .leftJoin(
              "mp_maintenance_type",
              "mp_operations.operation_maintenance_type",
              "=",
              "mp_maintenance_type.id_maintenance_type"
            )
            .leftJoin(
              "mp_technician",
              "mp_operations.operation_technician",
              "=",
              "mp_technician.id_technician"
            )
            .leftJoin("mp_systems", function () {
              this.on(
                "mp_operations.operation_component",
                "LIKE",
                db.raw("'S-%'")
              ).andOn(
                "mp_systems.id_system",
                "=",
                db.raw(
                  'SUBSTRING_INDEX(mp_operations.operation_component, "-", -1)'
                )
              );
            })
            .leftJoin("mp_components", function () {
              this.on(
                "mp_operations.operation_component",
                "LIKE",
                db.raw("'C-%'")
              ).andOn(
                "mp_components.id_component",
                "=",
                db.raw(
                  'SUBSTRING_INDEX(mp_operations.operation_component, "-", -1)'
                )
              );
            })
            .as("temp_operations");
        })
        .where("temp_operations.code", "LIKE", `${code}%`);
      return operations ?? null;
    } catch (error) {
      throw error;
    }
  };

  static countSearchByCode = async (code = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const operations_count = await db
        .select("mp_operations.*", "mp_components.component_code")
        .from("mp_operations")
        .innerJoin(
          "mp_components",
          "mp_components.component_team",
          "=",
          "mp_operations.operation_team"
        )
        .select(
          db.raw(
            "CONCAT(mp_components.component_code, mp_operations.id_operation) as code"
          )
        )
        .having("code", "like", `${code}%`);

      return operations_count ?? null;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = OperationModel;
