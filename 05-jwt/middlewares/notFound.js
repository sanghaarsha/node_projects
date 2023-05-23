const notFound = (req, res) => {
  res.status(404).json({ msg: "invalid endpoint" });
};

module.exports = notFound;
