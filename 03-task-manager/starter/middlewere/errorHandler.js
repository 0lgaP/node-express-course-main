const { CustomAPIError } = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json(err.message);
  }
  return res.status(500).json({ msg: "Something went wrong ¯_(ツ)_/¯" });
};

module.exports = errorHandler;
