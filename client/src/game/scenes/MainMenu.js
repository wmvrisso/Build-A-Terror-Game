import Phaser from 'phaser';
import SocketHandler from '../handlers/SocketHandler';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
        this.socketHandler = new SocketHandler(this);
    }

    create() {
        this.add.image(512, 384, 'background');
        
        // Adjusted monster logo size and position
        const monsterLogo = this.add.image(512, 250, 'monster-logo');
        monsterLogo.setScale(0.4); // Reduced size
        
        // Lowered menu options to avoid overlapping with the logo
        const buildButton = this.add.text(512, 500, 'Build-A-Terror', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5).setInteractive();

        buildButton.on('pointerdown', () => {
            this.scene.start('BuildATerror');
        });

        const battleButton = this.add.text(512, 560, 'Build & Battle', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5).setInteractive();
        
        battleButton.on('pointerdown', () => {
            this.socketHandler.startMatchmaking(this);
        });
        
        this.searchingText = this.add.text(512, 620, 'Searching for Opponent...', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ff0000',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5).setVisible(false);

        this.cancelButton = this.add.text(512, 660, 'Cancel Matchmaking', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ff0000',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5).setInteractive().setVisible(false);
        
        this.cancelButton.on('pointerdown', () => {
            this.socketHandler.cancelMatchmaking();
        });
    }
}

// V---------- SAVING CODE BELOW IN CASE OF ERROR
// import Phaser from 'phaser';
// import SocketHandler from '../handlers/SocketHandler';

// export default class MainMenu extends Phaser.Scene {
//     constructor() {
//         super('MainMenu');
//     }

//     create() {
//         this.add.image(512, 384, 'background');
        
//         // Adjusted monster logo size and position
//         const monsterLogo = this.add.image(512, 250, 'monster-logo');
//         monsterLogo.setScale(0.4); // Reduced size
        
//         // Lowered menu options to avoid overlapping with the logo
//         const buildButton = this.add.text(512, 500, 'Build-A-Terror', {
//             fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
//             stroke: '#000000', strokeThickness: 8, align: 'center'
//         }).setOrigin(0.5).setInteractive();

//         buildButton.on('pointerdown', () => {
//             this.scene.start('BuildATerror');
//         });

//         const battleButton = this.add.text(512, 560, 'Build & Battle', {
//             fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
//             stroke: '#000000', strokeThickness: 8, align: 'center'
//         }).setOrigin(0.5).setInteractive();
        
//         battleButton.on('pointerdown', () => {
//             this.startMatchmaking();
//         });
        
//         this.searchingText = this.add.text(512, 620, 'Searching for Opponent...', {
//             fontFamily: 'Arial Black', fontSize: 24, color: '#ff0000',
//             stroke: '#000000', strokeThickness: 6, align: 'center'
//         }).setOrigin(0.5).setVisible(false);

//         this.cancelButton = this.add.text(512, 660, 'Cancel Matchmaking', {
//             fontFamily: 'Arial Black', fontSize: 24, color: '#ff0000',
//             stroke: '#000000', strokeThickness: 6, align: 'center'
//         }).setOrigin(0.5).setInteractive().setVisible(false);
        
//         this.cancelButton.on('pointerdown', () => {
//             this.cancelMatchmaking();
//         });
//     }

//     startMatchmaking() {
//         this.searchingText.setVisible(true);
//         this.cancelButton.setVisible(true);
        
//         this.socketHandler = new SocketHandler(this);
//         this.socketHandler.socket.emit('findOpponent');
        
//         this.socketHandler.socket.on('opponentFound', (roomId) => {
//             console.log(`Match found! Joining room: ${roomId}`);
//             this.scene.start('BuildATerror', { roomId });
//         });
//     }

//     cancelMatchmaking() {
//         this.searchingText.setVisible(false);
//         this.cancelButton.setVisible(false);
        
//         if (this.socketHandler) {
//             this.socketHandler.socket.emit('cancelMatchmaking');
//         }
//     }
// }
