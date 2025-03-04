export default class CardHandler{
    constructor(){
        this.cards = [];
    }

    addCard(card){
        this.cards.push(card);
    }

    removeCard(card){
        this.cards = this.cards.filter(c => c.id !== card.id);
    }

    getCards(){
        return this.cards;
    }

    getCardById(id){
        return this.cards.find(c => c.id === id);
    }
}