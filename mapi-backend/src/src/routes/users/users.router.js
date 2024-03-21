const { Router } = require("express");
const UserController = require("../../controllers/user.controller");
const AuthMiddleware = require("../../middlewares/validate-token");

class UserRoutes {
  static get routes() {
    const router = Router();
    router.use(AuthMiddleware.validateJWT);
    router.get("/detailsUserTeam/:id", UserController.getDetailsUserTeam);
    router.get("/listPersonPage/", UserController.getListPersonPage);
    router.post("/save", UserController.saveUser);
    return router;
  }
}

module.exports = UserRoutes;
