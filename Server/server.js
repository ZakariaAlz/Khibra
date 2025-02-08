const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import the centralized routes
const routes = require("./routes");
const authRoutes = require("./routes/auth");


const app = express();

// Middleware
app.use(express.json({ limit: "20mb" })); // Handle large JSON payloads
app.use(cors()); // Enable CORS

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

connectDB();

// Use the centralized routes
app.use("/api", routes);
app.use("/api/auth", authRoutes);
// Root Endpoint
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
