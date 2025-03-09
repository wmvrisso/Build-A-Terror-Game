import Phaser from "phaser";
import DeckHandler from "../handlers/DeckHandler";
import CardHandler from "../handlers/CardHandler";
import GameHandler from "../handlers/GameHandler";
import PlayerHandler from "../handlers/PlayerHandler";
import UIHandler from "../handlers/UIHandler";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  async create() {
    this.deckHandler = new DeckHandler(this);
    this.cardHandler = new CardHandler(this);
    this.gameHandler = new GameHandler(this);

    this.player1 = new PlayerHandler(this, 1, "Player One");
    this.player2 = new PlayerHandler(this, 2, "Player Two");

    if (this.player1 && this.player2) {
      this.uiHandler1 = new UIHandler(this, this.player1);
      this.uiHandler2 = new UIHandler(this, this.player2);
    } else {
      console.error("PlayerHandler instances not initialized correctly!");
    }

    this.uiHandler1 = new UIHandler(this, this.player1);
    this.uiHandler2 = new UIHandler(this, this.player2);

    await this.deckHandler.loadDeck();

    // Player 1: Draw and Render Cards
    const player1Cards = [
      ...this.deckHandler.drawCards("Head", 1),
      ...this.deckHandler.drawCards("Body", 1),
      ...this.deckHandler.drawCards("Legs", 1),
    ];
    player1Cards.forEach((cardData, index) => {
      const x = 200 + index * 160;  // Adjusted for better spacing
      const y = 400;
      const card = this.cardHandler.createCard(x, y, cardData);
      this.player1.cards = [...(this.player1.cards || []), card]; // Store reference to the cards
    });

    // Player 2: Draw and Render Cards
    const player2Cards = [
      ...this.deckHandler.drawCards("Head", 1),
      ...this.deckHandler.drawCards("Body", 1),
      ...this.deckHandler.drawCards("Legs", 1),
    ];
    player2Cards.forEach((cardData, index) => {
      const x = 400 + index * 160;  // Adjusted Player 2's position
      const y = 600;
      const card = this.cardHandler.createCard(x, y, cardData);
      this.player2.cards = [...(this.player2.cards || []), card]; // Store reference to the cards
    });

    // Set up keyboard input handlers
    this.setupInputHandlers();
  }

  setupInputHandlers() {
    this.input.keyboard.on("keydown-D", () => {
      console.log("Player 1 takes 10 damage");
      this.player1.takeDamage(10);
      this.uiHandler1.updateHP(this.player1.hp);
    });

    this.input.keyboard.on("keydown-K", () => {
      console.log("Player 2 takes 10 damage");
      this.player2.takeDamage(10);
      this.uiHandler2.updateHP(this.player2.hp);
    });

    this.input.keyboard.on("keydown-T", () => {
      this.gameHandler.endTurn();
      this.uiHandler1.updateStatusText(`Player ${this.gameHandler.currentTurn}'s Turn`);
    });

    this.input.keyboard.on("keydown-B", () => {
      this.gameHandler.playerReady(1);
      this.uiHandler1.updateStatusText("Waiting for opponent...");
    });
  }
}
