const { request, response } = require("express");
const { validationResult } = require("express-validator");

const stopValidate = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mapped = errors.mapped();
    const keys = Object.keys(mapped);
    return res.status(400).json({
      status: false,
      data: null,
      error: mapped[keys[0]].msg,
    });
  }
  next();
};

module.exports = stopValidate;
