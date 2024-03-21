const { check } = require("express-validator");
const stopValidate = require("../middlewares/validate-request");

const validateCreateTechnician = () => {
  return [
    check("technician_name", "El nombre del técnico no es valido")
      .trim()
      .isLength({
        min: 2,
        max: 100,
      }),
    check("technician_code", "El código del técnico no es valido")
      .trim()
      .isLength({
        min: 2,
        max: 100,
      }),
    stopValidate,
  ];
};

module.exports = {
  validateCreateTechnician,
};
