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
    }
  }

  // Separates and shuffles deck into categories
  separateAndShuffleDeck(deck) {
    this.headDeck = this.shuffleDeck(deck.filter(card => card.type === 'head'));
    this.torsoDeck = this.shuffleDeck(deck.filter(card => card.type === 'torso'));
    this.legsDeck = this.shuffleDeck(deck.filter(card => card.type === 'legs'));
  }

// Shuffles deck
  shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

//   Draws a number of cards from the deck
  drawCards(num) {
    let deck;
    switch (deckType) {
      case 'head':
        deck = this.headDeck;
        break;
      case 'torso':
        deck = this.torsoDeck;
        break;
      case 'legs':
        deck = this.legsDeck;
        break;
      default:
        console.warn("Invalid deck type!");
        return [];
    }

    if (deck.length < num) {
      console.warn(`Not enough cards in the ${deckType} deck!`);
      return [];
    }

    return deck.splice(0, num); // Remove and return drawn cards
  }

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
}
