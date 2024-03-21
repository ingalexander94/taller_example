const { connectCommonDB } = require("../common");

class ComponentModel {
  static findAll = async (component_team = 1) => {
    let db;
    try {
      db = await connectCommonDB();
      const components = await db
        .select([
          "mp_components.id_component",
          "mp_components.component_code",
          "mp_components.component_name",
          "mp_systems.id_system",
          "mp_systems.system_code",
          "mp_systems.system_name",
          "mp_systems.system_component",
        ])
        .from("mp_components")
        .leftJoin(
          "mp_systems",
          "mp_components.id_component",
          "=",
          "mp_systems.system_component"
        )
        .where("mp_components.component_team", component_team);
      return components;
    } catch (error) {
      throw error;
    }
  };

  static findByCode = async (component_code = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const component = await db
        .select(["id_component", "component_name"])
        .from("mp_components")
        .where("component_code", component_code)
        .first();
      return component ?? null;
    } catch (error) {
      throw error;
    }
  };

  static findByTeam = async (id_team = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const components = await db
        .select(
          "mp_components.id_component",
          "mp_components.component_name",
          "mp_components.component_code",
          "mp_systems.id_system",
          "mp_systems.system_code",
          "mp_systems.system_name"
        )
        .from("mp_components")
        .leftJoin(
          "mp_systems",
          "mp_components.id_component",
          "mp_systems.system_component"
        )
        .where("component_team", id_team);
      return components;
    } catch (error) {
      throw error;
    }
  };

  static findById = async (id_component = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const component = await db
        .select(["id_component", "component_name"])
        .from("mp_components")
        .where("id_component", id_component)
        .first();
      return component ?? null;
    } catch (error) {
      throw error;
    }
  };

  static findByName = async (component_name = "", component_team = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const component = await db
        .select(["id_component", "component_name", "component_code"])
        .from("mp_components")
        .where({ component_name, component_team })
        .first();
      return component ?? null;
    } catch (error) {
      throw error;
    }
  };

  static create = async (
    component_code = "",
    component_name = "",
    component_team = ""
  ) => {
    let db;
    try {
      db = await connectCommonDB();
      const [id_component] = await db
        .insert({ component_code, component_name, component_team }, [
          "id_component",
        ])
        .into("mp_components");
      return id_component;
    } catch (error) {
      throw error;
    }
  };

  static update = async (
    id_component = 0,
    component_code = "",
    component_name = ""
  ) => {
    let db;
    try {
      db = await connectCommonDB();
      await db
        .from("mp_components")
        .where({ id_component })
        .update({ component_code, component_name });
      return id_component;
    } catch (error) {
      throw error;
    }
  };

  static deleteById = async (id_component = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_components").where({ id_component }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };

  static getInfoForOperation = async (id_component = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const component = await db
        .select(
          db.raw(
            'CONCAT("(", mp_components.component_code, ") ", mp_components.component_name) AS system'
          ),
          db.raw("mp_components.component_code AS code")
        )
        .from("mp_components")
        .where("id_component", id_component)
        .first();
      return component ?? null;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ComponentModel;
