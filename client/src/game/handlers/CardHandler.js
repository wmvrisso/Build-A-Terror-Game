import Phaser from "phaser";

export default class CardHandler {
  constructor(scene) {
    this.scene = scene;
  }

  displayCards(cards, yPos, type, playerHandler) {
    if (!Array.isArray(cards) || cards.length === 0) {
        console.warn(`🚨 No cards available for ${type}`);
        return;
    }

    cards.forEach((cardData, index) => {
        const x = 250 + index * 140;
        const cardBack = this.scene.add.sprite(0, 0, 'card-back');
        cardBack.setDisplaySize(140, 200);
        
        const cardFront = this.createCard(0, 0, cardData);
        cardFront.setDisplaySize(140, 200);
        cardFront.setVisible(false);
        
        const card = this.scene.add.container(x, yPos, [cardBack, cardFront]);
        card.setSize(140, 200);
        card.cardData = cardData;
        card.isFlipped = false;
        card.isSelected = false;
        
        card.setInteractive();
        card.on('pointerdown', () => {
            if (!card.isFlipped) {
                this.flipCard(card, cardBack, cardFront);
                playerHandler.selectCard(card, type);
            }
        });
        
        this.scene.add.existing(card);
    });
  }

  createCard(x, y, cardData) {
    const cardContainer = this.scene.add.container(x, y);
    
    const cardBackground = this.scene.add.rectangle(0, 0, 140, 200, 0xffffff).setStrokeStyle(2, 0x000000);
    const nameText = this.scene.add.text(0, -80, cardData.name, { fontSize: "14px", fill: "#000", align: "center" }).setOrigin(0.5);
    const statsText = this.scene.add.text(
      0,
      20,
      `ATK: ${cardData.attack}\nDEF: ${cardData.defense}\nSPD: ${cardData.speed}\nHP: ${cardData.health}\n${cardData.rarity}`,
      { fontSize: "12px", fill: "#000", align: "center", wordWrap: { width: 130 } }
    ).setOrigin(0.5);

    cardContainer.add([cardBackground, nameText, statsText]);
    cardContainer.setSize(140, 200);
    return cardContainer;
  }

  flipCard(card, cardBack, cardFront) {
    if (!card || !cardBack || !cardFront) {
        console.warn("🚨 flipCard() received undefined elements!");
        return;
    }

    this.scene.tweens.add({
        targets: card,
        scaleX: 0,
        duration: 150,
        onComplete: () => {
            cardBack.setVisible(false);
            cardFront.setVisible(true);
            card.isFlipped = true;
            this.scene.tweens.add({
                targets: card,
                scaleX: 1,
                duration: 150,
            });
        },
    });
  }
}



// V--------------- SAVING CODE BELOW IN CASE OF ERROR
// import Phaser from "phaser";

// export default class CardHandler {
//   constructor(scene) {
//     this.scene = scene;
//     this.cards = [];
//     this.cardIdCounter = 0; // Track unique IDs for cards
//   }

//   // Create a text-based card with placeholder space for an image
//   createCard(x, y, cardData) {
//     console.log("Creating Card:", cardData);

//     // Generate a unique ID
//     const cardId = this.cardIdCounter++;

//     // Create card background (rectangle)
//     const cardBackground = this.scene.add
//       .rectangle(0, 0, 150, 200, 0xffffff)
//       .setStrokeStyle(2, 0x000000);

//     // Create placeholder for image (empty gray box)
//     const imagePlaceholder = this.scene.add.rectangle(0, -60, 100, 50, 0xcccccc);

//     // Display card name
//     const nameText = this.scene.add.text(-65, -30, cardData.name, {
//       fontSize: "14px",
//       fill: "#000",
//     });

//     // Display card stats
//     const statsText = this.scene.add.text(
//       -65,
//       0,
//       `ATK: ${cardData.attack}\nDEF: ${cardData.defense}\nSPD: ${cardData.speed}\nHP: ${cardData.health}\n${cardData.rarity}`,
//       { fontSize: "12px", fill: "#000" }
//     );

//     // Group everything into a container
//     const cardContainer = this.scene.add.container(x, y, [
//       cardBackground,
//       imagePlaceholder,
//       nameText,
//       statsText,
//     ]);

//     cardContainer.setSize(150, 200);
//     cardContainer.cardId = cardId; // Assign a unique ID to the card

//     // Enable interaction
//     cardBackground.setInteractive();
//     cardBackground.on("pointerdown", () => {
//       this.flipCard(cardContainer);
//     });

//     this.cards.push(cardContainer);
//     return cardContainer;
//   }

//   // Flip card (rotates the card instead of just logging)
//   flipCard(card, cardBack, cardFront, type) {
//     if (!card || !cardBack || !cardFront) {
//         console.warn("🚨 flipCard() received undefined elements!");
//         return;
//     }

//     console.log(`Flipping card: ${card.cardData ? card.cardData.name : "UNKNOWN"}`);

//     this.scene.tweens.add({
//         targets: card,
//         scaleX: 0, // Shrink for flip animation
//         duration: 150,
//         onComplete: () => {
//             if (card.isFlipped) {
//                 cardBack.setVisible(true);
//                 cardFront.setVisible(false);
//             } else {
//                 cardBack.setVisible(false);
//                 cardFront.setVisible(true);
//             }
//             card.isFlipped = !card.isFlipped;

//             this.scene.tweens.add({
//                 targets: card,
//                 scaleX: 1, // Restore normal size
//                 duration: 150,
//             });
//         },
//     });
//   }

//   // Remove a card
//   removeCard(card) {
//     this.cards = this.cards.filter((c) => c.cardId !== card.cardId);
//     card.destroy(); // Properly remove from scene
//   }

//   // Get all cards
//   getCards() {
//     return this.cards;
//   }

//   // Get a card by ID
//   getCardById(id) {
//     return this.cards.find((c) => c.cardId === id);
//   }
// }
