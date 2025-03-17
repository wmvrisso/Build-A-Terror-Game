import Phaser from 'phaser';
import SocketHandler from '../handlers/SocketHandler';
import DeckHandler from '../handlers/DeckHandler';
import UIHandler from '../handlers/UIHandler';
import PlayerHandler from '../handlers/PlayerHandler';

export default class BuildATerror extends Phaser.Scene {
    constructor() {
        super({ key: 'BuildATerror' });
    }

    init(data) {
        this.roomId = data.roomId || null;
        this.playerHandler = new PlayerHandler(this);
    }

    async create() {
        this.deckHandler = new DeckHandler(this);
        this.uiHandler = new UIHandler(this);
        this.socketHandler = new SocketHandler(this);

        this.add.image(512, 384, 'background');
        this.add.text(512, 100, 'Build Your Terror!', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8, align: 'center'
        }).setOrigin(0.5);
        
        await this.dealCards();
        this.createConfirmButton();
    }

    async dealCards() {
        console.log("🃏 Dealing cards...");
        await this.deckHandler.loadDeck();
        
        const headCards = await this.deckHandler.drawCards("Head", 4) || [];
        const bodyCards = await this.deckHandler.drawCards("Body", 4) || [];
        const legCards = await this.deckHandler.drawCards("Legs", 4) || [];

        console.log("🃏 Cards Drawn:", headCards, bodyCards, legCards);
        
        this.createCardHeader(512, 50, "Pick your monster's head");
        this.uiHandler.displayCards(headCards, 180, 'head', this.playerHandler);
        
        this.createCardHeader(512, 300, "Pick your monster's body");
        this.uiHandler.displayCards(bodyCards, 440, 'body', this.playerHandler);
        
        this.createCardHeader(512, 550, "Pick your monster's legs");
        this.uiHandler.displayCards(legCards, 700, 'legs', this.playerHandler);
    }

    createCardHeader(x, y, text) {
        this.add.text(x, y, text, {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5);
    }

    createConfirmButton() {
        const confirmButton = this.add.text(512, 750, 'Confirm Build', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5).setInteractive();

        confirmButton.on('pointerdown', () => {
            if (this.playerHandler.isMonsterComplete()) {
                console.log("Monster confirmed!", this.playerHandler.getMonsterParts());
                
                if (this.roomId) {
                    this.socketHandler.socket.emit('monsterBuilt', { roomId: this.roomId, monster: this.playerHandler.getMonsterParts() });
                    this.scene.start('BattleScene', { roomId: this.roomId, monster: this.playerHandler.getMonsterParts() });
                } else {
                    this.scene.start('MainMenu');
                }
            } else {
                console.log("⚠️ Please select all parts!");
            }
        });
    }
}


// V----------KEEP CODE FOR NOW IN CASE OF ERROR IN ABOVE CODE
// import Phaser from 'phaser';
// import SocketHandler from '../handlers/SocketHandler';
// import DeckHandler from '../handlers/DeckHandler';
// import CardHandler from '../handlers/CardHandler';

// export default class BuildATerror extends Phaser.Scene {
//     constructor() {
//         super({ key: 'BuildATerror' });
//     }

//     init(data) {
//         this.roomId = data.roomId || null; // Multiplayer room ID if applicable
//         this.selectedParts = { head: null, body: null, legs: null };
//     }

//     async create() {
//         this.deckHandler = new DeckHandler(this);
//         this.cardHandler = new CardHandler(this);

//         this.add.image(512, 384, 'background');
//         this.add.text(512, 100, 'Build Your Terror!', {
//             fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
//             stroke: '#000000', strokeThickness: 8, align: 'center'
//         }).setOrigin(0.5);
        
//         await this.dealCards();
//         this.createConfirmButton();
//     }

//     async dealCards() {
//         console.log("🃏 Dealing cards...");
//         await this.deckHandler.loadDeck();
        
//         const headCards = await this.deckHandler.drawCards("Head", 4) || [];
//         const bodyCards = await this.deckHandler.drawCards("Body", 4) || [];
//         const legCards = await this.deckHandler.drawCards("Legs", 4) || [];

//         console.log("🃏 Cards Drawn:", headCards, bodyCards, legCards);
        
//         this.displayCards(headCards, 150, 'head'); // Top zone
//         this.displayCards(bodyCards, 400, 'body'); // Middle zone
//         this.displayCards(legCards, 650, 'legs'); // Bottom zone
//     }

//     displayCards(cards, yPos, type) {
//         if (!Array.isArray(cards) || cards.length === 0) {
//             console.warn(`🚨 No cards available for ${type}`);
//             return;
//         }

//         cards.forEach((cardData, index) => {
//             const x = 250 + index * 140;
//             const cardBack = this.add.sprite(0, 0, 'card-back');
//             cardBack.setDisplaySize(140, 200).setTint(0x000000); // ✅ Eliminates white border

//             const cardFront = this.cardHandler.createCard(0, 0, cardData);
//             cardFront.setDisplaySize(140, 200);
//             cardFront.setVisible(false);

//             const monsterName = this.add.text(0, -80, cardData.monster_name, {
//                 fontSize: '16px',
//                 color: '#ffffff',
//                 align: 'center',
//                 wordWrap: { width: 130 }, // ✅ Wraps text to fit inside card
//             }).setOrigin(0.5);

//             const card = this.add.container(x, yPos, [cardBack, cardFront, monsterName]);
//             card.setSize(140, 200);
//             card.cardData = cardData;
//             card.isFlipped = false;
//             card.isSelected = false;
            
//             card.setInteractive();
//             card.on('pointerdown', () => {
//                 this.cardHandler.flipCard(card, cardBack, cardFront, type);
//                 if (card.isFlipped) {
//                     this.selectCard(card, type);
//                 }
//             });

//             this.add.existing(card);
//         });
//     }

//     selectCard(selectedCard, type) {
//         const allCards = this.children.list.filter(obj => obj instanceof Phaser.GameObjects.Container && obj.cardData && obj.cardData.part === type);
        
//         allCards.forEach(card => {
//             if (card === selectedCard) {
//                 card.setScale(1.1); // ✅ Emphasize selected card
//                 card.isSelected = true;
//             } else {
//                 card.setAlpha(0.5); // ✅ Diminish unselected cards
//                 card.setScale(0.9);
//                 card.isSelected = false;
//             }
//         });

//         this.selectedParts[type] = selectedCard.cardData;
//         console.log(`✅ Selected ${type}:`, selectedCard.cardData);
//     }

//     createConfirmButton() {
//         const confirmButton = this.add.text(512, 750, 'Confirm Build', {
//             fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
//             stroke: '#000000', strokeThickness: 6, align: 'center'
//         }).setOrigin(0.5).setInteractive();

//         confirmButton.on('pointerdown', () => {
//             if (this.selectedParts.head && this.selectedParts.body && this.selectedParts.legs) {
//                 console.log("Monster confirmed!", this.selectedParts);
                
//                 if (this.roomId) {
//                     this.socketHandler = new SocketHandler(this);
//                     this.socketHandler.socket.emit('monsterBuilt', { roomId: this.roomId, monster: this.selectedParts });
//                     this.scene.start('BattleScene', { roomId: this.roomId, monster: this.selectedParts });
//                 } else {
//                     this.scene.start('MainMenu'); // If solo, return to menu for now
//                 }
//             } else {
//                 console.log("⚠️ Please select all parts!");
//             }
//         });
//     }
// }
