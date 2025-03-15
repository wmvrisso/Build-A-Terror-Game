import sequelize from "./db.js";
import User from "./user.js"; // Import User model

const db = { sequelize, User };

export default db;
