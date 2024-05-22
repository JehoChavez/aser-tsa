const CustomResponse = require("./CustomResponse");

module.exports = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  // TODO: redirect to login view
  const response = new CustomResponse(null, 401, "unathorized");
  res.status(response.status).json(response);
};
