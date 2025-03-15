import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Card = sequelize.define("Card", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monster_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  part: {
    type: DataTypes.ENUM("Head", "Body", "Legs"),
    allowNull: false,
  },
  speed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attack: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  defense: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  health: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rarity: {
    type: DataTypes.ENUM("Common", "Rare", "Epic", "Legendary", "Mythical"),
    allowNull: false,
  },
});

export default Card; // Use ES module export
