const { default: mongoose } = require("mongoose");
const Task = require("../models/Task");
const asyncWrapper = require("../middleware/asyncHandler");
const { createCustomError } = require("../errors/customError");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.json({ tasks });
  // responses can contain more details:
  // res.status(200).json({ tasks, amount: tasks.length });
  // res.status(200).json({ success: true, data: { tasks, numberOfHits: tasks.length } });
});

const createNewTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return next(createCustomError(`no task with id: ${req.params.id}`, 404));
  }

  res.json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  updatedTask = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTask) {
    return next(createCustomError(`no task with id: ${req.params.id}`, 404));
  }

  res.json({ updatedTask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  deletedTask = await Task.findOneAndDelete({ _id: req.params.id });

  if (!deletedTask) {
    return next(createCustomError(`no task with id: ${req.params.id}`, 404));
  }

  // res.status(200).send();
  res.json({ deletedTask });
});

module.exports = {
  getAllTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
