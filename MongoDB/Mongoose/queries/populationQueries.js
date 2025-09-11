const mongoose = require("mongoose");
const Visitor = require("../models/Visitor");
const Planet = require("../models/Planet");
const SolarSystem = require("../models/SolarSystem");

async function runQueries() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/solarSystemDB");

    // 1. Find a visitor's list of visited planets
    const alice = await Visitor.findOne({ name: "Alice" }).populate(
      "visitedPlanets"
    );
    console.log(
      "🌍 Alice visited:",
      alice.visitedPlanets.map((p) => p.name)
    );

    // 2. Find all the visitors on a planet
    const mars = await Planet.findOne({ name: "Mars" }).populate("visitors");
    console.log(
      "👩‍🚀 Visitors on Mars:",
      mars.visitors.map((v) => v.name)
    );

    // 3. Find all the visitors in a system (subdocuments!)
    const system = await SolarSystem.findOne({ starName: "Sun" }).populate({
      path: "planets",
      populate: { path: "visitors" },
    });
    const allVisitors = [
      ...new Set(system.planets.flatMap((p) => p.visitors.map((v) => v.name))),
    ];
    console.log("🪐 All visitors in the Solar System:", allVisitors);

    // 4. Find the name of the star in the system of a visitor's home planet
    const bob = await Visitor.findOne({ name: "Bob" }).populate({
      path: "homePlanet",
      populate: { path: "system" },
    });
    console.log("⭐ Bob's home star is:", bob.homePlanet.system.starName);

    // 5. Find a planet's system's star name as well as its visitors
    const earth = await Planet.findOne({ name: "Earth" })
      .populate("system")
      .populate("visitors");
    console.log("🌎 Earth belongs to star:", earth.system.starName);
    console.log(
      "👥 Visitors on Earth:",
      earth.visitors.map((v) => v.name)
    );

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

runQueries();
