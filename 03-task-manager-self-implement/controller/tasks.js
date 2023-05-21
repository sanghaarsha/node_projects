const Task = require("../model/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createTask = async (req, res) => {
  // req.body = body data i.e. from submit form actions, etc.
  // req.params.id = from url
  newTask = req.body;
  try {
    data = await Task.create(newTask);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getSingleTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    const task = await Task.findOne({ _id: taskID });
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json(error);
  }
};

const editTask = async (req, res) => {
  const taskID = req.params.id;
  const newData = req.body;
  try {
    const data = await Task.findOneAndUpdate({ _id: taskID }, newData, {
      new: true,
      runValidators: true,
    }); // while updating by default, validators are not applied and returned data is old one
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    const data = await Task.findOneAndDelete({ _id: taskID });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  editTask,
  deleteTask,
};
