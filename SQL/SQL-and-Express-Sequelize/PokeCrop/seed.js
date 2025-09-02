const fs = require("fs");
const { PokemonType, Town, Trainer, Pokemon, PokemonTrainer } = require("./db");

const rawData = fs.readFileSync("poke_data.json");
const pokemonList = JSON.parse(rawData);

const insertPokemonTypes = async () => {
  const typesSet = new Set(pokemonList.map((p) => p.type));
  for (const typeName of typesSet) {
    await PokemonType.create({ name: typeName });
  }
  console.log("All Pokemon types inserted.");
};

const insertTrainersAndTowns = async () => {
  const townMap = new Map(); // town name => town id
  const trainerMap = new Map(); // trainer name => trainer id

  for (const pokemon of pokemonList) {
    if (pokemon.ownedBy && pokemon.ownedBy.length > 0) {
      for (const owner of pokemon.ownedBy) {
        if (!townMap.has(owner.town)) {
          const town = await Town.create({ name: owner.town });
          townMap.set(owner.town, town.id);
        }

        if (!trainerMap.has(owner.name)) {
          const trainer = await Trainer.create({
            name: owner.name,
            town_id: townMap.get(owner.town),
          });
          trainerMap.set(owner.name, trainer.id);
        }
      }
    }
  }
  console.log("All towns and trainers inserted.");
};

const insertPokemons = async () => {
  const typeMap = {};
  const allTypes = await PokemonType.findAll();
  allTypes.forEach((t) => {
    typeMap[t.name] = t.id;
  });

  for (const p of pokemonList) {
    await Pokemon.create({
      id: p.id,
      name: p.name,
      height: p.height,
      weight: p.weight,
      type_id: typeMap[p.type],
    });
  }
  console.log("All pokemons inserted.");
};

const insertPokemonTrainer = async () => {
  const trainerMap = {};
  const allTrainers = await Trainer.findAll();
  allTrainers.forEach((t) => {
    trainerMap[t.name] = t.id;
  });

  for (const p of pokemonList) {
    if (p.ownedBy && p.ownedBy.length > 0) {
      for (const owner of p.ownedBy) {
        await PokemonTrainer.create({
          pokemon_id: p.id,
          trainer_id: trainerMap[owner.name],
        });
      }
    }
  }
  console.log("All pokemon-trainer relations inserted.");
};

module.exports = {
  insertPokemonTypes,
  insertTrainersAndTowns,
  insertPokemons,
  insertPokemonTrainer,
};
