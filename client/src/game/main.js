// NOTE THIS UNINCORPORATED CODE FROM THE PHASER TEMPLATE DELETE THIS COMMENT WHEN INCORPORATED

import Boot from './scenes/Boot';
import Battle from './scenes/Battle';
import GameOver from './scenes/GameOver';
import MainMenu from './scenes/MainMenu';
import Phaser from 'phaser';
import Preloader from './scenes/Preloader';
import BuildATerror from './scenes/BuildATerror';

// Find out more information about the Game Config at:
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        BuildATerror,
        Battle,
        GameOver
    ]
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;