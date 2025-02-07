const express = require("express");
const router = express.Router();
const Auth = require("../classes/auth");  // ✅ Ensure this path is correct

// Register Route
router.post("/register", async (req, res) => {
  try {
    const newUser = await Auth.register(req.body);
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await Auth.login(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
