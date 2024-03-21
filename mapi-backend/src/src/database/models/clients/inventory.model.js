const { connectCommonDB } = require("../../common");

class InventoryModel {
  constructor(db) {
    this._db = db;
  }

  findById = async (id = "") => {
    try {
      const db = await this._db;
      const inventory = db
        .select("*")
        .from("mp_inventory")
        .where("id_inventory", id)
        .first();
      return inventory ?? null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  findAll = async (page = 1) => {
    try {
      let inventory;
      page != 0
        ? (inventory =  await this._db
          .select([
              "id_inventory",
              "inventory_item_name",
              "inventory_reference",
              "inventory_quantity",
              "inventory_units",
              "inventory_tax",
              "inventory_price_with_tax",
              "inventory_price_without_tax",
              "created_at",
              "updated_at",
            ])
            .from("mp_inventory")
            .limit(10)
            .offset((page - 1) * 10))
        : (inventory =  await this._db
          .select([
              "id_inventory",
              "inventory_item_name",
              "inventory_reference",
              "inventory_quantity",
              "inventory_units",
              "inventory_tax",
              "inventory_price_with_tax",
              "inventory_price_without_tax",
              "created_at",
              "updated_at",
            ])
            .from("mp_inventory"));

      return inventory;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  totalPages = async () => {
    try {
      const inventory = await this._db
        .select("*")
        .from("mp_inventory")

      return inventory;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  verifyReference = async (item_reference = "") => {
    try {
      const db = await this._db;
      const isValid = db
        .select("*")
        .from("mp_inventory")
        .where("inventory_reference", item_reference)
        .first();

      return isValid ?? null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  searchItemByReferenceOrName = async (data = {}) => {
    let { key, page } = data;
    page = parseInt(page);

    try {
      const db = await this._db;

      const inventory = db
        .select("*")
        .from("mp_inventory")
        .limit(10)
        .offset((page - 1) * 10)
        .whereRaw(
          `inventory_reference LIKE '${key}%' OR inventory_item_name LIKE '${key}%'`
        );

      return inventory ?? null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  searchInventoryCount = async (data = {}) => {
    let { key, _ } = data;
    try {
      const db = await this._db;
      const count = db
        .count("* as total")
        .from("mp_inventory")
        .whereRaw(
          `inventory_reference LIKE '${key}%' OR inventory_item_name LIKE '${key}%'`
        )
        .first();

      return count;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  updateColumnByInventoryId = async (id, data) => {
    try {
      const db = await this._db;
      const updatedRows = db
        .from("mp_inventory")
        .where("id_inventory", id)
        .update(data);
      return updatedRows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  create = async (data = {}) => {
    try {
      const db = await this._db
      const res = await db.insert(data).into("mp_inventory");
      return res;
    } catch (error) {
      throw error;
    }
  };

  update = async (data = {}) => {
    try {
      const db = await this._db;
      const res = await db.insert(data).into("mp_inventory");
      return res;
    } catch (error) {
      throw error;
    }
  };

  deleteById = async (id_inventory = "") => {
    try {
      await this._db.from("mp_inventory").where({ id_inventory }).del();
      return true;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = InventoryModel;
