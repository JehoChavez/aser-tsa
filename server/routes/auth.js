const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  checkSession,
  changePassword,
} = require("../controllers/auth");
const { validateLogin } = require("../utils/validator");

router.route("/login").post(validateLogin, login);

router.route("/logout").post(logout);

router.route("/check-session").get(checkSession);

router.route("/change-password").post(changePassword);

module.exports = router;
