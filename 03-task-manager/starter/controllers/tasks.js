


const getAllTasks = (req, res) => {
  res.send('get all items')
}

const getTask = (req, res) => {
  res.json({ id: req.params.id})
}

const createTask = (req, res) => {
  res.json(req.body)
}

const updateTask = (req, res) => {
  res.send('get single task')
}

const deleteTask = (req, res) => {
  res.send('delete task')
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}