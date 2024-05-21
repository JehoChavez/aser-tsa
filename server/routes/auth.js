const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/auth");
const { validateLogin } = require("../utils/validator");

router.route("/login").post(validateLogin, login);

router.route("/logout").post(logout);

module.exports = router;
