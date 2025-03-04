export default class DeckHandler{
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
}