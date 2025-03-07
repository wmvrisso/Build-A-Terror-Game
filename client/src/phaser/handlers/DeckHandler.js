import api from "../../services/api";


export default class DeckHandler {
  constructor(scene) {
    this.scene = scene;
    this.deck = []; // Main deck of cards
  }

//  Loads deck and shuffles
  async loadDeck() {
    try {
      const response = await api.get("/cards"); // Fetch all cards
      this.deck = this.shuffleDeck(response.data);
    } catch (error) {
      console.error("Error fetching deck:", error);


export default class DeckHandler {
  constructor(scene) {
    this.scene = scene;
    this.headDeck = [];
    this.bodyDeck = [];
    this.legsDeck = [];
  }

  // Loads deck with random cards based on rarity
  async loadDeck() {
    try {
      // Fetch 4 random cards for each body part
      const parts = ["Head", "Body", "Legs"];
      const deck = { Head: [], Body: [], Legs: [] };

      for (let part of parts) {
        for (let i = 0; i < 4; i++) {
          try {
            const response = await api.get(`/cards/random?part=${part}`);
            if (response.data) {
              deck[part].push(response.data);
            }
          } catch (error) {
            console.warn(`Failed to fetch ${part} card`, error);
          }
        }
      }

      this.headDeck = this.shuffleDeck(deck.Head);
      this.bodyDeck = this.shuffleDeck(deck.Body);
      this.legsDeck = this.shuffleDeck(deck.Legs);

      console.log("Decks loaded successfully");
    } catch (error) {
      console.error("Error loading deck:", error);
    }
  }

  shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  drawCards(deckType, num) {
    let deck;
    switch (deckType) {
      case "Head":
        deck = this.headDeck;
        break;
      case "Body":
        deck = this.bodyDeck;
        break;
      case "Legs":
        deck = this.legsDeck;
        break;
      default:
        console.warn("Invalid deck type!");
        return [];

    }
  }


// Shuffles deck
  shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];

    if (deck.length < num) {
      console.warn(`Not enough cards in the ${deckType} deck!`);
      return [];
    }
    return deck;
  }

//   Draws a number of cards from the deck
  drawCards(num) {
    if (this.deck.length < num) {
      console.warn("Not enough cards in the deck!");
      return [];
    }

    return this.deck.splice(0, num); // Remove and return drawn cards
  }

// Counts remaining cards in the deck
  getRemainingCards() {
    return this.deck.length;
  }
}

    return deck.splice(0, num);
  }
<<<<<<< HEAD
=======

// Counts remaining cards in the deck
  getRemainingCards(deckType) {
    switch (deckType) {
      case 'head':
        return this.headDeck.length;
      case 'torso':
        return this.torsoDeck.length;
      case 'legs':
        return this.legsDeck.length;
      default:
        console.warn("Invalid deck type!");
        return 0;
    }
  }
    constructor(){
      this.deck = [];
  }

  addCard(card){
      this.deck.push(card);
  }

  removeCard(card){
      this.deck = this.deck.filter(c => c.id !== card.id);
  }

  getDeck(){
      return this.deck;
  }

  getCardById(id){
      return this.deck.find(c => c.id === id);
  }
>>>>>>> 00f9df51bb6bfa962fb440b6b2f3fc51903229c4
}
