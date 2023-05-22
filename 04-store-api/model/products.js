const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided."],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided."],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} not in supported list of companies.",
    },
    // enum: ["ikea", "liddy", "caressa", "marcos"]
  },
});

module.exports = mongoose.model("Product", productSchema);
