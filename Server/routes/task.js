const express = require("express");
const router = express.Router();
const Task = require("../classes/task");
const authenticate = require("../middleware/authMiddleware");

// Create a new task (Only Companies)
router.post("/create", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "company") return res.status(403).json({ message: "Only companies can create tasks" });
    req.body.postedBy = req.user.id;
    const newTask = await Task.create(req.body);
    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
