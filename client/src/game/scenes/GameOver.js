import Phaser from 'phaser';
import SocketHandler from '../handlers/SocketHandler';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    init(data) {
        this.winnerId = data.winnerId || "Unknown";
    }

    create() {
        this.add.image(512, 384, 'background').setAlpha(0.5);
        this.add.text(512, 250, 'Game Over!', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5);
        
        this.add.text(512, 350, `Winner: Player ${this.winnerId}`, {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffcc00',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5);
        
        const mainMenuButton = this.add.text(512, 500, 'Return to Main Menu', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5).setInteractive();

        mainMenuButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
        
        const rematchButton = this.add.text(512, 580, 'Play Again', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5).setInteractive();

        rematchButton.on('pointerdown', () => {
            this.scene.start('BuildATerror');
        });
    }
}
