const notFound = (req, res, next) => {
  res.status(404).json({ msg: "requested route does not exist" });
};

module.exports = notFound;
