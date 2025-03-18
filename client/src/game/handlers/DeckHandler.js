import api from "../../services/api";

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

      console.log("✅ Decks loaded successfully:", this.getDeck());
    } catch (error) {
      console.error("❌ Error loading deck:", error);
    }
  }

  shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  getDeckByType(deckType) {
    switch (deckType) {
      case "Head":
        return this.headDeck;
      case "Body":
        return this.bodyDeck;
      case "Legs":
        return this.legsDeck;
      default:
        console.warn("Invalid deck type!");
        return [];
    }
  }

  async drawCards(deckType, num = 4) {
    let deck = this.getDeckByType(deckType);

    if (!deck || deck.length < num) {
      console.warn(`Deck is empty, forcing reload for ${deckType}...`);
      await this.loadDeck();
      deck = this.getDeckByType(deckType);
    }

    if (deck.length < num) {
      console.warn(`Not enough cards in the ${deckType} deck even after reload!`);
      return [];
    }
    return deck.splice(0, num);
  }

  getDeck() {
    return [...this.headDeck, ...this.bodyDeck, ...this.legsDeck];
  }
}

// V--------------- SAVING CODE BELOW IN CASE OF ERROR
// import api from "../../services/api";

// export default class DeckHandler {
//   constructor(scene) {
//     this.scene = scene;
//     this.headDeck = [];
//     this.bodyDeck = [];
//     this.legsDeck = [];
//   }

//   // Loads deck with random cards based on rarity
//   async loadDeck() {
//     try {
//         const parts = ["Head", "Body", "Legs"];
//         const deck = { Head: [], Body: [], Legs: [] };

//         for (let part of parts) {
//             for (let i = 0; i < 4; i++) {  // 4 cards are drawn
//                 try {
//                     const response = await api.get(`/cards/random?part=${part}`);
//                     if (response.data) {
//                         deck[part].push(response.data);
//                     }
//                 } catch (error) {
//                     console.warn(`Failed to fetch ${part} card`, error);
//                 }
//             }
//         }

//         this.headDeck = this.shuffleDeck(deck.Head);
//         this.bodyDeck = this.shuffleDeck(deck.Body);
//         this.legsDeck = this.shuffleDeck(deck.Legs);

//         console.log("✅ Decks loaded successfully:", this.getDeck());
//     } catch (error) {
//         console.error("❌ Error loading deck:", error);
//     }
//   }

//   // Separates and shuffles deck into categories
//   separateAndShuffleDeck(deck) {
//     this.headDeck = this.shuffleDeck(deck.filter((card) => card.type === "head"));
//     this.bodyDeck = this.shuffleDeck(deck.filter((card) => card.type === "body"));
//     this.legsDeck = this.shuffleDeck(deck.filter((card) => card.type === "legs"));
//   }

//   shuffleDeck(deck) {
//     for (let i = deck.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [deck[i], deck[j]] = [deck[j], deck[i]];
//     }
//     return deck;
//   }

//   getDeckByType(deckType) {
//     switch (deckType) {
//         case "Head":
//             return this.headDeck;
//         case "Body":
//             return this.bodyDeck;
//         case "Legs":
//             return this.legsDeck;
//         default:
//             console.warn("Invalid deck type!");
//             return [];
//     }
//   }

//   async drawCards(deckType, num = 4) { 
//     let deck = this.getDeckByType(deckType);

//     if (!deck || deck.length < num) {
//         console.warn(`Deck is empty, forcing reload for ${deckType}...`);
//         await this.loadDeck();
//         deck = this.getDeckByType(deckType);
//     }

//     if (deck.length < num) {
//         console.warn(`Not enough cards in the ${deckType} deck even after reload!`);
//         return [];
//     }
//     return deck.splice(0, num);
//   }

//   // Counts remaining cards in the deck
//   getRemainingCards(deckType) {
//     switch (deckType) {
//       case "Head":
//         return this.headDeck.length;
//       case "Body":
//         return this.bodyDeck.length;
//       case "Legs":
//         return this.legsDeck.length;
//       default:
//         console.warn("Invalid deck type!");
//         return 0;
//     }
//   }

//   addCard(deckType, card) {
//     switch (deckType) {
//       case "Head":
//         this.headDeck.push(card);
//         break;
//       case "Body":
//         this.bodyDeck.push(card);
//         break;
//       case "Legs":
//         this.legsDeck.push(card);
//         break;
//       default:
//         console.warn("Invalid deck type!");
//     }
//   }

//   removeCard(deckType, card) {
//     switch (deckType) {
//       case "Head":
//         this.headDeck = this.headDeck.filter((c) => c.id !== card.id);
//         break;
//       case "Body":
//         this.bodyDeck = this.bodyDeck.filter((c) => c.id !== card.id);
//         break;
//       case "Legs":
//         this.legsDeck = this.legsDeck.filter((c) => c.id !== card.id);
//         break;
//       default:
//         console.warn("Invalid deck type!");
//     }
//   }

//   getDeck() {
//     return [...this.headDeck, ...this.bodyDeck, ...this.legsDeck];
//   }

//   getCardById(deckType, id) {
//     let deck = this.getDeckByType(deckType);
//     return deck.find((c) => c.id === id);
//   }
// }