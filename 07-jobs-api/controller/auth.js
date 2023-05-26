const register = async (req, res) => {
  res.json({
    msg: "register user",
  });
};

const login = async (req, res) => {
  res.json({
    msg: "login user",
  });
};

module.exports = {
  register,
  login,
};
