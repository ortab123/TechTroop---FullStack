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

module.exports = { getHeaviestPokemon };
