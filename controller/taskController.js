const Task = require('../model/task');

// Function to create a new task
async function createTask(req, res) {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({ message: "Task created Successfully", task});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Function to retrieve all tasks
async function getTasks(req, res) {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to retrieve a single task by ID
async function getTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to update a task by ID
async function updateTask(req, res) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        Object.assign(task, req.body);
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Function to delete a task by ID
async function deleteTask(req, res) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await Task.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
