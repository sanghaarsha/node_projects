require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const connectDB = require("./db/connect");
const Product = require("./model/products");

// product data
const products = require("./products.json");

const start = async (uri) => {
  try {
    await connectDB(uri);
    await Product.deleteMany();
    await Product.create(products);
    console.log("success!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start(MONGO_URI);
