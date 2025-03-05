import io from "socket.io-client";

export default class SocketHandler {
  constructor(scene) {
    this.scene = scene;
    this.socket = io("http://localhost:3000"); // Adjust when needed

    this.socket.on("phaseChange", (phase) => {
        console.log(`Game phase changed to: ${phase}`);
    });

    this.socket.on("updateHP", (data) => {
      console.log(`Player ${data.playerId} HP updated to ${data.newHP}`);
    });

    this.socket.on("turnEnded", (playerId) => {
      console.log(`Player ${playerId}'s turn`);
    });


    this.socket.on("gameOver", (winner) => {
      console.log(`Game over! Player ${winner} wins!`);
    });
  }

  sendPlayerReady(playerId) {
    this.socket.emit("playerReady", { playerId });
  }

  sendPhaseChange(phase) {
    this.socket.emit("phaseChange", { phase });
  }

  sendTurnEnded(playerId) {
    this.socket.emit("turnEnded", { playerId });
  }

  sendGameOver(winner) {
    this.socket.emit("gameOver", { winner });
  }
}
