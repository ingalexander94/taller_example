const { connectCommonDB } = require("../common");

class TeamModel {
  static findById = async (id_team = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const user = await db
        .select(["id_team", "team_name"])
        .from("mp_teams")
        .where("id_team", id_team)
        .first();
      return user ?? null;
    } catch (error) {
      throw error;
    }
  };

  static findByName = async (name = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const user = await db
        .select(["id_team", "team_name"])
        .from("mp_teams")
        .where("team_name", name)
        .first();
      return user ?? null;
    } catch (error) {
      throw error;
    }
  };

  static findAll = async () => {
    let db;
    try {
      db = await connectCommonDB();
      const user = await db
        .select(["id_team", "team_name"])
        .from("mp_teams")
        .where("team_state", 1);
      return user;
    } catch (error) {
      throw error;
    }
  };

  static create = async (team_name = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const [id_team] = await db
        .insert({ team_name }, ["id_team"])
        .into("mp_teams");
      return id_team;
    } catch (error) {
      throw error;
    }
  };

  static update = async (team_name = "", id_team = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_teams").where({ id_team }).update({ team_name });
      return id_team;
    } catch (error) {
      throw error;
    }
  };

  static deleteById = async (id_team = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_teams").where({ id_team }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };


  
}

module.exports = TeamModel;
