const mongoose = require("mongoose");
const SolarSystem = require("./models/SolarSystem");
const Planet = require("./models/Planet");
const Visitor = require("./models/Visitor");

async function seed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/solarSystemDB");
    console.log("✅ Connected to MongoDB");

    await SolarSystem.deleteMany({});
    await Planet.deleteMany({});
    await Visitor.deleteMany({});

    const solarSystem = new SolarSystem({ starName: "Sun" });
    await solarSystem.save();

    const earth = new Planet({ name: "Earth", system: solarSystem._id });
    const mars = new Planet({ name: "Mars", system: solarSystem._id });
    const venus = new Planet({ name: "Venus", system: solarSystem._id });

    await earth.save();
    await mars.save();
    await venus.save();

    solarSystem.planets.push(earth, mars, venus);
    await solarSystem.save();

    const alice = new Visitor({
      name: "Alice",
      homePlanet: earth._id,
      visitedPlanets: [mars._id, venus._id],
    });

    const bob = new Visitor({
      name: "Bob",
      homePlanet: mars._id,
      visitedPlanets: [earth._id],
    });

    await alice.save();
    await bob.save();

    earth.visitors.push(bob._id);
    mars.visitors.push(alice._id);
    venus.visitors.push(alice._id);

    await earth.save();
    await mars.save();
    await venus.save();

    console.log("🌱 Seeding done!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
