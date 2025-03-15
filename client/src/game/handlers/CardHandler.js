import Phaser from "phaser";

export default class CardHandler {
  constructor(scene) {
    this.scene = scene;
    this.cards = [];
    this.cardIdCounter = 0; // Track unique IDs for cards
  }

  // Create a text-based card with placeholder space for an image
  createCard(x, y, cardData) {
    console.log("Creating Card:", cardData);

    // Generate a unique ID
    const cardId = this.cardIdCounter++;

    // Create card background (rectangle)
    const cardBackground = this.scene.add
      .rectangle(0, 0, 150, 200, 0xffffff)
      .setStrokeStyle(2, 0x000000);

    // Create placeholder for image (empty gray box)
    const imagePlaceholder = this.scene.add.rectangle(0, -60, 100, 50, 0xcccccc);

    // Display card name
    const nameText = this.scene.add.text(-65, -30, cardData.name, {
      fontSize: "14px",
      fill: "#000",
    });

    // Display card stats
    const statsText = this.scene.add.text(
      -65,
      0,
      `ATK: ${cardData.attack}\nDEF: ${cardData.defense}\nSPD: ${cardData.speed}\nHP: ${cardData.health}\n${cardData.rarity}`,
      { fontSize: "12px", fill: "#000" }
    );

    // Group everything into a container
    const cardContainer = this.scene.add.container(x, y, [
      cardBackground,
      imagePlaceholder,
      nameText,
      statsText,
    ]);

    cardContainer.setSize(150, 200);
    cardContainer.cardId = cardId; // Assign a unique ID to the card

    // Enable interaction
    cardBackground.setInteractive();
    cardBackground.on("pointerdown", () => {
      this.flipCard(cardContainer);
    });

    this.cards.push(cardContainer);
    return cardContainer;
  }

  // Flip card (rotates the card instead of just logging)
  flipCard(card) {
    console.log(`Flipped card: ${card.cardId}`);
    this.scene.tweens.add({
      targets: card,
      scaleX: 0, // Shrink to simulate flip effect
      duration: 150,
      onComplete: () => {
        card.scaleX = 1; // Restore after flip
      },
    });
  }

  // Remove a card
  removeCard(card) {
    this.cards = this.cards.filter((c) => c.cardId !== card.cardId);
    card.destroy(); // Properly remove from scene
  }

  // Get all cards
  getCards() {
    return this.cards;
  }

  // Get a card by ID
  getCardById(id) {
    return this.cards.find((c) => c.cardId === id);
  }
}
