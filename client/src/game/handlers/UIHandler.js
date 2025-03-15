export default class UIHandler {
  constructor(scene, player1, player2) {
    this.scene = scene;
    this.player1 = player1 || {hp: 1};
    this.player2 = player2 || {hp: 1};
    this.uiElements = {};

    // Ensure players exist before creating UI
    if (!this.player1 || !this.player2) {
      console.error("UIHandler Error: One or both players are undefined!");
      return;
    } else {
      console.log("UIHandler initialized with players:", player1, player2);
    }

    // Create UI elements
    this.createHPBars();
    this.createStatusText();
  }

  // Create HP display for both players
  createHPBars() {
    this.uiElements.hpText1 = this.scene.add.text(20, 20, `P1 HP: ${this.player1.hp}`, {
      fontSize: "20px",
      fill: "#fff",
    });

    this.uiElements.hpText2 = this.scene.add.text(600, 20, `P2 HP: ${this.player2.hp}`, {
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

  // Update HP display for both players
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
}
