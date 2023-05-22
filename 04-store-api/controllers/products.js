const getAllProductsStatic = async (req, res) => {
  throw new Error("Testing node-async error package!");
  res.json({ msg: "static : all products" });
};

const getAllProducts = async (req, res) => {
  res.json({ msg: "all products" });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
