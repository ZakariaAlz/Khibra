const express = require("express");
const router = express.Router();
const Submission = require("../classes/submission");
const authenticate = require("../middleware/authMiddleware");

// Create a new submission (Only Students)
router.post("/", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "student") return res.status(403).json({ message: "Only students can submit work" });
    req.body.studentId = req.user.id;
    const newSubmission = await Submission.create(req.body);
    res.status(201).send(newSubmission);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
