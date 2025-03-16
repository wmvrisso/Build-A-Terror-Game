import Phaser from 'phaser';
import SocketHandler from '../handlers/SocketHandler';
import DeckHandler from '../handlers/DeckHandler';
import CardHandler from '../handlers/CardHandler';

export default class BuildATerror extends Phaser.Scene {
    constructor() {
        super({ key: 'BuildATerror' });
    }

    init(data) {
        this.roomId = data.roomId || null; // Multiplayer room ID if applicable
    }

    async create() {
        this.deckHandler = new DeckHandler(this);
        this.cardHandler = new CardHandler(this);
        this.selectedParts = { head: null, body: null, legs: null };

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
        
        this.displayCards(headCards, 150, 'head'); // Top zone
        this.displayCards(bodyCards, 400, 'body'); // Middle zone
        this.displayCards(legCards, 650, 'legs'); // Bottom zone
    }

    displayCards(cards, yPos, type) {
        if (!Array.isArray(cards) || cards.length === 0) {
            console.warn(`🚨 No cards available for ${type}`);
            return;
        }
    
        cards.forEach((cardData, index) => {
            const x = 250 + index * 140; // ✅ Properly spaced cards
    
            // Create the back of the card
            const cardBack = this.add.sprite(0, 0, 'card-back');
            cardBack.setDisplaySize(140, 200); // ✅ Uniform size
    
            // Create the front of the card
            const cardFront = this.cardHandler.createCard(0, 0, cardData);
            cardFront.setDisplaySize(140, 200); // ✅ Matches back size
            cardFront.setVisible(false); // Start hidden
    
            // Create a container to hold both sides
            const card = this.add.container(x, yPos, [cardBack, cardFront]);
            card.setSize(140, 200); // ✅ Ensures uniform scaling
            card.cardData = cardData;
            card.isFlipped = false;
    
            // Enable interactivity
            card.setInteractive();
            card.on('pointerdown', () => {
                this.cardHandler.flipCard(card, cardBack, cardFront, type);
            });
    
            this.add.existing(card);
        });
    }

    createConfirmButton() {
        const confirmButton = this.add.text(512, 750, 'Confirm Build', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5).setInteractive();

        confirmButton.on('pointerdown', () => {
            if (this.selectedParts.head && this.selectedParts.body && this.selectedParts.legs) {
                console.log("Monster confirmed!", this.selectedParts);
                
                if (this.roomId) {
                    this.socketHandler = new SocketHandler(this);
                    this.socketHandler.socket.emit('monsterBuilt', { roomId: this.roomId, monster: this.selectedParts });
                    this.scene.start('BattleScene', { roomId: this.roomId, monster: this.selectedParts });
                } else {
                    this.scene.start('MainMenu'); // If solo, return to menu for now
                }
            } else {
                console.log("⚠️ Please select all parts!");
            }
        });
    }
}
