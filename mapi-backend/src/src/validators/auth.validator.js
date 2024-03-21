const { check } = require("express-validator");
const stopValidate = require("../middlewares/validate-request");

const validateLogin = () => {
  return [
    check("email", "The email format is not valid").matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    ),
    check("password", "The password format is not valid").matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{10,}$/
    ),
    stopValidate,
  ];
};

const validateEmailFormat = () => {
  return [
    check("email", "The email format is not valid").matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    ),
    stopValidate,
  ];
};

const validateCodeFormat = () => {
  return [
    check("email", "The email format is not valid").matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    ),
    check("code", "The code format is not valid").matches(/^\d{6}$/),
    stopValidate,
  ];
};

const validateUpdatePassword = () => {
  return [
    check("email", "The email format is not valid").matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    ),
    check("password", "The password format is not valid").matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{10,}$/
    ),
    check("code", "The code format is not valid").matches(/^\d{6}$/),
    stopValidate,
  ];
};

module.exports = {
  validateLogin,
  validateEmailFormat,
  validateCodeFormat,
  validateUpdatePassword,
};
