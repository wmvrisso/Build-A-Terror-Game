export default class UIHandler {
    constructor(scene, player1, player2) {
      this.scene = scene;
      this.player1 = player1;
      this.player2 = player2;
      this.uiElements = {};
  
      // Create UI elements
      this.createHPBar();
      this.createStatusText();
    }
  
    // Create HP display for player 1 and player 2
    createHPBar() {
      this.uiElements.hpText1 = this.scene.add.text(20, 20, `HP: ${this.player1.hp}`, {
        fontSize: "20px",
        fill: "#fff",
      });
    }

    createHPBar() {
        this.uiElements.hpText2 = this.scene.add.text(20, 20, `HP: ${this.player2.hp}`, {
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
  
    // Update HP display for player 1 and player 2
    updateHP(playerId, newHP) {
      if (playerId === 1) {
        this.uiElements.hpText1.setText(`P1 HP: ${newHP}`);
      } else if (playerId === 2) {
        this.uiElements.hpText2.setText(`P2 HP: ${newHP}`);
      }
    }
  
    // Update game status (whose turn)
    updateStatusText(message) {
      this.uiElements.statusText.setText(message);
    }
  }
  