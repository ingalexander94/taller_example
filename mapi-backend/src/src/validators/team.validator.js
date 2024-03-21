const { check } = require("express-validator");
const stopValidate = require("../middlewares/validate-request");

const validateCreateTeam = () => {
  return [
    check("id_team", "El id del equipo es obligatorio").not().isEmpty(),
    check("team_name", "El nombre del equipo no es valido").trim().isLength({
      min: 2,
      max: 100,
    }),
    stopValidate,
  ];
};

module.exports = {
  validateCreateTeam,
};
