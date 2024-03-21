const { connectCommonDB } = require("../common");

class ModelModel {
  static findById = async (id_model = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const model = await db
        .select(["id_model", "model_brand"])
        .from("mp_models")
        .where("id_model", id_model)
        .first();
      return model ?? null;
    } catch (error) {
      throw error;
    }
  };

  static findByCode = async (model_code = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const model = await db
        .select("id_model")
        .from("mp_models")
        .where("model_code", model_code)
        .first();
      return model ?? null;
    } catch (error) {
      throw error;
    }
  };

  static create = async (
    model_code = "",
    model_name = "",
    model_init_year = 1900,
    model_final_year = 2023,
    model_engine = "",
    model_transmission = "",
    model_application = "",
    model_brand = 1,
    model_suspension = "",
    model_rear_bridge = ""
  ) => {
    let db;
    try {
      db = await connectCommonDB();
      const [id_model] = await db
        .insert(
          {
            model_code,
            model_name,
            model_init_year,
            model_final_year,
            model_engine,
            model_transmission,
            model_application,
            model_brand,
            model_suspension,
            model_rear_bridge,
          },
          ["id_model"]
        )
        .into("mp_models");
      return id_model;
    } catch (error) {
      throw error;
    }
  };

  static update = async (
    id_model = 0,
    model_code = "",
    model_name = "",
    model_init_year = "",
    model_final_year = "",
    model_engine = "",
    model_transmission = "",
    model_application = "",
    model_suspension = "",
    model_rear_bridge = ""
  ) => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_models").where({ id_model }).update({
        model_code,
        model_name,
        model_init_year,
        model_final_year,
        model_engine,
        model_transmission,
        model_application,
        model_suspension,
        model_rear_bridge,
      });
      return id_model;
    } catch (error) {
      throw error;
    }
  };

  static deleteById = async (id_model = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_models").where({ id_model }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };

  static updateCode = async (id_model = 0, model_code = "") => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_models").where({ id_model }).update({ model_code });
    } catch (error) {
      throw error;
    }
  };

  static findByBrand = async (model_brand = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const models = await db
        .select("id_model")
        .from("mp_models")
        .where("model_brand", model_brand);
      return models;
    } catch (error) {
      throw error;
    }
  };

  static findByTeam = async (id_team = 0, model_code = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const models = await db
        .select(["id_model", "model_code"])
        .from("mp_models")
        .where("model_code", "like", `${model_code}%`)
        .whereIn("model_brand", function () {
          this.select("id_brand")
            .from("mp_brands")
            .where("brand_team", id_team);
        });
      return models;
    } catch (error) {
      throw error;
    }
  };

  static findByBrandTeam = async (model_brand = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const models = await db
        .select(
          "mp_brands.id_brand",
          "mp_brands.brand_code",
          "mp_brands.brand_name",
          "mp_models.id_model",
          "mp_models.model_code",
          "mp_models.model_name",
          "mp_models.model_init_year",
          "mp_models.model_final_year",
          "mp_models.model_engine",
          "mp_models.model_transmission",
          "mp_models.model_suspension",
          "mp_models.model_rear_bridge",
          "mp_models.model_application",
          "mp_models.model_brand"
        )
        .from("mp_brands")
        .leftJoin("mp_models", "mp_brands.id_brand", "mp_models.model_brand")
        .where("mp_brands.brand_team", model_brand);
      return models;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = ModelModel;
