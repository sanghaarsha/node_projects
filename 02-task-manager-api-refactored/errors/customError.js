class CustomErrorClass extends Error {
  constructor(message, statusCode) {
    super(message); // inherit all properties from Error class for error message
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, code) => {
  return new CustomErrorClass(msg, code);
};

module.exports = {
  CustomErrorClass,
  createCustomError,
};
