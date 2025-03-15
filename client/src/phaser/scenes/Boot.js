import Phaser from "phaser";

export default class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    console.log("Boot Scene Loaded");
  }

  create() {
    this.scene.start("PreloaderScene");
  }
}
