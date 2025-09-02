const { sequelize } = require("./db");
const {
  insertPokemonTypes,
  insertTrainersAndTowns,
  insertPokemons,
  insertPokemonTrainer,
} = require("./seed");
const {
  getHeaviestPokemon,
  findByType,
  findOwners,
  findRoster,
  findMostOwnedPokemon,
} = require("./queries");

const main = async () => {
  await sequelize.sync({ force: true });
  console.log("All tables created successfully.");

  await insertPokemonTypes();
  await insertTrainersAndTowns();
  await insertPokemons();
  await insertPokemonTrainer();

  console.log("All data imported successfully.");
  const heaviest = await getHeaviestPokemon();
  console.log(
    `The heaviest pokemon is ${heaviest.name} weighing ${heaviest.weight}.`
  );

  const grassPokemons = await findByType("grass");
  console.log("Grass type Pokemons:", grassPokemons);

  const gengarOwners = await findOwners("gengar");
  console.log("Gengar is owned by:", gengarOwners);

  const logaRoster = await findRoster("Loga");
  console.log("Loga owns:", logaRoster);

  const mostOwned = await findMostOwnedPokemon();
  console.log("Most owned pokemon(s):", mostOwned);
};

main();
