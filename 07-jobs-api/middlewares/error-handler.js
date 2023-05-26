const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong try again later",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // duplicate error code : 11000
  if (err.code && err.code == "11000") {
    customError.msg = `duplicate value for: ${Object.keys(
      err.keyValue
    )}, choose another one!`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
    return res.status(customError.statusCode).json({ msg: customError.msg });
  }

  return res.json(err);
};

module.exports = errorHandler;
