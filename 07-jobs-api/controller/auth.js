const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ token, user: { name: user.name } });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("both email and password required");
  }

  // check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("invalid email or password!");
  }

  // compare password
  const check = await user.comparePassword(password);

  if (!check) {
    throw new UnauthenticatedError("invalid username or password");
  }

  // generate token
  const token = user.createJWT();

  // send token
  res.status(StatusCodes.OK).json({ token, user: { name: user.name } });
};

module.exports = {
  register,
  login,
};
