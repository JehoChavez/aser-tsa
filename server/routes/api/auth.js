const express = require("express");
const router = express.Router();
const { login } = require("../../controllers/auth");
const { validateLogin } = require("../../utils/validator");

router.route("/login").post(validateLogin, login);

module.exports = router;
