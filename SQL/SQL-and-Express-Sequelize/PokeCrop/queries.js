const { sequelize } = require("./db");
const { QueryTypes } = require("sequelize");

async function getHeaviestPokemon() {
  const query = `
    SELECT name, weight
    FROM pokemon
    ORDER BY weight DESC
    LIMIT 1;
  `;
  const result = await sequelize.query(query, { type: QueryTypes.SELECT });
  return result[0];
}

async function findByType(pokemonType) {
  const query = `SELECT p.name
    FROM pokemon p
    JOIN pokemon_type pt ON p.type_id = pt.id
    WHERE pt.name = :typeName;
  `;
  const result = await sequelize.query(query, {
    replacements: { typeName: pokemonType },
    type: QueryTypes.SELECT,
  });

  return result.map((p) => p.name);
}

async function findOwners(pokemonName) {
  const query = `SELECT t.name
    FROM trainer t
    JOIN pokemon_trainer pt ON t.id = pt.trainer_id 
    JOIN pokemon p ON pt.pokemon_id = p.id
    WHERE p.name = :pokemonName;
  `;
  const result = await sequelize.query(query, {
    replacements: { pokemonName },
    type: QueryTypes.SELECT,
  });

  return result.map((trainer) => trainer.name);
}

async function findRoster(trainerName) {
  const query = `
    SELECT p.name
    FROM pokemon p
    JOIN pokemon_trainer pt ON p.id = pt.pokemon_id
    JOIN trainer t ON pt.trainer_id = t.id
    WHERE t.name = :trainerName;
  `;

  const result = await sequelize.query(query, {
    replacements: { trainerName },
    type: QueryTypes.SELECT,
  });

  return result.map((pokemon) => pokemon.name);
}

async function findMostOwnedPokemon() {
  const query = `
    SELECT p.name, COUNT(pt.trainer_id) AS owners_count
    FROM pokemon p
    JOIN pokemon_trainer pt ON p.id = pt.pokemon_id
    GROUP BY p.id
    HAVING owners_count = (
      SELECT MAX(sub_count) FROM (
        SELECT COUNT(pt2.trainer_id) AS sub_count
        FROM pokemon_trainer pt2
        GROUP BY pt2.pokemon_id
      ) AS subquery
    );
  `;

  const result = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  return result.map((p) => p.name);
}
module.exports = {
  getHeaviestPokemon,
  findByType,
  findOwners,
  findRoster,
  findMostOwnedPokemon,
};
