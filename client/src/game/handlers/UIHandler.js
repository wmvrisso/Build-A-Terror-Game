export default class UIHandler {
  constructor(scene) {
    this.scene = scene;
    this.uiElements = {};

    console.log("UIHandler initialized");

    // Create UI elements
    this.createHPBars();
    this.createStatusText();
  }

  // Create HP display
  createHPBars() {
    this.uiElements.hpText1 = this.scene.add.text(20, 20, `P1 HP: 100`, {
      fontSize: "20px",
      fill: "#fff",
    });

    this.uiElements.hpText2 = this.scene.add.text(600, 20, `P2 HP: 100`, {
      fontSize: "20px",
      fill: "#fff",
    });
  }

  // Show game status (e.g., build phase, battle phase)
  createStatusText() {
    this.uiElements.statusText = this.scene.add.text(400, 20, "Build Phase", {
      fontSize: "24px",
      fill: "#ff0",
    }).setOrigin(0.5);
  }

  // Update HP display
  updateHP(playerId, newHP) {
    if (playerId === 1 && this.uiElements.hpText1) {
      this.uiElements.hpText1.setText(`P1 HP: ${newHP}`);
    } else if (playerId === 2 && this.uiElements.hpText2) {
      this.uiElements.hpText2.setText(`P2 HP: ${newHP}`);
    }
  }

  // Update game status (whose turn)
  updateStatusText(message) {
    if (this.uiElements.statusText) {
      this.uiElements.statusText.setText(message);
    }
  }

  // Display cards on screen with flip-before-selection logic
  displayCards(cards, yPos, type, playerHandler) {
    if (!Array.isArray(cards) || cards.length === 0) {
      console.warn(`🚨 No cards available for ${type}`);
      return;
    }

    cards.forEach((cardData, index) => {
      const x = 250 + index * 140;
      const cardBack = this.scene.add.sprite(0, 0, 'card-back');
      cardBack.setDisplaySize(140, 200); // Fill entire card
      
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
        } else {
          playerHandler.selectCard(card, type);
        }
      });
      
      this.scene.add.existing(card);
    });
  }

  // Helper method to create a card with text wrapping and monster name
  createCard(x, y, cardData) {
    const cardContainer = this.scene.add.container(x, y);
    
    const cardBackground = this.scene.add.rectangle(0, 0, 140, 200, 0xffffff).setStrokeStyle(2, 0x000000);
    const nameText = this.scene.add.text(0, -90, cardData.monster_name, {
      fontSize: "14px",
      fill: "#000",
      align: "center",
      wordWrap: { width: 130 }
    }).setOrigin(0.5);

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

  // Flip a card before selection
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

// export default class UIHandler {
//   constructor(scene, player1, player2) {
//     this.scene = scene;
//     this.player1 = player1 || {hp: 1};
//     this.player2 = player2 || {hp: 1};
//     this.uiElements = {};

//     // Ensure players exist before creating UI
//     if (!this.player1 || !this.player2) {
//       console.error("UIHandler Error: One or both players are undefined!");
//       return;
//     } else {
//       console.log("UIHandler initialized with players:", player1, player2);
//     }

//     // Create UI elements
//     this.createHPBars();
//     this.createStatusText();
//   }

//   // Create HP display for both players
//   createHPBars() {
//     this.uiElements.hpText1 = this.scene.add.text(20, 20, `P1 HP: ${this.player1.hp}`, {
//       fontSize: "20px",
//       fill: "#fff",
//     });

//     this.uiElements.hpText2 = this.scene.add.text(600, 20, `P2 HP: ${this.player2.hp}`, {
//       fontSize: "20px",
//       fill: "#fff",
//     });
//   }

//   // Show game status (e.g., build phase, battle phase)
//   createStatusText() {
//     this.uiElements.statusText = this.scene.add.text(400, 20, "Build Phase", {
//       fontSize: "24px",
//       fill: "#ff0",
//     }).setOrigin(0.5);
//   }

//   // Update HP display for both players
//   updateHP(playerId, newHP) {
//     if (playerId === 1 && this.uiElements.hpText1) {
//       this.uiElements.hpText1.setText(`P1 HP: ${newHP}`);
//     } else if (playerId === 2 && this.uiElements.hpText2) {
//       this.uiElements.hpText2.setText(`P2 HP: ${newHP}`);
//     }
//   }

//   // Update game status (whose turn)
//   updateStatusText(message) {
//     if (this.uiElements.statusText) {
//       this.uiElements.statusText.setText(message);
//     }
//   }
// }
