import SocketHandler from "./SocketHandler";

export default class PlayerHandler {
  constructor(scene, playerId, username) {
    this.scene = scene;
    this.socket = new SocketHandler(scene);
    this.playerId = playerId;
    this.username = username;
    this.hp = 100; // Default HP (change as needed)
    this.monster = {}; // Store selected monster parts

    this.socket.socket.on("updateHP", (data) => {
      if (data.playerId === this.playerId) {
        this.updateHP(data.newHP);
      }
    });

    this.socket.socket.on("gameOver", (winnerId) => {
      if (this.playerId === winnerId) {
        console.log("You won!");
      } else {
        console.log("You lost!");
      }
    });
  }

  //sets the monster parts from build phase
  setMonsterParts(parts) {
    this.monster = parts;
  }

//   damage from attacks
  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    console.log(`${this.username} took ${amount} damage! Remaining HP: ${this.hp}`);

    this.socket.sendHPUpdate(this.playerId, this.hp);

    if (this.hp === 0) {
      this.socket.sendGameOver(this.playerId === 1 ? 2 : 1); // Other player wins
    }
  }

// Update the player's HP
  updateHP(newHP) {
    this.hp = newHP;
    console.log(`${this.username}'s HP updated to ${this.hp}`);
  }
}
