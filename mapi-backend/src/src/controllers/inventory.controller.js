const { response } = require("express");
const CustomError = require("../config/errors");
const InventoryModel = require("../database/models/clients/inventory.model");
const CurrentDateTime = require("../helpers/getDateNow");

class InventoryController {
  static #handleError = (error, res = response) => {
    if (error instanceof CustomError) {
      return res
        .status(error.statusCode)
        .json({ status: false, data: null, error: error.message });
    }
    console.error(error);
    return res
      .status(500)
      .json({ status: false, data: null, error: "Internal Server Error" });
  };

  static getAllInventory = async (req = request, res = response) => {
    try {
      const { page } = req.params;
      const dbConnection = req.clientConnection;
      const inventoryModel = new InventoryModel(dbConnection);
      const inventory = await inventoryModel.findAll(page);
      const all_inventory = await inventoryModel.totalPages(page);
      const last_page = Math.ceil(all_inventory.length / 10);
      const total = all_inventory.length;

      return res.status(200).json({
        status: true,
        data: {
          total,
          current_page: parseInt(page),
          last_page,
          inventory,
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    } finally {
      if (req.clientConnection) {
        await req.clientConnection.destroy();
      }
    }
  };

  static getInventoryItem = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const dbConnection = req.clientConnection;
      const inventoryModel = new InventoryModel(dbConnection);
      const inventory_item = await inventoryModel.findById(id);

      return res.status(200).json({
        status: true,
        data: inventory_item,
        error: inventory_item ? null : "El item no existe",
      });
    } catch (error) {
      this.#handleError(error, res);
    }finally {
      if (req.clientConnection) {
        await req.clientConnection.destroy();
      }
    }
  };

  static verifyRefItem = async (req = request, res = response) => {
    try {
      const { ref } = req.params;
      const dbConnection = req.clientConnection;
      const inventoryModel = new InventoryModel(dbConnection);
      const valid_reference = await inventoryModel.verifyReference(
        ref
      );

      return res.status(200).json({
        status: valid_reference ? false : true,
        data: {
          message: valid_reference
            ? "La referencia ya esta en uso"
            : "La referencia es valida",
        },
        error: null,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }finally {
      if (req.clientConnection) {
        await req.clientConnection.destroy();
      }
    }
  };

  static save = async (req = request, res = response) => {
    try {
      const { id_inventory, inventory_reference } = req.body;
      const dbConnection = req.clientConnection;
      const inventoryModel = new InventoryModel(dbConnection);

      let data = req.body;
      let is_new = true;
      let message = "";

      const item_inventory = await inventoryModel.findById(id_inventory);
      const valid_inventory_reference = await inventoryModel.verifyReference(
        inventory_reference
      );

      data = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "")
      );
      if (item_inventory != undefined) {
        is_new = false;
        delete data.created_at;
        message = "El item fue actualizado con exito";
        data.updated_at = CurrentDateTime();
        await inventoryModel.updateColumnByInventoryId(id_inventory, data);
      } else {
        if (valid_inventory_reference)
          throw CustomError.badRequest("El item ya existe en el inventario");
       
        data.created_at = CurrentDateTime();
        await inventoryModel.create(data);
        message = "El item fue creado con exito";
      }

      return res.status(200).json({
        status: true,
        data: {
          is_new,
          message,
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }finally {
      if (req.clientConnection) {
        await req.clientConnection.destroy();
      }
    }
  };

  static delete = async (req = request, res = response) => {
    try {
      const { id } = req.params;
      const dbConnection = req.clientConnection;
      const inventoryModel = new InventoryModel(dbConnection);
      const detele_item = await inventoryModel.deleteById(id);
      if (detele_item == 0)
        throw CustomError.badRequest("El item no existe");
      return res.status(200).json({
        status: true,
        data: {
          message: "El item ha sido eliminado del inventario con éxito.",
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }finally {
      if (req.clientConnection) {
        await req.clientConnection.destroy();
      }
    }
  };

  static search = async (req = request, res = response) => {
    try {
      const data = req.body;
      const dbConnection = req.clientConnection;
      const inventoryModel = new InventoryModel(dbConnection);
      const inventory_items_found =
        await inventoryModel.searchItemByReferenceOrName(data);
      const { total } = await inventoryModel.searchInventoryCount(data);
      const last_page = Math.ceil(total / 10);

      return res.status(200).json({
        status: true,
        data: {
          last_page,
          inventory_items: inventory_items_found ?? null,
        },
        error: null,
      });
    } catch (error) {
      this.#handleError(error, res);
    }finally {
      if (req.clientConnection) {
        await req.clientConnection.destroy();
      }
    }
  };
}

module.exports = InventoryController;
