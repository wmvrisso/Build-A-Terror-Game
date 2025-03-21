export default class PlayerHandler {
  constructor(scene, playerId, username) {
    this.scene = scene;
    this.playerId = playerId;
    this.username = username;
    this.selectedParts = { head: null, body: null, legs: null };
    this.hp = 100;
  }

  selectCard(selectedCard, type) {
    const allCards = this.scene.children.list.filter(
      (obj) => obj instanceof Phaser.GameObjects.Container && obj.cardData && obj.cardData.part === type
    );

    allCards.forEach((card) => {
      if (card === selectedCard) {
        card.setScale(1.1);
        card.isSelected = true;
      } else {
        card.setAlpha(0.5);
        card.setScale(0.9);
        card.isSelected = false;
      }
    });

    this.selectedParts[type] = selectedCard.cardData;
    console.log(`✅ Selected ${type}:`, selectedCard.cardData);
  }

  isMonsterComplete() {
    return this.selectedParts.head && this.selectedParts.body && this.selectedParts.legs;
  }

  getMonsterParts() {
    return this.selectedParts;
  }

  updateHP(newHP) {
    this.hp = newHP;
    console.log(`${this.username}'s HP updated to ${this.hp}`);
    this.scene.socketHandler.sendUpdateHP(this.playerId, newHP);
  }

  takeDamage(amount) {
    this.updateHP(Math.max(0, this.hp - amount));
    console.log(`${this.username} took ${amount} damage! Remaining HP: ${this.hp}`);

    if (this.hp === 0) {
      this.scene.socketHandler.sendGameOver(this.playerId === 1 ? 2 : 1);
    }
  }
}


// V--------------- SAVING CODE BELOW IN CASE OF ERROR
// import SocketHandler from "./SocketHandler";

// export default class PlayerHandler {
//   constructor(scene, playerId, username) {
//     this.scene = scene;
//     this.socket = new SocketHandler(scene);
//     this.playerId = playerId;
//     this.username = username;
//     this.hp = 100; // Default HP (change as needed)
//     this.monster = {}; // Store selected monster parts
//     this.cards = []; // Store player's cards

//     if (typeof this.hp === "undefined") {
//       console.error(`Error: Player ${this.playerId} HP is undefined!`);
//       this.hp = 100; // Fallback value
//     }

//     this.socket.socket.on("updateHP", (data) => {
//       if (data.playerId === this.playerId) {
//         this.updateHP(data.newHP);
//       }
//     });

//     this.socket.socket.on("gameOver", (winnerId) => {
//       if (this.playerId === winnerId) {
//         console.log("You won!");
//       } else {
//         console.log("You lost!");
//       }
//     });
//   }

//   //sets the monster parts from build phase
//   setMonsterParts(parts) {
//     this.monster = parts;
//   }

// //   damage from attacks
//   takeDamage(amount) {
//     this.hp = Math.max(0, this.hp - amount);
//     console.log(`${this.username} took ${amount} damage! Remaining HP: ${this.hp}`);

//     this.socket.sendHPUpdate(this.playerId, this.hp);

//     if (this.hp === 0) {
//       this.socket.sendGameOver(this.playerId === 1 ? 2 : 1); // Other player wins
//     }
//   }

//   // Update the player's HP

//   updateHP(newHP) {
//     this.hp = newHP;
//     console.log(`${this.username}'s HP updated to ${this.hp}`);
//   }
// }

// // damage from attacks
// const monsterTypes = {
//   Draconic: {
//     effective: ["Undead", "Golem/Puppet"],
//     neutral: ["Mythical", "Phantom"],
//     weak: ["Draconic", "Beast"],
//   },
//   Undead: {
//     effective: ["Phantom", "Golem/Puppet"],
//     neutral: ["Beast", "Mythical"],
//     weak: ["Draconic", "Undead"],
//   },
//   GolemPuppet: {
//     effective: ["Beast", "Phantom"],
//     neutral: ["Draconic", "Mythical"],
//     weak: ["Golem/Puppet", "Undead"],
//   },
//   Phantom: {
//     effective: ["Beast", "Undead"],
//     neutral: ["Mythical", "Draconic"],
//     weak: ["Golem/Puppet", "Phantom"],
//   },
//   Beast: {
//     effective: ["Draconic"],
//     neutral: ["Undead", "Mythical", "Golem/Puppet"],
//     weak: ["Phantom", "Beast"],
//   },
//   Mythical: {
//     effective: [],
//     neutral: [
//       "Draconic",
//       "Undead",
//       "Golem/Puppet",
//       "Phantom",
//       "Beast",
//       "Mythical",
//     ],
//     weak: [],
//   },
// };

// function calculateDamage(attacker, defender) {
//   // Base damage calculation
//   let baseDamage =
//     (attacker.speed + attacker.damage / 2) *
//     (1 - defender.defense / (100 + defender.defense));

//   // Apply effectiveness multipliers
//   if (monsterTypes[attacker.type].effective.includes(defender.type)) {
//     baseDamage *= 2; // Double damage
//   } else if (monsterTypes[attacker.type].weak.includes(defender.type)) {
//     baseDamage *= 0.5; // Half damage
//   }

//   return Math.max(1, Math.floor(baseDamage)); // Ensure minimum 1 damage
// }

// export { monsterTypes, calculateDamage };