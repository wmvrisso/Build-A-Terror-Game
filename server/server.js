require("dotenv").config();
const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const players = {
  1: { hp: 100, ready: false },
  2: { hp: 100, ready: false }
}; // Track player's hp, and readiness for battle phase.


io.on("connection", (socket) => {
  console.log("A player connected!");

  socket.on("playerReady", ({ playerId }) => {
    players[playerId] = { ready: true };
    console.log(`Player ${playerId} is ready`);
    io.emit("playerReady", playerId);

    // If both players are ready, start battle
    if (players[1]?.ready && players[2]?.ready) {
      io.emit("phaseChange", "battle");
    }
  });

  socket.on("turnEnded", ({ playerId }) => {
    console.log(`Player ${playerId} ended their turn`);
    io.emit("turnEnded", playerId);
  });

  socket.on("gameOver", ({ winner }) => {
    console.log(`Game over! Player ${winner} wins!`);
    io.emit("gameOver", winner);
  });

  socket.on("disconnect", () => {
    console.log("A player disconnected.");

const cardRoutes = require("./routes/cardRoutes");
app.use("/cards", cardRoutes);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("cardFlip", (index) => {
    io.emit("cardFlip", index);

  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
