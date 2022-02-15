//Validations Helpers
const { check } = require("express-validator");

//Login
exports.validLogin = [
  check("email", "email is required")
    .notEmpty()
    .isLength({
      min: 4,
    })
    .withMessage("email must be  4  characters"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 1,
    })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];
