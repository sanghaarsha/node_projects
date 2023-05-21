const mongoose = require("mongoose");

const connectDB = async (uri) => {
  await mongoose
    .connect(uri)
    .then(console.log("db connection successful"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
