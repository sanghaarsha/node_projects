const { default: mongoose } = require("mongoose");
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ tasks });
  } catch (error) {
    res.stats(500).json(error);
  }
};

const createNewTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json(error);
  }
};

getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });

    if (!task) {
      return res
        .status(404)
        .json({ message: `task with id: ${req.params.id} not found!` });
    }

    res.json({ task });
  } catch (error) {
    res.status(500).json(error);
  }
};

updateTask = async (req, res) => {
  try {
    updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ msg: `no task with id: ${req.params.id} found` });
    }

    res.json({ updatedTask });
  } catch (error) {
    res.status(500).json(error);
  }
};

deleteTask = async (req, res) => {
  try {
    deletedTask = await Task.findOneAndDelete({ _id: req.params.id });

    if (!deletedTask) {
      return res
        .status(404)
        .json({ message: `task with id: ${req.params.id} not found!` });
    }

    // res.status(200).send();
    res.json({ deletedTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createNewTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
