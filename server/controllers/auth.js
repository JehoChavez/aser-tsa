const bcrypt = require("bcrypt");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.login = async (req, res) => {
  const inputPassword = req.body.password;

  try {
    const { AuthConfig } = require("../models");
    const config = await AuthConfig.findOne({ where: { id: 1 } });
    if (!config) throw new ExpressError("Aurh config not found", 500);
    const hashedPassword = config.hashedPassword;

    const match = await bcrypt.compare(inputPassword, hashedPassword);

    if (match) {
      req.session.isAuthenticated = true;
      const response = new CustomResponse(null, 200, "authenticated");
      res.status(response.status).json(response);
    } else {
      const response = new CustomResponse(null, 400, "incorrect password");
      res.status(response.status).json(response);
    }
  } catch (error) {
    const response = new CustomResponse("Internal error", 500);
    res.status(response.status).json(response);
  }
};

module.exports.logout = (req, res) => {
  try {
    if (req.session.isAuthenticated) {
      req.session.destroy();
      const response = new CustomResponse("logged out successully", 200);
      res.status(response.status).json(response);
    } else {
      const response = new CustomResponse("not logged in", 400);
      res.status(response.status).json(response);
    }
  } catch (error) {
    throw new ExpressError("error logging out", 500);
  }
};

module.exports.checkSession = (req, res) => {
  if (req.session.isAuthenticated) {
    const response = new CustomResponse({ isAuthenticated: true }, 200);
    res.json(response);
  } else {
    const response = new CustomResponse({ isAuthenticated: false }, 200);
    res.json(response);
  }
};

module.exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const { AuthConfig } = require("../models");
    const config = await AuthConfig.findOne({ where: { id: 1 } });
    if (!config) throw new ExpressError("Aurh config not found", 500);

    const isValid = await bcrypt.compare(
      currentPassword,
      config.hashedPassword
    );
    if (!isValid) {
      return res
        .status(403)
        .json(new CustomResponse(null, 403, "incorrect current password"));
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    config.hashedPassword = newHashedPassword;
    await config.save();

    res.status(200).json(new CustomResponse(null, 200, "password updated"));
  } catch (error) {
    res.status(500).json(new CustomResponse("Error updating password", 500));
  }
};
