const Task = require("../models/task.js");
const asyncWrapper = require("../middlewere/async.js");
const { createCustomError } = require("../errors/customError.js");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // in this project axios is returning data, nesting data within data is confusing. Keep the res consistant.
  // res.status(200).json({ tasks, amount: tasks.length });
  // res.status(200).json({ success:true, data: {tasks, nbHits: tasks.length} });

  // res.status(500).json({ msg: error });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!taskID) {
    return next(
      createCustomError(
        `No task with id: ${taskID} found, task not deleted`,
        404
      )
    );
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(
      createCustomError(
        `No task with id: ${taskID} found, task not updated`,
        404
      )
    );
  }
  res.status(200).json({ task });
});

const editTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  if (!task) {
    return res
      .status(404)
      .json({ msg: "could not find the task, cannot edit" });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  editTask,
};
