const getHandler = async (req, res) => {
  res.status(200).json("get handler");
};

module.exports = {
  getHandler,
};
