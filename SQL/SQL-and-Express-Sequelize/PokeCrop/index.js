const {
  sequelize,
  PokemonType,
  Pokemon,
  Trainer,
  PokemonTrainer,
} = require("./db");
const {
  insertPokemonTypes,
  insertTrainersAndTowns,
  insertPokemons,
  insertPokemonTrainer,
} = require("./seed");

const main = async () => {
  await sequelize.sync({ force: true });
  console.log("All tables created successfully.");

  await insertPokemonTypes();
  await insertTrainersAndTowns();
  await insertPokemons();
  await insertPokemonTrainer();

  console.log("All data imported successfully.");

  const typesCount = await PokemonType.count();
  console.log(`Types in DB: ${typesCount}`);

  const pokemonsCount = await Pokemon.count();
  console.log(`Pokemons in DB: ${pokemonsCount}`);

  const trainers = await Trainer.findAll({ include: Pokemon });
  for (const t of trainers) {
    const pokemonsOwned = await PokemonTrainer.count({
      where: { trainer_id: t.id },
    });
    console.log(`${t.name} owns ${pokemonsOwned} pokemon(s).`);
  }
};

main();
