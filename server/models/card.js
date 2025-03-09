const { DataTypes } = require("sequelize");
const sequelize = require("./db"); // Ensure this matches your actual database file

const Card = sequelize.define("Card", {
  name: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Card;
