const { CustomErrorClass } = require("../errors/customError");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomErrorClass) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({
    msg: "Something went wrong, please check the request and try again!",
  });
};

module.exports = errorHandlerMiddleware;
