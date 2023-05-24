const CustomAPIError = require("../errors/custom-error");
// check username, password in post request
// if exists create new JWT
// send it to front-end

// setup auth so only the request with JWT can access dashboard
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("provide both username and password!", 401);
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
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({
      msg: "No token provided!",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const randNum = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${randNum}`,
    });
  } catch (error) {
    throw new CustomAPIError("not authorized", 401);
  }
};

module.exports = {
  login,
  dashboard,
};
