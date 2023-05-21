const errorHandlerMiddleware = (err, req, res, next) => {
  return res
    .status(500)
    .json({
      msg: `Something went wrong, please check the request and try again!`,
      errorTrace: err,
    });
};

module.exports = errorHandlerMiddleware;
