const { Router } = require("express");
const AuthMiddleware = require("../../middlewares/validate-token");
const UserTeamsController = require("../../controllers/user_teams_controller");

class UserTeamsRouter {
  static get routes() {
    const router = Router();
    router.use(AuthMiddleware.validateJWT);
    router.get("/teams/:id", UserTeamsController.getTeams);
    router.post("/uploadPhotos/:id", UserTeamsController.uploadPhotos);
    router.delete("/deletePhoto/:id", UserTeamsController.removePhoto);
    router.delete("/deleteAllPhoto/:id", UserTeamsController.removeAllPhotos);
    router.post("/save", UserTeamsController.save);
    router.get("/brands/:id_team", UserTeamsController.getBrandsByTeam);
    router.get("/my_teams", UserTeamsController.getMyTeams);
    router.get("/listUserTeams", UserTeamsController.getListTeams);
    router.get("/detailUserTeam/:id", UserTeamsController.getDetailUserTeam);
    router.get("/getSaveData/:id", UserTeamsController.getSaveData);
    router.get("/download", UserTeamsController.getDownloadData);
    router.get("/listPlateUserTeam", UserTeamsController.getListPlate);
    router.get("/listDriverUserTeam", UserTeamsController.getListDriver);
    return router;
  }
}

module.exports = UserTeamsRouter;
