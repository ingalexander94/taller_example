const { Router } = require("express");
const BrandController = require("../../controllers/brand.controller");
const AuthMiddleware = require("../../middlewares/validate-token");

class BrandRoutes {
  static get routes() {
    const router = Router();
    router.use(AuthMiddleware.validateJWT);
    router.get("/all/:brand_team", BrandController.getBrands);
    router.delete("/remove_model/:id_model", BrandController.deleteModel);
    router.delete("/remove_brand/:id_brand", BrandController.deleteBrand);
    router.get("/code", BrandController.getUniqueCode);
    router.get("/all", BrandController.getBrands);
    router.post("/save", BrandController.save);
    router.post("/create", BrandController.create);
    router.get("/models/:brand_team", BrandController.getModelsByTeam);
    return router;
  }
}

module.exports = BrandRoutes;
