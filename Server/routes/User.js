const express = require("express");
const router = express.Router();
const User = require("../classes/user");
const authenticate = require("../middleware/authMiddleware");

// Get all users (Admin only)
router.get("/", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get user by ID (Protected)
router.get("/find/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
