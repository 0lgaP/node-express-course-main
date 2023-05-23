const Task = require('../models/task.js')

const getAllTasks = (req, res) => {
  res.send("get all items");
};

const getTask = (req, res) => {
  res.json({ id: req.params.id });
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({msg: error})
  }
};

const updateTask = (req, res) => {
  // res.send('update single task')
  res.json({ update: req.params });
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
