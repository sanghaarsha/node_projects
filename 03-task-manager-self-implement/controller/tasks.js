const Task = require("../model/Task");
const asyncWrapper = require("../async/asyncWrapper");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  // req.body = body data i.e. from submit form actions, etc.
  // req.params.id = from url
  newTask = req.body;
  data = await Task.create(newTask);
  res.status(200).json({ data });
});

const getSingleTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const task = await Task.findOne({ _id: taskID });
  res.status(200).json({ task });
});

const editTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const newData = req.body;
  const data = await Task.findOneAndUpdate({ _id: taskID }, newData, {
    new: true,
    runValidators: true,
  }); // while updating by default, validators are not applied and returned data is old one
  res.status(200).json({ data });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const data = await Task.findOneAndDelete({ _id: taskID });
  res.status(200).json(data);
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  editTask,
  deleteTask,
};
