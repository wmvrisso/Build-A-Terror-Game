export default class GameHandler{
    constructor(){
        this.games = [];
    }

  //called when a player finishes building
  playerReady(playerId, head, torso, legs) {
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

  addGame(game){
    this.games.push(game);
  }


  //ends the game
  endGame(winner) {
    console.log(`Game over! Player ${winner} wins!`);
    this.socket.sendGameOver(winner);
  }

  // Handle player attack action
  playerAttack(attackerId, damage) {
    const defenderId = attackerId === 1 ? 2 : 1;
    this.players[defenderId].hp -= damage;
    console.log(`Player ${attackerId} attacks Player ${defenderId} for ${damage} damage`);
    this.socket.sendUpdateHP(defenderId, this.players[defenderId].hp);
    this.checkGameOver();
    }
  
    removeGame(game){
        this.games = this.games.filter(g => g.id !== game.id);
    }

    getGames(){
        return this.games;
    }

    getGameById(id){
        return this.games.find(g => g.id === id);
    }
  }

