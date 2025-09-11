const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/solarSystemDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌌 Welcome to the Solar System API!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
