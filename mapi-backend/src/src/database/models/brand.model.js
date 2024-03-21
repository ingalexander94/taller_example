const { connectCommonDB } = require("../common");

class BrandModel {
  static findAll = async (brand_team = 1) => {
    let db;
    try {
      db = await connectCommonDB();
      const brands = await db
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
        .where("mp_brands.brand_team", brand_team);
      return brands;
    } catch (error) {
      throw error;
    }
  };

  static getCodes = async (brand_team = 1) => {
    let db;
    try {
      db = await connectCommonDB();
      const codes = await db
        .select("brand_code")
        .from("mp_brands")
        .where("brand_team", brand_team);
      return codes;
    } catch (error) {
      throw error;
    }
  };

  static findByCode = async (brand_code = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const brand = await db
        .select(["id_brand", "brand_name"])
        .from("mp_brands")
        .where("brand_code", brand_code)
        .first();
      return brand ?? null;
    } catch (error) {
      throw error;
    }
  };

  static findById = async (id_brand = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const brand = await db
        .select(["id_brand", "brand_code"])
        .from("mp_brands")
        .where("id_brand", id_brand)
        .first();
      return brand ?? null;
    } catch (error) {
      throw error;
    }
  };

  static findByName = async (brand_name = "", brand_team = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      const brand = await db
        .select(["id_brand", "brand_name", "brand_code"])
        .from("mp_brands")
        .where({ brand_name, brand_team })
        .first();
      return brand ?? null;
    } catch (error) {
      throw error;
    }
  };

  static create = async (brand_code = "", brand_name = "", brand_team = "") => {
    let db;
    try {
      db = await connectCommonDB();
      const [id_brand] = await db
        .insert({ brand_code, brand_name, brand_team }, ["id_team"])
        .into("mp_brands");
      return id_brand;
    } catch (error) {
      throw error;
    }
  };

  static update = async (id_brand = 0, brand_code = "", brand_name = "") => {
    let db;
    try {
      db = await connectCommonDB();
      await db
        .from("mp_brands")
        .where({ id_brand })
        .update({ brand_code, brand_name });
      return id_brand;
    } catch (error) {
      throw error;
    }
  };

  static deleteById = async (id_brand = 0) => {
    let db;
    try {
      db = await connectCommonDB();
      await db.from("mp_brands").where({ id_brand }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = BrandModel;
