import { io } from "socket.io-client";  // Ensure correct import

export default class SocketHandler {
  constructor(scene) {
    this.scene = scene;
    this.socket = io("http://localhost:3000", {
      transports: ["websocket"], // Ensure it uses WebSockets
      reconnectionAttempts: 5, // Try reconnecting 5 times before failing
      timeout: 20000, // 20-second timeout
    });

    this.socket.on("connect", () => {
      console.log("✅ Connected to WebSocket Server!", this.socket.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected from server:", reason);
    });

    this.socket.on("connect_error", (err) => {
      console.error("⚠️ WebSocket Connection Error:", err.message);
    });

    this.socket.on("phaseChange", (phase) => {
      console.log(`🔄 Game phase changed to: ${phase}`);
      this.scene.uiHandler.updateStatusText(phase === "battle" ? "Battle Phase!" : "Build Phase");
    });

    this.socket.on("updateHP", (data) => {
      console.log(`❤️ Player ${data.playerId} HP updated to ${data.newHP}`);
      this.scene.uiHandler.updateHP(data.newHP);
    });

    this.socket.on("turnEnded", (playerId) => {
      console.log(`🎯 Player ${playerId}'s turn`);
      this.scene.uiHandler.updateStatusText(`Player ${playerId}'s turn`);
    });

    this.socket.on("gameOver", (winnerId) => {
      console.log(`🏆 Game over! Player ${winnerId} wins!`);
      this.scene.uiHandler.updateStatusText(`Game Over! Player ${winnerId} Wins!`);
    });
  }

  sendPlayerReady(playerId) {
    console.log("📨 Sending playerReady event:", { playerId });
    this.socket.emit("playerReady", { playerId });
  }

  sendPhaseChange(phase) {
    console.log("📨 Sending phaseChange event:", { phase });
    this.socket.emit("phaseChange", { phase });
  }

  sendTurnEnded(playerId) {
    console.log("📨 Sending turnEnded event:", { playerId });
    this.socket.emit("turnEnded", { playerId });
  }

  sendGameOver(winner) {
    console.log("📨 Sending gameOver event:", { winner });
    this.socket.emit("gameOver", { winner });
  }

  sendUpdateHP(playerId, newHP) {
    console.log("📨 Sending updateHP event:", { playerId, newHP });
    this.socket.emit("updateHP", { playerId, newHP });
  }
}
