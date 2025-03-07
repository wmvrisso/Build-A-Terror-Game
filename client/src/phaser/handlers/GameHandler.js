import SocketHandler from "./SocketHandler";

export default class GameHandler {
  constructor(scene) {
    this.scene = scene;
    this.socket = new SocketHandler(scene);
    this.phase = "build"; // "build" → "battle"
    this.currentTurn = 1; // Player 1 starts
    this.playersReady = { 1: false, 2: false }; // Track if players finished building
  }

//   Switch to battle phase when both players are ready
  checkPlayersReady() {
    if (this.playersReady[1] && this.playersReady[2]) {
      this.startBattlePhase();
    }
  }

  //called when a player finishes building
  playerReady(playerId) {
    this.playersReady[playerId] = true;
    this.socket.sendPlayerReady(playerId);
    this.checkPlayersReady();
  }

  //starts battle
  startBattlePhase() {
    console.log("Starting battle phase...");
    this.phase = "battle";
    this.socket.sendPhaseChange(this.phase);
  }

  //called when a player ends their turn
  endTurn() {
    this.currentTurn = this.currentTurn === 1 ? 2 : 1; // Switch turn
    console.log(`Player ${this.currentTurn}'s turn`);
    this.socket.sendTurnEnded(this.currentTurn);
  }

  //checks if a player's HP is 0 or less
  checkGameOver(players) {
    const player1HP = players[1].hp;
    const player2HP = players[2].hp;

    if (player1HP <= 0) {
      this.endGame(2);
    } else if (player2HP <= 0) {
      this.endGame(1);
    }
  }

  //ends the game
  endGame(winner) {
    console.log(`Game over! Player ${winner} wins!`);
    this.socket.sendGameOver(winner);
  }
}
