const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
  name: String,
  system: { type: mongoose.Schema.Types.ObjectId, ref: "SolarSystem" },
  visitors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Visitor" }],
});

module.exports = mongoose.model("Planet", planetSchema);
