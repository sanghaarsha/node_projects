const mongoose = require("mongoose");

const connectDB = (uri) => {
  mongoose
    .connect(uri)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
