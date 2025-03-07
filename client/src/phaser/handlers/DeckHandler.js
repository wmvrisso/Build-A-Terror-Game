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
