const { connectCommonDB } = require("../common");

class TechnicianModel {
  static findById = async (id = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const technician = db
        .select("*")
        .from("mp_technician")
        .where("id_technician", id)
        .andWhere("technician_state", 1)
        .first();
      return technician ?? null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static findAllTechnicians = async () => {
    let db;
    try {
      db = await connectCommonDB();
      const technicians = db
        .select(["id_technician", "technician_name", "technician_code"])
        .from("mp_technician")
        .where("technician_state", 1);
      return technicians;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static findAll = async (page = 1) => {
    let db;
    try {
      db = await connectCommonDB();
      let technician;
      page != 0
        ? (technician = db
            .select("*")
            .from("mp_technician")
            .limit(10)
            .offset((page - 1) * 10)
            .where("technician_state", 1))
        : (technician = db
            .select("*")
            .from("mp_technician")
            .where("technician_state", 1));

      return technician;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static totalPages = async () => {
    let db;
    try {
      db = await connectCommonDB();
      const technician = db
        .select("*")
        .from("mp_technician")
        .where("technician_state", 1);

      return technician;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static verifyTecnhnicianName = async (technician_name = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const isValid = db
        .select("*")
        .from("mp_technician")
        .where("technician_name", technician_name)
        .first();

      return isValid ?? null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static verifyTecnhnicianCode = async (technician_code = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const isValid = db
        .select("*")
        .from("mp_technician")
        .where("technician_code", technician_code)
        .first();

      return isValid ?? null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static searchTecnhnicianCodeOrName = async (data = {}) => {
    let db;
    let { key, page } = data;
    page = parseInt(page);

    try {
      db = await connectCommonDB();

      const technicians = db
        .select("*")
        .from("mp_technician")
        .limit(10)
        .offset((page - 1) * 10)
        .whereRaw(
          `technician_code LIKE '${key}%' OR technician_name LIKE '${key}%'`
        );

      return technicians ?? null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static searchTecnhnicianCount = async (data = {}) => {
    let db;
    let { key, _ } = data;

    try {
      db = await connectCommonDB();
      const count = db
        .count("* as total")
        .from("mp_technician")
        .whereRaw(
          `technician_code LIKE '${key}%' OR technician_name LIKE '${key}%'`
        )
        .first();

      return count;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static updateColumnByTechnicianId = async (id, data) => {
    let db;
    try {
      db = await connectCommonDB();
      const updatedRows = db
        .from("mp_technician")
        .where("id_technician", id)
        .update(data);
      return updatedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  static create = async (data = {}) => {
    let db;
    try {
      db = await connectCommonDB();
      const res = await db.insert(data).into("mp_technician");
      return res;
    } catch (error) {
      throw error;
    }
  };

  static update = async (data = {}) => {
    let db;
    try {
      db = await connectCommonDB();
      const res = await db.insert(data).into("mp_technician");
      return res;
    } catch (error) {
      throw error;
    }
  };

  static deleteById = async (id_technician = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_technician").where({ id_technician }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = TechnicianModel;
