require("dotenv").config({ path: __dirname + "/.env" }); // Force-load .env

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "Exists" : "Not Found!");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);

const express = require("express");
const cors = require("cors");
const sequelize = require("./models/db"); // Ensure correct DB connection
const cardRoutes = require("./routes/cardRoutes"); // Ensure this exists

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", cardRoutes); // Mount API routes

// Sync Database Before Starting Server
(async () => {
  try {
    await sequelize.sync({ force: false }); // Change to 'true' ONLY if you want to reset tables
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();

// Start the Server AFTER Database Sync
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});