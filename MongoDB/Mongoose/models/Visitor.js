const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  name: String,
  homePlanet: { type: mongoose.Schema.Types.ObjectId, ref: "Planet" },
  visitedPlanets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Planet" }],
});

module.exports = mongoose.model("Visitor", visitorSchema);
