const { Router } = require("express");
const AuthMiddleware = require("../../middlewares/validate-token");
const TechnicianController = require("../../controllers/technician.controller");
const {
  validateCreateTechnician,
} = require("../../validators/technician.validator");

class TechnicianRoutes {
  static get routes() {
    const router = Router();
    router.use(AuthMiddleware.validateJWT);
    router.get("/all/:page", TechnicianController.getAllTechnician);
    router.get("/detail/:id", TechnicianController.getTechnician);
    router.get("/delete/:id", TechnicianController.delete);
    router.get("/verify-name/:name", TechnicianController.verifyTechnicianName);
    router.get("/verify-code/:code", TechnicianController.verifyTechnicianCode);
    router.post("/save", validateCreateTechnician(), TechnicianController.save);
    router.post("/search/", TechnicianController.search);

    return router;
  }
}

module.exports = TechnicianRoutes;
