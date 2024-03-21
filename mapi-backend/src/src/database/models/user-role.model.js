const { connectCommonDB } = require("../common");

class UserRoleModel {
  constructor(db) {
    this._db = db;
  }

  findByIdUser = async (id_user = "") => {
    try {
      const db = this._db || (await connectCommonDB());
      const roles = await db
        .select("ur_id_role")
        .from("mp_user_roles")
        .where("ur_id_user", id_user)
        .pluck("ur_id_role");
      return roles;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

module.exports = UserRoleModel;
