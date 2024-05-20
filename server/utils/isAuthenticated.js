module.exports = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  // TODO: redirect to login view
  res.json("User is not authenticated");
};
