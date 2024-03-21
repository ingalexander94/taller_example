const { Router } = require("express");
const AuthMiddleware = require("../../middlewares/validate-token");
const PersonalController = require("../../controllers/personal.controller");

class PersonalRoutes {
  static get routes() {
    const router = Router();
    router.use(AuthMiddleware.validateJWT);
    router.post("/save", PersonalController.savePersonal);
    router.get("/all", PersonalController.getAll);
    router.get("/download", PersonalController.getDownloadData);
    router.get("/detail/:id", PersonalController.getDetail);
    router.delete("/delete/:id", PersonalController.deletePersonal);
    return router;
  }
}

module.exports = PersonalRoutes;
