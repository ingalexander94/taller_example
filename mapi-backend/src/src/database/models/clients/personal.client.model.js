const envs = require("../../../config/environments");

class PersonalClientModel {
  constructor(db) {
    this._db = db;
  }

  create = async (personal) => {
    try {
      const [id_personal] = await this._db
        .insert(
          {
            personal_names: personal.personal_names,
            personal_surnames: personal.personal_surnames,
            personal_document: personal.personal_document,
            personal_technician: personal.personal_technician,
            personal_phone: personal.personal_phone,
            personal_salary: personal.personal_salary,
          },
          ["id_personal"]
        )
        .into("mp_personal");
      return id_personal;
    } catch (error) {
      throw error;
    }
  };

  update = async (personal) => {
    try {
      await this._db
        .from("mp_personal")
        .where({ id_personal: personal.id_personal })
        .update({
          personal_names: personal.personal_names,
          personal_surnames: personal.personal_surnames,
          personal_document: personal.personal_document,
          personal_technician: personal.personal_technician,
          personal_phone: personal.personal_phone,
          personal_salary: personal.personal_salary,
          personal_photo: envs.DEFAULT_AVATAR,
        });
      return personal.id_personal;
    } catch (error) {
      throw error;
    }
  };

  findById = async (id_personal = "") => {
    try {
      const personal = await this._db
        .select([
          "id_personal",
          "personal_names",
          "personal_surnames",
          "personal_document",
          "personal_technician",
          "mp_technician.technician_name AS technician_name",
          "personal_phone",
          "personal_salary",
          "personal_photo",
        ])
        .from("mp_personal")
        .innerJoin(
          "mp_technician",
          "mp_personal.personal_technician",
          "=",
          "mp_technician.id_technician"
        )
        .where("id_personal", id_personal)
        .first();
      return personal;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  updateColumnByUserId = async (id, data) => {
    try {
      const updatedRows = await this._db
        .from("mp_personal")
        .where("id_personal", id)
        .update(data);
      return updatedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getByPage = async (limit = 10, offset = 0) => {
    try {
      const personals = await this._db
        .select([
          "id_personal",
          "personal_names",
          "personal_surnames",
          "personal_document",
          "personal_technician",
          "mp_technician.technician_name AS technician_name",
          "personal_phone",
          "personal_salary",
          "personal_photo",
        ])
        .from("mp_personal")
        .innerJoin(
          "mp_technician",
          "mp_personal.personal_technician",
          "=",
          "mp_technician.id_technician"
        )
        .limit(limit)
        .offset(offset);
      return personals;
    } catch (error) {
      throw error;
    }
  };

  getData = async () => {
    try {
      const personals = await this._db
        .select([
          "id_personal",
          "personal_names",
          "personal_surnames",
          "personal_document",
          "personal_phone",
          "personal_salary",
          "mp_technician.technician_name AS technician_name",
        ])
        .from("mp_personal")
        .innerJoin(
          "mp_technician",
          "mp_personal.personal_technician",
          "=",
          "mp_technician.id_technician"
        );
      return personals;
    } catch (error) {
      throw error;
    }
  };

  searchByNameOrDocument = async (search = "") => {
    try {
      const personals = await this._db
        .select([
          "id_personal",
          "personal_names",
          "personal_surnames",
          "personal_document",
          "personal_technician",
          "mp_technician.technician_name AS technician_name",
          "personal_phone",
          "personal_salary",
          "personal_photo",
        ])
        .from("mp_personal")
        .innerJoin(
          "mp_technician",
          "mp_personal.personal_technician",
          "=",
          "mp_technician.id_technician"
        )
        .where("personal_document", "like", `${search}%`)
        .orWhereRaw('CONCAT(personal_names, " ", personal_surnames) like ?', [
          `%${search}%`,
        ]);
      return personals;
    } catch (error) {
      throw error;
    }
  };

  getTotal = async () => {
    try {
      const total = await this._db
        .from("mp_personal")
        .count("mp_personal.id_personal AS total")
        .first();
      return total;
    } catch (error) {
      throw error;
    }
  };

  deleteById = async (id_personal = 0) => {
    try {
      await this._db.from("mp_personal").where({ id_personal }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = PersonalClientModel;
