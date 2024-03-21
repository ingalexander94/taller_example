const { Router } = require("express");
const AuthRoutes = require("./auth/auth.router");
const TeamRoutes = require("./teams/teams.router");
const BrandRoutes = require("./brand/brand.router");
const TechnicianRoutes = require("./technician/technician.router");
const ComponentRoutes = require("./components/component.router");
const OperationRoutes = require("./operations/operations.router");
const UserRoutes = require("./users/users.router");
const UserTeamsRouter = require("./users_teams/user_teams_router");
const InventoryRoutes = require("./inventory/inventory.router");
const resolveClientDBConnection = require("../middlewares/db-connection");
const PersonalRoutes = require("./personal/personal.router");
const OperationsExpensives = require("./operations_expensives/operations_expensives.router");

class AppRouter {
  static get routes() {
    const router = Router();

    router.use(resolveClientDBConnection);

    router.get("/api", (_, res) => {
      return res.send("Welcome to Mapi API");
    });

    router.use("/api/v1/auth", AuthRoutes.routes);
    router.use("/api/v1/teams", TeamRoutes.routes);
    router.use("/api/v1/brands", BrandRoutes.routes);
    router.use("/api/v1/technician", TechnicianRoutes.routes);
    router.use("/api/v1/components", ComponentRoutes.routes);
    router.use("/api/v1/operations", OperationRoutes.routes);
    router.use("/api/v1/users", UserRoutes.routes);
    router.use("/api/v1/usersTeam", UserTeamsRouter.routes);
    router.use("/api/v1/inventory", InventoryRoutes.routes);
    router.use("/api/v1/personal", PersonalRoutes.routes);
    router.use("/api/v1/operatingExpenses", OperationsExpensives.routes);

    return router;
  }
}

module.exports = AppRouter;
