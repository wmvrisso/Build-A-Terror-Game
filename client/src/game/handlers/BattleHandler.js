export default class BattleHandler {
  constructor(socket) {
    this.games = [];
    this.players = {}; // Initialize players
    this.playersReady = {}; // Track ready players
    this.phase = "build"; // Track game phase
    this.currentTurn = null; // Track the current turn
    this.socket = socket; // Initialize socket
  }

  // Called when a player finishes building
  playerReady(playerId, head, torso, legs) {
    if (!this.players[playerId]) {
      this.players[playerId] = { speed: 0, hp: 100 }; // Ensure player object exists
    }
    this.players[playerId].speed = head.speed + torso.speed + legs.speed;
    this.playersReady[playerId] = true;
    this.socket.sendPlayerReady(playerId);
    this.checkPlayersReady();
  }

  // Determine which player goes first based on speed
  determineFirstTurn() {
    if (this.players[1].speed > this.players[2].speed) {
      this.currentTurn = 1;
    } else {
      this.currentTurn = 2;
    }
  }

  // Starts battle
  startBattlePhase() {
    console.log("Starting battle phase...");
    this.phase = "battle";
    this.socket.sendPhaseChange(this.phase);
  }

  // Checks if a player's HP is 0 or less
  checkGameOver() {
    if (!this.players[1] || !this.players[2]) {
      console.error("Error: Players are not initialized correctly.");
      return;
    }

    const player1HP = this.players[1].hp;
    const player2HP = this.players[2].hp;

    if (player1HP <= 0) {
      this.endGame(2);
    } else if (player2HP <= 0) {
      this.endGame(1);
    }
  }

  // Ends the game
  endGame(winner) {
    console.log(`Game over! Player ${winner} wins!`);
    this.socket.sendGameOver(winner);
  }

  // Handle player attack action
  playerAttack(attackerId, damage) {
    const defenderId = attackerId === 1 ? 2 : 1;
    if (!this.players[defenderId]) {
      console.error(`Error: Player ${defenderId} is not initialized.`);
      return;
    }

    this.players[defenderId].hp -= damage;
    console.log(
      `Player ${attackerId} attacks Player ${defenderId} for ${damage} damage`
    );
    this.socket.sendUpdateHP(defenderId, this.players[defenderId].hp);
    this.checkGameOver();
  }

  // Called when a player ends their turn
  endTurn() {
    this.currentTurn = this.currentTurn === 1 ? 2 : 1; // Switch turn
    console.log(`Player ${this.currentTurn}'s turn`);
    this.socket.sendTurnEnded(this.currentTurn);
  }
}
