const Task = require("../models/Task.js");

const getTasks = async (req, res) => {
  try {
    const userId = req.userId; // 🔐 trusted
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.userId; // 🔐 trusted

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      userId,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },     // 🔐 ownership check
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      userId, // 🔐 ownership enforced
    });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
  