const { BadRequestError } = require("../errors/");
const jwt = require("jsonwebtoken");

const loginHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("both username and password required!");
  }

  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.status(200).json({ msg: "success", token });
};

const dashboardHandler = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}!`,
    secret: `Authorized data: Your lucky number is ${luckyNumber}.`,
  });
};

module.exports = {
  loginHandler,
  dashboardHandler,
};
