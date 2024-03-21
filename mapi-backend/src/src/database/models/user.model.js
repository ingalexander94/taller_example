const { connectCommonDB } = require("../common");

class UserModel {
  constructor(db) {
    this._db = db;
  }

  create = async (user) => {
    try {
      const db = this._db || (await connectCommonDB());
      const [id_user] = await db
        .insert(
          {
            user_names: user.user_names,
            user_surnames: user.user_surnames,
            user_document: user.user_document,
            user_phone: user.user_phone,
            user_salary: user.user_salary,
            user_photo: "",
            user_email: "",
            user_password: "",
          },
          ["id_user"]
        )
        .into("mp_users");
      return id_user;
    } catch (error) {
      throw error;
    }
  };

  update = async (user) => {
    try {
      const db = this._db || (await connectCommonDB());
      await db.from("mp_users").where({ id_user: user.id_user }).update({
        user_names: user.user_names,
        user_surnames: user.user_surnames,
        user_document: user.user_document,
        user_phone: user.user_phone,
        user_salary: user.user_salary,
        user_photo: user.user_photo,
      });
      return user.id_operation;
    } catch (error) {
      throw error;
    }
  };

  findById = async (id_user = "") => {
    try {
      const db = this._db || (await connectCommonDB());
      const user = await db
        .select("*")
        .from("mp_users")
        .where("id_user", id_user)
        .first();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  findByEmail = async (email = "") => {
    try {
      const db = this._db || (await connectCommonDB());
      const user = await db
        .select("*")
        .from("mp_users")
        .where("user_email", email)
        .first();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  updateColumnByUserId = async (id, data) => {
    try {
      const db = this._db || (await connectCommonDB());
      const updatedRows = await db
        .from("mp_users")
        .where("id_user", id)
        .update(data);
      return updatedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  detailsUserTeam = async (id_user) => {
    try {
      const db = this._db || (await connectCommonDB());
      const details = await db
        .select([
          "id_user",
          "user_photo",
          "user_salary",
          "user_names",
          "user_surnames",
          "user_email",
          "user_position",
          "user_document",
          "user_phone",
        ])
        .from("mp_users")
        .where("id_user", id_user);
      return details;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  listPersonPage = async (limit = 0, offset = 0, orderBy = "ASC") => {
    try {
      const db = this._db || (await connectCommonDB());
      const listPerson = await db
        .select([
          "id_user",
          "user_photo",
          "user_names",
          "user_surnames",
          "user_salary",
          "user_position",
          "user_document",
          "user_phone",
        ])
        .from("mp_users")
        .limit(limit)
        .offset(offset)
        .orderBy("mp_users.created_at", orderBy);
      return listPerson;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getTotallListPerson = async () => {
    try {
      const db = this._db || (await connectCommonDB());
      const total = await db
        .from("mp_users")
        .count("mp_users.id_user AS total")
        .first();
      return total;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

module.exports = UserModel;
