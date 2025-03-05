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

  async preload() {
    this.load.image("card-back", "/assets/card-back.png");
  }

  async create() {
    this.deckHandler = new DeckHandler(this);
    this.cardHandler = new CardHandler(this);
    this.gameHandler = new GameHandler(this);

    this.player1 = new PlayerHandler(this, 1, "Player One");
    this.player2 = new PlayerHandler(this, 2, "Player Two");// we can add more players later if we want

    this.uiHandler1 = new UIHandler(this, this.player1);
    this.uiHandler2 = new UIHandler(this, this.player2);

    await this.deckHandler.loadDeck();

    // Draw 5 cards per player for the build phase
    const playerCards = this.deckHandler.drawCards(5);
    playerCards.forEach((cardData, index) => {
      this.cardHandler.createCard(200 + index * 100, 300, cardData);
    });

    // Simulate taking damage (for now) for player 1
    this.input.keyboard.on("keydown-D", () => {
      console.log("Player 1 takes 10 damage");
      this.player1.takeDamage(10);
      this.uiHandler.updateHP(this.player1.hp);
    });

    // Simulate taking damage (for now) for player 2
    this.input.keyboard.on("keydown-K", () => {
      console.log("Player 2 takes 10 damage");
      this.player1.takeDamage(10);
      this.uiHandler.updateHP(this.player2.hp);
    });

    // Simulate turn switch
    this.input.keyboard.on("keydown-T", () => {
      this.gameHandler.endTurn();
      this.uiHandler.updateStatusText(`Player ${this.gameHandler.currentTurn}'s Turn`);
    });

    // Simulate build phase complete
    this.input.keyboard.on("keydown-B", () => {
      this.gameHandler.playerReady(1);
      this.uiHandler.updateStatusText("Waiting for opponent...");
    });
  }
}
