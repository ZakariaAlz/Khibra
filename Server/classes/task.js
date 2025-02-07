const TaskModel = require("../models/taskModel");
class Task {
  // Create a new task
  static async create(task) {
    return await TaskModel.create(task);
  }

  // Find all tasks
  static async find() {
    return await TaskModel.find().populate("postedBy", "name").exec();
  }

  // Find a task by ID
  static async findById(taskId) {
    return await TaskModel.findById(taskId).populate("postedBy", "name").exec();
  }

  // Update a task
  static async update(id, task) {
    return await TaskModel.updateOne({ _id: id }, { $set: task }).exec();
  }

  // Delete a task
  static async delete(taskId) {
    return await TaskModel.deleteOne({ _id: taskId }).exec();
  }
}

module.exports = Task;
