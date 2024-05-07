// Imported in polizas router
// Polizas controller already has a lot of code
const { Endoso } = require("../models");
const CustomResponse = require("../utils/CustomResponse");
const ExpressError = require("../utils/ExpressError");

module.exports.getEndosos = async (req, res) => {
  const listOfEndosos = Endoso.findAll({
    where: {
      polizaId: req.params.id,
    },
  });

  const response = new CustomResponse(listOfEndosos);

  res.json(response);
};
