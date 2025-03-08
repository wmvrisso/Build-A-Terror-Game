import Phaser from "phaser";

export default class CardHandler {
  constructor(scene) {
    this.scene = scene;
    this.cards = [];
  }

  // Create a card
  createCard(x, y, cardData) {
    const card = this.scene.add.sprite(x, y, "card-back").setInteractive();
    card.cardData = cardData;
    card.faceUp = false;

    // Show stats on hover
    card.on("pointerover", () => {
      console.log(`Stats: Attack ${card.cardData.attack}, Defense ${card.cardData.defense}, Speed ${card.cardData.speed}, Health ${card.cardData.health}`);
    });

    // Flip card on click
    card.on("pointerdown", () => {
      this.flipCard(card);
    });

    // Store card reference
    this.cards.push(card);

    return card;
  }

  // Flip a card
  flipCard(card) {
    if (!card.faceUp) {
      card.setTexture(card.cardData.image_url);
    } else {
      card.setTexture("card-back");
    }
    card.faceUp = !card.faceUp;
  }

  // Remove a card
  removeCard(card) {
    this.cards = this.cards.filter((c) => c.id !== card.id);
  }

  // Get all cards
  getCards() {
    return this.cards;
  }

  // Get a card by ID
  getCardById(id) {
    return this.cards.find((c) => c.id === id);
  }
}
