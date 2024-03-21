class UserTeamPhotoModel {
  constructor(db) {
    this._db = db;
  }

  findById = async (id_team_photo = 0) => {
    try {
      const photo = await this._db
        .select("tp_photo")
        .from("mp_team_photo")
        .where("id_team_photo", id_team_photo)
        .first();
      return photo ?? null;
    } catch (error) {
      throw error;
    }
  };

  findByUserTeam = async (tp_user_team = 0) => {
    try {
      const photos = await this._db
        .select("tp_photo")
        .from("mp_team_photo")
        .where("tp_user_team", tp_user_team);
      return photos;
    } catch (error) {
      throw error;
    }
  };

  create = async (tp_user_team, tp_photo) => {
    try {
      const [id_team_photo] = await this._db
        .insert(
          {
            tp_user_team: tp_user_team,
            tp_photo,
          },
          ["id_team_photo"]
        )
        .into("mp_team_photo");
      return id_team_photo;
    } catch (error) {
      throw error;
    }
  };

  deleteById = async (id_team_photo = 0) => {
    try {
      await this._db.from("mp_team_photo").where({ id_team_photo }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };

  deleteByUserTeam = async (tp_user_team = 0) => {
    try {
      await this._db.from("mp_team_photo").where({ tp_user_team }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UserTeamPhotoModel;
