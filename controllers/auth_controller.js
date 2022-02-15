const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//login controller
exports.loginController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    // check if user exist

    User.findOne({
      email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: "User with that email does not exist. Please signup",
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: "email and password do not match",
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      const { _id, email, role } = user;

      return res.json({
        token,
        user: {
          _id,
          email,
          role,
        },
      });
    });
  }
};
