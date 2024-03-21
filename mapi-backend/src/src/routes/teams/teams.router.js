const { Router } = require("express");
const TeamsController = require("../../controllers/team.controller");
const AuthMiddleware = require("../../middlewares/validate-token");
const { validateCreateTeam } = require("../../validators/team.validator");

class TeamRoutes {
  static get routes() {
    const router = Router();
    router.use(AuthMiddleware.validateJWT);
    router.get("/all", TeamsController.getTeams);
    router.get("/detail/:id", TeamsController.getDetail);
    router.delete("/delete/:id", TeamsController.delete);
    router.post("/save", validateCreateTeam(), TeamsController.save);
    return router;
  }
}

module.exports = TeamRoutes;
