const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong try again later",
  };

  // duplicate error code : 11000
  if (err.code && err.code == "11000") {
    customError.msg = `duplicate value for: ${Object.keys(
      err.keyValue
    )}, choose another one!`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
    return res.status(customError.statusCode).json({ msg: customError.msg });
  }

  // validation error:
  if (err.name == "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;

    return res.status(customError.statusCode).json(customError.msg);
  }

  // cast error
  if ((err.name = "CastError")) {
    customError.msg = `Cast error: No item found with id ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
    return res.status(customError.statusCode).json({ msg: customError.msg });
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandler;
