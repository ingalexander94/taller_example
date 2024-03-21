class UserTeamModel {
  constructor(db) {
    this._db = db;
  }

  getTeams = async () => {
    try {
      const teams = await this._db
        .select("mp_teams.id_team", "mp_teams.team_name")
        .from("mp_teams");
      return teams;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getMyTeams = async () => {
    try {
      const teams = await this._db
        .select("mp_teams.id_team", "mp_teams.team_name")
        .from("mp_teams")
        .innerJoin("mp_user_team", "mp_teams.id_team", "mp_user_team.ut_team")
        .distinct();
      return teams;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getBrandsByTeam = async (id_team = 0) => {
    try {
      const brands = await this._db
        .select([
          "mp_brands.id_brand",
          "mp_brands.brand_code",
          "mp_brands.brand_name",
          "mp_models.id_model",
          "mp_models.model_code",
          " mp_models.model_name",
          "mp_models.model_init_year",
          "mp_models.model_final_year",
          "mp_models.model_engine",
          "mp_models.model_transmission",
          "mp_models.model_suspension",
          "mp_models.model_rear_bridge",
          "mp_models.model_application",
          "mp_models.model_brand",
        ])
        .from("mp_brands")
        .leftJoin(
          "mp_models",
          "mp_brands.id_brand",
          "=",
          "mp_models.model_brand"
        )
        .where("mp_brands.brand_team", id_team);
      return brands;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  listTeams = async (limit = 0, offset = 0, team = 0) => {
    try {
      const equipments = await this._db
        .select(
          "mp_user_team.id_user_team",
          "mp_teams.team_name",
          "mp_user_team.ut_car_plate",
          "mp_brands.brand_name",
          "mp_models.model_name",
          this._db.raw("3245 AS mp_kilometers"),
          "mp_user_team.ut_state",
          this._db.raw(
            "(SELECT COALESCE((SELECT mp_team_photo.tp_photo FROM mp_team_photo WHERE mp_team_photo.tp_user_team = mp_user_team.id_user_team LIMIT 1), 'placeholder.png')) AS ut_photo"
          )
        )
        .from("mp_user_team")
        .innerJoin("mp_teams", "mp_teams.id_team", "=", "mp_user_team.ut_team")
        .innerJoin(
          "mp_brands",
          "mp_brands.id_brand",
          "=",
          "mp_user_team.ut_brand"
        )
        .innerJoin(
          "mp_models",
          "mp_models.id_model",
          "=",
          "mp_user_team.ut_model"
        )
        .where("mp_user_team.ut_team", "=", team)
        .limit(limit)
        .offset(offset);
      return equipments;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  searchByCarPlate = async (search = "", team = 0) => {
    try {
      const equipments = await this._db
        .select(
          "mp_user_team.id_user_team",
          "mp_teams.team_name",
          "mp_user_team.ut_car_plate",
          "mp_brands.brand_name",
          "mp_models.model_name",
          this._db.raw("3245 AS mp_kilometers"),
          "mp_user_team.ut_state",
          this._db.raw(
            "(SELECT COALESCE((SELECT mp_team_photo.tp_photo FROM mp_team_photo WHERE mp_team_photo.tp_user_team = mp_user_team.id_user_team LIMIT 1), 'placeholder.png')) AS ut_photo"
          )
        )
        .from("mp_user_team")
        .innerJoin("mp_teams", "mp_teams.id_team", "=", "mp_user_team.ut_team")
        .innerJoin(
          "mp_brands",
          "mp_brands.id_brand",
          "=",
          "mp_user_team.ut_brand"
        )
        .innerJoin(
          "mp_models",
          "mp_models.id_model",
          "=",
          "mp_user_team.ut_model"
        )
        .where("mp_user_team.ut_car_plate", "like", `${search}%`)
        .andWhere("mp_user_team.ut_team", "=", team);
      return equipments;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getData = async () => {
    try {
      const equipments = await this._db
        .select(
          "mp_user_team.id_user_team",
          "mp_teams.team_name",
          "mp_user_team.ut_car_plate",
          "mp_brands.brand_name",
          "mp_models.model_name",
          this._db.raw("3245 AS mp_kilometers"),
          "mp_user_team.ut_state"
        )
        .from("mp_user_team")
        .innerJoin("mp_teams", "mp_teams.id_team", "=", "mp_user_team.ut_team")
        .innerJoin(
          "mp_brands",
          "mp_brands.id_brand",
          "=",
          "mp_user_team.ut_brand"
        )
        .innerJoin(
          "mp_models",
          "mp_models.id_model",
          "=",
          "mp_user_team.ut_model"
        );
      return equipments;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getTotalListUserTeam = async () => {
    try {
      const total = await this._db
        .from("mp_user_team")
        .count("mp_user_team.id_user_team AS total")
        .first();
      return total;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getDetailsUserTeam = async (id_user_team) => {
    try {
      const user_team = await this._db
        .select(
          "mp_user_team.id_user_team",
          "mp_brands.id_brand",
          "mp_brands.brand_name",
          "mp_models.id_model",
          "mp_models.model_name",
          "mp_teams.id_team",
          "mp_teams.team_name",
          "mp_user_team.ut_date_purchased",
          "mp_user_team.ut_year",
          "mp_user_team.ut_application",
          "mp_user_team.ut_car_plate",
          "mp_user_team.ut_vin",
          "mp_user_team.ut_state",
          "mp_personal.id_personal",
          "mp_personal.personal_names",
          "mp_personal.personal_surnames",
          "mp_personal.personal_photo",
          "mp_personal.personal_phone",
          "mp_engines.id_engine",
          "mp_engines.engine_model",
          "mp_engines.engine_brand",
          "mp_engines.engine_cylinder_capacity",
          "mp_engines.engine_serial",
          "mp_engines.engine_power",
          "mp_engines.engine_rpm_power",
          "mp_engines.engine_governed_speed",
          "mp_engines.engine_ecm_name",
          "mp_engines.engine_ecm_code",
          "mp_engines.engine_torque"
        )
        .from("mp_user_team")
        .leftJoin("mp_brands", "mp_user_team.ut_brand", "mp_brands.id_brand")
        .leftJoin("mp_models", "mp_user_team.ut_model", "mp_models.id_model")
        .leftJoin("mp_teams", "mp_user_team.ut_team", "mp_teams.id_team")
        .leftJoin(
          "mp_personal",
          "mp_user_team.ut_driver",
          "mp_personal.id_personal"
        )
        .leftJoin(
          "mp_engines",
          "mp_user_team.ut_engine",
          "mp_engines.id_engine"
        )
        .where("mp_user_team.id_user_team", id_user_team)
        .first();
      return user_team;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getSaveData = async (id_user_team) => {
    try {
      const user_team = await this._db
        .select(
          "mp_user_team.id_user_team",
          "mp_user_team.ut_team",
          "mp_user_team.ut_brand",
          "mp_user_team.ut_model",
          "mp_user_team.ut_year",
          "mp_user_team.ut_car_plate",
          "mp_user_team.ut_measure",
          "mp_user_team.ut_driver",
          "mp_user_team.ut_application",
          "mp_user_team.ut_vin",
          "mp_user_team.ut_wheels_number",
          "mp_user_team.ut_rear_tires_number",
          "mp_user_team.ut_front_tires_number",
          "mp_user_team.ut_engine",
          "mp_user_team.ut_transmission",
          "mp_user_team.ut_bridge",
          this._db.raw(
            "DATE_FORMAT(mp_user_team.ut_date_purchased, '%Y-%m-%d') AS ut_date_purchased"
          ),
          "mp_user_team.ut_state",
          this._db.raw(
            "(SELECT COALESCE((SELECT mp_team_photo.tp_photo FROM mp_team_photo WHERE mp_team_photo.tp_user_team = mp_user_team.id_user_team LIMIT 1), 'placeholder.png')) AS ut_photo"
          )
        )
        .from("mp_user_team")
        .where("mp_user_team.id_user_team", id_user_team)
        .first();
      return user_team;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getTeamByIdUserTeam = async (id_user_team) => {
    try {
      const user_team = await this._db
        .select(
          "mp_user_team.ut_team",
          "mp_user_team.ut_model",
          "mp_user_team.ut_brand"
        )
        .from("mp_user_team")
        .where("mp_user_team.id_user_team", id_user_team)
        .first();
      return user_team;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  listPlate = async () => {
    try {
      const lisplate = await this._db
        .select("id_user_team", "ut_car_plate")
        .from("mp_user_team AS mpu")
        .groupBy("mpu.ut_car_plate");
      return lisplate;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getPhotos = async (tp_user_team) => {
    try {
      const photos = await this._db
        .select("mp_team_photo.id_team_photo", "mp_team_photo.tp_photo")
        .from("mp_team_photo")
        .innerJoin(
          "mp_user_team",
          "mp_user_team.id_user_team",
          "mp_team_photo.tp_user_team"
        )
        .where("mp_team_photo.tp_user_team", tp_user_team);
      return photos;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  listDriver = async () => {
    try {
      const listdriver = await this._db
        .select(
          "mpp.id_personal",
          "mpp.personal_names",
          "mpp.personal_surnames"
        )
        .from("mp_personal AS mpp")
        .where("mpp.personal_technician", 3)
        .groupBy("mpp.id_personal");
      return listdriver;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  create = async (userTeam) => {
    try {
      const [id_user_team] = await this._db
        .insert(
          {
            ut_team: userTeam.ut_team,
            ut_brand: userTeam.ut_brand,
            ut_model: userTeam.ut_model,
            ut_year: userTeam.ut_year,
            ut_car_plate: userTeam.ut_car_plate,
            ut_application: userTeam.ut_application,
            ut_date_purchased: userTeam.ut_date_purchased,
            ut_measure: userTeam.ut_measure,
            ut_driver: userTeam.ut_driver,
            ut_state: userTeam.ut_state,
            ut_wheels_number: userTeam.ut_wheels_number,
            ut_front_tires_number: userTeam.ut_front_tires_number,
            ut_rear_tires_number: userTeam.ut_rear_tires_number,
            ut_transmission: userTeam.transmission?.id_transmission ?? null,
            ut_bridge: userTeam.bridge?.id_bridge ?? null,
            ut_engine: userTeam.engine?.id_engine ?? null,
          },
          ["id_user_team"]
        )
        .into("mp_user_team");
      return id_user_team;
    } catch (error) {
      throw error;
    }
  };

  update = async (userTeam) => {
    try {
      await this._db
        .from("mp_user_team")
        .where({ id_user_team: userTeam.id_user_team })
        .update({
          ut_brand: userTeam.ut_brand,
          ut_model: userTeam.ut_model,
          ut_year: userTeam.ut_year,
          ut_car_plate: userTeam.ut_car_plate,
          ut_application: userTeam.ut_application || null,
          ut_date_purchased: userTeam.ut_date_purchased || null,
          ut_measure: userTeam.ut_measure || null,
          ut_driver: userTeam.ut_driver || null,
          ut_state: userTeam.ut_state,
          ut_wheels_number: userTeam.ut_wheels_number || null,
          ut_front_tires_number: userTeam.ut_front_tires_number || null,
          ut_rear_tires_number: userTeam.ut_rear_tires_number || null,
        });
      return userTeam.id_user_team;
    } catch (error) {
      throw error;
    }
  };

  findByCarPlate = async (ut_car_plate) => {
    try {
      const user_team = await this._db
        .select("id_user_team")
        .from("mp_user_team")
        .where("mp_user_team.ut_car_plate", ut_car_plate)
        .first();
      return user_team;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

module.exports = UserTeamModel;
