import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("PreloaderScene");
  }

  preload() {
    // Load game assets
    this.load.setPath("assets");
    
    this.load.image("monster-logo", "monster-logo.png");
    this.load.image("card-back", "card-back.png");

    //Load other assets we need in the game
  }

  create() {
    console.log("Preloader Complete - Starting GameScene...");
    this.scene.start("GameScene"); // Move directly to GameScene
  }
}
