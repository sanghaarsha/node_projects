const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a name"],
    trim: true,
    maxlength: [40, "name cannot be this long"],
  },
  completed: {type:Boolean, default:false},
});

// model is a representation of schema, in mongoose it is a wrapper
// which provides interface to database

module.exports = mongoose.model("Task", TaskSchema);
