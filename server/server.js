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

// ✅ **Fix: Keep Only One WebSocket Handler**
io.on("connection", (socket) => {
  console.log(`✅ WebSocket Client Connected: ${socket.id}`);

  // 🔍 **Log all incoming messages**
  socket.onAny((event, ...args) => {
    console.log(`📩 Received event: ${event}`, args);
  });

  // ✅ Send a test message when a client connects
  socket.emit("serverMessage", { message: "Welcome to WebSockets!" });

  // 🔌 **Detect disconnections**
  socket.on("disconnect", (reason) => {
    console.log(`🔌 WebSocket Client Disconnected: ${socket.id}, Reason: ${reason}`);
  });

  // 🛠 **New test event**
  socket.on("testMessage", (data) => {
    console.log(`📩 Received from client: ${data}`);
    socket.emit("serverResponse", { message: "Hello from server!" });
  });
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ **Fix: Explicitly Allow WebSockets in Content Security Policy**
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' ws://localhost:3000 ws://127.0.0.1:3000 ws://* wss://*; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;"
  );
  next();
});


// ✅ Test Route (Fix for 404 on `/`)
app.get("/", (req, res) => {
  res.send("<h1>Server is Running!</h1>");
});

// ✅ API Routes
app.use("/api", cardRoutes);
app.use("/auth", authRoutes);

// ✅ **Fix: Start Server AFTER Database Sync**
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced successfully.");

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database sync failed:", error);
  }
})();

console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Not Found");
