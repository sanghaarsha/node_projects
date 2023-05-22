require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const connectDB = require("./db/connect");
const Product = require("./model/products");

// product data
const products = require("./products.json");

const start = async (uri) => {
  try {
    await connectDB(uri);
    startDeleting();
    startPopulating();
    console.log("success!!");
  } catch (error) {
    console.log(error);
  }
};

startDeleting = async () => {
  try {
    await Product.deleteMany();
  } catch (error) {
    console.log(error);
  }
};

startPopulating = async () => {
  try {
    await Product.create(products);
  } catch (error) {
    console.log(error);
  }
};

start(MONGO_URI);
