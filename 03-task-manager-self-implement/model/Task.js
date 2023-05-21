const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: [true, "name must be provided"], trim: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
