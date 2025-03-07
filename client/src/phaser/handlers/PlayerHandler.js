export default class PlayerHandler{
    constructor(){
        this.players = [];
    }

    addPlayer(player){
        this.players.push(player);
    }

    removePlayer(player){
        this.players = this.players.filter(p => p.id !== player.id);
    }

    getPlayers(){
        return this.players;
    }

    getPlayerById(id){
        return this.players.find(p => p.id === id);
    }
}