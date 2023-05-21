const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected to the database!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
