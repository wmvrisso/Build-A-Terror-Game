import Phaser from 'phaser';
import SocketHandler from '../handlers/SocketHandler';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        this.add.image(512, 384, 'background');
        
        const monsterLogo = this.add.image(512, 300, 'monster-logo');
        monsterLogo.setScale(0.75); // Adjust scale as needed

        
        // Button to go to Build-A-Terror (Solo Mode)
        const buildButton = this.add.text(512, 460, 'Build-A-Terror', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5).setInteractive();

        buildButton.on('pointerdown', () => {
            this.scene.start('BuildATerror');
        });

        // Button for Multiplayer Mode (Find Opponent)
        const battleButton = this.add.text(512, 520, 'Build & Battle', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5).setInteractive();
        
        battleButton.on('pointerdown', () => {
            this.startMatchmaking();
        });
        
        // Searching text (hidden initially)
        this.searchingText = this.add.text(512, 580, 'Searching for Opponent...', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ff0000',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5).setVisible(false);

        // Cancel Matchmaking Button (hidden initially)
        this.cancelButton = this.add.text(512, 620, 'Cancel Matchmaking', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ff0000',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5).setInteractive().setVisible(false);
        
        this.cancelButton.on('pointerdown', () => {
            this.cancelMatchmaking();
        });
    }

    startMatchmaking() {
        this.searchingText.setVisible(true);
        this.cancelButton.setVisible(true);
        
        this.socketHandler = new SocketHandler(this);
        this.socketHandler.socket.emit('findOpponent');
        
        this.socketHandler.socket.on('opponentFound', (roomId) => {
            console.log(`Match found! Joining room: ${roomId}`);
            this.scene.start('BuildATerror', { roomId });
        });
    }

    cancelMatchmaking() {
        this.searchingText.setVisible(false);
        this.cancelButton.setVisible(false);
        
        if (this.socketHandler) {
            this.socketHandler.socket.emit('cancelMatchmaking');
        }
    }
}
