import Phaser from "phaser";

export default class CardHandler {
  constructor(scene) {
    this.scene = scene;
    this.cards = [];
  }

  // Create a text-based card with placeholder space for an image
  createCard(x, y, cardData) {
    console.log("Creating Card:", cardData);

    // Create card background (rectangle)
    const cardBackground = this.scene.add.rectangle(x, y, 150, 200, 0xffffff).setStrokeStyle(2, 0x000000);

    // Create placeholder for image (empty gray box)
    const imagePlaceholder = this.scene.add.rectangle(x, y - 60, 100, 50, 0xcccccc);

    // Display card name
    const nameText = this.scene.add.text(x - 65, y - 30, cardData.name, { fontSize: "14px", fill: "#000" });

    // Display card stats
    const statsText = this.scene.add.text(x - 65, y, 
      `ATK: ${cardData.attack}\nDEF: ${cardData.defense}\nSPD: ${cardData.speed}\nHP: ${cardData.health}\n${cardData.rarity}`, 
      { fontSize: "12px", fill: "#000" }
    );

    // Group everything into a container
    const cardContainer = this.scene.add.container(0, 0, [cardBackground, imagePlaceholder, nameText, statsText]);
    cardContainer.setPosition(x, y);
    cardContainer.setSize(150, 200);

    // Enable interaction
    cardBackground.setInteractive();
    cardBackground.on("pointerdown", () => {
      this.flipCard(cardData);
    });

    this.cards.push(cardContainer);
    return cardContainer;
  }

  // Flip card (For now, just logs it)
  flipCard(cardData) {
    console.log(`Flipped card: ${cardData.name}`);
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
