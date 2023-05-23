const Product = require("../model/products");

const getAllProductsStatic = async (req, res) => {
  // throw new Error("Testing node-async error package!");
  const products = await Product.find({})
    .sort("name")
    .select("name price")
    .limit(10)
    .skip(10);
  res.json({ numberOfHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  // returns empty array if any one param doesn't match
  // const query = req.query;
  // const products = await Product.find(query);

  // selectively choosing relevant query parameters
  // const { company, featured } = req.query;
  // const products = await Product.find({ company, featured });

  // using query object, more customized
  const { featured, company, name, sort, select } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === true ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // to chain sort, we should save await for later..
  let result = Product.find(queryObject);

  if (sort) {
    // required sort format: sort(first second ...)
    const sortBy = sort.split(",").join(" ");
    result = result.sort(sortBy);
  } else {
    // default sort : latest products
    result = result.sort("-createdAt");
  }

  // chaining select
  if (select) {
    const selectBy = select.split(",").join(" ");
    result.select(selectBy);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  /*  Working principle
      Default: skip = (1-1)*10 = 0, limit = 10 , shows first 10 values
      For page 'n':
        skip = (n-1)*y = x , limit = y, shows 'y' values starting from 'x'
      Eg. for page '3':
        skip = (3-1)*10 = 20, limit = 10, shows 10 values from 20 to 30
  */
  result = result.skip(skip).limit(limit);

  const products = await result;

  res.json({ products, numberOfHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
