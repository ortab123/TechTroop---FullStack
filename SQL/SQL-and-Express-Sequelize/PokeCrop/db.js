const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mysql://:@localhost/poke_corp", {
  logging: false,
});

// Models
const PokemonType = sequelize.define(
  "PokemonType",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  { tableName: "pokemon_type", timestamps: false }
);

const Town = sequelize.define(
  "Town",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  { tableName: "town", timestamps: false }
);

const Trainer = sequelize.define(
  "Trainer",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    town_id: {
      type: DataTypes.INTEGER,
      references: { model: Town, key: "id" },
    },
  },
  { tableName: "trainer", timestamps: false }
);

const Pokemon = sequelize.define(
  "Pokemon",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    type_id: {
      type: DataTypes.INTEGER,
      references: { model: PokemonType, key: "id" },
    },
  },
  { tableName: "pokemon", timestamps: false }
);

const PokemonTrainer = sequelize.define(
  "PokemonTrainer",
  {
    pokemon_id: {
      type: DataTypes.INTEGER,
      references: { model: Pokemon, key: "id" },
    },
    trainer_id: {
      type: DataTypes.INTEGER,
      references: { model: Trainer, key: "id" },
    },
  },
  { tableName: "pokemon_trainer", timestamps: false, primaryKey: false }
);

Trainer.belongsToMany(Pokemon, {
  through: PokemonTrainer,
  foreignKey: "trainer_id",
  otherKey: "pokemon_id",
});

Pokemon.belongsToMany(Trainer, {
  through: PokemonTrainer,
  foreignKey: "pokemon_id",
  otherKey: "trainer_id",
});

module.exports = {
  sequelize,
  PokemonType,
  Town,
  Trainer,
  Pokemon,
  PokemonTrainer,
};
