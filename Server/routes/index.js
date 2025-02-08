const express = require("express");
// Import all route files
const authRoutes = require("./auth");
const userRoutes = require("./user");
const taskRoutes = require("./task");
const submissionRoutes = require("./submission");

const router = express.Router();

// Define routes
router.use("/auth", authRoutes); // Authentication routes
router.use("/users", userRoutes); // User management routes
router.use("/tasks", taskRoutes); // Task-related routes
router.use("/submissions", submissionRoutes); // Submission routes

module.exports = router;
