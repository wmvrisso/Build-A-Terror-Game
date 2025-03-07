import io from "socket.io-client";

export default class SocketHandler {
  constructor(scene) {
    this.scene = scene;
    this.socket = io("http://localhost:3000");

    this.socket.on("phaseChange", (phase) => {
      console.log(`Game phase changed to: ${phase}`);
      this.scene.uiHandler.updateStatusText(phase === "battle" ? "Battle Phase!" : "Build Phase");
    });

    this.socket.on("updateHP", (data) => {
      console.log(`Player ${data.playerId} HP updated to ${data.newHP}`);
      this.scene.uiHandler.updateHP(data.newHP);
    });

    this.socket.on("turnEnded", (playerId) => {
      console.log(`Player ${playerId}'s turn`);
      this.scene.uiHandler.updateStatusText(`Player ${playerId}'s turn`);
    });

    this.socket.on("gameOver", (winnerId) => {
      console.log(`Game over! Player ${winnerId} wins!`);
      this.scene.uiHandler.updateStatusText(`Game Over! Player ${winnerId} Wins!`);
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

  sendUpdateHP(playerId, newHP) {
    this.socket.emit("updateHP", { playerId, newHP });
  }
}
