const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Card = sequelize.define("Card", {
  name: { type: DataTypes.STRING, allowNull: false },
  monster_name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  part: { type: DataTypes.STRING, allowNull: false },
  speed: { type: DataTypes.INTEGER, allowNull: false },
  attack: { type: DataTypes.INTEGER, allowNull: false },
  defense: { type: DataTypes.INTEGER, allowNull: false },
  health: { type: DataTypes.INTEGER, allowNull: false },
  rarity: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Card;
