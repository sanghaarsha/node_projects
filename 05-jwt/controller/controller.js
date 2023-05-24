const { BadRequestError } = require("../errors/");
// check username, password in post request
// if exists create new JWT
// send it to front-end

// setup auth so only the request with JWT can access dashboard
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("both email and password required");
  }

  // demo id, normally provided buy database
  const id = new Date().getDate();

  // smaller payload is better
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const randNum = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${randNum}`,
  });
};

module.exports = {
  login,
  dashboard,
};
