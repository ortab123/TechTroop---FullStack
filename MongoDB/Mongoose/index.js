const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/solarSystemDB");
  console.log("✅ Connected to MongoDB");
}

main().catch((err) => console.log(err));
