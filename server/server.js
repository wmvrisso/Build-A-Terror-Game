require("dotenv").config({ path: __dirname + "/.env" }); // Load environment variables

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
const http = require("http");
const { Server } = require("socket.io");

// Create HTTP server (Required for Socket.io)
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Change if using another port for frontend
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", cardRoutes); // Mount API routes

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("A player connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("A player disconnected:", socket.id);
  });
});

// Sync Database Before Starting Server
(async () => {
  try {
    await sequelize.sync({ force: false }); // Change to 'true' ONLY if you want to reset tables
    console.log("Database synced successfully.");
    
    // Start the server AFTER database sync
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();