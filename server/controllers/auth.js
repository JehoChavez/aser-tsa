const bcrypt = require("bcrypt");
const CustomResponse = require("../utils/CustomResponse");

module.exports.login = async (req, res) => {
  const inputPassword = req.body.password;
  const hashedPassword = process.env.HASHED_PASSWORD;

  try {
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
  req.session.destroy();
  const response = new CustomResponse("logged out successully", 200);
  res.status(response.status).json(response);
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
