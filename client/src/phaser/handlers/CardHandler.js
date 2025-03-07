
import Phaser from "phaser";

export default class CardHandler {
  constructor(scene) {
    this.scene = scene;
  }

  // Create a card
  createCard(x, y, cardData) {
    const card = this.scene.add.sprite(x, y, "card-back").setInteractive();


    addCard(card){
        this.cards.push(card);
    }

    removeCard(card){
        this.cards = this.cards.filter(c => c.id !== card.id);
    }

    getCards(){
        return this.cards;
    }

// Flip a card
  flipCard(card) {
    if (!card.faceUp) {
      card.setTexture(card.cardData.image_url);
    } else {
      card.setTexture("card-back");

    getCardById(id){
        return this.cards.find(c => c.id === id);
    }
}