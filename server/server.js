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
