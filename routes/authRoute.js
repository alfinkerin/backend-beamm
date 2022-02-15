const express = require("express");
const { loginController } = require("../controllers/auth_controller");

const { validLogin } = require("../utils/valid");

const router = express.Router();

router.post("/login", loginController);

module.exports = router;
