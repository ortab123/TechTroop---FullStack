const mongoose = require("mongoose");

const solarSystemSchema = new mongoose.Schema({
  starName: String,
  planets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Planet" }],
});

module.exports = mongoose.model("SolarSystem", solarSystemSchema);
