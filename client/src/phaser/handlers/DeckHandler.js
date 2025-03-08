import api from "../../services/api";

export default class DeckHandler {
  constructor(scene) {
    this.scene = scene;
    this.headDeck = [];
    this.bodyDeck = [];
    this.legsDeck = [];
  }


  //  Loads deck and shuffles

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


  // Separates and shuffles deck into categories
  separateAndShuffleDeck(deck) {
    this.headDeck = this.shuffleDeck(
      deck.filter((card) => card.type === "head")
    );
    this.torsoDeck = this.shuffleDeck(
      deck.filter((card) => card.type === "torso")
    );
    this.legsDeck = this.shuffleDeck(
      deck.filter((card) => card.type === "legs")
    );
  }


  // Shuffles deck

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
      case "head":
        deck = this.headDeck;
        break;
      case "torso":
        deck = this.torsoDeck;
        break;
      case "legs":

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


    return deck.splice(0, num); // Remove and return drawn cards
  }

  // Counts remaining cards in the deck
  getRemainingCards(deckType) {
    switch (deckType) {
      case "head":
        return this.headDeck.length;
      case "torso":
        return this.torsoDeck.length;
      case "legs":
        return this.legsDeck.length;
      default:
        console.warn("Invalid deck type!");
        return 0;
    }
  }

  addCard(card) {
    this.deck.push(card);
  }

  removeCard(card) {
    this.deck = this.deck.filter((c) => c.id !== card.id);
  }

  getDeck() {
    return [...this.headDeck, ...this.bodyDeck, ...this.legsDeck];
  getDeck() {
    return this.deck;
  }

  getCardById(id) {
    return this.deck.find((c) => c.id === id);

    return deck.splice(0, num);

  }
}
