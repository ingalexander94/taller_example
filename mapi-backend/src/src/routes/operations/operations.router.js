const { Router } = require("express");

const AuthMiddleware = require("../../middlewares/validate-token");
const OperationController = require("../../controllers/operation.controller");

class OperationRoutes {
  static get routes() {
    const router = Router();
    router.use(AuthMiddleware.validateJWT);
    router.get("/get_all_Data", OperationController.getAllData);
    router.get("/all", OperationController.getAll);
    router.get("/get_modal_data", OperationController.getModalData);
    router.get("/get_components/:id_team", OperationController.getComponents);
    router.get("/get_models", OperationController.getModel);
    router.get("/filter", OperationController.getFilters);
    router.get("/search_code", OperationController.searchByCode);
    router.post("/search/", OperationController.searchOperation);
    router.post("/save", OperationController.saveOperation);
    router.delete("/remove/:id_operation", OperationController.deleteOperation);
    return router;
  }
}

module.exports = OperationRoutes;
