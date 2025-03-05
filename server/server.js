const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const cardRoutes = require("./routes/cardRoutes");
app.use("/api/cards", cardRoutes);

io.on("connection", (socket) => {
  socket.on("cardFlip", (index) => {
    io.emit("cardFlip", index);
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));
