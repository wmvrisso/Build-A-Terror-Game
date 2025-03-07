
import Phaser from "phaser";


import Phaser from "phaser";

export default class CardHandler {
  constructor(scene) {
    this.scene = scene;
  }

  // Create a card
  createCard(x, y, cardData) {
    const card = this.scene.add.sprite(x, y, "card-back").setInteractive();



export default class CardHandler {
  constructor(scene) {
    this.scene = scene;
  }

  /** 🔹 Render a card in Phaser at a specific position */
  createCard(x, y, cardData) {
    const card = this.scene.add.sprite(x, y, "card-back").setInteractive();

    // Store card data
    card.cardData = cardData;
    card.faceUp = false;

    // Flip effect when clicked
    card.on("pointerdown", () => {
      this.flipCard(card);
    });

    return card;
  }


  /** 🔹 Flip a card */

// Flip a card
  flipCard(card) {
    if (!card.faceUp) {
      card.setTexture(card.cardData.image_url);
    } else {
      card.setTexture("card-back");



    getCardById(id){
        return this.cards.find(c => c.id === id);

    }
    card.faceUp = !card.faceUp;
  }
}
