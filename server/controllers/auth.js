const bcrypt = require("bcrypt");
const CustomResponse = require("../utils/CustomResponse");

module.exports.login = async (req, res) => {
  const inputPassword = req.body.password;
  const hashedPassword = process.env.HASHED_PASSWORD;

  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);

    if (match) {
      req.session.isAuthenticated = true;
      // TODO: redirect to home page
      res.json("User authenticated");
    } else {
      res.json("Incorrect password");
    }
  } catch (error) {
    const response = new CustomResponse("Internal error", 500);
    res.json(response);
  }
};
