const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
