const { Router } = require("express");
const AuthMiddleware = require("../../middlewares/validate-token");
const OperationsExpensivesController = require("../../controllers/operations_expensives.controller");



class OperationsExpensives {

    static get routes() {
        const router = Router();
        router.use(AuthMiddleware.validateJWT);
        router.get("/listOperatingTeamsPage/", OperationsExpensivesController.getListOperatingTeamsPage);
        router.get("/listOperatingPlatePage/:id", OperationsExpensivesController.getListOperatingPlatePage);
        router.get("/listOperatingPlateTeamPage/:car_plate", OperationsExpensivesController.getListOperatingPlateTeamPage);
        router.get("/detailsOperatingExpenses/:id", OperationsExpensivesController.getDetailsOperatingExpenses);
        router.post("/createOperatingExpense/" , OperationsExpensivesController.createOperatingExpenses); 
        return router;
    }
}
    
    module.exports = OperationsExpensives;