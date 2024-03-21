const { Router } = require("express");

const AuthMiddleware = require("../../middlewares/validate-token");
const InventoryController = require("../../controllers/inventory.controller");

class InventoryRoutes {
  static get routes() {
    const router = Router();
    router.use(AuthMiddleware.validateJWT);
    router.get("/all/:page", InventoryController.getAllInventory);
    router.get("/detail/:id", InventoryController.getInventoryItem);
    router.get("/verify-ref/:ref", InventoryController.verifyRefItem);
    router.post("/save",  InventoryController.save);
    router.post("/search/", InventoryController.search);
    router.delete("/delete/:id", InventoryController.delete);

    return router;
  }
}

module.exports = InventoryRoutes;
