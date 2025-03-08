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

    this.uiHandler1 = new UIHandler(this, this.player1);
    this.uiHandler2 = new UIHandler(this, this.player2);

    await this.deckHandler.loadDeck();

    // Draw cards for the build phase (change logic to suit game design)
    const player1Cards = [
      ...this.deckHandler.drawCards("Head", 1),
      ...this.deckHandler.drawCards("Body", 1),
      ...this.deckHandler.drawCards("Legs", 1),
    ];

    const player2Cards = [
      ...this.deckHandler.drawCards("Head", 1),
      ...this.deckHandler.drawCards("Body", 1),
      ...this.deckHandler.drawCards("Legs", 1),
    ];

    // Render Player 1's cards
    player1Cards.forEach((cardData, index) => {
      const x = 200 + index * 120;
      const y = 400;
      this.cardHandler.createCard(x, y, cardData);
    });

    // Render Player 2's cards
    player2Cards.forEach((cardData, index) => {
      const x = 600 + index * 120;
      const y = 400;
      this.cardHandler.createCard(x, y, cardData);
    });

    // Keyboard Inputs
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
