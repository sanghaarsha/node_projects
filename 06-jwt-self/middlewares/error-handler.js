const CustomAPIError = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.status).json(err.message);
  }
  return res.status(500).json({ msg: "internal server error" });
};

module.exports = errorHandler;
