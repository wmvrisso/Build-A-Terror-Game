import Phaser from "phaser";
import SocketHandler from "../handlers/SocketHandler";
import DeckHandler from "../handlers/DeckHandler";
import CardHandler from "../handlers/CardHandler";
import GameHandler from "../handlers/BattleHandler";
import PlayerHandler from "../handlers/PlayerHandler";
import UIHandler from "../handlers/UIHandler";

export default class Battle extends Phaser.Scene {
    constructor() {
        super("Battle");
    }

    init(data) {
        this.roomId = data.roomId || null;
        this.monster = data.monster || null; // Player's built monster
    }

    async create() {
        this.add.image(512, 384, 'background');
        this.add.text(512, 100, 'Battle Begins!', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5);

        this.socketHandler = new SocketHandler(this);
        this.deckHandler = new DeckHandler(this);
        this.cardHandler = new CardHandler(this);
        this.gameHandler = new GameHandler(this);
        
        this.player = new PlayerHandler(this, 1, "You");
        this.opponent = new PlayerHandler(this, 2, "Opponent");

        this.uiHandler1 = new UIHandler(this, this.player);
        this.uiHandler2 = new UIHandler(this, this.opponent);

        // Render player and opponent monsters
        this.displayMonster(this.player, this.monster, 300);
        this.socketHandler.socket.emit("playerReady", { roomId: this.roomId, monster: this.monster });
        
        this.socketHandler.socket.on("opponentMonster", (data) => {
            console.log("Opponent monster received!", data);
            this.displayMonster(this.opponent, data.monster, 600);
        });

        this.setupInputHandlers();
    }

    displayMonster(player, monsterParts, yPos) {
        if (!monsterParts) return;

        this.add.sprite(400, yPos - 100, monsterParts.head.texture);
        this.add.sprite(400, yPos, monsterParts.body.texture);
        this.add.sprite(400, yPos + 100, monsterParts.legs.texture);
    }

    setupInputHandlers() {
        this.input.keyboard.on("keydown-D", () => {
            this.attackOpponent(this.player, this.opponent);
        });
    }

    attackOpponent(attacker, defender) {
        console.log(`${attacker.name} attacks!`);
        this.socketHandler.socket.emit("attack", { roomId: this.roomId, damage: 10 });
    }
}

// V--------------- SAVING CODE BELOW IN CASE OF ERROR
// import Phaser from "phaser";
// import DeckHandler from "../handlers/DeckHandler";
// import CardHandler from "../handlers/CardHandler";
// import GameHandler from "../handlers/GameHandler";
// import PlayerHandler from "../handlers/PlayerHandler";
// import UIHandler from "../handlers/UIHandler";

// export default class Battle extends Phaser.Scene {
//   constructor() {
//     super("Battle");
//   }

//   async create() {
//     this.deckHandler = new DeckHandler(this);
//     this.cardHandler = new CardHandler(this);
//     this.gameHandler = new GameHandler(this);

//     this.player1 = new PlayerHandler(this, 1, "Player One");
//     console.log(!this.player1);
//     this.player2 = new PlayerHandler(this, 2, "Player Two");
//     console.log(!this.player2);

//     if (!this.player1 || !this.player2) {
//       console.error("PlayerHandler instances not initialized correctly!");
//       return;
//     } else {
//       console.log("PlayerHandler instances initialized correctly!");
//     }

//     this.uiHandler1 = new UIHandler(this, this.player1);
//     this.uiHandler2 = new UIHandler(this, this.player2);

//     await this.deckHandler.loadDeck();

//     // Player 1: Draw and Render Cards
//     const player1Cards = [
//       ...this.deckHandler.drawCards("Head", 1),
//       ...this.deckHandler.drawCards("Body", 1),
//       ...this.deckHandler.drawCards("Legs", 1),
//     ];
//     player1Cards.forEach((cardData, index) => {
//       const x = 200 + index * 160;  // Adjusted for better spacing
//       const y = 400;
//       const card = this.cardHandler.createCard(x, y, cardData);
//       this.player1.cards = [...(this.player1.cards || []), card]; // Store reference to the cards
//     });

//     // Player 2: Draw and Render Cards
//     const player2Cards = [
//       ...this.deckHandler.drawCards("Head", 1),
//       ...this.deckHandler.drawCards("Body", 1),
//       ...this.deckHandler.drawCards("Legs", 1),
//     ];
//     player2Cards.forEach((cardData, index) => {
//       const x = 400 + index * 160;  // Adjusted Player 2's position
//       const y = 600;
//       const card = this.cardHandler.createCard(x, y, cardData);
//       this.player2.cards = [...(this.player2.cards || []), card]; // Store reference to the cards
//     });

//     // Set up keyboard input handlers
//     this.setupInputHandlers();
//     console.log(this.player1);
//     console.log(this.player2);
//   }

//   setupInputHandlers() {
//     this.input.keyboard.on("keydown-D", () => {
//       console.log("Player 1 takes 10 damage");
//       this.player1.takeDamage(10);
//       this.uiHandler1.updateHP(this.player1.hp);
//     });

//     this.input.keyboard.on("keydown-K", () => {
//       console.log("Player 2 takes 10 damage");
//       this.player2.takeDamage(10);
//       this.uiHandler2.updateHP(this.player2.hp);
//     });

//     this.input.keyboard.on("keydown-T", () => {
//       this.gameHandler.endTurn();
//       this.uiHandler1.updateStatusText(`Player ${this.gameHandler.currentTurn}'s Turn`);
//     });

//     this.input.keyboard.on("keydown-B", () => {
//       this.gameHandler.playerReady(1);
//       this.uiHandler1.updateStatusText("Waiting for opponent...");
//     });
//   }
// }
