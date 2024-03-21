const { connectCommonDB } = require("../common");

class MaintenanceTypeModel {
  static findAll = async () => {
    let db;
    try {
      db = await connectCommonDB();
      const maintenances = await db
        .select(["id_maintenance_type", "maintenance_type_name"])
        .from("mp_maintenance_type")
        .where("maintenance_type_state", 1);
      return maintenances;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MaintenanceTypeModel;
