const { Router } = require("express");
const AuthMiddleware = require("../../middlewares/validate-token");
const ComponentController = require("../../controllers/component.controller");

class ComponentRoutes {
  static get routes() {
    const router = Router();
    router.use(AuthMiddleware.validateJWT);
    router.get("/all/:component_team", ComponentController.getComponents);
    router.delete(
      "/remove_system/:id_system",
      ComponentController.deleteSystem
    );
    router.delete(
      "/remove_component/:id_component",
      ComponentController.deleteComponent
    );
    router.post("/save", ComponentController.save);
    router.post("/create", ComponentController.create);
    return router;
  }
}

module.exports = ComponentRoutes;
