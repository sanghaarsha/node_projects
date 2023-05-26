const mongoose = require("mongoose");

const JobSchema = mongoose.model(
  {
    company: {
      type: String,
      required: [true, "must provide a company name"],
      maxLength: 100,
    },
    position: {
      type: String,
      required: [true, "must provide a position"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
