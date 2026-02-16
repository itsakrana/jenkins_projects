const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   MongoDB Connection
========================= */

const MONGO_URL = "mongodb://mongo:27017/devopsdb";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

/* =========================
   Schema & Model
========================= */

const statusSchema = new mongoose.Schema({
  service: String,
  status: String,
});

const Status = mongoose.model("Status", statusSchema);

/* =========================
   Routes
========================= */

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Backend is running",
    database: "MongoDB Connected",
  });
});

// Save service status
app.post("/status", async (req, res) => {
  try {
    const newStatus = new Status(req.body);
    await newStatus.save();
    res.json({ message: "Status saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all statuses
app.get("/status", async (req, res) => {
  const data = await Status.find();
  res.json(data);
});

/* =========================
   Start Server
========================= */

app.listen(3000, () => {
  console.log("Backend running on 3000");
});
