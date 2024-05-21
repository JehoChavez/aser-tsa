const crypto = require("crypto");

module.exports.login = (req, res) => {
  const auth_password = process.env.AUTH_PASSWORD;
  const inputPassword = req.body.password;

  if (
    crypto.timingSafeEqual(
      Buffer.from(inputPassword),
      Buffer.from(auth_password)
    )
  ) {
    req.session.isAuthenticated = true;

    // TODO: redirect to home page
    res.json("Authenticated successfully");
  } else {
    res.json("Incorrect password");
  }
};
