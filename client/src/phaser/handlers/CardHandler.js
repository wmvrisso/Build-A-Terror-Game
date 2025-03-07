<<<<<<< HEAD
=======

import Phaser from "phaser";


>>>>>>> 74eab80dbc7ca48523d82216993b3d30fe6c242a
import Phaser from "phaser";

export default class CardHandler {
  constructor(scene) {
    this.scene = scene;
  }

  // Create a card
  createCard(x, y, cardData) {
    const card = this.scene.add.sprite(x, y, "card-back").setInteractive();
<<<<<<< HEAD
  }

  addCard(card) {
    this.cards.push(card);
  }

  removeCard(card) {
    this.cards = this.cards.filter((c) => c.id !== card.id);
  }

  getCards() {
    return this.cards;
  }

  // Flip a card
=======



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
>>>>>>> 74eab80dbc7ca48523d82216993b3d30fe6c242a
  flipCard(card) {
    if (!card.faceUp) {
      card.setTexture(card.cardData.image_url);
    } else {
      card.setTexture("card-back");
<<<<<<< HEAD
=======



    getCardById(id){
        return this.cards.find(c => c.id === id);

>>>>>>> 74eab80dbc7ca48523d82216993b3d30fe6c242a
    }
  }

  getCardById(id) {
    return this.cards.find((c) => c.id === id);
  }
}
