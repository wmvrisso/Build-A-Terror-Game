import Boot from "./phaser/scenes/Boot";
import Game from "./phaser/scenes/GameScene";
import GameOver from "./phaser/scenes/GameOver";
import MainMenu from "./phaser/scenes/MainMenu";
import Preloader from "./phaser/scenes/Preloader";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Phaser from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ]
};

ReactDOM.render(
    <React.StrictMode>
        <App />,
    </React.StrictMode>,
    document.getElementById("root")
);

export default new Phaser.Game(config);
