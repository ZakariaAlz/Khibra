const Task = require('../models/Task');

class TaskController {
    static async createTask(req, res) {
        if (req.user.role !== 'startup') return res.status(403).json({ msg: 'Only startups can create tasks' });

        try {
            const { title, description, difficulty } = req.body;
            const task = new Task({ title, description, difficulty, createdBy: req.user.id });
            await task.save();
            res.status(201).json(task);
        } catch (err) {
            res.status(500).json({ msg: 'Server Error' });
        }
    }

    static async getTasks(req, res) {
        try {
            const tasks = await Task.find().populate('createdBy', 'name');
            res.json(tasks);
        } catch (err) {
            res.status(500).json({ msg: 'Server Error' });
        }
    }
}

module.exports = TaskController;
