const { connectCommonDB } = require("../common");

class SystemModel {
  static findById = async (id_system = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const system = await db
        .select(["id_system", "system_component"])
        .from("mp_systems")
        .where("id_system", id_system)
        .first();
      return system ?? null;
    } catch (error) {
      throw error;
    }
  };

  static findByCode = async (system_code = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const system = await db
        .select("id_system")
        .from("mp_systems")
        .where("system_code", system_code)
        .first();
      return system ?? null;
    } catch (error) {
      throw error;
    }
  };

  static create = async (
    system_code = "",
    system_name = "",
    system_component = 1
  ) => {
    let db;
    try {
      db = await connectCommonDB();
      const [id_system] = await db
        .insert(
          {
            system_code,
            system_name,
            system_component,
          },
          ["id_system"]
        )
        .into("mp_systems");
      return id_system;
    } catch (error) {
      throw error;
    }
  };

  static update = async (id_system = 0, system_code = "", system_name = "") => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_systems").where({ id_system }).update({
        system_code,
        system_name,
      });
      return id_system;
    } catch (error) {
      throw error;
    }
  };

  static deleteById = async (id_system = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_systems").where({ id_system }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };

  static findByComponent = async (system_component = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const systems = await db
        .select(
          "id_system",
          "system_code",
          "system_name",
          "system_component",
          db.raw("true AS isActive")
        )
        .from("mp_systems")
        .where("system_component", system_component);
      return systems;
    } catch (error) {
      throw error;
    }
  };

  static getInfoForOperation = async (id_system = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const component = await db
        .select(
          db.raw(
            'CONCAT("(", mp_systems.system_code, ") ", mp_systems.system_name) AS system'
          ),
          db.raw("mp_systems.system_code AS code")
        )
        .from("mp_systems")
        .where("id_system", id_system)
        .first();
      return component ?? null;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = SystemModel;
