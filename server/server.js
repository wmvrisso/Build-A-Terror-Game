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
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
  transports: ["websocket", "polling"], // Ensures WebSockets are used
});


// Middleware
app.use(cors());
app.use(express.json());

// ✅ **FIX: Explicitly Allow WebSockets in Content Security Policy**
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' ws://localhost:3000 ws://127.0.0.1:3000 ws://* wss://*; frame-ancestors 'self';"
  );
  next();
});

// Test Route
app.get("/test", (req, res) => {
  res.send("Server is running!");
});


// Routes
app.use("/api", cardRoutes); // Mount API routes
app.use("/auth", authRoutes); // Mount authentication routes

// ✅ **Fixing WebSocket Handling**
io.on("connection", (socket) => {
  console.log(`✅ WebSocket Client Connected: ${socket.id}`);
  socket.emit("serverMessage", { message: "Welcome to WebSockets!" });

  socket.on("disconnect", () => {
    console.log(`🔌 WebSocket Client Disconnected: ${socket.id}`);
  });
});


// Sync Database Before Starting Server
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced successfully.");

    // Start the server AFTER database sync
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();

console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Not Found");
