import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import sequelize from "./models/db.js";
import cardRoutes from "./routes/cardRoutes.js"; 
import authRoutes from "./routes/authRoutes.js";

const app = express();
const server = createServer(app); // Create HTTP server for Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true, // Allow credentials
  },
  transports: ["websocket", "polling"], // Ensure WebSockets work
});

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' ws://localhost:3000 ws://localhost:5173;"
  );
  next();
});

// Routes
app.use("/api", cardRoutes); // Mount API routes
app.use("/auth", authRoutes); // Mount authentication routes

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
    await sequelize.sync({ force: false }); // Change to 'true' ONLY if resetting tables
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

console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Not Found");
